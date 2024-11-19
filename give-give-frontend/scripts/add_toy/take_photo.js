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
  const childId = localStorage.getItem('userId'); // Recupera childId da localStorage

  if (!childId) {
    alert("User ID not found. Please log in or refresh the page.");
    return;
  }

  canvas.toBlob(blob => {
    if (!blob) {
      console.error("Blob generation failed.");
      alert("Failed to capture image. Please try again.");
      return;
    }

    const formData = new FormData();
    formData.append('image', blob, 'photo.png'); // Nome del campo file deve essere 'image'
    formData.append('childId', childId); // Aggiunge childId al formData

    fetch('http://localhost:3000/api/postImageForAi', {
      method: 'POST',
      body: formData
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          console.error('Response error:', response.statusText);
          alert('Failed to upload image.');
        }
      })
      .then(data => {
        if (data) {
          console.log("Response from server:", data);
          alert(`Image uploaded successfully! Toy ID: ${data.response.toyId}`);
        }
      })
      .catch(error => {
        console.error('Network error:', error);
        alert('A network error occurred. Please check your backend or try again later.');
      });
  }, 'image/png');
});
