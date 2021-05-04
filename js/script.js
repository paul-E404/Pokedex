let currentPokémon;
let currentPokémonList = []; //for pageination
let fullPokémonList = [];
let id = -1;
let keyIsPressed = false;

let maxBodyHeight;          //for pageination
let currentLoading = false; //for pageination
let currentGen = 1;         //for pageination


async function checkForScrollTop(gen) {

    if (currentGen != gen) {
        clearOldGeneration(gen);
    }


    setInterval(async function () {
        maxBodyHeight = document.documentElement.offsetHeight - window.innerHeight;
        currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

        if (currentGen == 1) {

            if (currentScrollPosition == maxBodyHeight && currentLoading == false && id == 24) {
                currentLoading = true;
                await initGen('https://pokeapi.co/api/v2/pokemon?limit=25&offset=25', 1);
                console.log("END id", id);
            }

            if (currentScrollPosition == maxBodyHeight && currentLoading == false && id == 49) {
                currentLoading = true;
                await initGen('https://pokeapi.co/api/v2/pokemon?limit=25&offset=50', 1);
                console.log("END id", id);
            }

            if (currentScrollPosition == maxBodyHeight && currentLoading == false && id == 74) {
                currentLoading = true;
                await initGen('https://pokeapi.co/api/v2/pokemon?limit=25&offset=75', 1);
                console.log("END id", id);
            }

            if (currentScrollPosition == maxBodyHeight && currentLoading == false && id == 99) {
                currentLoading = true;
                await initGen('https://pokeapi.co/api/v2/pokemon?limit=25&offset=100', 1);
                console.log("END id", id);
            }

            if (currentScrollPosition == maxBodyHeight && currentLoading == false && id == 124) {
                currentLoading = true;
                await initGen('https://pokeapi.co/api/v2/pokemon?limit=25&offset=125', 1);
                console.log("END id", id);
            }

            if (currentScrollPosition == maxBodyHeight && currentLoading == false && id == 149) {
                currentLoading = true;
                await initGen('https://pokeapi.co/api/v2/pokemon?limit=1&offset=150', 1);
                console.log("END id", id);
            }
        }

        else if (currentGen == 2) {

            if (currentScrollPosition == maxBodyHeight && currentLoading == false && id == 24) {
                currentLoading = true;
                await initGen('https://pokeapi.co/api/v2/pokemon?limit=25&offset=176', 2);
                console.log("END id", id);
            }

            if (currentScrollPosition == maxBodyHeight && currentLoading == false && id == 49) {
                currentLoading = true;
                await initGen('https://pokeapi.co/api/v2/pokemon?limit=25&offset=201', 2);
                console.log("END id", id);
            }

            if (currentScrollPosition == maxBodyHeight && currentLoading == false && id == 74) {
                currentLoading = true;
                await initGen('https://pokeapi.co/api/v2/pokemon?limit=25&offset=226', 1);
                console.log("END id", id);
            }

        }

        else if (currentGen == 3) {

            if (currentScrollPosition == maxBodyHeight && currentLoading == false && id == 24) {
                currentLoading = true;
                await initGen('https://pokeapi.co/api/v2/pokemon?limit=25&offset=276', 3);
                console.log("END id", id);
            }

            if (currentScrollPosition == maxBodyHeight && currentLoading == false && id == 49) {
                currentLoading = true;
                await initGen('https://pokeapi.co/api/v2/pokemon?limit=25&offset=301', 3);
                console.log("END id", id);
            }

            if (currentScrollPosition == maxBodyHeight && currentLoading == false && id == 74) {
                currentLoading = true;
                await initGen('https://pokeapi.co/api/v2/pokemon?limit=25&offset=326', 3);
                console.log("END id", id);
            }

            if (currentScrollPosition == maxBodyHeight && currentLoading == false && id == 99) {
                currentLoading = true;
                await initGen('https://pokeapi.co/api/v2/pokemon?limit=25&offset=351', 3);
                console.log("END id", id);
            }

            if (currentScrollPosition == maxBodyHeight && currentLoading == false && id == 124) {
                currentLoading = true;
                await initGen('https://pokeapi.co/api/v2/pokemon?limit=10&offset=376', 3);
                console.log("END id", id);
            }

        }

        currentLoading = false;

    }, 500)

}

/**
 * Clears pokédex and resets variables for being able to show a new generation.
 * 
 * @param  {number} gen - Number of generation.
 */
function clearOldGeneration(gen) {
    alert("Generation ist nun eine andere!");
    currentPokémonList = [];
    fullPokémonList = [];
    id = -1;
    let pokédex = document.getElementById('pokédex');
    pokédex.innerHTML = '';
    currentGen = gen;
}

/**
 * Loads general pokémon generation API data.
 * 
 * @param  {string} url - URL with pokémon generation data for API request.
 * @param  {number} gen - Number of generation.
 */
async function initGen(url, gen) {
    console.log("INIT GEN AUSGEFÜHRT!");
    disableBtn(gen);

    //let pokédex = document.getElementById('pokédex');
    //pokédex.innerHTML = '';
    currentPokémonList = [];

    let response = await fetch(url);
    let pkmnList = await response.json();

    for (let i = 0; i < pkmnList.results.length; i++) {
        id++;
        currentPokémonURL = pkmnList.results[i].url;
        await loadPokémon(id, currentPokémonURL);
        console.log("id", id);
    }

    enableBtn(gen);
    console.log("currentPokémonList", currentPokémonList);
    console.log("fullPokémonList", fullPokémonList);
}

/**
 * Makes generation buttons funcionally and visually unclickable.
 * Ensures that no other generation can be chosen before one generation has finished loading.
 * This is important for the pokémon being shown in the correct order.
 */
function disableBtn() {
    let gen1Btn = document.getElementById('gen1-btn');
    let gen2Btn = document.getElementById('gen2-btn');
    let gen3Btn = document.getElementById('gen3-btn');

    let genBtnArray = [gen1Btn, gen2Btn, gen3Btn];

    for (let i = 0; i < genBtnArray.length; i++) {
        genBtnArray[i].disabled = true;
        genBtnArray[i].style.cursor = 'wait';
        genBtnArray[i].style.background = 'linear-gradient(rgb(223, 220, 220), rgb(155, 155, 155), rgb(95, 95, 95))';
        genBtnArray[i].style.textShadow = '0 1px 0 rgb(223, 220, 220)';
        genBtnArray[i].style.border = 'solid 3px rgb(194, 193, 193)';

    }
}

/**
 * Makes all generation buttons clickable again.
 */
function enableBtn() {
    let gen1Btn = document.getElementById('gen1-btn');
    let gen2Btn = document.getElementById('gen2-btn');
    let gen3Btn = document.getElementById('gen3-btn');

    let genBtnArray = [gen1Btn, gen2Btn, gen3Btn];

    for (let i = 0; i < genBtnArray.length; i++) {
        genBtnArray[i].disabled = false;
        genBtnArray[i].style.cursor = 'pointer';
        genBtnArray[i].style.background = 'linear-gradient(rgb(108, 137, 231), rgb(78, 89, 240), rgb(57, 68, 218))';
        genBtnArray[i].style.textShadow = '0 1px 0 rgb(108, 137, 231)';
        genBtnArray[i].style.border = 'solid 3px rgb(108, 137, 231)';

    }
}

/**
 * Loads detailed API data of all pokémon within a generation.
 * 
 * @param  {number} id - Current pokémon id.
 * @param  {string} currentPokémonURL - URL with detailed data to the current pokémon.
 */
async function loadPokémon(id, currentPokémonURL) {
    let url = currentPokémonURL;
    let response = await fetch(url);
    currentPokémon = await response.json();
    currentPokémonList.push(currentPokémon);
    fullPokémonList.push(currentPokémon);

    showPokédex(id);
    renderPokédexInfo(id);
}

/**
 * Converts the first letter to a capital letter.
 * 
 * @param  {string} string - String to be converted.
 * @returns {string}
 */
function upperCaseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Sorts a JSON array by keys being numbers.
 * 
 * @param  {object} JSONArrayOfNumbers - JSON array with keys being numbers.
 * @returns {number}
 */
function compareNumbers(JSONArrayOfNumbers) {
    JSONArrayOfNumbers.sort(function (a, b) {
        a = a.level;
        b = b.level;
        return a - b;
    });
}

/**
 * Listens for leftArrow and rightArrow keys being pressed in the pokémon single entry view in order to switch between entries by keyboard.
 * 
 * @param  {number} id - Current pokémon id.
 */
function listenForKeyDown(id) {
    document.onkeydown = function (e) {
        let key = e.code
        if (key == 'ArrowLeft' && keyIsPressed == false) {
            //Ensures that switching between entries is stopped when user remains on a key.
            keyIsPressed = true;
            openEntry(id - 1);
        }
        if (key == 'ArrowRight' && keyIsPressed == false) {
            keyIsPressed = true;
            openEntry(id + 1);
        }
    };
}

/**
 * Changes the keyIsPressed variable back to false if a key is released.
 * 
 * @param  {KeyboardEvent} 'keyup' - The KeyboardEvent that occured.
 */
document.addEventListener('keyup', function (e) {
    let key = e.code;
    if (keyIsPressed) {
        if (key == 'ArrowLeft' || key == 'ArrowRight') {
            keyIsPressed = false;
        }
    }
});