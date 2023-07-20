import express from "express";
import fileUpload from "express-fileupload";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
import { nameImagenes } from "./public/js/functions.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let imageNames = [];

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
    if (req.files === null) {
        return res.status(400).json({ msg: "No files were uploaded" });
    }

    const file = req.files.file;
    const ext = file.name.split(".").pop();

    const validExtensions = ["png", "jpg", "jpeg", "gif"];

    if (!validExtensions.includes(ext)) {
        return res.status(400).json({ msg: "Invalid extension" });
    }

    if (file.size > 5000000) {
        return res.status(400).json({ msg: "File size limit exceeded" });
    }

    if (imageNames.length >= 8) {
        return res.status(400).json({
            msg: "Limite excedido , elimina una imagen para poder subir una nueva",
        });
    }

    console.log(imageNames.length);

    file.mv(`${__dirname}/public/upload/${file.name}`, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        nameImagenes(file.name);
        console.log(file.name);
        res.sendFile(__dirname + "/public/imagenes.html");
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

app.get("/GetAllimagenes", (req, res) => {
    const uploadPath = "./public/upload"; // Ruta de la carpeta "upload"

    fs.readdir(uploadPath, (err, files) => {
        if (err) {
            console.error(err);
            return;
        }

        imageNames = files.filter((file) => {
            // Filtrar solo los archivos de imagen
            return (
                file.toLowerCase().endsWith(".png") ||
                file.toLowerCase().endsWith(".jpg") ||
                file.toLowerCase().endsWith(".jpeg") ||
                file.toLowerCase().endsWith(".gif") ||
                file.toLowerCase().endsWith(".webp") ||
                file.toLowerCase().endsWith(".svg") ||
                file.toLowerCase().endsWith(".ico")
            );
        });

        res.json(imageNames);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
