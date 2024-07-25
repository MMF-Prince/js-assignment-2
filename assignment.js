const loadAllPlayer = () => {
    fetch('https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?t=Arsenal')
        .then((res) => res.json())
        .then((data) => {
            displayPlayers(data);
        });
};

const displayPlayers = (players) => {
    const playerContainer = document.getElementById("player-container");
    playerContainer.innerHTML = ''; 
    players.player.forEach((player) => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
            <img class="card-img" src=${player.strThumb} alt=""/>
            <h3>${player.strPlayer}</h3>
            <h4>${player.strTeam}</h4>
            <h5>Nationality: ${player.strNationality}</h5>
            <p>${player.strPosition}</p>
            <div class="details-addlist">
            <button id="player-details-${player.idPlayer}" onclick="handleDetails('${player.strDescriptionEN.slice(0, 100)}')">Details</button>
            <button onclick="handlePlayerlist('${player.strPlayer}','${player.strPosition}')">Add To List</button>
            </div>
        `;  
        playerContainer.appendChild(div);
    });
};

let playercount = 0;
let playing11 = [];

const handlePlayerlist = (name, position) => {
    if (playing11.includes(name)) {
        alert("This player is already in the team");
    } else if (playercount >= 11) {
        alert("Sorry!! You already have 11 players for the team.");
    } else {
        playercount++;
        document.getElementById("total").innerText = playercount;
        const container = document.getElementById("cart-main-container");
        const div = document.createElement("div");
        div.classList.add("cart-info");
        div.innerHTML = `
            <h3>${name}</h3>
            <h4>${position}</h4>
        `;
        container.appendChild(div);
        playing11.push(name);
    }
};

const handleSearchBox = (text) => {
    fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?t=Arsenal&p=${text}`)
        .then((res) => res.json())
        .then((data) => {
            displayPlayers(data);
        });
};

const handleDetails = (details) => {
    const modal = document.getElementById("myModal");
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <p>${details}</p>
        </div>
    `;
    modal.style.display = "block";
    const span = modal.querySelector(".close");
    span.onclick = () => {
        modal.style.display = "none";
    };
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
};

const makingForm = () => {
    const container = document.getElementById("form-la");
    const div = document.createElement("div");
    div.innerHTML = `
        <form id="my-form" class="example">
            <input id="input" type="text" placeholder="Search.." name="search2">
            <button id="submit" type="submit"><i class="fa fa-search"></i></button>
        </form>
    `;
    container.appendChild(div);
    document.getElementById("my-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const input1 = document.getElementById("input").value.trim();
        if (input1 === "") {
            alert("Please enter a search term.");
        } else {
            handleSearchBox(input1);
        }
    });
};

loadAllPlayer();
makingForm();
