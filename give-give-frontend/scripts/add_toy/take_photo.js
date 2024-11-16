// Select HTML Elements
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const scattaFotoButton = document.getElementById('TakePic');

// Request Camera Access
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    // Attach the video stream to the video element
    video.srcObject = stream;
    video.play(); // Play the video
  })
  .catch(error => {
    console.error('Error accessing camera:', error);
    alert('Could not access the camera. Please check permissions or try another browser.');
  });

// Capture the image from the video and display it on the canvas
scattaFotoButton.addEventListener('click', () => {
  // Draw the current video frame on the canvas
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  
  // Optional: Log a success message
  console.log('Photo captured and displayed on the canvas.');
});
