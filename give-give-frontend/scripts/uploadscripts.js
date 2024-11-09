const photoUpload = document.getElementById('photo-upload');
const sendButton = document.getElementById('send-img-to-api');
const previewImg = document.getElementById('preview-img'); // Corrected from 'peview-img' typo

// Preview uploaded image from local device
photoUpload.addEventListener("change", function(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      previewImg.src = event.target.result; // Display image in preview
    };
    reader.readAsDataURL(file); // Convert image to base64 format
  }
});

// Button to send the image data to the API
sendButton.addEventListener('click', () => {
  const imageData = previewImg.src;

  if (imageData) {
    fetch('http://localhost:3000/api/postImageForAI', { // Corrected syntax for fetch
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json', 
      }, 
      body: JSON.stringify({ image: imageData, childId: 1 })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Image successfully sent:', data);
      alert('Image sent successfully!');
    })
    .catch(error => {
      console.error('Error sending image:', error);
      alert('Failed to send image.');
    });
  } else {
    alert('No image to send. Please upload or capture an image first.');
  }
});
