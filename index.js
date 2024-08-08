//struktur express js
const path = require("path");
const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


app.get("/", (req, res) => {
    const judul = "List Buku";
    res.render("index", {judul});
});