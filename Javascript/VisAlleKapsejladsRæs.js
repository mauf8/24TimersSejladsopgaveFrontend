const AlleKapsejladsRæs = "http://localhost:8080/kapsejladsræs";

function HentAlleKapsejladsRæs() {
    fetch(AlleKapsejladsRæs)
        .then(response => response.json())
        .then(data => {
            let tabelSejlbåde = document.querySelector("#tableBodyKapsejladsRæs");
            data.forEach(KapsejladsRæs => {
                let kolonner = document.createElement("tr");

                let bådID = document.createElement("td");
                bådID.textContent = KapsejladsRæs.id;
                kolonner.appendChild(bådID);

                let bådnavn = document.createElement("td");
                bådnavn.textContent = KapsejladsRæs.navn;
                kolonner.appendChild(bådnavn);

                let bådType = document.createElement("td");
                bådType.textContent = KapsejladsRæs.dato;
                kolonner.appendChild(bådType);

                let båd = document.createElement("td");
                //Her checker vi om bådNavn eksistere i KapsejladsRæs.sejlbåd, hvis den ikke eksistrer så vil det blive sat til "" - altså ingen ting
                båd.textContent = KapsejladsRæs.sejlbåd ? KapsejladsRæs.sejlbåd.bådNavn : ""; // Accessing bådNavn element
                kolonner.appendChild(båd);

                tabelSejlbåde.appendChild(kolonner);
            });
        })
        .catch(error => console.error(error));
}

// Call the function to populate the table
HentAlleKapsejladsRæs();