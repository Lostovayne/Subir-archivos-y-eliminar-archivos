// import { arrayImagenes } from "./functions.js";
const section = document.querySelector(".container");

const fetchData = async () => {
    const data = await fetch("/GetAllimagenes");
    const json = await data.json();
    return json;
};

window.addEventListener("DOMContentLoaded", async function () {
    const arrayImagenes = await fetchData();
    console.log(arrayImagenes);
    console.log(arrayImagenes);
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
