const { OAuth2Client } = require('google-auth-library');
// const {web} = require('./client_secret_812348040446-gsvuiurj369kt1uui8qqms965q3cnvh6.apps.googleusercontent.com.json')

const { google } = require('googleapis');
const fs = require('fs');
const axios = require('axios');
 
const SERVICE_ACCOUNT_KEY_FILE = 'path/to/service-account-key-file.json'; // Replace with the path to your service account key file
const VIDEO_PATH = 'uploads/video.mp4'; // Replace with the path to your video file
const CHANNEL_ID = 'UCCpRxATkbEdGRDVeMs-zGxA'; // Replace with your YouTube channel ID

// Function to authenticate using service account credentials
const authenticateWithServiceAccount = async () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'my-blog-357212-85eec7b0663b.json', 
    scopes: ['https://www.googleapis.com/auth/youtube.upload'],
  });
 
  return await auth.getClient();
};

// Function to upload a video to YouTube  
const uploadVideoToYouTube = async () => {   
  try {
    // Authenticate with service account
    const authClient = await authenticateWithServiceAccount();

    // Upload video to YouTube
    const uploadUrl = 'https://www.googleapis.com/upload/youtube/v3/videos?part=snippet,status,contentDetails';
    const videoBuffer = fs.readFileSync(VIDEO_PATH);

    const uploadResponse = await axios.post(uploadUrl, videoBuffer, {
      headers: {
        'Content-Type': 'application/octet-stream',
        Authorization: `Bearer ${await authClient.getAccessToken()}`,
      },
    });

    // Get the video ID from the response
    const videoId = uploadResponse.data.id;
    console.log('Video uploaded to YouTube with ID:', videoId);

    // Set the video as private
    await axios.put(`https://www.googleapis.com/youtube/v3/videos?part=status&id=${videoId}`, {
      status: {
        privacyStatus: 'private', // You can change this to 'public' or 'unlisted'
      },
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await authClient.getAccessToken()}`,
      },
    });

    console.log('Video privacy status updated.');
  } catch (error) {
    console.error('Error uploading video to YouTube:', error.message);
  }
};

// Call the function to upload the video

module.exports = {uploadVideoToYouTube};