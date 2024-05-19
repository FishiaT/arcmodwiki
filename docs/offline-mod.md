# Reverse Engineering Arcaea

!!! danger "Before starting"
    This page is being in development. There will be no precise ETAs on the completion date.

    This guide is **NOT** beginner-friendly and you will have to figure out a lot of things yourself. Only proceed if you know what you are doing.

!!! note
    I am using version 4.5.0c (arm32) for android and version 5.2.0 (arm64) for iOS in this tutorial.

## Removing hash verification
!!! tip "Info"
    Allows making changes to the game files. **Only for pre-5.4.0 and Chinese versions.**

In the **Strings** sub-window, press **ALT + T** and search for `songs/songlist` until you found this:

![image](https://gist.github.com/assets/89432931/67968339-082f-4b27-81a9-4984a7afdeee)

Double-click, **X** to xref the highlighted text.

![image](https://gist.github.com/assets/89432931/45ff3678-8796-43dd-8483-f1be68d02958)

Choose the **second** xref (both for Android and iOS) and double-click.

![image](https://gist.github.com/assets/89432931/92a4071f-a984-4b1f-bffc-5264633899d1)

Press **F5** to open the **Pseudocode** sub-window. Scroll down until you see the first `goto LABEL_x` (for iOS) or `exit(0);`  (for Android) like this:

| Android | iOS |
| :-------: | :---: |
| ![image](https://gist.github.com/assets/89432931/db72f619-5723-4b89-b4a2-9d407b741d19) | ![image](https://gist.github.com/assets/89432931/702ac86a-6196-4613-9143-ad62274d51de) |

### Android

After that, press **Tab** to switch to **IDA-View**. As you can see in **Android**, it have 3 CBNZs. **Ctrl + Alt + K** to open the Keypatcher. Type `nop` and press Enter.

| Before | After |
| :----: | :---: |
| ![image](https://gist.github.com/assets/89432931/86ad8424-eba0-4ae2-adaf-d0a8e824ba99) | ![image](https://gist.github.com/assets/89432931/6921707b-4e55-49e5-8097-dfc3e3c459fb) |

Patch the other 2 and you're good to go.

### IOS

Unlike Android, iOS have a total of **9** opcodes (6 `B.NE` and 3 `CBNZ`). Press **Tab** to switch to **IDA-View**. Open the Keypatcher (**Ctrl + Alt + K**), type `nop` and press Enter. Do the same thing with the rest. You'll need to xref 8 other ones because it's hard to see.

![image](https://gist.github.com/assets/89432931/1c324934-30b6-4799-8e76-d71974501c1a)

| Before | After |
| :----: | :---: |
| ![image](https://gist.github.com/assets/89432931/a6a335d6-238d-4105-a0a4-6c164c6a9ce8) | ![image](https://gist.github.com/assets/89432931/b1fb0871-72e8-47d2-b0ba-88dc0c938421) |

Apply the patches (**Edit > Patch program > Apply patches to input file...**) and you're done.

## Removing lock icon
!!! tip "Info"
    Remove the lock icon on locked packs. Purely for aesthetic purposes.

In the **Strings** sub-window, search for `lock_icon`, xref, **F5** to open the **Pseudocode** sub-window and scroll up until you found this: 

| Android | iOS |
| :-------: | :---: |
| ![image](https://gist.github.com/assets/89432931/0ba1b62c-4428-4d18-90e0-4018aec1ba3f) | ![image](https://gist.github.com/assets/89432931/14127bb7-770a-47e1-b0a2-8783789b6214) |

Double-click to go to the highlighted address, click the first line in **Pseudocode** sub-window, press **Tab** to move to **IDA-View**, switch to **Hex View** and press **F2** to edit.

### Android
For Android, type `01 20 70 47` (no spacing) (which is MOV R0, #1 and BX LR).

| Before | After |
| :----: | :---: |
| ![image](https://gist.github.com/assets/89432931/81419fd6-64fb-4ef4-82b2-ca590c3accdc) | ![image](https://gist.github.com/assets/89432931/ed05346b-e81d-4529-85fe-2486f836b666) |

### IOS
For iOS, type `20 00 80 52 C0 03 5F D6` (no spacing) (which is MOV W0, #1 and RET).

| Before | After |
| :----: | :---: |
| ![image](https://gist.github.com/assets/89432931/e5817858-09f1-4eb3-9d0c-6b448b9f0cb6) | ![image](https://gist.github.com/assets/89432931/f5af100c-2f48-42cf-84e3-cdff28790890) |

Once you're done, press **F2** again to save it.

## Removing beyond restrictions
!!! tip "Info"
    Allows playing Beyond (BYD) difficulty on charts that have it.

### Android

#### Remove network required for playing beyond

Go to **Strings** sub-window, **Alt + T** to search for `You no longer` string, double-click, xref the string, scroll up until you find the `SUBS` opcode like this in the image:

![image](https://gist.github.com/assets/89432931/597c718e-70c2-41a3-bf75-2e0b4bc7909f)

Open the Keypatcher (**Ctrl + Alt + K**), modify the `#3` to `#5` and press Enter.

![image](https://gist.github.com/assets/89432931/14a7949c-b869-4554-819d-fe2fbf88546d)

#### Display Beyond difficulty

Go to **Strings** sub-window, **Alt + T** to search for `songs/songlist` string, double-click, xref the first string, press **Alt + T** and type `temp` until you found this:

![image](https://gist.github.com/assets/89432931/7ae548ee-ec8b-474f-8530-f6a167fa0f97)

Click the `CMP` opcode and open the Keypatcher, modify the `#3` to `#5` and press Enter.

![image](https://gist.github.com/assets/89432931/843dd85f-d80f-40d0-ba50-9967d6ef4b38)

#### Display the Start button

Go to **Strings** sub-window, **Alt + T** to search for `start.png` string, double-click, xref the string and find the `SUBS` opcode like this in the image:

![image](https://gist.github.com/assets/89432931/c72041df-d0fe-4350-9842-2af4797352e8)

Click the `SUBS` opcode and open the Keypatcher, modify the `#3` to `#5` and press Enter.

![image](https://gist.github.com/assets/89432931/dba634d9-b632-43c3-a2f5-af978b022269)

#### Scan 3.aff in the apk

Go to **Strings** sub-window, **Alt + T** to search for `songs/songlist` string, scroll up a bit to find the `dl_` string, xref the string until you found like this:

![image](https://gist.github.com/assets/89432931/bbe1605f-3132-4ce2-b012-c03db1f532a3)

Click the `CMP` opcode and open the Keypatcher, modify the `#3` to `#5` and press Enter.

![image](https://gist.github.com/assets/89432931/a5a44a42-55bb-48bb-ac01-4e831ae71d40)

And you're done with Android!

### IOS

#### Remove network required for playing beyond

Go to **Strings** sub-window, **Alt + T** to search for `You no longer` string, double-click, xref the string, scroll up until you find the `CMP` opcode like this in the image:

![image](https://gist.github.com/assets/89432931/660285b2-30a7-42e1-a8cf-8b7c608dadbe)

Open the Keypatcher (**Ctrl + Alt + K**), modify the `#3` to `#5` and press Enter.

![image](https://gist.github.com/assets/89432931/59ab8bfb-ea32-4510-90c6-52ec8f85790f)

#### Display Beyond difficulty

Go to **Strings** sub-window, **Alt + T** to search for `songs/songlist` string, double-click, xref the second string, press **Alt + T** and type `temp` until you found this:

![image](https://gist.github.com/assets/89432931/6ef0fdfd-9b4f-4e64-a004-fa65780c4bd1)

Click the `CMP` opcode and open the Keypatcher, modify the `#3` to `#5` and press Enter.

![image](https://gist.github.com/assets/89432931/5e1fd0f6-6807-443b-abfb-e8102c6e755d)

#### Display the Start button

Go to **Strings** sub-window, **Alt + T** to search for `start.png` string, double-click, xref the string and find the `CMP` opcode like this in the image:

![image](https://gist.github.com/assets/89432931/18ad6106-ee6e-4fa8-860f-7dab8f3b16d2)

Click the `SUBS` opcode and open the Keypatcher, modify the `#3` to `#5` and press Enter.

![image](https://gist.github.com/assets/89432931/c70db255-e779-4661-9afa-7c84a365f7e5)

#### Scan 3.aff in the apk

Go to **Strings** sub-window, **Alt + T** to search for `base.ogg` string, scroll up a bit to find the `dl_` string, xref the string until you found like this:

![image](https://gist.github.com/assets/89432931/a8d5d276-14e2-4822-9ca2-58a322829f39)

Click the `CMP` opcode and open the Keypatcher, modify the `#3` to `#5` and press Enter.

![image](https://gist.github.com/assets/89432931/101b1817-55bd-485e-9eb6-234937c4995b)

And you're done with iOS!

## Patching scenecontrol
!!! tip "Info"
    Only if you want to experience the nearly everything that the game mechanics has to offer.

### Android

In the **Strings** sub-window, search for `9821191`, xref, **F5** to open the **Pseudocode** sub-window and scroll down until you found this:

![image](https://gist.github.com/assets/89432931/c9bac766-1335-4846-9a06-64aa5d5654a8)

#### ArcNote (Still wondering what does it do)

Double-click the highlighted address, **Alt + T** and search `148`. **Tab** to switch to **IDA-View** and see something like this:

| Pseudocode | IDA-View |
| :--------: | :------: |
| ![image](https://gist.github.com/assets/89432931/81709ea8-eb45-4fca-8b71-5a54895527e6) | ![image](https://gist.github.com/assets/89432931/f5e0cf9a-5822-47f4-8f9e-81124a98491b) |

Click on the `LDRB.W` opcode, open the Keypatcher and type `nop.w`. Do the same thing with `CBZ` opcode but use `nop`.

![image](https://gist.github.com/assets/89432931/87d668cb-f768-431b-b011-71086f25206f)

#### Camera

Switch to **Pseudocode** view, **Ctrl + T** to search the next value `148`. **Tab** to switch to **IDA-View** and see something like this:

| Pseudocode | IDA-View |
| :--------: | :------: |
| ![image](https://gist.github.com/assets/89432931/e4e5cb96-e306-48b7-9d71-581a3d0578fd) | ![image](https://gist.github.com/assets/89432931/91f54a48-7493-46d8-a8d8-c8f32e0ca85c) |

Click on the first `LDRB.W` opcode, open the Keypatcher and type `nop.w`. Do the same thing with `BEQ.W` opcode.

![image](https://gist.github.com/assets/89432931/ff6c7f01-f39c-4e2a-9450-1abdd6d1aacb)

#### Scenecontrol

Switch to **Pseudocode** view, **Ctrl + T** to search the next value `148`. **Tab** to switch to **IDA-View** and see something like this:

| Pseudocode | IDA-View |
| :--------: | :------: |
| ![image](https://gist.github.com/assets/89432931/8d105bbf-24d6-492e-b162-bbd5b4743532) | ![image](https://gist.github.com/assets/89432931/c399a24a-68ce-4cdf-89f1-0f55de8dbfd6) |

Click on the `LDRB.W` opcode, open the Keypatcher and type `nop.w`. Do the same thing with `CBNZ` opcode but use `nop`.

![image](https://gist.github.com/assets/89432931/b99ce389-a7ec-44ad-a0e3-f607531fdf61)

#### Arcahv string check

While at the [Scenecontrol](#scenecontrol) in **Pseudocode** view, scroll down until you see this:

![image](https://gist.github.com/assets/89432931/a052fdcf-b01b-4848-9c6f-fc7b4399f96d)

Switch to **IDA-View**, use the Keypatcher and `nop.w` the `BEQ.W` opcode.

| Before | After |
| :----: | :---: |
| ![image](https://gist.github.com/assets/89432931/67e7bfc5-bfa5-4976-b780-83bd8232431c) | ![image](https://gist.github.com/assets/89432931/87902f3b-89cd-461f-bb65-1732168057d3) |

#### Green arc

Switch to **Pseudocode** view, scroll down until you found this:

![image](https://gist.github.com/assets/89432931/f7e5d77c-9c8d-4dec-994b-ca8883c3f8bc)

Double-click the highlighted address, switch to **IDA-View**. Click on `LDRB.W` opcode, use the Keypatcher and `nop.w` it. After that, use the Keypatcher again to modify the `#2` to `#10` or any number higher than 3 (3 is white arc but they haven't used it. Not the wide skynote in HIVEMIND -INTERLINKED- ). Do the same thing with the second `#2`.

| Before | After |
| :----: | :---: |
| ![image](https://gist.github.com/assets/89432931/217b6b99-31de-4723-bf88-3a31399e38c4) | ![image](https://gist.github.com/assets/89432931/37151755-40de-4d37-8c0d-22e3847e4c55) |

#### The Switch (this will be used for others as well)

I literally don't know why lowiro do this but ok

In the **Strings** sub-window, press **ALT + T** and search for `gameend`, double-click, xref and scroll up until you found this:

![image](https://gist.github.com/assets/89432931/7388c9fb-6cba-4ea2-8ffd-c51a5eadb987)

Double-click the highlighted address, switch to **Hex View**, **F2** to edit and type `4F F0 01` (no spacing) then save it. It should be like this after editing:

**Hex View**

| Before | After |
| :----: | :---: |
| ![image](https://gist.github.com/assets/89432931/7debb590-e15c-4835-ac20-73eb515fd305) | ![image](https://gist.github.com/assets/89432931/a7d3d24a-5354-4e7e-9b1d-0217a7e306af) |

**IDA-View**

| Before | After |
| :----: | :---: |
| ![image](https://gist.github.com/assets/89432931/5f0b8fee-1c02-41b1-8e89-603e17a71f31) | ![image](https://gist.github.com/assets/89432931/3b6babd9-7c56-420f-9810-0b6ff7a12e9f) |

#### Remove Skynote and Arc restrictions (over y2.1)

!!! note "Not recommended having this one modded because it'll mess up a part in Singularity VVVIP. [See here](https://youtu.be/3SBjWP2JEXc?t=93)."

##### Skynote

Xref [The Switch](#the-switch-this-will-be-used-for-others-as-well), switch to **IDA-View** and scroll up a bit until you found this: 

![image](https://gist.github.com/assets/89432931/e05d6b64-98ba-4626-b1c0-9126f2ed4f39)

Use the Keypatcher and `nop.w` it.

![image](https://gist.github.com/assets/89432931/a130119d-a642-4290-a3c9-43deaa58d335)

##### Arc

In the **Pseudocode** view, scroll up, xref [The Skynote](#Skynote) first address, scroll up again, xref the first address, switch to **IDA-View**, AND scroll down until you see this: 

![image](https://gist.github.com/assets/89432931/25999e38-23f4-43c8-8fee-e41178db2a25)

Click the 550.0, switch to **Hex View**, click the value `80`, press **F2** to edit and type `ef6749` then save it. It should be like this after editing:

**Hex View**

| Before | After |
| :----: | :---: |
| ![image](https://gist.github.com/assets/89432931/25999e38-23f4-43c8-8fee-e41178db2a25) | ![image](https://gist.github.com/assets/89432931/3f585cf1-2985-4744-8d2f-b44c2413fb93) |

**IDA-View** (You'll need to press **F5** again to see the magic)

| Before | After |
| :----: | :---: |
| ![image](https://gist.github.com/assets/89432931/ac43c89b-cbb6-438b-ab18-b3c05f2193d8) | ![image](https://gist.github.com/assets/89432931/338d2c24-1dcf-4c18-bfc7-7b2132c705d5) |

And there we go! Android is done.

### IOS

In the **Strings** sub-window, search for `9821191`, xref, **F5** to open the **Pseudocode** sub-window and scroll down until you found this:

![image](https://gist.github.com/assets/89432931/b985370c-a4ef-477d-8373-7183586a73d6)

#### ArcNote (Still wondering what does it do)

Double-click the highlighted address, **Alt + T** and search `264`. **Tab** to switch to **IDA-View** and see something like this:

| Pseudocode | IDA-View |
| :--------: | :------: |
| ![image](https://gist.github.com/assets/89432931/d3dda488-9e02-47d4-9b3a-f61ba08e4fa2) | ![image](https://gist.github.com/assets/89432931/fc6ae373-60e7-408f-a0c0-1d5e0fafc282) |

Click on the `LDRB` opcode, open the Keypatcher and type `nop`. Do the same thing with `CBZ`.

![image](https://gist.github.com/assets/89432931/e69f11c8-eec8-48a1-b7c2-c8566ad32403)

#### Camera

Switch to **Pseudocode** view, **Ctrl + T** to search the next value `264`. **Tab** to switch to **IDA-View** and see something like this:

| Pseudocode | IDA-View |
| :--------: | :------: |
| ![image](https://gist.github.com/assets/89432931/0b1617a1-43da-43f4-ac72-4f92fb027f50) | ![image](https://gist.github.com/assets/89432931/2e042762-200c-42a9-a375-60bcb356227c) |

Click on the first `LDRB` opcode, open the Keypatcher and type `nop`. Do the same thing with `BEQ` opcode.

![image](https://gist.github.com/assets/89432931/33157390-781c-4a7a-ad51-cede534750d3)

#### Scenecontrol

Switch to **Pseudocode** view, **Ctrl + T** to search the next value `264`. **Tab** to switch to **IDA-View** and see something like this:

| Pseudocode | IDA-View |
| :--------: | :------: |
| ![image](https://gist.github.com/assets/89432931/4b2e7aa5-64eb-4bc9-b1ba-0fa42374d5af) | ![image](https://gist.github.com/assets/89432931/457dc1ff-3448-4d88-b07b-38baa21c06b5) |

Click on the `LDRB` opcode, open the Keypatcher and type `nop`. Do the same thing with `CBNZ` opcode.

![image](https://gist.github.com/assets/89432931/d992f4ab-836d-44a2-9b6e-2a44821a4d94)

#### Arcahv string check

lowiro removed this in iOS and Android arm64 so let's ignore.

#### Green arc

Switch to **Pseudocode** view, scroll down until you found this:

![image](https://gist.github.com/assets/89432931/9917fb8d-ca9b-4479-9202-e4b53d9c3493)

Double-click the highlighted address, switch to **IDA-View**. Click on `LDRB` opcode that have `#0x108`, use the Keypatcher and `nop` it. After that, modify the first `CMP` opcode to `#32`. After that, patch `CINC W1, W8, NE` opcode to `CINC W1, W1, NE` opcode.

| Before | After |
| :----: | :---: |
| ![image](https://gist.github.com/assets/89432931/482d8606-4bb7-4110-ab07-4a70b6923993) | ![image](https://gist.github.com/assets/89432931/2208c0a6-a42a-4648-b1a8-152d94845ea6) |

#### The Switch (this will be used for others as well)

I literally don't know why lowiro do this but ok

In the **Strings** sub-window, press **ALT + T** and search for `gameend`, double-click, xref and scroll up until you found this:

![image](https://gist.github.com/assets/89432931/7864e697-2464-4185-85a7-d673be5f48af)

Double-click the highlighted address, switch to **Hex View**, **F2** to edit and type `20 00 80 52` (no spacing) then save it. It should be like this after editing:

**Hex View**

| Before | After |
| :----: | :---: |
| ![image](https://gist.github.com/assets/89432931/eba00ee0-d1f6-4ee2-8611-b726b436b881) | ![image](https://gist.github.com/assets/89432931/d3f2e7f1-045f-4145-b805-20a69835fd2c) |

**IDA-View**

| Before | After |
| :----: | :---: |
![image](https://gist.github.com/assets/89432931/c529bbdf-1298-4ae5-91ac-b77ab61ebfbd) | ![image](https://gist.github.com/assets/89432931/7a59ca02-09a1-411c-aef3-8be4a627b246) |

#### Remove Skynote and Arc restrictions (over y2.1)

!!! note "Not recommended having this one modded because it'll mess up a part in Singularity VVVIP. [See here](https://youtu.be/3SBjWP2JEXc?t=93)."

##### Skynote

Xref [The Switch](#the-switch-this-will-be-used-for-others-as-well-1), switch to **IDA-View** and scroll up a bit until you found this: 

![image](https://gist.github.com/assets/89432931/3a5663d3-013f-4d0e-b45f-3a0ac1ea70c3)

Use the Keypatcher to `nop` for the `FMOV` and `TBZ W20` opcode.

![image](https://gist.github.com/assets/89432931/ace5bcea-9840-4218-b45e-4b9dd2f0bb81)

##### Arc

In the **Pseudocode** view, scroll up, xref [The Skynote](#Skynote-1) first address, scroll up again, xref the first address, switch to **IDA-View**, AND scroll up until you see this: 

![image](https://gist.github.com/assets/89432931/77e6a6e9-c680-4c24-96a7-e04ce5a6d33f)

Click the `ADRP`, switch to **Hex View**, click the second hex byte value, press **F2** to edit change a digit then save it (it varies in each version of the game). It should be like this after editing:

**Hex View**

| Before | After |
| :----: | :---: |
| ![image](https://gist.github.com/assets/89432931/2ef5d319-9a46-4ba8-bf52-fdf9079a53e4) | ![image](https://gist.github.com/assets/89432931/ea5bdfdc-d94e-4be7-a48b-27cf42064c17) |

**IDA-View**

| Before | After |
| :----: | :---: |
| ![image](https://gist.github.com/assets/89432931/bbb5c053-c61f-4341-9a00-565d95ce0161) | ![image](https://gist.github.com/assets/89432931/24fe57e0-4dcc-40e7-935f-0ebd04fb3e30) |

And there we go! iOS is done.

## Removing world mode restrictions
!!! tip "Info"
    Unlocks all world mode charts (even byds as well i think because it counts as a world song but it just the visual, you'll need to mod the other 3 to make it playable offline).

### Android

In the **Strings** sub-window, search for `this song is`, xref the second one, **F5** to open the **Pseudocode** sub-window and scroll up until you found this:

| Xref | Pseudocode |
| :--: | :--------: |
| ![image](https://gist.github.com/assets/89432931/ba857ad8-e9c1-4163-996c-b777d9b6e145) | ![image](https://gist.github.com/assets/89432931/079850a9-3d56-4906-94ae-ccfe4fb5efc0) |

Double-click to go to the highlighted address, click the first line in **Pseudocode** sub-window, press **Tab** to move to **IDA-View**, switch to **Hex View**, press **F2** and type `01 20 70 47` (no spacing) (which is MOV R0, #1 and BX LR).

**IDA-View**

| Before | After |
| :----: | :---: |
| ![image](https://gist.github.com/assets/89432931/7e2eedf7-ba5e-465a-b0f1-e03c6961c433) | ![image](https://gist.github.com/assets/89432931/8f1274b2-600d-4bc8-a400-996c0b56e190) |

**Hex View**

| Before | After |
| :----: | :---: |
| ![image](https://gist.github.com/assets/89432931/e7ca2213-2f01-44ab-b028-7b6b24c77e84) | ![image](https://gist.github.com/assets/89432931/dbf36af9-eb54-45d0-a94f-bc49172a8144) |

### IOS

In the **Strings** sub-window, search for `this song is`, xref the first one, **F5** to open the **Pseudocode** sub-window and scroll up until you found this:

| Xref | Pseudocode |
| :--: | :--------: |
| ![image](https://gist.github.com/assets/89432931/8ecbf6f2-9feb-4a55-a226-1380e9506694) | ![image](https://gist.github.com/assets/89432931/260ccebd-2179-4735-881d-a95912e05685) |

Double-click to go to the highlighted address, click the first line in **Pseudocode** sub-window, press **Tab** to move to **IDA-View**, switch to **Hex View**, press **F2** and type `20 00 80 52 C0 03 5F D6` (no spacing) (which is MOV W0, #1 and RET).

**IDA-View**

| Before | After |
| :----: | :---: |
| ![image](https://gist.github.com/assets/89432931/8e88fa24-0cdf-4793-8808-5a2c5eba6f2b) | ![image](https://gist.github.com/assets/89432931/fa1c0cfe-2ffa-454b-bd54-17feba6a02af) |

**Hex View**

| Before | After |
| :----: | :---: |
| ![image](https://gist.github.com/assets/89432931/f5c1e7d8-94c5-4c37-959a-8dc5647be062) | ![image](https://gist.github.com/assets/89432931/c425dc4a-06e7-47bf-850c-737e97ca06e2) |

Once you're done, press **F2** again to save it.

!!! success "All done!"
    And there you have it. Good luck modding. Post-5.4.0 will be written sooner or later.