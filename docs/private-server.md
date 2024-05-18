# Setting up your own Arcaea server

!!! note "Before starting"
    Make sure you have a copy of Arcaea APK/IPA file ready.

### Obtaining content bundle
!!! note
    Only for Arcaea 5.4.0+ and non-Chinese versions.

Starting from Arcaea 5.4.0, the game now uses content bundle to deliver base contents such as characters and songs. You **must** obtain this before proceeding.

Obtaining the content bundle will requires you to install Arcaea once and let it finish downloading the bundle (~491 MB). 

!!! tip
    Force quit the game AFTER the content bundle is downloaded (before file verification).

After downloading it, steps to get the files will be different depending on your operating system

* For Android, the content bundle is stored in `/data/data/moe.low.arc/files`. **Root/custom recoveries (e.g. TWRP) is required to access this directory. Shizuku will not work.**

* For iOS, the content bundle is stored in `/var/mobile/Containers/Data/Application/<Arcaea data container ID>/Library/Application Support`. **Filza or an unsandboxed file manager is required to access this directory.**

Copy the `dltemp` folder to your computer. Inside it should contain 2 files with the same filename: one with .bundle and one with .json.

### Patching Arcaea
!!! note
    If you had already patched Arcaea, feel free to skip this section and proceed to [Setting up private server](#setting-up-private-server).

#### Using Binary Patches

!!! note "Before starting"
    You will need a software that allows applying `.xdelta` binary patches. [DeltaPatcher](https://github.com/marco-calautti/DeltaPatcher) is used in this guide.

!!! warning
    Android will receive patches for newer versions slower than iOS. As an alternative, try [patching it](#manual-patching-advanced) yourself or wait until Android patches is made.

Download the appropriate patch for your version:

??? note "iOS 5.6.1 (latest as of 5/7/2024)"
    [Download](https://github.com/FishiaT/arcmodwiki/releases/download/patches/ios_5.6.1.xdelta){ .md-button }

??? note "iOS 5.6.0"
    [Download](https://github.com/FishiaT/arcmodwiki/releases/download/patches/ios_5.6.0.xdelta){ .md-button }

??? note "Android 5.6.0"
    [Download](https://github.com/FishiaT/arcmodwiki/releases/download/patches/android_5.6.0.xdelta){ .md-button }

??? note "Android 5.6.0c"
    [Download](https://github.com/FishiaT/arcmodwiki/releases/download/patches/android_5.6.0c.xdelta){ .md-button }

Now open DeltaPatcher, you will be presented with an interface like this:

![image](https://gist.github.com/assets/74685931/3d449457-96f5-41b5-8c74-d66328d66418)

Select the appropriate *unmodified* executable, and the appropriate patch, then press **Apply patch**.

After that, you are done!

#### Manual patching (Advanced)
!!! note "Before starting"
    This section requires basic knowledge of disassembling as well as Googling. You will also need a disassembler with support for ELF/Mach-O arm64 executables and pseudo-code decompilation for this section. IDA Pro is used here.

!!! tip "About NOP"
    `1F 20 03 D5` is the hex equivalent of ARM64 `nop` instruction. Overwrite a hex address with it when you want to remove a specific instruction call.

Open the appropriate executable file for your operating system, ***and wait for the initial auto-analysis to complete (indicated by the status bar at the bottom showing Idle.)*** This process may take a while depending on your computer so please be patient.

![image](https://gist.github.com/assets/74685931/ef84f334-d2b6-48c4-9ec3-f84f896a0918)

After the initial auto-analysis, Press **SHIFT + F12** and wait for the string list to be generated (again, this may take a while.)

In the **Strings** sub-window, press **ALT + T** and search for `cookieFiIe.txt` until you found exactly this.

![image](https://gist.github.com/assets/74685931/3203879e-367b-4bdc-a834-d24db72442a6)

Double-click it, and while highlighting this part, press **X** to perform xref (cross-reference.)

![image](https://gist.github.com/assets/74685931/505ee7d4-6734-4391-92d3-90dd6aaae1ef)

Choose the **second** xref (for Android) or the only present xref (for iOS) and press **ENTER**.

![image](https://gist.github.com/assets/74685931/7ac1e9fd-74d3-4015-975b-8c6a036b6ff5)

Press **F5** or **View > Open subviews > Generate pseudocode** (this will not work if IDA is still analyzing the binary), wait for the decompilation to complete (may take a while) until you see something like this (may differ depending on version used but the general structure should be the same):

![image](https://gist.github.com/assets/74685931/61a77285-a854-4a7b-8575-5c4cacc781a1)

Scroll to bottom until you see this part, then highlight it by clicking onto it (names may be different but the structure should remain the same.)

![image](https://gist.github.com/assets/74685931/e048adf0-7a08-4b33-a6f7-9995cfd25f3f)

Now switch to the **Hex View** sub-window, make sure it synchronizes with the **Pseudo Code** sub-window, and NOP it.

![image](https://gist.github.com/assets/74685931/1f44b264-ae04-49e5-9a7a-a55bda1ed437)

After that, make sure the entire code line is absent when re-decompiled.

Now return to the **Strings** sub-window, and this time search for `vtvtvt`.

xref it, and choose the first xref entry for iOS, or the one with `@PAGE` for Android.

| Android | iOS |
| ------- | --- |
| ![image](https://gist.github.com/assets/74685931/65950e4f-c004-4b1d-a582-9e8a01a5ec03) | ![image](https://gist.github.com/assets/74685931/f5ce6a72-8307-42e6-9174-e4371b26680b) |

Decompile it again, and scroll down a little bit until you see this part:

![image](https://gist.github.com/assets/74685931/8857dcd5-565c-4888-b9eb-3e248ae0fa5b)

Highlight this part, and NOP it like above:

![image](https://gist.github.com/assets/74685931/73ad185a-67e5-4cc2-b439-d122289c24d7)

After that, apply the patches and you are done!

After patching the executable, save the file and recompress the APK/IPA file. For Android, **you must resign the APK file before installing it onto your device.** You may now sideload it onto your device using ADB, AppSync Unified (*not recommended due to potential crashes and issues.*), AltStore (& friends) or TrollStore (*recommended for supported devices.*)

### Setting up private server
For this section, you will need:

* Python 3.6 or newer.

* [Charles](https://www.charlesproxy.com/) (recommended), [Fiddler Classic](https://www.telerik.com/fiddler/fiddler-classic) or any programs that allows redirecting HTTP requests through a proxy.

* Time and patience.

!!! warning
    Using any other OSes other than Windows for this may or may not work. You may need to figure stuff out on your own.

First, you need to obtain the server software. We will be using Lost-MSth's [Arcaea-server](https://github.com/Lost-MSth/Arcaea-server) for this purpose. You may obtain it using `git` like this `git clone https://github.com/Lost-MSth/Arcaea-server -b dev` or by downloading the ZIP file of the `dev` branch.

![image](https://gist.github.com/assets/74685931/82f37fba-3372-447b-ae98-bd7612794810)

After obtaining the server software, navigate to its directory (`<Arcaea-server>/latest version`), and with Python 3.6 or newer installed, run `pip install -m requirements.txt`.

From here, certain steps may differ depending on your operating system and the proxy software you picked. We will be using iOS and Charles in this case but the same can also be done for other similarly functioning software.

#### Proxy setup
Open Charles and you will be presented with an interface like this:

![image](https://gist.github.com/assets/74685931/f5b2fec9-0689-4c85-8991-f266e4449262)

Press **CTRL + SHIFT + L** or **Proxy > SSL Proxying Settings** and tick the **Enable SSL Proxying** box. After that, click **Add**, fill `*` for both **Host** and **Port** then press **OK**, after that untick the newly added box. In the end, the SSL Proxying Settings window should look like this:

![image](https://gist.github.com/assets/74685931/242f760a-2473-4fd4-bfb7-1a5f154a22d5)

Close that window, go to **Proxy > Proxy Settings** and tweak it *exactly* like this image:

![image](https://gist.github.com/assets/74685931/e3be161a-8590-43f7-a16c-9351d924d969)

Navigate to the **Windows** tab and tick all checkboxes:

![image](https://gist.github.com/assets/74685931/e221385b-7b7c-43fc-8ee5-edc73d14fe1f)

Close that window, and go to **Help > Local IP Addresses**. It will look something like this:

![image](https://gist.github.com/assets/74685931/a6c2a2a2-5981-45ba-9a4d-a419d6ec9d3a)

Your local IP address will most likely be the first item in the list (in this case, since I am using Ethernet connection, it will be the first one.) Copy that IP address or memorize it. 

!!! tip "About local IP addresses"
    This is your ***local*** IP address, meaning it can only be accessed by devices that are connected to the same network.

You may now close that window and press **CTRL + ALT + M** or **Tools > Map Remote...**, tick **Enable Map Remote** and press **Add**. Tweak it like this:

![image](https://gist.github.com/assets/74685931/ab49da64-b284-462e-a549-3836e1eaa8a3)

In the **Map To** section, the **Host** textbox needs to be your local IP address that you got from above, and the **Port** textbox is a 4 digit number that your server will be running on. Pick any numbers you want **except** for ports like 8888 or 8889 and memorize it along with your local IP address. Press **OK**. The map remote interface should look like this in the end:

![image](https://gist.github.com/assets/74685931/10135270-6146-4865-9e6c-29e8d87cd690)

You may now close that window. At this point, the proxy is now ready. 

#### Server software
The server software directory will look like this:

![image](https://gist.github.com/assets/74685931/32dc5c2d-e268-41aa-a461-e7357fd43e41)

Copy the **config.example.py** file into a file named **config.py** and open it with your favorite text editor. 

Most of the config properties should already be self-explanatory. Below is guide for a few important parts.

Remember that local IP address and port that you memorized not long ago? Well enter it here:

![image](https://gist.github.com/assets/74685931/7e00ed33-2eb3-429b-8190-25c2bc59ea75)

**HOST** is your local IP address and **PORT** is the port you have choosen earlier.

For **GAME_API_PREFIX**, this will differ depending on your Arcaea version. Refer to the table below.

| Version | Prefix |
| ------- | ------ |
| 5.5.6 -> 5.6.1 | `/hanami/29` |

![image](https://gist.github.com/assets/74685931/c8cbab7e-e682-4747-96f2-c840ed4156ed)

For **ALLOW_APPVERSION**, remove everything inside. You may add a version to the list (e.g. `5.6.1) if you want to restrict the server to (a) specific server.

![image](https://gist.github.com/assets/74685931/20cc5697-7a52-4aac-8ead-3090e6cc08ad)

For this part:

![image](https://gist.github.com/assets/74685931/97e19246-d00e-4852-a28f-ff9932d6b383)

If you want to use link play functionality, the only variables you need to care about are **LINKPLAY_HOST** and **LINKPLAY_AUTHENTICATION**.

* **LINKPLAY_HOST** needs to be the same as the IP address you have set in the **HOST** variable earlier *unless* the **SET_LINKPLAY_SERVER_AS_SUB_PROCESS** variable is set to `False`, at which you will need to specify a separate IP address for the link play server.

* For **LINKPLAY_AUTHENTICATION**, you can leave it as-is for use anything you want.

If you do not want to use link play functionality, the **LINKPLAY_HOST** variable needs to be an empty string.

For **SSL_CERT** and **SSL_KEY**, if you want to have the server running under HTTPS, you may supply an SSL certificate here if you have one (.pem and .key file).

!!! warning
    Running the server under HTTPS may cause issues with downloading packs/songs.

Adjust the rest of the config file to your own likings. Save the file after finished.

Now go to the `database` folder and it will look like this:

![image](https://gist.github.com/assets/74685931/7bc2b7ed-641d-4d5e-a6ed-1f73b9e40d5e)

Run the `database_initialize.py` file to generate the database. Make sure you have installed all dependencies prior to running it in order for it to work. A file named `arcaea_database.db` will be created if successful. After that, do all of these:

* Put the content bundle you have obtained above into the `bundle` folder. The actual bundle must have the `.cb` extension and the meta file must have the `.json` extension. Both must have the same filename (e.g. `5.6.0`).

!!! note
    The content bundle in the server must be the same as the one existing in your Arcaea client (the metadata and content MUST match) as otherwise you will encounter issues when trying to login. If you change the content bundle in the server, the one on the client should be redownloaded.

* Put any songs you have into the `songs` folder. A song is a folder containing multiple .aff files (every difficulties of the song), base.jpg files (the jacket art), the song itself, the PV video for Terminal songs, and any additional files for that song.

* Make any adjustments you want to make.

At this point, the server software is now ready.

#### On device setup
!!! note
    Your phone and your computer (the one that runs the server) MUST be connected to the same network for the server to work.

***iOS***

Open the **Settings** app, go to **Wi-Fi** settings, press the **!** icon on the connected network, scroll down until you found the **HTTP Proxy** settings. In the **Configure Proxy** settings, select **Manual** and fill in the **Server** field which is your local IP address and the **Port** field which is 8888. Now press **Save** and (optionally) turn off and reconnect to your Wi-Fi network.

Now on your computer, return to Charles and go to **Help > SSL Proxying > Install Charles Root Certificate on a Mobile Device or Remote Browser**. A window like this will show up:

![image](https://gist.github.com/assets/74685931/c9f85e1c-9ef6-4c22-9113-79551ab73fed)

Follow the steps listed in it to install the Charles certificate onto your device.

***Android***

!!! warning
    Android is finicky when it comes to proxy servers. Things may not work correctly or even at all.

First and foremost, go back to Charles and go to **Help > SSL Proxying > Save Charles Root Certificate...** Save the .pem file somewhere. Rename the .pem extension to .crt. Now transfer this file to your Android device and install it to both categories.

On Android, you will need to rely on a proxifier app such as [VProxid](https://play.google.com/store/apps/details?id=com.lazybean.vpnperapp) or [RProxid](https://play.google.com/store/apps/details?id=com.lazybean.socksperapp) (requires root, recommended). You need to connect through the SOCKS5 proxy server.

After installing either of the proxifier app, open it and press the **+** icon, for **Server IP**, enter your local IP address; for **Server Port**, enter 8889. Scroll down a little bit and press **Click to select application(s)** then tick Arcaea. Now return and press the play button to start the VPN. Wait until it shows all good.

Now your device is ready to connect to the private server!

!!! note
    Disable the proxy when you have finished playing to prevent connectivity issues. The proxy will need to be re-enabled everytime you want to use the server. A dedicated 24/7 server such as a Raspberry Pi, a spare phone/computer with working shell, or a cloud server (VPS) is recommended for always-on server hosting.

#### Playing
Return to the root directory of your server and run the `run.bat` file. It may take a while to start depending on the amount of songs you added. If the server console shows this:

![image](https://gist.github.com/assets/74685931/ad8ea11d-dd9b-4831-9982-6b8bee0526f6)

Congratulations! Your server is now up and running! Now all that left is open Arcaea and play!

If you see something like this, it means the server is working as intended.

![image](https://gist.github.com/assets/74685931/c56fc44c-53af-4868-bac7-feeee0bc1f46)

At this point, you are basically done! Enjoy your new server!

#### Fixes for notable issues
***The game kept prompting to update a pack despite having already downloaded it.***

-> Check the song folders to see if they are named correctly and that all files (plus PV videos and audios if exists) are inside.

***Cannot download any songs.***

-> Make sure the server is running under HTTP connection. For iOS, you may need to edit the `Info.plist` file using a plist editor to allow HTTP connection without a jailbreak by setting `NSAllowsArbitraryLoads` property to `true`.

![image](https://gist.github.com/assets/74685931/9ec62ee6-2b13-45c7-865c-bd6949ddf1df)

***Nothing works, even logging in.***

-> Check if the `GAME_API_PREFIX` variable in the `config.py` file is set correctly. If that did not work, make sure you have set up the proxy correctly (refer to the [Proxy setup](#proxy-setup) and [On device proxy setup](#on-device-setup) section.)