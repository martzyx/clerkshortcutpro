// const fs = require('fs');
// const path = require('path');
// const { exec } = require('child_process');
// const archiver = require('archiver');

// // Update these paths to reflect the new directory structure
// const chromeManifestPath = path.join(__dirname, 'chrome', 'my-popup', 'manifest.json');
// const firefoxManifestPath = path.join(__dirname, 'firefox', 'manifest.json');
// const chromeContentJSPath = path.join(__dirname, 'chrome', 'assets', 'content.js');
// const firefoxContentJSPath = path.join(__dirname, 'firefox', 'content.js');
// const outputZipPath = path.join(__dirname, 'firefox', 'extension.zip');

// // Read the Chrome manifest file
// fs.readFile(chromeManifestPath, 'utf8', (err, data) => {
//   if (err) {
//     console.error('Error reading Chrome manifest file:', err);
//     return;
//   }

//   // Parse the JSON data
//   const manifest = JSON.parse(data);

//   // Modify for Firefox compatibility
//   manifest.manifest_version = 2;  // Firefox uses Manifest V2

//   // Write the Firefox manifest file
//   fs.writeFile(firefoxManifestPath, JSON.stringify(manifest, null, 2), 'utf8', err => {
//     if (err) {
//       console.error('Error writing Firefox manifest file:', err);
//       return;
//     }

//     console.log('Firefox manifest file has been successfully generated.');

//     // Copy the content.js file
//     fs.copyFile(chromeContentJSPath, firefoxContentJSPath, err => {
//       if (err) {
//         console.error('Error copying content.js file:', err);
//         return;
//       }

//       console.log('content.js file has been successfully copied to the Firefox directory.');

//       // Create the ZIP file
//       const output = fs.createWriteStream(outputZipPath);
//       const archive = archiver('zip', { zlib: { level: 9 } });

//       output.on('close', () => {
//         console.log('Firefox extension ZIP file has been successfully created.');
//       });

//       archive.on('error', err => {
//         console.error('Error creating the Firefox extension ZIP file:', err);
//       });

//       archive.pipe(output);
//       archive.directory(path.join(__dirname, 'firefox'), false);
//       archive.finalize();
//     });
//   });
// });