const express = require("express");
// Extract the filename from a file path
const path = require("path");
const http = require("http");
// Create an HTTP server that listens to server ports and gives a response back to the client.
const fileUpload = require("express-fileupload");

const cors = require("cors");

const bodyParser = require('body-parser');


const {routesInit} = require("./routes/configRoutes");
require("./db/mongoConnect");

const app = express();

// Enable file uploading middleware with a file size limit of 5MB
app.use(fileUpload({
  limits: { fileSize: 1024 * 1024 * 5 }
}));

// Enable Cross-Origin Resource Sharing (CORS) middleware
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Initialize routes by passing the app instance
routesInit(app);

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Set the server port based on the environment variable or use port 3002 as a fallback
let port = process.env.PORT || 3002;

// Start the server and listen on the specified port
server.listen(port);
