const { uploadToyForm } = require("../services/internal/uploadToyForm");

exports.postToyFormController = async (req, res) => {
    console.log('Vi är i postformcontroller')
    try {
        const { Id, Name, Condition, Material, Tags } = req.body;

        // Validate required fields
        if (!Id || !Name || !Condition || !Material || !Tags || !Array.isArray(Tags)) {
            return res.status(400).json({ message: 'All fields (Id, Name, Condition, Material, Tags) are required, and Tags must be an array.' });
        }

        // Convert tags array to a string for storage, if necessary
        const stringifiedTags = Tags.join(',');

        // Upload toy form to the database
        const result = await uploadToyForm(Id, Name, Condition, Material, stringifiedTags);

        // Return the entire result or relevant part to the client
        console.log(result);
        return res.status(200).json({ message: 'Toy uploaded successfully.', data: result });


    } catch (error) {
        console.error('Error in postToyFormController:', error);
        res.status(500).json({ message: 'An error occurred while processing toy information.' });
    }
};
