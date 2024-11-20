
  const photoUpload = document.getElementById('photo-upload');
  const previewImg = document.getElementById('preview-img');
  const sendButton = document.getElementById('send-img-to-api');


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
  if(localStorage.getItem('userId') === null) {
    alert("you are not logged in :)")  
    window.location.href = '../../views/login.html'
  }
  formData.append('childId', localStorage.getItem('userId'));

  if (imageData) {
    try {
      fetch('http://localhost:3000/api/postImageForAi', {
          method: 'POST',
          body: formData, // Pass the FormData object
      })
      .then(response => {
          if (!response.ok) {
              console.error("Response not okay:", response.status);
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json(); // Parse the JSON response
      })
      .then(data => {
          console.log("Response data:", data);
          addToLocalStorage(data); // Add the data to localStorage
          goToToyForm(); // Navigate to the next form
      })
      .catch(error => {
          console.error("Error during fetch:", error);
          alert(`Failed to send image: ${error.message}`);
      });
  } catch (error) {
      // This catch block will handle any synchronous errors before the fetch call
      alert('Unexpected error:', error);
  }}});
  

function addToLocalStorage(Data){
    localStorage.setItem("ToyId", Data.response.toyId);
    localStorage.setItem("Title", Data.response.formData.Title);
    localStorage.setItem("Tags", Data.response.formData.Tags.join(','));
}

function goToToyForm(){
    window.location.href = '../../views/toy_form.html'
}