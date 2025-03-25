interface Time {
    id: number;
    nome: string;
    nomeCurto: string;
}

const formTime = document.getElementById("formTime") as HTMLFormElement;
const tabelaTimes = document.querySelector("#tbTimes tbody") as HTMLElement;
const times: Time[] = JSON.parse(localStorage.getItem("times") || "[]");

function atualizarTabelaTimes() {
    tabelaTimes.innerHTML = "";
    times.forEach((time: Time) => {
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

function salvarTime(event: Event) {
    event.preventDefault();
    const nome = (document.getElementById("nome") as HTMLInputElement).value;
    const nomeCurto = (document.getElementById("nomeCurto") as HTMLInputElement).value.toUpperCase();

    const novoTime: Time = {
        id: Date.now(),
        nome,
        nomeCurto
    };

    times.push(novoTime);
    localStorage.setItem("times", JSON.stringify(times));
    atualizarTabelaTimes();
    formTime.reset();
}

function removerTime(id: number) {
    const index = times.findIndex(time => time.id === id);
    if (index !== -1) {
        times.splice(index, 1);
        localStorage.setItem("times", JSON.stringify(times));
        atualizarTabelaTimes();
    }
}

function editarTime(id: number) {
    const time = times.find(time => time.id === id);
    if (!time) return;
    (document.getElementById("nome") as HTMLInputElement).value = time.nome;
    (document.getElementById("nomeCurto") as HTMLInputElement).value = time.nomeCurto;
    removerTime(id);
}

formTime.addEventListener("submit", salvarTime);
atualizarTabelaTimes();