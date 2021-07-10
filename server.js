// Setup empty JS object to act as endpoint for all routes
let projectData={
    lastDate:"",
    lastTemp:"",
    lastFeelings:""
};

// Express to run server and routes
const express=require("express");

// Start up an instance of app
const app=express();

/* Dependencies */
const cors=require("cors");
const bodyParser=require("body-parser");

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Spin up the server
app.listen(3800,()=>console.log("Server online\nListening to http://loacalhost:3800"));

// Initialize all route with a callback function
app.get("/all",getCallback)
// Callback function to complete GET "/all"
function getCallback(req,res)
{
    console.log(`get request at ${new Date()}`);
    res.json(projectData);
}

// Initialize entry route with callback function
app.post("/entry",entry);
// Callback function to complete Post "/entry"
async function entry(req,res){
    projectData = req.body;
    res.send({});
}
