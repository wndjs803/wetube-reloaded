import express from "express";
import morgan from "morgan";

const PORT = 4000;

const app = express();
const logger = morgan("dev");

const handleHome = (req, res) => {
  return res.send("?");
};

app.use(logger);
app.get("/", handleHome);

const handleListening = () => console.log("wow");

app.listen(PORT, handleListening);
