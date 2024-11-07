const photoUpload = document.getElementById('photo-upload');
const sendButton = document.getElementById('send-img-to-api')



document.getElementById("photo-upload"), addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            previewImg.src = e.target.result; // Bild i preview
        };

        reader.readAsDataURL(file);


    }
});

//Knappen som skickar in bild till API
sendButton.addEventListener('click', () => {
    const imageData = previewImg.src;

    if (imageData) {
        fetch('http://localhost:3000/api/postImageForAI'), {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 

            }, 

            body: JSON.stringify({ image: imageData, childId: 1 })
        }

        .then(response => response.json())
        .then(data => {
            console.log('image successfully sent', data);
            alert ('Image sent successfully!');

        })

        .catch(error =>{
            console.log('Eror sending image', error);
            alert ('Failed to send image');
        });
    }   else{
        alert('No image to send. Please upload or capture an image first.');
    }
});

