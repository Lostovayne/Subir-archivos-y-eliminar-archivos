import { arrayImagenes } from "./functions.js";
const section = document.querySelector(".container");

window.addEventListener("DOMContentLoaded", function () {
    // arrayImagenes.forEach((element) => {
    //     const imagen = document.createElement("img");
    //     imagen.className = "imagen";
    //     const div = document.createElement("div");
    //     div.style.width = "250px";
    //     div.style.height = "250px";
    //     div.style.border = "1px solid #f2f2f2";
    //     div.style.borderRadius = "8px";
    //     div.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
    //     imagen.src = `../upload/${element}`;
    //     div.appendChild(imagen);
    //     section.appendChild(div);
    // });

    for (let i = 0; i < 8; i++) {
        const imagen = document.createElement("img");
        imagen.className = "imagen";
        const div = document.createElement("div");
        div.style.width = "220px";
        div.style.height = "220px";
        div.style.border = "1px solid #f2f2f2";
        div.style.borderRadius = "8px";
        div.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
        if (arrayImagenes[i]) {
            imagen.src = `../upload/${arrayImagenes[i]}`;
            imagen.addEventListener("click", () => {
                window.location.href = `/deleteimg/${arrayImagenes[i]}`;
            });
            div.appendChild(imagen);
        } else {
            const p = document.createElement("p");
            p.textContent = `${i + 1}`;
            div.appendChild(p);
        }

        section.appendChild(div);
    }
});
