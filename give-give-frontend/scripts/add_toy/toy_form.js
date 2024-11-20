document.addEventListener('DOMContentLoaded', () => {
    // Function to get the value of a query parameter
    function getQueryParam(param) {
        const params = new URLSearchParams(window.location.search);
        return params.get(param);
    }

    // Retrieve the toyId from the query string
    const toyId = getQueryParam('toyId');

    console.log(`Toy ID retrieved: ${toyId}`);

    // Populate the hidden input field in the form with toyId
    const toyForm = document.getElementById('toy-form');
    const toyIdInput = document.getElementById('toy-id');
    if (toyIdInput) {
        toyIdInput.value = toyId; // Set the toyId in the hidden input
    }

    // Gets HTML elements in toy-form by ID
    const nameInput = document.getElementById('name');
    const conditionInput = document.getElementById('condition');
    const materialInput = document.getElementById('material');
    const tagsSelect = document.getElementById('tags'); // Select element for tags

    // Retrieve data from localStorage
    const title = localStorage.getItem('Title');
    const condition = localStorage.getItem('Condition');
    const material = localStorage.getItem('Material');
    const tagsFromStorage = localStorage.getItem('Tags'); // Retrieve Tags (comma-separated string)

    // Pre-fill the input fields if the data exists
    if (title) nameInput.value = title;
    if (condition) conditionInput.value = condition;
    if (material) materialInput.value = material;

    // Populate the <select> element with options from localStorage
    if (tagsFromStorage) {
        const availableTags = tagsFromStorage.split(',').map(tag => tag.trim());
        availableTags.forEach(tag => {
            const option = document.createElement('option');
            option.value = tag;
            option.textContent = tag;
            tagsSelect.appendChild(option);
        });

        // Pre-select tags if needed
        Array.from(tagsSelect.options).forEach(option => {
            if (option.value === title) {
                option.selected = true;
            }
        });
    } else {
        console.warn("No tags found in localStorage.");
    }

    // Handle form submission
    toyForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission

        // Collect form data
        const formData = {
            Id: toyId, // Use the toyId retrieved from the query string
            Name: nameInput.value.trim(),
            Condition: conditionInput.value.trim(),
            Material: materialInput.value.trim(),
            Tags: Array.from(tagsSelect.selectedOptions).map(option => option.value) // Get selected tags
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
