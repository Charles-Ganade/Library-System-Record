const express = require("express");
const { writeFile } = require("fs/promises");
const path = require("path");
const bodyParser = require("body-parser");
const request = require("request");
const { log } = require("console");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/new-user", (req, res) => {
    console.log(req.body);
    let clientServerOptions = {
        uri: "http://127.0.0.1:3000/new-user",
        body: JSON.stringify(req.body),
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    };
    request(clientServerOptions, (err, response) => {
        if (err) {
            res.send(err);
        } else {
            res.send(response.body.message);
        }
    });
});

app.get("/", (req, res) => {
    log("here");
    res.sendFile(path.join(__dirname, "/index.html"));
});

app.listen(5000, () => {
    console.log("Active Recorder");
});
