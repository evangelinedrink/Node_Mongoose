const mongoose= require("mongoose"); //Importing Mongoose
const Schema= mongoose.Schema; //This is not required, but it is easier to type Schema than Mongoose Schema every time.

//Creating a new Schema using Mongoose. The first argument is required, it contains the definition of the schema and is an object.
//The second argument in the Schema() method is optional and is used for setting various configuration options.
const campsiteSchema= new Schema({
    name: {
        type: String,
        required: true,
        unique: true, //no 2 documents should have the same name field
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true, //Tells us the time when the document was created and also updated.
});

//Creating a Model with Mongoose. The model will instantiate new documents for that collection. Model will also enforce structure from Schema and validate documents.
//The first argument for the mongoose.model() method is the singular version of the name of the collection that we want to use for the model. This first argument must be capitalized.
//Second argument is the schema that we are passing through that we want to use for this collection.
//mongoose.model() method returns a constructor function. Constructor function is the de-sugared class of classes.
const Campsite= mongoose.model("Campsite", campsiteSchema);

module.exports= Campsite;

