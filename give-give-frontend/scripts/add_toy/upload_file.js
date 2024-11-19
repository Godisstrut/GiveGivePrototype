
  const photoUpload = document.getElementById('photo-upload');
  const previewImg = document.getElementById('preview-img');
  const sendButton = document.getElementById('send-img-to-api')

  // Preview uploaded image from local device
  photoUpload.addEventListener("change", function(event) {
    const file = event.target.files[0];
    
    console.log(file)
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
  const file = photoUpload.files[0];
  
  const imageData = previewImg.src;

  // Create a FormData object
  const formData = new FormData();
  formData.append('image', file);
  formData.append('childId', localStorage.getItem('userId'));

  if (imageData) {
    fetch('http://localhost:3000/api/postImageForAi', { // Corrected syntax for fetch
      method: 'POST', 
      body: formData
      
      /*headers: {
        'Content-Type': 'application/json', 
      }, */
      //body: JSON.stringify({ image: imageData, childId: 1 })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Image successfully sent:', data);
      alert('Image sent successfully!');
      //Redirect user to the toy-form page with data from gemini if successfull
      const queryString = new URLSearchParams({
        name: data.name || '',
        age: data.age || '',
        condition: data.condition || '',
        price: data.price || '',
        material: data.material || ''
      }).toString();
      
      window.location.href = `../views/toy_form.html?${queryString}`;
    })
    .catch(error => {
      console.error('Error sending image:', error);
      alert('Failed to send image.');
    });
  } else {
    alert('No image to send. Please upload or capture an image first.');
  }
});
