import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/generate", (req, res) => {
  const number = parseInt(req.body.number);
  const rows = parseInt(req.body.rows);
  const order = req.body.order;

  let table = [];

  if (order === "desc") {
    for (let i = rows; i >= 1; i--) {
      table.push({ i, result: number * i });
    }
  } else {
    for (let i = 1; i <= rows; i++) {
      table.push({ i, result: number * i });
    }
  }

  res.render("table", { number, rows, table });
});


const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
