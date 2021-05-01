let currentPokémon;
let currentPokémonList = [];
let id;
let keyIsPressed = false;

async function initGen(url, gen) {
    
    disableBtn(gen);

    let pokédex = document.getElementById('pokédex');
    pokédex.innerHTML = '';
    currentPokémonList = [];

    let response = await fetch(url);
    let pkmnList = await response.json();

    for (let i = 0; i < pkmnList.results.length; i++) {
        id = i;
        currentPokémonURL = pkmnList.results[i].url;
        await loadPokémon(id, currentPokémonURL);
    }

    enableBtn(gen);

    console.log("currentPokémonList", currentPokémonList);
}

function disableBtn(gen) {
    let gen1Btn = document.getElementById('gen1-btn');
    let gen2Btn = document.getElementById('gen2-btn');
    let gen3Btn = document.getElementById('gen3-btn');
    if (gen == 1) {
        gen2Btn.disabled = true;
        gen3Btn.disabled = true;
    }
    else if (gen == 2) {
        gen1Btn.disabled = true;
        gen3Btn.disabled = true;
    }
    else if (gen == 3) {
        gen1Btn.disabled = true;
        gen2Btn.disabled = true;
    }
}


function enableBtn(gen) {
    let gen1Btn = document.getElementById('gen1-btn');
    let gen2Btn = document.getElementById('gen2-btn');
    let gen3Btn = document.getElementById('gen3-btn');
    if (gen == 1) {
        gen2Btn.disabled = false;
        gen3Btn.disabled = false;
    }
    else if (gen == 2) {
        gen1Btn.disabled = false;
        gen3Btn.disabled = false;
    }
    else if (gen == 3) {
        gen1Btn.disabled = false;
        gen2Btn.disabled = false;
    }
}


async function loadPokémon(id, currentPokémonURL) {
    let url = currentPokémonURL;
    let response = await fetch(url);
    currentPokémon = await response.json();
    
    currentPokémonList.push(currentPokémon);

    showPokédex(id);
    renderPokédexInfo(id);
}











function upperCaseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}











function compareNumbers(JSONArrayOfNumbers) {
    JSONArrayOfNumbers.sort(function (a, b) {
        a = a.level;
        b = b.level;

        return a - b;
    });
}



function listenForKeyDown(id) {
    document.onkeydown = function (e) {
        let key = e.code
        if (key == 'ArrowLeft' && keyIsPressed == false) {
            keyIsPressed = true;
            openEntry(id - 1);
            console.log("id", id);
        }
        if (key == 'ArrowRight' && keyIsPressed == false) {
            keyIsPressed = true;
            openEntry(id + 1);
            console.log("id", id);
        }
    };
}

document.addEventListener('keyup', function (e) {
    let key = e.code;
    if (keyIsPressed == true) {
        if (key == 'ArrowLeft' || key == 'ArrowRight') {
            keyIsPressed = false;
        }
        console.log("keyIsPressed", keyIsPressed);
    }
});


