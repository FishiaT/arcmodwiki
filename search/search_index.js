var __index = {"config":{"lang":["en"],"separator":"[\\s\\-]+","pipeline":["stopWordFilter"]},"docs":[{"location":"index.html","title":"Welcome to Arcaea Modding Wiki!","text":"<p>This is a (work-in-progress) centralized wiki for everything Arcaea modding related!</p> <p>Disclaimer</p> <p>Everything present in this wiki is made purely for educational and research purposes. By following anything in this wiki, you acknowledge that under no circumstances shall we be held responsible or liable for any consequences that may arise from your actions. No proprietary and paid assets, resources and files will be provided and must be individually obtained through official means.</p> <p>Looking for contributors!</p> <p>Arcaea Modding Wiki is looking for contributors! The wiki still needs polishing and improving such as better reference images and such. If you want to contribute, visit the GitHub repository!</p>"},{"location":"custom-charts-packs.html","title":"Adding custom charts/packs","text":"<p>!!! \"Work in progress\"     This page is still being worked on, please come back later!</p>"},{"location":"offline-mod.html","title":"Reverse Engineering Arcaea","text":"<p>Danger</p> <p>This guide is in the process of being rewritten. No precise ETAs will be given on the completion date. Please do not try to follow the old guide as it will NOT work.</p>"},{"location":"private-server.html","title":"Setting up your own Arcaea server","text":"<p>Before starting</p> <p>Make sure you have a copy of Arcaea APK/IPA file ready.</p>"},{"location":"private-server.html#obtaining-content-bundle","title":"Obtaining content bundle","text":"<p>Note</p> <p>Only for Arcaea 5.4.0+ and non-Chinese versions.</p> <p>Starting from Arcaea 5.4.0, the game now uses content bundle to deliver base contents such as characters and songs. </p> <p>Obtaining the content bundle will requires you to install Arcaea once and let it finish downloading the bundle (~491 MB). </p> <p>Tip</p> <p>Force quit the game AFTER the content bundle is downloaded (before file verification).</p> <p>After downloading it, steps to get the files will be different depending on your operating system</p> <ul> <li> <p>For Android, the content bundle is stored in <code>/data/data/moe.low.arc/files</code>. Root is required to access this directory. Shizuku may not work.</p> </li> <li> <p>For iOS, the content bundle is stored in <code>/var/mobile/Containers/Data/Application/&lt;Arcaea data container ID&gt;/Library/Application Support</code>. Filza is required to access this directory.</p> </li> </ul> <p>Copy the <code>dltemp</code> folder to your computer. Inside it should contain 2 files with the same filename: one with .bundle and one with .json.</p>"},{"location":"private-server.html#patching-arcaea","title":"Patching Arcaea","text":"<p>Note</p> <p>If you had already patched Arcaea, feel free to skip this section and proceed to Setting up private server.</p>"},{"location":"private-server.html#using-binary-patches","title":"Using Binary Patches","text":"<p>Before starting</p> <p>You will need a software that allows applying <code>.xdelta</code> binary patches. DeltaPatcher is used in this guide.</p> <p>Warning</p> <p>Android will receive patches for newer versions slower than iOS. As an alternative, try patching it yourself or wait until Android patches is made.</p> <p>Download the appropriate patch for your version:</p> iOS 5.6.1 (latest as of 5/7/2024) <p>Download</p> iOS 5.6.0 <p>Download</p> Android 5.6.0 <p>Download</p> Android 5.6.0c <p>Download</p> <p>Now open DeltaPatcher, you will be presented with an interface like this:</p> <p></p> <p>Select the appropriate unmodified executable, and the appropriate patch, then press Apply patch.</p> <p>After that, you are done!</p>"},{"location":"private-server.html#manual-patching-advanced","title":"Manual patching (Advanced)","text":"<p>Before starting</p> <p>This section requires basic knowledge of disassembling as well as Googling. You will also need a disassembler with support for ELF/Mach-O arm64 executables and pseudo-code decompilation for this section. IDA Pro is used here.</p> <p>About NOP</p> <p><code>1F 20 03 D5</code> is the hex equivalent of ARM64 <code>nop</code> instruction. Overwrite a hex address with it when you want to remove a specific instruction call.</p> <p>Open the appropriate executable file for your operating system, and wait for the initial auto-analysis to complete (indicated by the status bar at the bottom showing Idle.) This process may take a while depending on your computer so please be patient.</p> <p></p> <p>After the initial auto-analysis, Press SHIFT + F12 and wait for the string list to be generated (again, this may take a while.)</p> <p>In the Strings sub-window, press ALT + T and search for <code>cookieFiIe.txt</code> until you found exactly this.</p> <p></p> <p>Double-click it, and while highlighting this part, press X to perform xref (cross-reference.)</p> <p></p> <p>Choose the second xref (for Android) or the only present xref (for iOS) and press ENTER.</p> <p></p> <p>Press F5 or View &gt; Open subviews &gt; Generate pseudocode (this will not work if IDA is still analyzing the binary), wait for the decompilation to complete (may take a while) until you see something like this (may differ depending on version used but the general structure should be the same):</p> <p></p> <p>Scroll to bottom until you see this part, then highlight it by clicking onto it (names may be different but the structure should remain the same.)</p> <p></p> <p>Now switch to the Hex View sub-window, make sure it synchronizes with the Pseudo Code sub-window, and NOP it.</p> <p></p> <p>After that, make sure the entire code line is absent when re-decompiled.</p> <p>Now return to the Strings sub-window, and this time search for <code>vtvtvt</code>.</p> <p>xref it, and choose the first xref entry for iOS, or the one with <code>@PAGE</code> for Android.</p> Android iOS <p>Decompile it again, and scroll down a little bit until you see this part:</p> <p></p> <p>Highlight this part, and NOP it like above:</p> <p></p> <p>After that, apply the patches and you are done!</p> <p>After patching the executable, save the file and recompress the APK/IPA file. For Android, you must resign the APK file before installing it onto your device. You may now sideload it onto your device using ADB, AppSync Unified (not recommended due to potential crashes and issues.), AltStore (&amp; friends) or TrollStore (recommended for supported devices.)</p>"},{"location":"private-server.html#setting-up-private-server","title":"Setting up private server","text":"<p>For this section, you will need:</p> <ul> <li> <p>Python 3.6 or newer.</p> </li> <li> <p>Charles (recommended), Fiddler Classic or any programs that allows redirecting HTTP requests through a proxy.</p> </li> <li> <p>Time and patience.</p> </li> </ul> <p>Warning</p> <p>Using any other OSes other than Windows for this may or may not work. You may need to figure stuff out on your own.</p> <p>First, you need to obtain the server software. We will be using Lost-MSth's Arcaea-server for this purpose. You may obtain it using <code>git</code> like this <code>git clone https://github.com/Lost-MSth/Arcaea-server -b dev</code> or by downloading the ZIP file of the <code>dev</code> branch.</p> <p></p> <p>After obtaining the server software, navigate to its directory (<code>&lt;Arcaea-server&gt;/latest version</code>), and with Python 3.6 or newer installed, run <code>pip install -m requirements.txt</code>.</p> <p>From here, certain steps may differ depending on your operating system and the proxy software you picked. We will be using iOS and Charles in this case but the same can also be done for other similarly functioning software.</p>"},{"location":"private-server.html#proxy-setup","title":"Proxy setup","text":"<p>Open Charles and you will be presented with an interface like this:</p> <p></p> <p>Press CTRL + SHIFT + L or Proxy &gt; SSL Proxying Settings and tick the Enable SSL Proxying box. After that, click Add, fill <code>*</code> for both Host and Port then press OK, after that untick the newly added box. In the end, the SSL Proxying Settings window should look like this:</p> <p></p> <p>Close that window, go to Proxy &gt; Proxy Settings and tweak it exactly like this image:</p> <p></p> <p>Navigate to the Windows tab and tick all checkboxes:</p> <p></p> <p>Close that window, and go to Help &gt; Local IP Addresses. It will look something like this:</p> <p></p> <p>Your local IP address will most likely be the first item in the list (in this case, since I am using Ethernet connection, it will be the first one.) Copy that IP address or memorize it. </p> <p>About local IP addresses</p> <p>This is your local IP address, meaning it can only be accessed by devices that are connected to the same network.</p> <p>You may now close that window and press CTRL + ALT + M or Tools &gt; Map Remote..., tick Enable Map Remote and press Add. Tweak it like this:</p> <p></p> <p>In the Map To section, the Host textbox needs to be your local IP address that you got from above, and the Port textbox is a 4 digit number that your server will be running on. Pick any numbers you want except for ports like 8888 or 8889 and memorize it along with your local IP address. Press OK. The map remote interface should look like this in the end:</p> <p></p> <p>You may now close that window. At this point, the proxy is now ready. </p>"},{"location":"private-server.html#server-software","title":"Server software","text":"<p>The server software directory will look like this:</p> <p></p> <p>Copy the config.example.py file into a file named config.py and open it with your favorite text editor. </p> <p>Most of the config properties should already be self-explanatory. Below is guide for a few important parts.</p> <p>Remember that local IP address and port that you memorized not long ago? Well enter it here:</p> <p></p> <p>HOST is your local IP address and PORT is the port you have choosen earlier.</p> <p>For GAME_API_PREFIX, this will differ depending on your Arcaea version. Refer to the table below.</p> Version Prefix 5.5.6 -&gt; 5.6.1 <code>/hanami/29</code> <p></p> <p>For ALLOW_APPVERSION, remove everything inside. You may add a version to the list (e.g. `5.6.1) if you want to restrict the server to (a) specific server.</p> <p></p> <p>For this part:</p> <p></p> <p>If you want to use link play functionality, the only variables you need to care about are LINKPLAY_HOST and LINKPLAY_AUTHENTICATION.</p> <ul> <li> <p>LINKPLAY_HOST needs to be the same as the IP address you have set in the HOST variable earlier unless the SET_LINKPLAY_SERVER_AS_SUB_PROCESS variable is set to <code>False</code>, at which you will need to specify a separate IP address for the link play server.</p> </li> <li> <p>For LINKPLAY_AUTHENTICATION, you can leave it as-is for use anything you want.</p> </li> </ul> <p>If you do not want to use link play functionality, the LINKPLAY_HOST variable needs to be an empty string.</p> <p>For SSL_CERT and SSL_KEY, if you want to have the server running under HTTPS, you may supply an SSL certificate here if you have one (.pem and .key file).</p> <p>Warning</p> <p>Running the server under HTTPS may cause issues with downloading packs/songs.</p> <p>Adjust the rest of the config file to your own likings. Save the file after finished.</p> <p>Now go to the <code>database</code> folder and it will look like this:</p> <p></p> <p>Run the <code>database_initialize.py</code> file to generate the database. Make sure you have installed all dependencies prior to running it in order for it to work. A file named <code>arcaea_database.db</code> will be created if successful. After that, do all of these:</p> <ul> <li> <p>Put the content bundle you have obtained above into the <code>bundle</code> folder. The actual bundle must have the <code>.cb</code> extension and the meta file must have the <code>.json</code> extension. Both must have the same filename (e.g. <code>5.6.0</code>).</p> </li> <li> <p>Put any songs you have into the <code>songs</code> folder. A song is a folder containing multiple .aff files (every difficulties of the song), base.jpg files (the jacket art), the song itself, the PV video for Terminal songs, and any additional files for that song.</p> </li> <li> <p>Make any adjustments you want to make.</p> </li> </ul> <p>At this point, the server software is now ready.</p>"},{"location":"private-server.html#on-device-setup","title":"On device setup","text":"<p>Note</p> <p>Your phone and your computer (the one that runs the server) MUST be connected to the same network for the server to work.</p> <p>iOS</p> <p>Open the Settings app, go to Wi-Fi settings, press the ! icon on the connected network, scroll down until you found the HTTP Proxy settings. In the Configure Proxy settings, select Manual and fill in the Server field which is your local IP address and the Port field which is 8888. Now press Save and (optionally) turn off and reconnect to your Wi-Fi network.</p> <p>Now on your computer, return to Charles and go to Help &gt; SSL Proxying &gt; Install Charles Root Certificate on a Mobile Device or Remote Browser. A window like this will show up:</p> <p></p> <p>Follow the steps listed in it to install the Charles certificate onto your device.</p> <p>Android</p> <p>Warning</p> <p>Android is finicky when it comes to proxy servers. Things may not work correctly or even at all.</p> <p>First and foremost, go back to Charles and go to Help &gt; SSL Proxying &gt; Save Charles Root Certificate... Save the .pem file somewhere. Rename the .pem extension to .crt. Now transfer this file to your Android device and install it to both categories.</p> <p>On Android, you will need to rely on a proxifier app such as VProxid or RProxid (requires root). You need to connect through the SOCKS5 proxy server.</p> <p>After installing either of the proxifier app, open it and press the + icon, for Server IP, enter your local IP address; for Server Port, enter 8889. Scroll down a little bit and press Click to select application(s) then tick Arcaea. Now return and press the play button to start the VPN. Wait until it shows all good.</p> <p>Now your device is ready to connect to the private server!</p> <p>Note</p> <p>Disable the proxy when you have finished playing to prevent connectivity issues. The proxy will need to be re-enabled everytime you want to use the server. A dedicated 24/7 server such as a Raspberry Pi, a spare phone/computer with working shell, or a cloud server (VPS) is recommended for always-on server hosting.</p>"},{"location":"private-server.html#playing","title":"Playing","text":"<p>Return to the root directory of your server and run the <code>run.bat</code> file. It may take a while to start depending on the amount of songs you added. If the server console shows this:</p> <p></p> <p>Congratulations! Your server is now up and running! Now all that left is open Arcaea and play!</p> <p>If you see something like this, it means the server is working as intended.</p> <p></p> <p>At this point, you are basically done! Enjoy your new server!</p>"},{"location":"private-server.html#fixes-for-notable-issues","title":"Fixes for notable issues","text":"<p>The game kept prompting to update a pack despite having already downloaded it.</p> <p>-&gt; Check the songs folder to see if they are named correctly and that all files (plus PV videos and audios if exists) are inside.</p> <p>Cannot download any songs.</p> <p>-&gt; Make sure the server is running under HTTP connection. For iOS, you may need to edit the <code>Info.plist</code> file using a plist editor to allow HTTP connection without a jailbreak by setting <code>NSAllowsArbitraryLoads</code> property to <code>true</code>.</p> <p></p> <p>Nothing works, even logging in.</p> <p>-&gt; Check if the <code>GAME_API_PREFIX</code> variable in the <code>config.py</code> file is set correctly. If that did not work, make sure you have set up the proxy correctly (refer to the Proxy setup and On device proxy setup section.)</p>"}]}