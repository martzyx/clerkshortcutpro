# ClerkShortcutPro

Pressing Enter and Escape key navigates through the Clerk.io UI.

## Installation

Clone this repository and navigate to the project directory. Then run the following commands:

npm install
node convertManifest.js


This will create a Firefox compatible version of the extension and place it in the `firefox/web-ext-artifacts` directory.

## Usage

If using chrome, simply go to chrome > extensions > load unpacked > select the 'chrome' directory

If using firefox:
Load the extension into your Firefox browser by navigating to `about:debugging`, clicking "This Firefox", then "Load Temporary Add-on...", and select the .zip file in the `firefox/web-ext-artifacts` directory.

If updating chrome manifest, use `node convertManifest.js` to update firefox manifest

## Contributing

Please submit a pull request if you'd like to contribute.

## License

See the LICENSE file for license rights and limitations.
