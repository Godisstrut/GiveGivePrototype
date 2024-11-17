const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const scattaFotoButton = document.getElementById('TakePic');
const sendImgButton = document.getElementById('send-img-to-api');

// Request Camera Access
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    // Attach the video stream to the video element
    video.srcObject = stream;
    video.play(); 
  })
  .catch(error => {
    console.error('Error accessing camera:', error);
    alert('Could not access the camera. Please check permissions or try another browser.');
  });

// Capture the image from the video and display it on the canvas
scattaFotoButton.addEventListener('click', () => {
  // Draw the current video frame on the canvas
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  
  
  console.log('Photo captured and displayed on the canvas.');
});

// Send the captured image to the server
sendImgButton.addEventListener('click', () => {
  // Convert the canvas content to a Blob
  canvas.toBlob(blob => {
    // Create a FormData object and append the Blob
    const formData = new FormData();
    formData.append('image', blob, 'photo.png'); 
    
    // Send the image to the server using fetch
    fetch('http://localhost:3000/api/postImageForAi', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (response.ok) {
        console.log('Image successfully sent to the server.');
        alert('Image uploaded successfully!');
      } else {
        console.error('Error uploading the image:', response.statusText);
        alert('Failed to upload image.');
      }
    })
    .catch(error => {
      console.error('Network error:', error);
      alert('A network error occurred.');
    });
  }, 'image/png'); 
});
