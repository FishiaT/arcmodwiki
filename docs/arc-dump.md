# Obtaining Arcaea APK/IPA

Before proceeding with modding Arcaea, its APK/IPA file must be dumped from your device. Depending on your operating system, the procedure will be different.

## iOS

!!! warning "Before starting"
    Either [TrollStore](https://ios.cfw.guide/installing-trollstore/) or a [jailbroken](https://ios.cfw.guide/get-started) device is **required**. As a result, you will not be able to perform anything listed in here if you are using any devices that were updated to iOS 16.6.1 or newer and is not checkm8-vulnerable.

Before proceeding, make sure you have Arcaea installed and have opened at least once.

### Using TrollDecrypt

!!! tip "Info"
    The recommended method. Works for all versions that are supported by TrollStore.

Install [TrollDecrypt](https://github.com/donato-fiore/TrollDecrypt/releases/) onto your device using TrollStore, then open it. All apps that can be decrypted will be listed, select Arcaea and choose **Yes** when prompted. The decryption process will take a while. When it finishes, the resulting IPA will be available form within the app, copy it to your PC and you are done!

### Using DumpDecrypter

!!! tip "Info"
    An alternative to TrollDecrypt for devices that is not supported by TrollStore. **May not work with rootless jailbreaks (e.g. Dopamine, palera1n)**.

Open Sileo or any package managers that you like, add this repository: `https://repo.tuandb.name.vn`. After that, install **DumpDecrypter** from it.

Open **DumpDecrypter**, switch to the **Settings** tab and enable all available options. Then return to the **AppList** tab and select Arcaea, press **Continue** when prompted and wait for the decryption process to complete. Arcaea will automatically open and then close shortly after. When it finishes, press **Go to Filza to view** (Filza must be installed from the BigBoss repository beforehand) then copy the resulting IPA to your PC and you are done!

## Android

!!! tip "Info"
    Requires ADB (Android Debug Bridge) and appropriate ADB/USB drivers for your phone (not required on Linux, Windows 10 or newer will most likely do this automatically for you) installed which is included in the Android SDK by default. If you do not want to install the entire platform SDK, consider installing [this](https://github.com/K3V1991/ADB-and-FastbootPlusPlus/releases).

### Dumping split APKs

Open Command Prompt or your favorite Terminal Emulator, then with your phone connected to your PC via USB, run `adb shell pm path moe.low.arc` to fetch all paths to Arcaea APKs, it should look like this:

![image](https://gist.github.com/assets/74685931/aa2662ea-709b-466a-ac59-6ec8b8d10c9e)

This is called [split APKs](https://developer.android.com/studio/build/configure-apk-splits), a new simplified APK format that split an APK file to multiple smaller APKs (e.g. one APK containing the base data, one containing the actual code, one containing assets and so on...). Normally, this format will help for more efficient application installation from Google Play due to not requiring to download a huge APK file; however, this will make it hard to mod Arcaea, so we must merge them into a normal APK file before proceeding.

Copy the path of *each* APK files, and run `adb pull <path to apk>`. Repeat this for the other APKs too.

### Merging the APKs

!!! tip "Info"
    A tool called [SAP](https://drive.google.com/file/d/1UnKr1SnX14RL_e9IpcpQhA6AnYwB0fjL/view) (Split APKs Package) will be used for this purpose. You may also be able to use any other similar functioning tools as well.

Download and open SAP, you will be presented with an interface like this:

![image](https://gist.github.com/assets/74685931/8834735c-08b4-4823-9b9b-027663fd4a19)

Place all of your split APKs into a folder, then click onto **Directory** and select that folder. If however you have a XAPK file instead, click on **Archive** and select that XAPK file.

Make sure to tick the **Sign** checkbox, then click **Start** and wait as this may take a while.

