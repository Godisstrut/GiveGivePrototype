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
sendButton.addEventListener('click', async () => {
  const file = photoUpload.files[0];

  if (!file) {
    alert('No image to send. Please upload or capture an image first.');
    return;
  }

  // Convert image file to Base64 string
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = async () => {
    const base64Image = reader.result;
  

    // Send the Base64 string along with childId in JSON
    const response = await fetch('http://localhost:3000/api/postImageForAi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: base64Image,
        childId: 1,
      }),
    });

    const data = await response.json();
    console.log('Image successfully sent:', data);
    alert('Image sent successfully!');
  };

  reader.onerror = (error) => {
    console.error('Error reading file:', error);
    alert('Failed to read image file.');
  };
});
