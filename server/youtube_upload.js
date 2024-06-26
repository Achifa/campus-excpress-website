// Copyright 2016 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


/**
 * Usage: node upload.js PATH_TO_VIDEO_FILE
 */

const readline = require('readline'); 
const {google} = require('googleapis');

// initialize the Youtube API library
const youtube = google.youtube('v3');
// very basic example of uploading a video to youtube
async function runSample(fileName) {
    // Initialize Google APIs with a service account
  const { google } = require('googleapis');
  const keyFile = require('./campus-express-410317-b07ed9c87f70.json'); // Path to your service account key file
  let keyFileContent = keyFile;


  // Load credentials from the service account key object
  const auth = new google.auth.GoogleAuth({
    credentials: keyFileContent,
    scopes: [
      'https://www.googleapis.com/auth/youtube.upload',
      'https://www.googleapis.com/auth/youtube',
    ],
  });

  // Obtain the authenticated client
  const client = await auth.getClient();
  google.options({ auth: client });

  const fileSize = fs.statSync(fileName).size;
  const res = await youtube.videos.insert( 
    {
      part: 'id,snippet,status',
      notifySubscribers: false,
      requestBody: { 
        snippet: {
          title: 'Node.js YouTube Upload Test',
          description: 'Testing YouTube upload via Google APIs Node.js Client',
        },
        status: {
          privacyStatus: 'public',
        },
      },
      media: {
        body: fs.createReadStream(fileName),
      },
    },
    { 
      // Use the `onUploadProgress` event from Axios to track the
      // number of bytes uploaded to this point.
      onUploadProgress: evt => {
        const progress = (evt.bytesRead / fileSize) * 100;
        readline.clearLine(process.stdout, 0);
        readline.cursorTo(process.stdout, 0, null);
        process.stdout.write(`${Math.round(progress)}% complete`);
      },
    }
  ); 
  console.log('\n\n');
  console.log('res data: ', res.data);
  return res.data;
}

if (module === require.main) { 
  const fileName = process.argv[2]; 
  runSample('./vids/VID_20240403_071234.mp4').catch(console.error);
}

runSample('./vids/VID_20240403_071234.mp4'); 