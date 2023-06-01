const alleSejlbådeURL = "http://localhost:8080/sejlbåde";

function hentAlleSejlbåde() {
    fetch(alleSejlbådeURL)
        .then(response => response.json())
        .then(data => {
            let tabelSejlbåde = document.querySelector("#tableBodySejlBåde");
            data.forEach(sejlbåd => {
                let kolonner = document.createElement("tr");

                let bådID = document.createElement("td");
                bådID.textContent = sejlbåd.id;
                kolonner.appendChild(bådID);

                let bådnavn = document.createElement("td");
                bådnavn.textContent = sejlbåd.bådNavn;
                kolonner.appendChild(bådnavn);

                let bådType = document.createElement("td");
                bådType.textContent = sejlbåd.bådType;
                kolonner.appendChild(bådType);

                let sletKnap = document.createElement("td");
                let sletButton = document.createElement("button");
                sletButton.textContent = "Slet";
                sletButton.addEventListener("click", function () {
                    // Funktion til fjernelse af data fra database
                    fjernFraDatabase(sejlbåd.id);
                });
                sletKnap.appendChild(sletButton);
                kolonner.appendChild(sletKnap);

                let opdaterKnap = document.createElement("td");
                const opdaterButton = document.createElement("button");
                opdaterButton.textContent = "Opdater";
                opdaterButton.addEventListener("click", function () {
                    // Redirect to the new HTML site for updating the data
                    window.location.href = "opdaterSejlBåd.html";
                });
                opdaterKnap.appendChild(opdaterButton);
                kolonner.appendChild(opdaterKnap);


                tabelSejlbåde.appendChild(kolonner);
            });
        })
        .catch(error => console.error(error));
}

// Funktion til fjernelse af data fra database
function fjernFraDatabase(id) {
    const deleteURL = `http://localhost:8080/sejlbåd/${id}`;

    fetch(deleteURL, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                alert("Data succesfuldt slettet fra databasen")
                location.reload()
            } else {
                console.error('Fejl ved at slette dataen fra databasen');
            }
        })
        .catch(error => console.error('Der opstod en fejl:', error));
}

// Funktion til opdatering af data i database
function opdaterDatabase(id) {
    const updateURL = `http://localhost:8080/sejlbåd/${id}`;
    const data = {
        bådNavn: "NytBådNavn",
        bådType: "NytBådType",
        id: id
    };

    fetch(updateURL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.ok) {
                console.log('Data succesfuldt opdateret i databasen');
            } else {
                console.error('Fejl ved at opdatere dataen i databasen');
            }
        })
        .catch(error => console.error('Der opstod en fejl:', error));
}

hentAlleSejlbåde();
