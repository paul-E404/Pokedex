let currentPokémon;
let currentPokémonList = []; //for pagination
let fullPokémonList = [];
let id = -1;
let keyIsPressed = false;

let maxBodyHeight;          //for pagination
let currentScrollPosition;  //for pagination
let endOfThePage;           //for pagination
let currentLoading = false; //for pagination
let currentGen = 1;         //for pagination
const LIMIT = 25;           //for pagination


/**
 * Checks if the user has scrolled till the end of the page in order to load further content.
 * This important to pangination.
 * 
 * @param  {number} gen - Number of current generation.
 */
async function checkForScrollTop(gen) {

    clearOldGeneration(gen);

    setInterval(async function () {
        maxBodyHeight = document.documentElement.offsetHeight - window.innerHeight;
        currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        endOfThePage = currentScrollPosition == maxBodyHeight;

        if (currentGen == 1) {
            await splitGen1();
        }
        else if (currentGen == 2) {
            await splitGen2();
        }
        else if (currentGen == 3) {
            await splitGen3();
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
    currentPokémonList = [];
    fullPokémonList = [];
    id = -1;
    let pokédex = document.getElementById('pokédex');
    pokédex.innerHTML = '';
    currentGen = gen;
}

/**
 * Splits generation 1 into loading parts for pagination.
 */
async function splitGen1() {

    for (let i = 0; i < 5; i++) {
        let offset = 25 + i * LIMIT;
        if (checkForLoadingNextPart(i)) {
            currentLoading = true;
            await initGen(`https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${offset}`, 1);
            console.log("END id", id);
        }
    }
    
    //Last part has less entries than 25 (= LIMIT).
    if (endOfThePage && currentLoading == false && id == 149) {
        currentLoading = true;
        await initGen('https://pokeapi.co/api/v2/pokemon?limit=1&offset=150', 1);
        console.log("END id", id);
    }
}

/**
 * Splits generation 2 into loading parts for pagination.
 */
async function splitGen2() {

    for (let i = 0; i < 3; i++) {
        let offset = 176 + i * LIMIT;
        if (checkForLoadingNextPart(i)) {
            currentLoading = true;
            await initGen(`https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${offset}`, 2);
            console.log("END id", id);
        }
    }
}

/**
 * Splits generation 3 into loading parts for pagination.
 */
async function splitGen3() {

    for (let i = 0; i < 4; i++) {
        let offset = 276 + i * LIMIT;
        if (checkForLoadingNextPart(i)) {
            currentLoading = true;
            await initGen(`https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${offset}`, 3);
            console.log("END id", id);
        }
    }

    //Last part has less entries than 25 (= LIMIT).
    if (endOfThePage && currentLoading == false && id == 124) {
        currentLoading = true;
        await initGen('https://pokeapi.co/api/v2/pokemon?limit=10&offset=376', 3);
        console.log("END id", id);
    }
}

/**
 * Checks if the requirements are reached for loading next part.
 * 
 * @param  {number} i - Part number.
 */
function checkForLoadingNextPart(i) {
    return endOfThePage && currentLoading == false && id == (24 + i * LIMIT);
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