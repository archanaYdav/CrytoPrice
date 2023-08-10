import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    try {
        const result = await axios.get("https://api.blockchain.com/v3/exchange/tickers");
        res.render("index.ejs", { arr: result.data });

    } catch (error) {
        console.error(error.message);
        res.send("Failed there is some error", error.message);
    }
});

app.post("/search", async (req, res) => {
    const search = req.body.search;
    try {
        const result = await axios.get(`https://api.blockchain.com/v3/exchange/tickers/${search}`);
        res.render("index.ejs", { dta: result.data });
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
            error: error.message,
        });

    }
});


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})