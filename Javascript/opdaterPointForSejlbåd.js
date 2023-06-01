const findIDPåAlleBåde = "http://localhost:8080/id";
const tilføjPointURL = "http://localhost:8080/1/tilføjpoint?point=";

const dropdown = document.getElementById("dropdown");
let selectedVærdi;

dropdown.addEventListener("change", function() {
    selectedVærdi = dropdown.value;
});

const opdaterPointKnap = document.getElementById("opdaterPointTilSejladsBåd");
opdaterPointKnap.addEventListener("click", ÆndreURLOgSendData);


function ÆndreURLOgSendData(event) {
    event.preventDefault()
    let værdiAfInputFelt = document.getElementById("inputPoint").value;

    if (selectedVærdi && værdiAfInputFelt) {
        let opdateretURL = `http://localhost:8080/${selectedVærdi}/tilføjpoint?point=${værdiAfInputFelt}`;
        console.log(opdateretURL);

        var data = {
            "point": parseInt(værdiAfInputFelt)
        };

        putData(opdateretURL, data);
    } else {
        console.error("Den valgte værdi eller værdien i inputfeltet mangler. ")
    }
}

// Hent ID
document.addEventListener("DOMContentLoaded", function() {
    var dropdown = document.getElementById("dropdown");

    fetch(findIDPåAlleBåde)
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

function putData(url, data) {
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
                alert("Båden med Navnet: " + selectedVærdi + " blev opdateret i databasen");
                location.href ="forside.html"
            } else {
                console.error('Fejl ved afsendelse af data til databasen.');
            }
        })
        .catch(error => console.error('Der opstod en fejl:', error));
}
