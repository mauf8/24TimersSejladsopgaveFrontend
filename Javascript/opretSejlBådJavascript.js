const postSejlbåde = "http://localhost:8080/sejlbåd";

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





// Lyt efter klik på knappen
document.getElementById("opret-sejlbåd-knap").addEventListener("click", function(event) {
    event.preventDefault();

    // Hent værdien fra input-feltet
    var bådNavnInput = document.getElementById("opretNavnFormInput").value;

    // Hent den valgte værdi fra dropdown-listen
    var bådTypeSelect = document.getElementById("dropdown");
    var bådTypeValue = bådTypeSelect.options[bådTypeSelect.selectedIndex].value;

    // Opret data-objektet med indtastede værdier
    var data = {
        "bådNavn": bådNavnInput,
        "bådType": bådTypeValue,
        "id": null
    };

    // Send data til serveren
    postData(postSejlbåde, data);
});

// Funktion til at sende data til serveren
function postData(url, data) {
    var bådNavnInput = document.getElementById("opretNavnFormInput").value;


    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.ok) {
                console.log('Data blev sendt succesfuldt til databasen.');
                alert("Båden med Navnet: " + bådNavnInput +  "er blevet oprettet i databasen")
                location.href = "forside.html"
            } else {
                console.error('Fejl ved afsendelse af data til databasen.');
            }
        })
        .catch(error => console.error('Der opstod en fejl:', error));
}
