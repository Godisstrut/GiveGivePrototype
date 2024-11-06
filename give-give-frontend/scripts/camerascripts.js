// Select HTML Elements
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const scattaFotoButton = document.getElementById('TakePic');

// Request Camera Access
navigator.mediaDevices.getUserMedia({ video: true })
.then(stream => {
    video.srcObject = stream;
})
.catch(error => {
    console.error('Error to\'access camera:', error);
});

// Capture the image from the video and display it on the canvas.
scattaFotoButton.addEventListener('click', () => {
context.drawImage(video, 0, 0, canvas.width, canvas.height);
});