const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { url } = require("inspector");
const { request } = require("http");

const app = express();

// as css and images file are fixed we use the above thing to display it
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    // console.log(firstName, lastName, email);

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    // convert data into string
    const jsonData = JSON.stringify(data);

    const url = "https://us13.api.mailchimp.com/3.0/lists/aaaeed1698"
    
    const options = {
        method: "POST",
        // hetashridk is username... we can any username here
        auth: "hetashridk:87a4581e8bc26eeb609920be3ef119f4-us13"
    }

   const request =  https.request(url, options, function(response) {

    if(response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
    }
    else{
        res.sendFile(__dirname + "/failure.html");
    }
         
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();
});

app.post("/failure", function (req, res) {
    res.redirect("/");
})

// process.env.PORT:- run on any server/port if run on browser 
// 3000:- if it is running on local host then it will run on port 3000
app.listen(process.env.PORT || 3000, function () {
    console.log("Server chalu thy gayi on port 3000");
});


// api Key
// 87a4581e8bc26eeb609920be3ef119f4-us13

// unique id
// aaaeed1698