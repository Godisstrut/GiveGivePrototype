document.addEventListener('DOMContentLoaded', () => {
    function getIdentifiedData() {
        const toyId = localStorage.getItem('ToyId');
        const title = localStorage.getItem('Title');
        const tags = localStorage.getItem('Tags');
        return [toyId, title, tags];
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

    const addNewTagLink = document.getElementById("add-tag-link");
    
    
    addNewTagLink.addEventListener('click', () => {
        const tagsContainer = document.getElementById("tags-container");

        //Check to see if there are already 10 tags and doesnt allow you to create more than 10 tags.
        if(tagsContainer.childElementCount >= 10){
            alert("you can maximum have 10 tags for each toy")
        }
        else{
            //Create an empty tag and adds it to the tagsContainer
            const tagContainer = createTag("");
            tagsContainer.appendChild(tagContainer);
            getTagArrayFromTagElements();
        } 
    });
    
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
            Tags: getTagArrayFromTagElements()
        };
    
        if (!formData.Id || !formData.Name || !formData.Condition || !formData.Material || formData.Tags.length === 0) {
            console.log("Validation failed. Form data:", formData);
            alert("Please fill in all fields.");
            return;
        }
    
        try {
            const response = await fetch('http://localhost:3000/api/postToyForm', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
    
            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                const result = await response.json();
                if (response.ok) {
                    console.log("Form successfully submitted:", result);
                    alert("Toy information saved successfully!");
                    toyForm.reset();
                    window.location.href = 'inventory.html';
                } else {
                    console.error("Error from backend:", result);
                    alert(`Failed to save toy information: ${result.message || 'Unknown error'}`);
                }
            } else {
                const text = await response.text();
                console.error("Unexpected response format:", text);
                alert(`Unexpected response from server: ${text}`);
            }
        } catch (error) {
            console.error("Error during form submission:", error);
            alert("An error occurred. Please try again later.");
        }
    });
    
          
        
        
});


function createTagInput(tag){
    const tagInput = document.createElement('input')
    tagInput.type = 'text';
    tagInput.name = `tag`
    tagInput.value = tag
    tagInput.setAttribute('maxlength', '25')
    
    return tagInput
}

function createRemoveTagButton() {
    const removeButton = document.createElement('button');
    removeButton.id = 'remove-button';
    
    //Add onClick method to remove itself and its parent container on click.
    removeButton.addEventListener('click', () => {
        const parent = removeButton.parentNode
        parent.remove()
    })
    
    return removeButton;
}

function populateTags(tags) {
    //Resets the tag container.
    const tagsContainer = document.getElementById("tags-container");
    tagsContainer.innerHTML = '';
    
    //Split the tag string into multiple tags and create individual inputs for each tag.
    tags.split(',').forEach((tag) => {
        const tagContainer = createTag(tag)
        tagsContainer.appendChild(tagContainer);
    });
}

function createTag(tag){
    //Create a container for the input and the button of a tag.
    const tagContainer = document.createElement('div')
    tagContainer.id = 'tag-container';

    //Create input and buttons
    const tagsInput = createTagInput(tag);
    const removeButton = createRemoveTagButton();

    //Add Input and Button element into the tag container
    tagContainer.appendChild(tagsInput)
    tagContainer.appendChild(removeButton);

    return tagContainer
}

function getTagArrayFromTagElements(){
    
    let tags = [];

    // Create an array of all tagContainers
    const tagsContainer = document.getElementById('tags-container');
    const tagContainers = tagsContainer.querySelectorAll('#tag-container');

// Iterate over each tag-container and get the text from the input field
    tagContainers.forEach(tagContainer => {
        const inputElement = tagContainer.querySelector('input[name="tag"]');
        if (inputElement) {
            const tag = inputElement.value.trim();
            if(tag != "") tags.push(tag);
        }
    });
    
    return tags
}




