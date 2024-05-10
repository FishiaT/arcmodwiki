# Reverse Engineering Arcaea

!!! danger
    This page is still in the process of being finished. There may be unfinished or incorrect information.

!!! note "Before starting"
    Make sure to have a copy of Arcaea APK/IPA file ready. For IPA file, make sure its decrypted as otherwise you will run into issues. Additionally, you will need a disassembler with support for ELF/Mach-O arm64 executable as well as pseudo-code decompilation for such architectures. IDA Pro is used here. The version used here is iOS 5.6.1.

!!! tip
    To modify instructions, you will need to overwrite it hex address. Use [armconverter](https://armconverter.com/) to convert ARM instructions to hex address and vice-versa.

    The hex address for `NOP` instruction is `1F 20 03 D5`.

## Removing lock icon
!!! tip "Info"
    This will remove the lock icon on locked packs. *This, however, will not make the packs themselves playable.*

Press **SHIFT + F12**, wait for the string list to be generated, then search for `lock_icon`. xref (cross-reference) it, then press **F5**, **TAB** or **View > Open subviews > Generate pseudocode** to decompile it. It should look like this:

![image](https://gist.github.com/assets/74685931/1f205a10-54e4-4079-bfd8-2405ed956cde)

Focus on this part, highlight `v82`, then xref it.

![image](https://gist.github.com/assets/74685931/444eda57-f364-49ad-b68b-39cb6cf1794e)

Make sure you xref the first entry.

![image](https://gist.github.com/assets/74685931/6195fd7b-0409-409a-9ba6-b349387ef704)

Highlight this function call, and double click onto it.

![image](https://gist.github.com/assets/74685931/6965fac8-79f7-4774-a1d1-b2c7e90b0d8f)

Modify the highlighted parts, change it to 1.

![image](https://gist.github.com/assets/74685931/af0a0878-7ef4-42bc-a314-9cd1b2e9a6b4)

![image](https://gist.github.com/assets/74685931/e8b52d18-6ff5-4adc-814c-3f7bb9c65fb6)

## Removing beyond lock
!!! tip "Info"
    This will remove limits for Beyond (BYD) difficulty.

Make sure you are in the **IDA View** sub-window. Press **ALT + T** or **Search > Text**, search for `dl_`, tick **Find all occurrences** then search. Wait for it to complete. It will look like this:

![image](https://gist.github.com/assets/74685931/21c932eb-8a8d-4a37-bf83-36752290ff42)

Click onto the first entry on the list, you will see this sturcture. Scroll down a little bit and edit the `CMP` instruction. Change `#3` to `#0x2F`.

![image](https://gist.github.com/assets/74685931/58f47444-08e8-4d20-a0a4-cbfb49fcea61)

Press **SHIFT + F12**, then **ALT + T** or **Search > Search**, search for `world_unlock`. *Make sure it is `world_unlock`, not `world_unlocks`.* Xref it and pick the one with the highest address (in this case its the final one.)

![image](https://gist.github.com/assets/74685931/d724b1bb-6518-4508-92c5-8e90b99eb158)

Continue scrolling down a little bit, then repeat the same step to this `CMP` instruction.

![image](https://gist.github.com/assets/74685931/7bdce282-f01f-465c-8e8d-fc95700394e5)

Return to the **Strings** sub-window and search for `You no longer have enough Fragments`

![image](https://gist.github.com/assets/74685931/f54e86b0-db06-4aa2-975c-ece7d1ba3415)

Xref it, scroll up a little bit until you see this and repeat the same steps as before.

![image](https://gist.github.com/assets/74685931/02ea02c0-d4af-4079-9038-c6e6fb409fba)

Return to the **Strings** sub-window and search for `layouts/songselect/start.png`, then xref it. Repeat the same step as before.

![image](https://gist.github.com/assets/74685931/f1557102-da0b-482a-8205-2ebf6d03bc9a)

## Patching scenecontrol (6 lanes/filters/etc.)
!!! tip "Info"
    Make special effects in charts like those in Final Verdict to work properly.

Make sure you are in the **IDA View** sub-window. Press **ALT + I** or **Search > Immediate value**, enter `264`, tick **Find all occurrences** then search. Wait for it to complete. It will look like this, click on **Insturction**:

![image](https://gist.github.com/assets/74685931/ae7987e0-45cf-451b-a449-5431377c38f8)

Scroll up/down to find `LDRB` entries:

![image](https://gist.github.com/assets/74685931/0cbef270-c6e3-45b1-8cda-7dd1ba0d6076)

Look into every single entries until you see any that has a `CBZ` instruction following or behind. The `CBZ` instruction should be NOP'ed. Do this to all entries. While doing so, press **TAB**, **F5** or **View > Open subviews > Generate pseudo-code** until you find one with this sturcture (there is only one entry like this so once you have managed to find it you do not need to do this anymore.)

![image](https://gist.github.com/assets/74685931/0555962d-f3a9-4b25-8a5a-298e374a353f)

In this part change `2` to `4` (image already modified this part).

![image](https://gist.github.com/assets/74685931/f0877163-b61a-4cd5-81eb-aa407b945384)

## Patching world mode songs
!!! tip "Info"
    Allow playing world mode songs.

Press **SHIFT + F12**, search for `This song is available by progressing through World Mode.`. Xref the second one. Then press **F5**, **TAB** or **View > Open sub-views > Generate pseudo-code**. You will see something like this:

![image](https://gist.github.com/assets/74685931/f2b67785-f157-4729-86ec-b8ecee363d48)

Double click onto this function:

![image](https://gist.github.com/assets/74685931/8a500e27-88cd-488b-bdca-804dd8339089)

After that, modify all return statement to return `1LL`.










