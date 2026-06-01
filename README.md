# P4wnP1 Infinition Payloads

A collection of HID scripts and shell payloads for the P4wnP1 A.L.O.A. platform
(Raspberry Pi Zero W). All scripts target Windows 10 French or US keyboard
layouts unless noted. They are written for the P4wnP1 JavaScript HID API and
Bash trigger system.

For authorised penetration testing and security research only.

---

## Payload index

### Credential harvesting

**`@_Steal Passwords_FR_V3_Infinition.js`** / **`@_Steal Passwords_FR_V3WU_Infinition.js`** / **`@_Steal Passwords_US_V3_Infinition.js`**
Opens an elevated PowerShell window, maximises it off-screen to hide activity,
adds an SMB exclusion to Windows Defender, then dumps browser-saved passwords
and sends them to the P4wnP1 SMB share. FR and US keyboard variants. The `WU`
variant includes a Windows Update disguise for the visible UI.

**`@_Steal_Passwords_Powershell_V1.js`**
A simpler PowerShell-only credential dump, no layout tricks, no stealth window.

**`@_Extract_lsaasDMP_toSMB_V1_Infinition.js`** / **`V2`** / **`V3h`**
Adds a Defender exclusion for the P4wnP1 SMB share, opens Task Manager with
elevated privileges, locates the `lsass.exe` process, and creates a memory dump
that is written directly to the SMB share. The `V3h` variant hides the
PowerShell window during execution.

### File exfiltration

**`@_Steal Files2SMB_Hide_FR_V1_Infinition.js`** / **`Vtest`** / **`Vtest2`**
Opens a hidden PowerShell window and copies a configurable set of file paths to
the P4wnP1 SMB share. The window is resized to a 100x100 pixel sliver and moved
off-screen so it does not appear on the taskbar.

**`@_Steal Files2Usb_FR_V1_Infinition.js`**
Same file copy logic, but writes to a USB mass storage device rather than SMB.

**`@_Doc_to_Smb.js`**
Opens Notepad with elevated privileges and uses PowerShell injected via the text
editor to locate and copy documents to the SMB share.

### Remote access

**`@_Reverse_Shell_FR_V2_Infinition.js`** / **`@_Reverse_Shell_US_V2_Infinition.js`**
Opens an elevated PowerShell session and establishes a TCP reverse shell back to
the P4wnP1 on port 4445. Run `netcat -lvp 4445` on the device before inserting.
FR and US layout variants.

**`@_Reverse_Shell_FR_WIPV3_Infinition.js`**
Work-in-progress revision of the FR reverse shell. Not production ready.

### Evasion / preparation

**`@_DésactiverV2_WindowsDefender_Infinition.js`**
Navigates Windows Security through keyboard input alone to disable real-time
protection. No PowerShell, no elevated prompt — works through the GUI.

**`@_OpenSMB_Infinition.js`**
Configures the target to connect to the P4wnP1 SMB share and opens it, making
subsequent file operations faster.

### Persistence / other

**`@_SwitchUser_WithoutPass_V1_Infinition.js`**
Lists active sessions via `query user`, prompts for a session ID, then switches
to that session using `tscon` without needing the target user's password.

**`@_Wallpaper.js`**
Downloads an image from a remote URL and sets it as the desktop wallpaper via
the Windows registry.

---

## Shell scripts (run on the P4wnP1 itself)

| File | Purpose |
|------|---------|
| `samba.sh` | Starts the Samba SMB service |
| `startup.sh` | Boot sequence: launches BeBoXGui menu |
| `servicestart.sh` | Starts required services on device boot |
| `trigger-aware.sh` | Trigger wrapper that reacts to P4wnP1 events |
| `smbrute.sh` | SMB brute force via Metasploit (see Win10 LockPicker) |
| `serial-teminal.sh` | Opens a serial terminal session |
| `wifi_covert_channel.sh` | Covert data channel over raw HID / Wi-Fi |

---

## Requirements

- P4wnP1 A.L.O.A. on a Raspberry Pi Zero W
- Samba configured and running on the device for SMB-based payloads
- Metasploit and Nmap for `smbrute.sh`
- A netcat listener for the reverse shell payloads
- Wordlists at `/usr/local/P4wnP1/scripts/wordlists/` for brute force

---

## Usage

Copy `.js` scripts to `/usr/local/P4wnP1/HIDScripts/` on the device.
Copy `.sh` scripts to `/usr/local/P4wnP1/scripts/`.

In the P4wnP1 web UI, assign a script as a trigger action (e.g. "run on DHCP
lease") or run it manually from the HID script panel.

Most payloads default to a French keyboard layout (`layout('fr')`). Change this
at the top of each script if the target uses a different layout.

---

## SMB share setup

Several payloads write loot to `\\172.16.0.1\Data`. Make sure the Samba share
is configured and accessible before running those scripts. `samba.sh` and
`servicestart.sh` handle the service start. The P4wnP1 IP on the USB interface
defaults to `172.16.0.1`.

---

## Star History

<a href="https://www.star-history.com/?repos=infinition%2FP4wnP1-Infinition-Payloads&type=date&legend=top-left">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=infinition/P4wnP1-Infinition-Payloads&type=date&theme=dark&legend=top-left" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=infinition/P4wnP1-Infinition-Payloads&type=date&legend=top-left" />
   <img alt="Star History Chart" src="https://api.star-history.com/chart?repos=infinition/P4wnP1-Infinition-Payloads&type=date&legend=top-left" />
 </picture>
</a>

---

## Legal notice

These payloads are intended for use on systems you own or have explicit written
authorisation to test. Unauthorised use is illegal in most jurisdictions. The
author takes no responsibility for misuse.
