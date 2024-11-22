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
    const childId = localStorage.getItem('userId'); // Retrieve childId from localStorage

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
        formData.append('image', blob, 'photo.png'); // Add the image
        formData.append('childId', childId); // Add the childId

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

                    const { toyId, formData } = data.response; // Extract toyId and formData
                    const { Name, Condition, Material, Tags } = formData; // Extract fields from formData

                    // Check if all required fields are present
                    if (toyId && Name && Condition && Material && Tags && Tags.length > 0) {
                        alert(`Image uploaded successfully! Toy ID: ${toyId}`);

                        // All data is complete; you can save the toy directly
                        console.log("All data is complete. No need for additional form input.");
                        // Optionally, you can directly process/save this data here
                        window.location.href = `../inventory.html`;
                    } else {
                        // Redirect to the form page to complete missing data
                        alert("Some data is missing. Redirecting to form...");
                        window.location.href = `../../views/toy_form.html?toyId=${toyId}`;
                    }
                }
            })
            .catch(error => {
                console.error('Network error:', error);
                alert('A network error occurred. Please check your backend or try again later.');
            });
    }, 'image/png');
});
