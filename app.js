const busesByDestination = {
    "conalep169": ["Mololoa Villas del Prado", "Mololoa Álamo", "Llanitos y Prado", "Llanitos Aurora", "Llanitos 2 Álamo", "Progreso 5", "Progreso 4", "Progreso 3", "México", "Pedregal"],
    "uan": ["Mololoa Villas del Prado", "Mololoa Álamo", "Llanitos y Prado", "Llanitos Aurora", "Llanitos 2 Álamo", "Cantera Hospitales 1", "Cantera Hospitales 2", "Progreso 6-2", "Progreso 5", "Progreso 4", "Progreso 2", "Progreso 1", "Agrónomos Universidad", "México", "Sauces 2", "Sauces 1", "Río Suchiate", "Peñitas", "Amado Nervo", "UNINAY", "Cuauhtémoc"],
    "tecnologico": ["Mololoa Villas del Prado", "Mololoa Álamo", "Llanitos y Prado", "Llanitos Aurora", "Llanitos 2 Álamo", "Cantera Hospitales 2", "Cantera Hospitales 1", "Progreso 5", "Progreso 4", "Insurgentes", "Allende", "Sauces 2", "Sauces 1", "Amado Nervo"],
    "cecyten": ["Progreso 4", "Progreso 5", "Insurgentes", "Allende"],
    "cetis100": ["Progreso 6-2", "México", "Cuauhtémoc"]
};

const estimatedArrivalTimes = {
    "Mololoa Villas del Prado": 15,
    "Mololoa Álamo": 20,
    "Llanitos y Prado": 18,
    "Llanitos Aurora": 25,
    "Llanitos 2 Álamo": 22,
    "Progreso 5": 30,
    "Progreso 4": 35,
    "Progreso 3": 28,
    "México": 27,
    "Pedregal": 32,
    "Cantera Hospitales 1": 15,
    "Cantera Hospitales 2": 18,
    "Progreso 6-2": 33,
    "Progreso 2": 25,
    "Progreso 1": 20,
    "Agrónomos Universidad": 40,
    "Sauces 2": 12,
    "Sauces 1": 10,
    "Río Suchiate": 17,
    "Peñitas": 14,
    "Amado Nervo": 26,
    "UNINAY": 19,
    "Cuauhtémoc": 21,
    "Insurgentes": 29,
    "Allende": 24
};

const startHour = 6;
const endHour = 21;

function updateBusOptions() {
    const destination = document.getElementById("destinationSelect").value;
    const busSelect = document.getElementById("busSelect");

    busSelect.innerHTML = "<option value=''>Elige un camión...</option>";
    busSelect.disabled = !destination;

    if (destination && busesByDestination[destination]) {
        busesByDestination[destination].forEach(bus => {
            const option = document.createElement("option");
            option.value = bus;
            option.textContent = bus;
            busSelect.appendChild(option);
        });
    }
}

function showCredentialOption() {
    const passengerType = document.getElementById("passengerType").value;
    document.getElementById("credentialOption").style.display = (passengerType === "student" || passengerType === "child" || passengerType === "senior") ? "block" : "none";
}

function showArrivalTimeAndFare() {
    const bus = document.getElementById("busSelect").value;
    const passengerType = document.getElementById("passengerType").value;
    const hasCredential = document.getElementById("hasCredential").checked;
    const result = document.getElementById("result");

    if (!bus || !passengerType) {
        result.textContent = "Por favor, selecciona un camión y el tipo de pasajero.";
        return;
    }

    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    if (currentHour < startHour || currentHour >= endHour) {
        result.textContent = "Consulta fuera del horario de operación (6 a.m. - 9 p.m.). Intente de nuevo en horario válido.";
        return;
    }

    const travelTime = estimatedArrivalTimes[bus] || 0;
    currentTime.setMinutes(currentTime.getMinutes() + travelTime);
    const arrivalTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    let fare;

    switch (passengerType) {
        case "student":
            fare = hasCredential ? 5 : 10;
            break;
        case "child":
            const age = prompt("Ingresa la edad del niño:");
            if (age < 5) {
                fare = 0;
            } else if (age <= 12) {
                fare = 5;
            } else {
                fare = hasCredential ? 5 : 10;
            }
            break;
        case "senior":
            fare = hasCredential ? 5 : 10;
            break;
        case "normal":
            fare = 10;
            break;
        default:
            fare = 10;
    }

    result.textContent = `El camión ${bus} llegará a las ${arrivalTime}, tomando aproximadamente ${travelTime} minutos. El costo del pasaje es de $${fare} pesos.`;
}
