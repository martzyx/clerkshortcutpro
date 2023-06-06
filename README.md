# Shortcuts for my.clerk.io UI

This user-friendly extension facilitates interaction with the my.clerk.io user interface by enabling keyboard shortcuts and workflow automation. It is designed to enhance your efficiency and make navigation smoother. The following keyboard shortcuts are currently available:

- Confirm and Proceed (default key is 'Enter')
- Cancel and Return (default key is 'Escape')

The following workflow automation is available:
- Delete standard search designs

## Installation

**If using chrome:**
1. Open Chrome: Start Google Chrome. In the top-right corner of the browser, click on the three vertical dots to open the main menu.

2. Navigate to Extensions: In the dropdown menu, select More Tools > Extensions. This will open a new tab that shows all your installed extensions.

3. Enable Developer Mode: On the Extensions page, look for a toggle switch at the top-right corner labeled Developer Mode. If it's not already enabled, click on the toggle to enable it.

4. Load Unpacked Extension: Click on the Load unpacked button which will appear after you have enabled Developer Mode. This will open a file dialogue box.

5. Select the chrome Extension Folder: In the file dialogue box, navigate to the location where you installed this repo. Select the folder "chrome" and click Open or Select Folder.

6. Verify the Extension: Your extension should now be listed among your other installed extensions. You should see its name, version, and a few options to manage it. Check if the extension icon appears in your Chrome extensions.


**If using firefox:**
Add the extension from the add-on store: https://addons.mozilla.org/en-US/firefox/addon/clerkshortcutpro/

~~1. In Firefox, click on the menu button (three horizontal lines) located in the top-right corner of the browser window.~~
~~2. From the menu, select Add-ons. This will open the Firefox Add-ons Manager.~~
~~3. In the Add-ons Manager, click on the gear icon (⚙) located in the top-right corner of the page.~~
~~4. From the dropdown menu, choose Install Add-on From File.~~
~~5. Navigate to the location where you downloaded the firefox-clerkshortcutpro-x.x.x.xpi file. Select the file and click on the Open button.~~
~~6. The Clerk Shortcut Pro extension is now ready to use. You may need to restart Firefox for the extension to take effect.~~



## How to Customize options and keybinds (Chrome only)

You can customize the keyboard shortcuts according to your preference by following these steps:

Open the Clerk.io extension options by clicking on the extension icon in your browser toolbar.

In the options page, you will find the settings for the keyboard shortcuts.

Enable or disable the desired shortcuts by toggling the corresponding checkboxes.

To change the default keyboard shortcuts, click on the input field for the shortcut you want to modify and press the desired key. The input field will be automatically updated with the selected key.

To enable/disable the Delete Search Designs button, click on the checkbox.

Click the "Save Settings" button to save your changes.

Remember, this extension is meant to enhance your navigation and user experience within the my.clerk.io interface. I hope you find them useful and time-saving.

## Usage of Delete Search Designs (Only Chrome)

Head over to the options section of the extension > enable the delete button for search designs.
Now, whenever you are on my.clerk.io > search designs, refresh the page, and you should see a button at the bottom.
When clicking this button, it deletes all designs that match the names of the default designs.

## Contributing

Please submit a pull request if you'd like to contribute.

## Todo:
- Make shortcuts for setup guide flow
- Make delete search button functionality for firefox too
- Make OB designs available to be copy/pasted easily
- Work on porting functionality to Firefox
- Get logo on Firefox

## License

See the LICENSE file for license rights and limitations.

## Note to self
If updating chrome manifest, use `node convertManifest.js` to automatically update firefox manifest