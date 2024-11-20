
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
      }).then(Response => {
          if(!Response.ok){
            console.log("response not okay", Response.status)
          }
          else{
            return Response.json();
          }
      }).then(Data => {
        console.log(Data)
        addToLocalStorage(Data);
        goToToyForm();
      })
    } catch (error) {
      alert('Error during fetch:', error);
    }
  } else {
    alert('No image to send. Please upload or capture an image first.');
  }
});

function addToLocalStorage(Data){
    localStorage.setItem("ToyId", Data.response.toyId);
    localStorage.setItem("Title", Data.response.formData.Title);
    localStorage.setItem("Tags", Data.response.formData.Tags.join(','));
}

function goToToyForm(){
    window.location.href = '../../views/toy_form.html'
}