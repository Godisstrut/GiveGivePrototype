document.addEventListener('DOMContentLoaded', () => {
    // Function to get the value of a query parameter
    function getQueryParam(param) {
        const params = new URLSearchParams(window.location.search);
        return params.get(param);
    }

    // Retrieve the toyId from the query string
    const toyId = getQueryParam('toyId');

    if (!toyId) {
        alert("Toy ID not found. Please go back and try again.");
        return;
    }

    console.log(`Toy ID retrieved: ${toyId}`);

    // Populate the hidden input field in the form with toyId
    const toyForm = document.getElementById('toy-form');
    const toyIdInput = document.getElementById('toy-id');
    if (toyIdInput) {
        toyIdInput.value = toyId; // Set the toyId in the hidden input
    }

    // Handle form submission
    toyForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission

        // Collect form data
        const formData = {
            Id: toyId, // Use the toyId retrieved from the query string
            Name: document.getElementById('name').value.trim(),
            Condition: document.getElementById('condition').value.trim(),
            Material: document.getElementById('material').value.trim(),
            Tags: document.getElementById('tags').value.trim().split(',').map(tag => tag.trim()) // Split tags by commas and trim whitespace
        };

        // Validate form data
        if (!formData.Id || !formData.Name || !formData.Condition || !formData.Material || formData.Tags.length === 0) {
            alert("Please fill in all fields.");
            return;
        }

        console.log("Form data ready to send:", formData);

        try {
            // Send the form data to the backend
            const response = await fetch('http://localhost:3000/api/postToyForm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Form successfully submitted:", result);
                alert("Toy information saved successfully!");
                toyForm.reset(); // Reset the form
                window.location.href = `inventory.html`;
            } else {
                const error = await response.json();
                console.error("Error from backend:", error);
                alert(`Failed to save toy information: ${error.message}`);
            }
        } catch (error) {
            console.error("Error during form submission:", error);
            alert("An error occurred. Please try again later.");
        }
    });
});
