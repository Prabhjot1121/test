const express = require("express");
const connectToMongo = require("./db/db");
const cors = require("cors");
const port = 8000;

connectToMongo();
const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use(
  cors({
    origin: ["https://utsav.vercel.app"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

// adding routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notify", require("./routes/notify"));
app.use("/api/activity", require("./routes/activity"));

app.get("/api/", (req, res) => {
  return res.send("Hello World");
});

app.listen(port, () => {
  console.log(`utsav backend running on http://localhost:${port}`);
});
