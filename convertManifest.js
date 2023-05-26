const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const chromeManifestPath = path.join(__dirname, 'chrome', 'manifest.json');
const firefoxManifestPath = path.join(__dirname, 'firefox', 'manifest.json');

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

    // Run web-ext build command
    exec('web-ext build --source-dir firefox --artifacts-dir firefox/web-ext-artifacts', (err, stdout, stderr) => {
      if (err) {
        console.error('Error building the Firefox extension:', err);
        return;
      }

      console.log(stdout);
      console.log('Firefox extension has been successfully built and is located in the firefox/web-ext-artifacts directory.');
    });
  });
});
