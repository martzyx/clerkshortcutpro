# Shortcuts for my.clerk.io UI

This user-friendly extension facilitates interaction with the my.clerk.io user interface by enabling keyboard shortcuts and workflow automation. It is designed to enhance your efficiency and make navigation smoother. The following keyboard shortcuts are currently available:

-   Confirm and Proceed (default key is 'Enter')
-   Cancel and Return (default key is 'Escape')

The following workflow automation is available:

-   Automatically translate headlines of Clerk contents with use of buttons

## Installation

**If using chrome:**
https://chrome.google.com/webstore/detail/clerkshortcutpro/cgacjinjmhilbalfehjefkebkjlomkhl


~~**If using firefox:**~~ ** Deprecated firefox for now ** 
https://addons.mozilla.org/en-US/firefox/addon/clerkshortcutpro/

## How to Customize options and keybinds (Chrome only)

You can customize the keyboard shortcuts according to your preference by following these steps:

Open the Clerk.io extension options by clicking on the extension icon in your browser toolbar.

In the options page, you will find the settings for the keyboard shortcuts.

Enable or disable the desired shortcuts by toggling the corresponding checkboxes.

To change the default keyboard shortcuts, click on the input field for the shortcut you want to modify and press the desired key. The input field will be automatically updated with the selected key.

Click the "Save Settings" button to save your changes.

Remember, this extension is meant to enhance your navigation and user experience within the my.clerk.io interface. I hope you find them useful and time-saving.

## Usage of headline translations for Recommendations

When viewing best-practice content in Recommendations > Content in my.clerk.io, you will be able to see buttons next to the input field (DK,SE,IT, etc.) of the headline section. When clicking on a button, the translated headline will be copied to your clipboard, so that you can paste it in the input field.
![Example](/assets/translations_screenshot.png "Translations!")
**Important:** it only works on main content generated by the setup guide (excluding powerstep, blogs, and random content...).

_(Side note: I tried making it auto-fill, but Angular doesn't allow that to be saved. There needs to be some user input.)_

## Contributing

Please submit a pull request if you'd like to contribute.

## Todo:

-   Always work on porting to Firefox :)))
-   Make tool to see hidden designs
-   Add select all button for copy new store page
-   Make translation buttons for input variables in content pages
    -   Extension makes a translate button in the content
    -   Once user fills the input variables, forms, a translate button is available to translate all the variables to the chosen language
-   Add shortcut for new modal in features myclerk section
-   Add contextMenu customization
-   Make sure content.js doesn't inject injected.js unnecessarily
-   Add new screenshot for translations
-   Use Google Sheets API for translation realtime database retrieval

## License

See the LICENSE file for license rights and limitations.

## Notes to self

-   If updating chrome manifest, use `node convertManifest.js` to automatically update firefox manifest
-   To package firefox: Use command `web-ext build`
-   When packaging chrome zip, use `zip -r chrome-1.7.3.zip chrome -x "chrome/my-popup/*"`
-   To run react dev app, navigate to my-popup, and use `npm run dev`
    -   To build, use `npm run build`
