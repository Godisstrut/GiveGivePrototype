// POST request to process toy data without image or childId
exports.postToyFormController = async (req, res) => {
    try {
        const { Id, Name, Condition, Material, Tags } = req.body;

        // const testdata = require('../json-test/updatetoy.json');
        // console.log(testdata);

        // const Id = "3ECBBDB7-950E-47B9-BF8F-E00B53E5F7EA"
        // const Name = testdata.name;
        // const stringifiedTags = testdata.tags.join(',');
        // const Condition = testdata.condition;
        // const Material = testdata.material;

        stringifiedTags = Tags.join(',');
        // Validate required fields
        if (!Id || !Name || !Condition || !Material || !stringifiedTags) {
            return res.status(400).json({ message: 'All fields (Id, Name, Condition, Material, Tags) are required.' });
        }

        // Example processing logic with the extracted data
        // TODO: Add further logic to handle or save toy information as needed
        console.log("Toy Information:", { Id, Name, Condition, Material, stringifiedTags });

        // Send a success response
        return res.status(200).json({ message: 'Toy information processed successfully.', data: { Id, Name, Condition, Material, stringifiedTags } });
        
    } catch (error) {
        console.error('Error in postToyFormController:', error);
        res.status(500).json({ message: 'An error occurred while processing toy information.' });
    }
};
