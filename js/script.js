// Seleziona gli elementi DOM
// Genera 5 numeri casuali unici e li mostra
// Avvia il timer di 30 secondi
// Nasconde i numeri dopo 30 secondi
// Mostra gli input per inserire i numeri
// Controlla i risultati inseriti
// Controlla se ci sono duplicati o input non validi
// Confronta con i numeri casuali
// Inizializza il gioco


// Seleziona gli elementi DOM
const numeriCasualiDiv = document.getElementById('numeriCasuali');
const timerDiv = document.getElementById('timer');
const inputNumeriDiv = document.getElementById('inputNumeri');
const risultatoDiv = document.getElementById('risultato');
const errorMsg = document.getElementById('errorMsg');

let numeriCasuali = [];

// Genera 5 numeri casuali unici e li mostra
function generaNumeriCasuali() {
    numeriCasuali = [];
    while (numeriCasuali.length < 5) {
        const numero = Math.floor(Math.random() * 100) + 1;
        if (!numeriCasuali.includes(numero)) {
            numeriCasuali.push(numero);
        }
    }
    numeriCasualiDiv.textContent = numeriCasuali.join(' - ');
    avviaTimer();
}

// Avvia il timer di 30 secondi
function avviaTimer() {
    let tempoRimasto = 30;
    const intervallo = setInterval(() => {
        timerDiv.textContent = `Tempo rimasto: ${tempoRimasto} secondi`;
        tempoRimasto--;

        if (tempoRimasto < 0) {
            clearInterval(intervallo);
            nascondiNumeri();
            mostraInput();
        }
    }, 1000);
}

// Nasconde i numeri dopo 30 secondi
function nascondiNumeri() {
    numeriCasualiDiv.textContent = '';
    timerDiv.textContent = '';
}

// Mostra gli input per inserire i numeri
function mostraInput() {
    inputNumeriDiv.style.display = 'block';
    inputNumeriDiv.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'inputNumero';
        input.maxLength = 3;
        inputNumeriDiv.appendChild(input);
    }

    const button = document.createElement('button');
    button.textContent = 'Invia';
    button.onclick = controllaRisultato;
    inputNumeriDiv.appendChild(button);

}

// Controlla i risultati inseriti
function controllaRisultato() {
    errorMsg.textContent = '';
    const valoriInseriti = [];
    const inputs = document.querySelectorAll('.inputNumero');

    // Controlla se ci sono duplicati o input non validi
    for (let input of inputs) {
        const valore = input.value.trim();
        if (!/^\d+$/.test(valore)) {
            errorMsg.textContent = 'Inserisci solo numeri validi!';
            return;
        }

        if (valoriInseriti.includes(valore)) {
            errorMsg.textContent = 'Non inserire numeri duplicati!';
            return;
        }

        valoriInseriti.push(parseInt(valore));
    }

    // Confronta con i numeri casuali
    const numeriIndovinati = numeriCasuali.filter(numero => valoriInseriti.includes(numero));

    risultatoDiv.textContent = `Hai indovinato ${numeriIndovinati.length} numero/i: ${numeriIndovinati.join(', ')}`;

}

// Inizializza il gioco
generaNumeriCasuali();

