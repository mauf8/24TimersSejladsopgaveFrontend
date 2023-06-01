const PUTSejlbåde = "http://localhost:8080/sejlbåd";

document.addEventListener("DOMContentLoaded", function() {
    var dropdownListURL = "http://localhost:8080/bådtyper";
    var dropdown = document.getElementById("dropdown");

    fetch(dropdownListURL)
        .then(response => response.json())
        .then(data => {
            data.forEach(option => {
                var optionElement = document.createElement("option");
                optionElement.textContent = option;
                dropdown.appendChild(optionElement);
            });
        })
        .catch(error => console.error(error));
});

// Hent ID
document.addEventListener("DOMContentLoaded", function() {
    var dropdownListURL = "http://localhost:8080/id";
    var dropdown = document.getElementById("dropdownID");

    fetch(dropdownListURL)
        .then(response => response.json())
        .then(data => {
            data.forEach(option => {
                var optionElement = document.createElement("option");
                optionElement.textContent = option;
                dropdown.appendChild(optionElement);
            });
        })
        .catch(error => console.error(error));
});

// Lyt efter klik på knappen
document.getElementById("opret-sejlbåd-knap").addEventListener("click", function(event) {
    event.preventDefault();

    // Hent værdien fra input-feltet
    var bådNavnInput = document.getElementById("opretNavnFormInput").value;

    // Hent den valgte værdi fra dropdown-listen
    var bådTypeSelect = document.getElementById("dropdown");
    var bådTypeValue = bådTypeSelect.options[bådTypeSelect.selectedIndex].value;

    // Hent den valgte værdi fra dropdown-listen for ID
    var bådIDSelect = document.getElementById("dropdownID");
    var bådIDValue = bådIDSelect.options[bådIDSelect.selectedIndex].value;

    // Opret data-objektet med indtastede værdier
    var data = {
        "bådNavn": bådNavnInput,
        "bådType": bådTypeValue,
        "id": bådIDValue
    };

    // Send data til serveren
    putData(PUTSejlbåde, data);
    console.log(data)
});

// Funktion til at sende data til serveren
function putData(url, data) {
    var bådNavnInput = document.getElementById("opretNavnFormInput").value;

    fetch(url, {
        method: 'PUT', // Use PUT method to update the boat entry
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.ok) {
                console.log('Data blev sendt succesfuldt til databasen.');
                alert("Båden med Navnet: " + bådNavnInput + " blev opdateret i databasen");
            } else {
                console.error('Fejl ved afsendelse af data til databasen.');
            }
        })
        .catch(error => console.error('Der opstod en fejl:', error));
}
