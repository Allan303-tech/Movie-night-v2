import express from "express";
import { PORT } from "./config.js";
import cors from 'cors'



const app = express();

app.use(express.json());
app.use(cors());

app.listen(PORT, () =>  {
    console.log(`App is listening on port https://localhost:${PORT}`);
});

app.get("/", (req, res) => {
    res.send("Welcome to the Movie Night");})