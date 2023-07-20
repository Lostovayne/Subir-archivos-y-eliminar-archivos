import { arrayImagenes } from "./functions.js";
const section = document.querySelector(".container");

window.addEventListener("DOMContentLoaded", function () {
    arrayImagenes.forEach((element) => {
        const imagen = document.createElement("img");
        imagen.className = "imagen";
        const div = document.createElement("div");
        div.style.width = "250px";
        div.style.height = "250px";
        div.style.border = "1px solid #f2f2f2";
        div.style.borderRadius = "8px";
        imagen.src = `../upload/${element}`;
        div.appendChild(imagen);
        section.appendChild(div);
    });
});
