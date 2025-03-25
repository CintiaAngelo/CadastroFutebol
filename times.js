"use strict";
const formTime = document.getElementById("formTime");
const tabelaTimes = document.querySelector("#tbTimes tbody");
const times = JSON.parse(localStorage.getItem("times") || "[]");
function atualizarTabelaTimes() {
    tabelaTimes.innerHTML = "";
    times.forEach((time) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${time.nome}</td>
            <td>${time.nomeCurto}</td>
            <td>
                <button class="btn-editar" onclick="editarTime(${time.id})">Editar</button>
                <button class="btn-remover" onclick="removerTime(${time.id})">Remover</button>
            </td>
        `;
        tabelaTimes.appendChild(row);
    });
}
function salvarTime(event) {
    event.preventDefault();
    const nome = document.getElementById("nome").value;
    const nomeCurto = document.getElementById("nomeCurto").value.toUpperCase();
    const novoTime = {
        id: Date.now(),
        nome,
        nomeCurto
    };
    times.push(novoTime);
    localStorage.setItem("times", JSON.stringify(times));
    atualizarTabelaTimes();
    formTime.reset();
}
function removerTime(id) {
    const index = times.findIndex(time => time.id === id);
    if (index !== -1) {
        times.splice(index, 1);
        localStorage.setItem("times", JSON.stringify(times));
        atualizarTabelaTimes();
    }
}
function editarTime(id) {
    const time = times.find(time => time.id === id);
    if (!time)
        return;
    document.getElementById("nome").value = time.nome;
    document.getElementById("nomeCurto").value = time.nomeCurto;
    removerTime(id);
}
formTime.addEventListener("submit", salvarTime);
atualizarTabelaTimes();
