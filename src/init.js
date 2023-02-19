import "./db";
import "./models/Video";
import "./models/User";
import app from "./server";

const PORT = 4000;

const handleListening = () => console.log("wow");

app.listen(PORT, handleListening);
