document.addEventListener('DOMContentLoaded', () => {
    function getIdentifiedData() {
        const toyId = localStorage.getItem('ToyId');
        const title = localStorage.getItem('Title');
        const tags = localStorage.getItem('Tags');
        return [toyId, title, tags];
    }

    function populateTags(tags) {
        const tagsContainer = document.getElementById("tags-container");
        tagsContainer.innerHTML = '';
        const tagsArray = tags.split(',')
        tagsArray.forEach((tag, index) => {
            const tagContainer = document.createElement('div')
            tagContainer.id = 'tag-container';
            const tagsInput = document.createElement('input')
            tagsInput.type = 'text';
            tagsInput.name = `tag${index}`
            tagsInput.value = tag

            tagContainer.appendChild(tagsInput)
            const removeButton = createRemoveButton()
            tagContainer.appendChild(removeButton);
            tagsContainer.appendChild(tagContainer);
        });
    }

    function createRemoveButton() {
        const removeButton = document.createElement('button');
        removeButton.id = 'remove-button';
        removeButton.addEventListener('click', () => {

            const parent = removeButton.parentNode
            parent.remove()

        })
        return removeButton;
    }

    function populateForm() {
        const [toyId, title, tags] = getIdentifiedData();
        const toyIdInput = document.getElementById('toy-id');
        if (toyIdInput) toyIdInput.value = toyId || '';
        const toyTitleInput = document.getElementById('title');
        if (toyTitleInput) toyTitleInput.value = title || '';
        //const toyTagsInput = document.getElementById('tags');
        //if (toyTagsInput) toyTagsInput.value = tags || '';
        populateTags(tags)
    }

    populateForm();

    const toyForm = document.getElementById('toy-form');
    if (!toyForm) {
        console.error("Form element not found");
        return;
    }

    toyForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const [toyId] = getIdentifiedData();
        const formData = {
            Id: toyId,
            Name: document.getElementById('title').value.trim(),
            Condition: document.getElementById('condition').value.trim(),
            Material: document.getElementById('material').value.trim(),
            Tags: document.getElementById('tags').value.trim().split(',').map(tag => tag.trim())
        };

        if (!formData.Id || !formData.Name || !formData.Condition || !formData.Material || formData.Tags.length === 0) {
            console.log("Validation failed. Form data:", formData);
            alert("Please fill in all fields.");
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/postToyForm', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
        
            if (response.ok) {
                const result = await response.json();
                console.log("Form successfully submitted:", result);
                alert("Toy information saved successfully!");
                toyForm.reset();
                window.location.href = 'inventory.html';
            } else {
                const errorData = await response.json();
                console.error("Error from backend:", errorData);
                alert(`Failed to save toy information: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error("Error during form submission:", error);
            alert("An error occurred. Please try again later.");
        }
          
        
    });
});
