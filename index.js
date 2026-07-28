const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Servidor online!");
});

app.get("/test", async (req, res) => {
    try {
        const response = await axios.get(
            "https://catalog.roblox.com/v1/search/items/details",
            {
                params: {
                    Category: 11,
                    Subcategory: 39,
                    Limit: 10
                },
                headers: {
                    "User-Agent": "Mozilla/5.0"
                }
            }
        );

        res.json(response.data);
    } catch (err) {
        res.status(500).json({
            error: err.message,
            data: err.response?.data
        });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});
