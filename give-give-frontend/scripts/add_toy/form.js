//Function to populate the toy form with appropriate data
function fillForm() {
    const dataFields = newURLSearchParams(window.location.search)

    document.getElementById("name").value = dataFields.get("name") || '';
    document.getElementById("age").value = dataFields.get("age") || '';
    document.getElementById("condition").value = dataFields.get("condition") || '';
    document.getElementById("price").value = dataFields.get("price") || '';
    document.getElementById("material").value = dataFields.get("material") || '';

}

window.onload = fillForm;
