import express from "express";
import fileUpload from "express-fileupload";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(
    fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 },
    })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
const port = 3000;

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/upload", (req, res) => {
    const file = req.files.file;
    const ext = file.name.split(".").pop();
    if (req.files === null) {
        return res.status(400).json({ msg: "No files were uploaded" });
    }

    const validExtensions = ["png", "jpg", "jpeg", "gif"];

    if (!validExtensions.includes(ext)) {
        return res.status(400).json({ msg: "Invalid extension" });
    }

    if (file.size > 5000000) {
        return res.status(400).json({ msg: "File size limit exceeded" });
    }
    file.mv(`${__dirname}/public/upload/${file.name}`, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ file: file.name });
    });
});

app.get("/deleteimg/:nombre", (req, res) => {
    const nombre = req.params.nombre;
    fs.unlink(`${__dirname}/public/upload/${nombre}`, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ msg: "Imagen eliminada" });
    });
});

app.get("/imagenes", (req, res) => {
    res.sendFile(__dirname + "/public/imagenes.html");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
