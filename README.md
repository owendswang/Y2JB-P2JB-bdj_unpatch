# Y2JB + P2JB + bdj_unpatch

Based on [Gezine/Y2JB](https://github.com/Gezine/Y2JB), chained with [matem6/P2JB-Y2JB-Porting](https://github.com/matem6/P2JB-Y2JB-Porting) and [Gezine/bdj_unpatch](https://github.com/Gezine/BD-UN-JB/tree/main/bdj_unpatch).

## Brief

This is just for **simple + local (no network needed) + auto** unpatch bdj via Y2JB with P2JB.  
If lucky, one time run (~50 minutes) would succeed and switch to BD-UN-JB for PS5 FW 10.20-12.00 disc edition.

## Requirements

PS5 firmware version from 9.00 to 12.40 disc edition.  
But only from 10.20 to 12.00, it is reasonable to unpatch bdj. Because poopsloit only support upto 12.00 and Y2JB+Lapse works perfect upto 10.01.
(Then sorry for not providing support up to 12.70 for this branch. It's not necessary for now. But you could try [Autoloader](https://github.com/owendswang/Y2JB-P2JB-bdj_unpatch/tree/autoloader) for higher firmware version support.)

### For Jailbroken PS5
No need to use this. Just send bdj_unpatch.elf to elfldr would do.

### For Non-Jailbroken PS5
- USB flash drive
- Pre-made backup file

## Setup Instructions

Network connection is **NOT** necessary for this completely local implementation. But it's important to configure network to block PSN and updates when you need a network connection.

### Configure Network DNS Settings (Optional, but highly recommended)

1. Navigate to **Settings > Network > Settings > Set Up Internet Connection**
2. Scroll to the bottom and select **Set Up Manually**
3. Choose your connection type:
   - **Use WiFi**: Enter your network name and password manually, then set security to "WPA-Personal..."
   - **Use a LAN Cable**: Proceed to the next step
4. Under **DNS Settings**, change from "Automatic" to **Manual**
5. Set **Primary DNS** to `127.0.0.2` (leave Secondary DNS blank)
6. Press **Done** and wait for the connection to establish

**Note:** You may see a network/PSN connection error - this is expected and can be safely ignored. The console will still function normally for YouTube payload delivery.

**Alternative:** Instead of using 127.0.0.2, you can block PSN servers using your custom DNS server.

#### Why is Setting DNS to 127.0.0.2 Required?

The DNS configuration is critical for Y2JB to function properly for two technical reasons:

1. **Blocking PSN Connections**: Setting the DNS to 127.0.0.2 (localhost) prevents the PS5 from reaching PlayStation Network servers. This blocks both the YouTube app and system firmware update prompts that would otherwise interfere with the exploit.

### Non-Jailbroken PS5

1. Download the backup file from the releases page
2. Follow Sony's official guide to [restore backup data from USB](https://www.playstation.com/en-gb/support/hardware/back-up-ps5-data-USB/)  
   **⚠️ WARNING:** Restoring backup data **WILL FACTORY RESET YOUR PS5**. All data on your console will be erased.
3. Hit Y2B and wait for ~50 minutes. If logging on screen shows 'complete', it means success. Just shutdown/reboot. If failed reboot and try again.  
4. After bdj_unpatch success, use BD-UN-JB disc for fast and stable method. Y2B is no longer needed and can be deleted.  
   **⚠️ WARNING:** Kernel panic might happen whatever success or failure. Take your own risk.

## Sending Payloads

**No need** to do this for bdj_unpatch. But if you run Y2B when already jailbroken, remote js loader would run.

**Note:** The Remote JS Server does not always use port 50000. While it typically defaults to port 50000, it may occasionally use a different port - this is normal behavior, not a bug.

You can send payloads using `payload_sender.py` (requires Python).

**Usage:**
```
python payload_sender.py <host> <file>
python payload_sender.py <host> <port> <file>
```

**Examples:**
```
python payload_sender.py 192.168.1.100 helloworld.js
python payload_sender.py 192.168.1.100 50000 helloworld.js
python payload_sender.py 192.168.1.100 9020 payload.bin
```

## Credits

* **[Gezine](https://github.com/Gezine)** - [Y2JB](https://github.com/Gezine/Y2JB) creator and [bdj_unpatch](https://github.com/Gezine/BD-UN-JB/tree/main/bdj_unpatch) creator. Original [p2jb.lua](https://github.com/Gezine/Luac0re/blob/main/payloads/p2jb.lua).
* **[shahrilnet](https://github.com/shahrilnet), [null_ptr](https://github.com/n0llptr)** - Referenced many codes from [Remote Lua Loader](https://github.com/shahrilnet/remote_lua_loader)
* **[BenNoxXD](https://github.com/BenNoxXD)** - [ClosePlayer](https://github.com/BenNoxXD/PS5-BDJ-HEN-loader) reference
* **[ntfargo](https://github.com/ntfargo)** - Thanks for providing V8 CVEs and CTF writeups
* **[flat_z](https://github.com/flatz) and [LM](https://github.com/LightningMods)** - Helping implement GPU rw using direct ioctl
* **[john-tornblom](https://github.com/john-tornblom) and [EchoStretch](https://github.com/EchoStretch)** - Providing elfldr.elf payload
* **[hammer-83](https://github.com/hammer-83)** - Various BD-J PS5 exploit references
* **[zecoxao](https://github.com/zecoxao), [idlesauce](https://github.com/idlesauce), and [TheFlow](https://github.com/theofficialflow)** - Helping troubleshoot dlsym
* **[Dr.Yenyen](https://github.com/DrYenyen) and PS5 R&D community** - Testing Y2JB
* **Rush** - Creating Y2JB backup file
* **[matem6](https://github.com/matem6)** - Porting P2JB to Y2JB.
* **Edigax** — help with the multi-core leak implementation, bringing the `cr_ref` leak down from ~2 hours to ~48 minutes.
* **[notmaj0r remote_lua_loader p2jb port](https://github.com/notmaj0r/remote_lua_loader/blob/main/payloads/P2JB.lua)** — used as a secondary reference during the port by matem6.
* **[ufm42](https://github.com/ufm42)** - [kexp](https://github.com/ufm42/kexp) used for PS5 post JB all-in-one shellcode

## Disclaimer

This tool is provided as-is for research and development purposes only.  
Use at your own risk.  
The developers are not responsible for any damage, data loss, or consequences resulting from the use of this software.  
