const mongoose= require("mongoose"); //Import/Require Mongoose
const Campsite= require("./models/campsite");

const url= "mongodb://localhost:27017/nucampsite"; //URL for MongoDB server
const connect= mongoose.connect(url, { //Connect to the URL with Mongoose. The first argument is url and the second argument is an object.
    useCreateIndex: true, //All three of these are used to help with deprecation warnings.
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//The connect() method returns a Promise, so we can use a .then() method.
connect.then(()=> {
    console.log("Connected correctly to server");

    //Extentiate a new document. This campsite with a Capital C is the model that we are extentuating from.
    const newCampsite= new Campsite({
        name: "React Lake Campground",
        description: "test"
    });

    //Save() method that will save the document to the database.  This is a Mongoose Method.  Save() method will return a Promise if the save operation failed or succeded.
    //The document that will be saved will be saved in the Campsite collection
    //In the newCampsite.save() method and all its promises, all the methods are in series.
    newCampsite.save()
    .then(campsite => {
        console.log(campsite); //Console log the saved document
        return Campsite.find(); //This is returning to the model, Campsite.  Find() method will find all documents that are based on this Campsite model.  Returning the results as a Promise.
    }) //The next .then() method is the promise for the return Campsite.find() method.
    .then(campsites=> { //If the Promise is successful for the code "return Campsite.find()", then this resuls part of the Promise will run
        console.log(campsites); //Console log will find and log all the documents that were found in the Campsite model
        return Campsite.deleteMany();
    }) //The next .then() method is the promise for the return Campsite.deleteMany() method.
    .then(()=> {
        return mongoose.connection.close();
    })
    //Catch any errors from this Promise Chain in the code below.
    .catch(err=> {
        console.log(err); //Console log the error
        mongoose.connection.close(); //Close the connection if there is an error.
    });
});

