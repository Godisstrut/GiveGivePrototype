// Wait for the DOM to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {
    // Select the form and the submit button
    const toyForm = document.getElementById('toy-form');
    const submitToyButton = document.getElementById('submit-toy');

    // Check if the elements are properly found
    if (!toyForm) {
        console.error("The element with id 'toy-form' was not found. Check the HTML structure.");
        return;
    }

    if (!submitToyButton) {
        console.error("The element with id 'submit-toy' was not found. Check the HTML structure.");
        return;
    }

    // Add an event listener to handle the form submission when the submit button is clicked
    submitToyButton.addEventListener('click', async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        console.log("Submit button clicked"); // Confirm that the button was clicked

        // Disable the button to prevent multiple submissions
        submitToyButton.disabled = true;
        submitToyButton.textContent = "Submitting..."; // Provide user feedback by updating the button text

        // Collect form data from the input fields
        const toyData = {
            Name: document.getElementById('name').value.trim(),
            AgeRecommendation: document.getElementById('age').value.trim(),
            Condition: document.getElementById('condition').value.trim(),
            PriceRange: parseFloat(document.getElementById('price').value.trim()),
            Material: document.getElementById('material').value.trim()
        };
        console.log("Toy data collected:", toyData); // Verify that the data was collected properly

        try {
            console.log("Sending data to the backend:", toyData); // Log the data being sent
            // Send the data to the backend via a POST request
            const response = await fetch('http://localhost:3000/api/postToyForm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(toyData) // Convert the toy data object to a JSON string
            });
            console.log("Response received:", response); // Log the response

            // Process the backend's response
            if (response.ok) {
                const result = await response.json();
                console.log("Backend response:", result); // Log the success response from the backend
                showMessage("success", `Success: ${result.message}`); // Display a success message to the user
                toyForm.reset(); // Reset the form fields after successful submission
            } else {
                const error = await response.json();
                console.error("Backend error:", error); // Log the error response from the backend
                showMessage("error", `Error: ${error.message}`); // Display an error message to the user
            }
        } catch (error) {
            console.error('Error connecting to the backend:', error); // Log any network or unexpected errors
            showMessage("error", 'An unexpected error occurred. Please try again.');
        } finally {
            // Re-enable the button and restore its original text
            submitToyButton.disabled = false;
            submitToyButton.textContent = "Submit";
        }
    });
});

/**
 * Display a message to the user
 * @param {string} type - The type of message ("success" or "error")
 * @param {string} message - The message content to display
 */
function showMessage(type, message) {
    // Create a new <p> element to display the message
    const messageContainer = document.createElement('p');
    messageContainer.textContent = message;
    messageContainer.style.color = type === "success" ? "green" : "red"; // Color the message based on type
    const toyForm = document.getElementById('toy-form');
    toyForm.appendChild(messageContainer); // Append the message to the form

    // Automatically remove the message after 5 seconds
    setTimeout(() => messageContainer.remove(), 5000);
}
