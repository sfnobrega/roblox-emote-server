const express = require("express");
const axios = require("axios");

const app = express();

const PORT = process.env.PORT || 3000;


app.get("/", (req, res) => {
    res.send("Roblox Emote Server Online");
});


app.get("/emotes", async (req, res) => {

    try {

        let emotes = [];
        let cursor = "";

        do {

            let url =
            "https://catalog.roblox.com/v1/search/items/details" +
            "?Category=11" +
            "&Subcategory=39" +
            "&Limit=120";

            if(cursor) {
                url += "&Cursor=" + cursor;
            }


            const response = await axios.get(url);

            const data = response.data;


            for(const item of data.data) {

                emotes.push({
                    Name: item.name,
                    Id: item.id,
                    Price: item.price
                });

            }


            cursor = data.nextPageCursor;


        } while(cursor);


        res.json(emotes);


    } catch(error) {

        console.log(error);
        res.status(500).json({
            error:"Erro ao buscar emotes"
        });

    }

});


app.listen(PORT, () => {
    console.log("Servidor ligado na porta " + PORT);
});
