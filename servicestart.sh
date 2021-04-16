#!/bin/bash

# fallback script, called in case the configured 'Startup Master Template' fails
# the script uses the CLI client to do basic configuration and make P4wnP1 reachable
# Additionally it serves as example on how to use the CLI client to configure P4wnP1 A.L.O.A.

# Enable USB functions RNDIS, CDC ECM
P4wnP1_cli usb set --vid 0x1d6c --pid 0x1347 --manufacturer "MaMe82" --sn "deadbeef1337" --product "P4wnP1 by MaMe82" --rndis --cdc-ecm

# Configure USB ethernet interface "usbeth" to run a DHCP server
#   - use IPv4 172.16.0.1 for interface with netmask 255.255.255.252
#   - disable DHCP option 3 (router) by passing an empty value
#   - disable DHCP option 6 (DNS) by passing an empty value
#   - add a DHCP range from 172.16.0.2 to 172.16.0.2 (single IP) with a lease time of 1 minute
P4wnP1_cli net set server -i usbeth -a 172.16.0.1 -m 255.255.255.248 -o "3:" -o "6:" -r "172.16.0.2|172.16.0.2|5m"

# Enable WiFi AP (reg US, channel 6, SSID/AP name: "P4wnP1", pre shared key: "MaMe82-P4wnP1", don't use nexmon firmware)
# Note: As a pre-shared key is given, P4wnP1 assume the AP should use WPA2-PSK
# Note 2: The SSID uses Unicode characters not necessarily supported by the console, but P4wnP1 supports UTF-8 ;-)
P4wnP1_cli wifi set ap -r US -c 6 -s "💥🖥💥 Ⓟ➃ⓌⓃ🅟❶" -k "MaMe82-P4wnP1" --nonexmon

# Configure USB ethernet interface "wlan0" to run a DHCP server
#   - use IPv4 172.24.0.1 for interface with netmask 255.255.255.0
#   - disable DHCP option 3 (router) by passing an empty value
#   - disable DHCP option 6 (DNS) by passing an empty value
#   - add a DHCP range from 172.24.0.10 to 172.24.0.20 with a lease time of 5 minutes
P4wnP1_cli net set server -i wlan0 -a 172.24.0.1 -m 255.255.255.0 -o "3:" -o "6:" -r "172.24.0.10|172.24.0.20|5m"

P4wnP1_cli led -b 2
