const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const chromeManifestPath = path.join(__dirname, 'chrome', 'manifest.json');
const firefoxManifestPath = path.join(__dirname, 'firefox', 'manifest.json');
const outputZipPath = path.join(__dirname, 'firefox', 'extension.zip');

// Read the Chrome manifest file
fs.readFile(chromeManifestPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading Chrome manifest file:', err);
    return;
  }

  // Parse the JSON data
  const manifest = JSON.parse(data);

  // Modify for Firefox compatibility
  manifest.manifest_version = 2;  // Firefox uses Manifest V2

  // Write the Firefox manifest file
  fs.writeFile(firefoxManifestPath, JSON.stringify(manifest, null, 2), 'utf8', err => {
    if (err) {
      console.error('Error writing Firefox manifest file:', err);
      return;
    }

    console.log('Firefox manifest file has been successfully generated.');

    // Run zip command to create the .zip file
    exec(`zip -r "${outputZipPath}" firefox/*`, (err, stdout, stderr) => {
      if (err) {
        console.error('Error creating the Firefox extension .zip file:', err);
        return;
      }

      console.log(stdout);
      console.log('Firefox extension .zip file has been successfully created.');
    });
  });
});
