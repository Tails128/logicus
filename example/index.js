import express from "express";
import path from "path";
import register from "@babel/register";
import * as preset from "@babel/preset-env";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Your server code here
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const port = 3000;

register({
  presets: [preset.presetEnv, preset.presetTypescript],
});

const server = express();

server.use(express.static(path.join(__dirname, "../dist")));

server.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"));
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
