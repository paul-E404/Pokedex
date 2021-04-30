let currentPokémon;
let currentPokémonList = [];
let id;
let keyIsPressed = false;

async function initGen1() {

    let pokédex = document.getElementById('pokédex');
    pokédex.innerHTML = '';
    currentPokémonList = [];

    let url = 'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0';
    let response = await fetch(url);
    let pkmnList = await response.json();

    for (let i = 0; i < pkmnList.results.length; i++) {
        id = i;
        currentPokémonURL = pkmnList.results[i].url;
        await loadPokémon(id, currentPokémonURL);
    }
    console.log("currentPokémonList", currentPokémonList);
}

async function initGen2() {

    let pokédex = document.getElementById('pokédex');
    pokédex.innerHTML = '';
    currentPokémonList = [];

    let url = 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=151';
    let response = await fetch(url);
    let pkmnList = await response.json();

    for (let i = 0; i < pkmnList.results.length; i++) {
        id = i;
        currentPokémonURL = pkmnList.results[i].url;
        await loadPokémon(id, currentPokémonURL);
    }
    console.log("currentPokémonList", currentPokémonList);
}

async function initGen3() {

    let pokédex = document.getElementById('pokédex');
    pokédex.innerHTML = '';
    currentPokémonList = [];

    let url = 'https://pokeapi.co/api/v2/pokemon?limit=135&offset=251';
    let response = await fetch(url);
    let pkmnList = await response.json();

    for (let i = 0; i < pkmnList.results.length; i++) {
        id = i;
        currentPokémonURL = pkmnList.results[i].url;
        await loadPokémon(id, currentPokémonURL);
    }
    console.log("currentPokémonList", currentPokémonList);
}

async function loadPokémon(id, currentPokémonURL) {
    let url = currentPokémonURL;
    let response = await fetch(url);
    currentPokémon = await response.json();

    currentPokémonList.push(currentPokémon);

    showPokédex(id);
    renderPokédexInfo(id);
}

function showPokédex(id) {
    let pokédex = document.getElementById('pokédex');
    pokédex.innerHTML += generateHTMLForPokédex(id);
    fillTypeColor(id, 'bg');
    fillTypeColor(id, 'btn-pokédex');
    /*   fillTypeBackgroundColor(id);
      fillTypeButtonColor(id); */
    renderPokédexInfo(id);
}

function generateHTMLForPokédex(id) {
    return `<div onclick="openEntry(${id});" id="pokédex-element-${id}" class="pokédex-element">
                <div id="pokédex-name-${id}" class="pokédex-name"></div>
                <div class="pokédex-type-box">
                    <button id="pokédex-type-btn-slot1-${id}" class="type-btn"></button>
                    <button id="pokédex-type-btn-slot2-${id}" class="type-btn d-none"></button>
                </div>
                <div id="pokédex-image-box-${id}" class="pokédex-image-box">
                </div>
            </div>`;
}



function fillTypeColor(id, position) {
    let typePrimary = currentPokémon.types[0].type['name'];
    let typeSecondary;

    //if secondary type exists
    if (secondaryTypeExists(currentPokémon)) {
        typeSecondary = currentPokémon.types[1].type['name'];
    }

    switch (position) {
        case 'bg': fillTypeColorBackground(id, typePrimary, typeSecondary); break;
        case 'btn-pokédex': fillTypeColorBtnPokédex(id, typePrimary, typeSecondary); break;
        case 'pic' : fillTypeColorBackgroundPicture(id, typePrimary, typeSecondary); break;
        case 'layer' : fillTypeColorLayer(id, typePrimary, typeSecondary); break;
        case 'btn-pokémon' : fillTypeColorBtnPokémon(id, typePrimary, typeSecondary); break;
        default: console.log("Keine Übereinstimmung bei fillTypeColor");
    }
}


function secondaryTypeExists(currentPokémon) {
    return currentPokémon.types.length > 1;
}


function fillTypeColorBackground(id, typePrimary, typeSecondary) {
    //flying is never primary type => normal/flying types are handled as primary flying types
    if (typePrimary == 'normal' && typeSecondary == 'flying') {
        typePrimary = 'flying';
    }
    document.getElementById(`pokédex-element-${id}`).classList.add(typePrimary);
}

    
  
    


function fillTypeColorBtnPokédex(id, typePrimary, typeSecondary) {

    document.getElementById(`pokédex-type-btn-slot1-${id}`).classList.add(`${typePrimary}-btn`);
    document.getElementById(`pokédex-type-btn-slot2-${id}`).classList.add(`${typeSecondary}-btn`);
}



function renderPokédexInfo(id) {

    let pokédexName = document.getElementById(`pokédex-name-${id}`);
    let pokédexTypeBtnSlot1 = document.getElementById(`pokédex-type-btn-slot1-${id}`);
    let pokédexTypeBtnSlot2 = document.getElementById(`pokédex-type-btn-slot2-${id}`);
    let pokédexImageBox = document.getElementById(`pokédex-image-box-${id}`);

    pokédexName.innerHTML = upperCaseFirstLetter(currentPokémon.name);
    pokédexTypeBtnSlot1.innerHTML = upperCaseFirstLetter(currentPokémon.types[0].type['name']);
    if (secondaryTypeExists(currentPokémon)) {
        pokédexTypeBtnSlot2.classList.remove('d-none');
        pokédexTypeBtnSlot2.innerHTML = upperCaseFirstLetter(currentPokémon.types[1].type['name']);
    }
    pokédexImageBox.innerHTML = `<img src="${currentPokémon.sprites.other['dream_world'].front_default}" alt="picture-${currentPokémon.name}">`;

}



function upperCaseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function openEntry(id) {

    console.log("id", id);

    //switch from first pokémon entry to last one by clicking left arrow
    if (id < 0) {
        id = currentPokémonList.length - 1;
    }

    if (id > currentPokémonList.length - 1) {
        id = 0;
    }

    currentPokémon = currentPokémonList[id];

    listenForKeyDown(id);

    showPokémon(id);
    let pokédexSingle = document.getElementById('pokédex-single');
    let openedEntryBg = document.getElementById('open-entry-bg');
    pokédexSingle.classList.remove('d-none');
    openedEntryBg.classList.remove('d-none');
}

function closeEntry() {
    let pokédexSingle = document.getElementById('pokédex-single');
    let openedEntryBg = document.getElementById('open-entry-bg');
    pokédexSingle.classList.add('d-none');
    openedEntryBg.classList.add('d-none');
}

function showPokémon(id) {
    let pokédexSingle = document.getElementById('pokédex-single');
    pokédexSingle.innerHTML = generateHTMLForSingleEntry(id);
    correctNormalTypeFontColor(id);
    fillTypeColor(id, 'pic');
    fillTypeColor(id, 'layer');
    fillTypeColor(id, 'btn-pokémon');
    renderPokémonInfo(id);
}

function generateHTMLForSingleEntry(id) {
    return `<img id="pokémon-entry-background-picture-${id}" class="pokémon-entry-background-picture" src="" alt="">
            <div class="pokémon-entry">
                <div id="pokémon-entry-background-layer-${id}" class="pokémon-entry-background-layer">

                </div>
                <div class="arrow-zone">
                    <i onclick="openEntry(${(id - 1) % currentPokémonList.length});" class="fas fa-chevron-left"></i>
                    <i onclick="closeEntry();" class="fas fa-times"></i>
                    <i onclick="openEntry(${(id + 1) % currentPokémonList.length});" class="fas fa-chevron-right"></i>
                </div>
                <div id="pokémon-number-${id}" class="pokémon-number">

                </div>
                <div id="pokémon-name-${id}" class="pokémon-name">

                </div>
                <div id="pokémon-type-box" class="pokémon-type-box">
                    <button id="pokémon-type-btn-slot1-${id}" class="type-btn">Fire</button>
                    <button id="pokémon-type-btn-slot2-${id}" class="type-btn d-none">Other</button>
                </div>
                <div id="pokémon-image-box-${id}" class="pokémon-image-box">

                </div>
                <div class="pokémon-info">
                    <div class="pokémon-info-headlines">
                        <div onclick="showInfoTable('about');" id="about">About</div>
                        <div onclick="showInfoTable('base-stats');" id="base-stats" class="noHighlighting">Base Stats</div>
                        <div onclick="showInfoTable('moves');" id="moves" class="noHighlighting">Moves</div>
                    </div>

                    <div class="pokémon-info-content">
                        <table id="about-table" class="about-table info-table">
                            <tbody>
                                <tr>
                                    <td>Height</td>
                                    <td id="pkmn-height-${id}"></td>
                                </tr>
                                <tr>
                                    <td>Weight</td>
                                    <td id="pkmn-weight-${id}"></td>
                                </tr>
                                <tr>
                                    <td>Abilities</td>
                                    <td id="pkmn-abilities-${id}"></td>
                                </tr>
                            </tbody>
                        </table>

                        <table id="base-stats-table" class="base-stats-table info-table">
                            <tbody>
                                <tr>
                                    <td>HP</td>
                                    <td id="hp-${id}"></td>
                                    <td>
                                        <div class="base-stats-bar-container">
                                            <div id="hp-bar" class="base-stats-bar-value"></div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Attack</td>
                                    <td id="attack-${id}"></td>
                                    <td>
                                        <div class="base-stats-bar-container">
                                            <div id="attack-bar" class="base-stats-bar-value"></div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Defense</td>
                                    <td id="defense-${id}"></td>
                                    <td>
                                        <div class="base-stats-bar-container">
                                            <div id="defense-bar" class="base-stats-bar-value"></div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Sp. Atk</td>
                                    <td id="sp-atk-${id}"></td>
                                    <td>
                                        <div class="base-stats-bar-container">
                                            <div id="sp-atk-bar" class="base-stats-bar-value"></div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Sp. Def</td>
                                    <td id="sp-def-${id}"></td>
                                    <td>
                                        <div class="base-stats-bar-container">
                                            <div id="sp-def-bar" class="base-stats-bar-value"></div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Speed</td>
                                    <td id="speed-${id}"></td>
                                    <td>
                                        <div class="base-stats-bar-container">
                                            <div id="speed-bar" class="base-stats-bar-value"></div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    
                        <table id="moves-table" class="moves-table info-table">
                            <thead>
                                <tr>
                                    <td>Level</td>
                                    <td>Move</td>
                                </tr>
                            </thead>
                            <tbody id="moves-table-tbody">

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>`
}


function correctNormalTypeFontColor(id) {

    let typePrimary = currentPokémon.types[0].type['name'];
    let typeSecondary;

     //if secondary type exists
     if (secondaryTypeExists(currentPokémon)) {
        typeSecondary = currentPokémon.types[1].type['name'];
    }

    if (typePrimary == 'normal' && typeSecondary != 'flying') {
            document.getElementById(`pokémon-name-${id}`).style.color = 'rgb(50, 54, 53)';
            document.getElementById(`pokémon-number-${id}`).style.color = 'rgb(50, 54, 53)';
            document.getElementById(`pokémon-number-${id}`).style.fontWeight = '500';
    } 

}

function fillTypeColorBackgroundPicture(id, typePrimary, typeSecondary) {

    //flying is never primary type => normal/flying types are handled as primary flying types
    if (typePrimary == 'normal' && typeSecondary == 'flying') {
        typePrimary = 'flying';
        document.getElementById(`pokémon-entry-background-picture-${id}`).src = 'img/flying.png';
    }
    else {
        document.getElementById(`pokémon-entry-background-picture-${id}`).src = `img/${typePrimary}.jpg`;
    }


}


function fillTypeColorLayer(id, typePrimary, typeSecondary) {

    //flying is never primary type => normal/flying types are handled as primary flying types
    if (typePrimary == 'normal' && typeSecondary == 'flying') {
        typePrimary = 'flying';
    }
    document.getElementById(`pokémon-entry-background-layer-${id}`).classList.add(`${typePrimary}-layer`);
}


function fillTypeColorBtnPokémon(id, typePrimary, typeSecondary) {
    document.getElementById(`pokémon-type-btn-slot1-${id}`).classList.add(`${typePrimary}-btn`);
    document.getElementById(`pokémon-type-btn-slot2-${id}`).classList.add(`${typeSecondary}-btn`);
}



function renderPokémonInfo(id) {

    console.log("renderPokémonInfo() wird aufgerufen!");

    let pokémonName = document.getElementById(`pokémon-name-${id}`);
    let pokémonNumber = document.getElementById(`pokémon-number-${id}`);
    let pokémonTypeBtnSlot1 = document.getElementById(`pokémon-type-btn-slot1-${id}`);
    let pokémonTypeBtnSlot2 = document.getElementById(`pokémon-type-btn-slot2-${id}`);
    let pokémonImageBox = document.getElementById(`pokémon-image-box-${id}`);

    pokémonName.innerHTML = upperCaseFirstLetter(currentPokémonList[id].name);
    pokémonNumber.innerHTML = '#' + ("000" + currentPokémonList[id].game_indices[6].game_index).slice(-3);
    pokémonTypeBtnSlot1.innerHTML = upperCaseFirstLetter(currentPokémonList[id].types[0].type['name']);
    if (currentPokémonList[id].types.length > 1) {
        pokémonTypeBtnSlot2.classList.remove('d-none');
        pokémonTypeBtnSlot2.innerHTML = upperCaseFirstLetter(currentPokémonList[id].types[1].type['name']);
    }
    pokémonImageBox.innerHTML = `<img src="${currentPokémonList[id].sprites.other['official-artwork'].front_default}" alt="picture-${currentPokémonList[id].name}">`;

    renderAbout(id);
    renderBaseStats(id);
    renderMoves(id);

}


function renderAbout(id) {

    let pkmnHeight = document.getElementById(`pkmn-height-${id}`);
    let pkmnWeight = document.getElementById(`pkmn-weight-${id}`);
    let pkmnAbilities = document.getElementById(`pkmn-abilities-${id}`);
    let abilitiesArr = [];

    pkmnHeight.innerHTML = currentPokémonList[id].height / 10 + " m";
    pkmnWeight.innerHTML = currentPokémonList[id].weight / 10 + " kg";
    for (let i = 0; i < currentPokémonList[id].abilities.length; i++) {
        let ability = currentPokémonList[id].abilities[i].ability['name'];
        abilitiesArr.push(ability);
    }
    pkmnAbilities.innerHTML = abilitiesArr.join(", ");

}


function renderBaseStats(id) {

    let hp = document.getElementById(`hp-${id}`);
    let attack = document.getElementById(`attack-${id}`);
    let defense = document.getElementById(`defense-${id}`);
    let spAtk = document.getElementById(`sp-atk-${id}`);
    let spDef = document.getElementById(`sp-def-${id}`);
    let speed = document.getElementById(`speed-${id}`);

    let hpValue = currentPokémonList[id].stats[0].base_stat;
    let attackValue = currentPokémonList[id].stats[1].base_stat;
    let defenseValue = currentPokémonList[id].stats[2].base_stat;
    let spAtkValue = currentPokémonList[id].stats[3].base_stat;
    let spDefValue = currentPokémonList[id].stats[4].base_stat;
    let speedValue = currentPokémonList[id].stats[5].base_stat;

    hp.innerHTML = hpValue;
    attack.innerHTML = attackValue;
    defense.innerHTML = defenseValue;
    spAtk.innerHTML = spAtkValue;
    spDef.innerHTML = spDefValue
    speed.innerHTML = speedValue

    renderBaseStatsBar(hpValue, attackValue, defenseValue, spAtkValue, spDefValue, speedValue);
}

function renderBaseStatsBar(hpValue, attackValue, defenseValue, spAtkValue, spDefValue, speedValue) {

    const maxBaseStats = [{ "maxHP": 255 }, { "maxAttack": 190 }, { "maxDefense": 230 }, { "maxSpAtk": 194 }, { "maxSpDef": 230 }, { "maxSpeed": 200 }];

    document.getElementById('hp-bar').style.width = `calc(var(--pokémon-entry-width) * 0.6 * (${hpValue} / ${maxBaseStats[0]['maxHP']})`;
    document.getElementById('attack-bar').style.width = `calc(var(--pokémon-entry-width) * 0.6 * (${attackValue} / ${maxBaseStats[1]['maxAttack']})`;
    document.getElementById('defense-bar').style.width = `calc(var(--pokémon-entry-width) * 0.6 * (${defenseValue} / ${maxBaseStats[2]['maxDefense']})`;
    document.getElementById('sp-atk-bar').style.width = `calc(var(--pokémon-entry-width) * 0.6 * (${spAtkValue} / ${maxBaseStats[3]['maxSpAtk']})`;
    document.getElementById('sp-def-bar').style.width = `calc(var(--pokémon-entry-width) * 0.6 * (${spDefValue} / ${maxBaseStats[4]['maxSpDef']})`;
    document.getElementById('speed-bar').style.width = `calc(var(--pokémon-entry-width) * 0.6 * (${speedValue} / ${maxBaseStats[5]['maxSpeed']})`;

}

function renderMoves(id) {

    //JSON-Array with all levels and moves
    levelAndMovesArray = [];

    for (let i = 0; i < currentPokémonList[id].moves.length; i++) {
        for (let j = 0; j < currentPokémonList[id].moves[i].version_group_details.length; j++) {
            let moveInfo = currentPokémonList[id].moves[i].version_group_details;
            if (moveLearnedByLevelUp(moveInfo, j)) {
                if (moveVersionRubySapphire(moveInfo, j)) {
                    let level = moveInfo[j].level_learned_at;
                    let move = currentPokémonList[id].moves[i].move['name'];
                    let levelAndMoveJSON = { "level": level, "move": move };
                    levelAndMovesArray.push(levelAndMoveJSON);
                }
            }
        }
    }
    compareNumbers(levelAndMovesArray);
    showMoves(levelAndMovesArray);
}


function moveLearnedByLevelUp(moveInfo, j) {
    return moveInfo[j].move_learn_method['name'] == 'level-up';
}


function moveVersionRubySapphire(moveInfo, j) {
    return moveInfo[j].version_group['name'] == 'ruby-sapphire';
}

function compareNumbers(JSONArrayOfNumbers) {
    JSONArrayOfNumbers.sort(function (a, b) {
        a = a.level;
        b = b.level;

        return a - b;
    });
}

function showMoves(levelAndMovesArray) {
    let movesTableTbody = document.getElementById('moves-table-tbody');
    for (let i = 0; i < levelAndMovesArray.length; i++) {
        let levelAndMove = levelAndMovesArray[i];
        movesTableTbody.innerHTML += generateHTMLForMovesTable(levelAndMove);
    }
}


function generateHTMLForMovesTable(levelAndMove) {
    return ` <tr>
                <td>${levelAndMove['level']}</td>
                <td>${levelAndMove['move']}</td>
             </tr>`;
}


function showInfoTable(info) {
    removeHighlighting(info);
    if (info == 'about') {
        document.getElementById('about-table').style.transform = 'translateX(0)';
        document.getElementById('base-stats-table').style.transform = 'translateX(calc(var(--pokémon-entry-width) + 40px))';
        document.getElementById('moves-table').style.transform = 'translateX(calc(var(--pokémon-entry-width)*2 + 80px))';
    }
    else if (info == 'base-stats') {
        document.getElementById('about-table').style.transform = 'translateX(calc(var(--pokémon-entry-width) * (-1) - 40px))';
        document.getElementById('base-stats-table').style.transform = 'translateX(0)';
        document.getElementById('moves-table').style.transform = 'translateX(calc(var(--pokémon-entry-width) + 40px))';
    }
    else if (info == 'moves') {
        document.getElementById('about-table').style.transform = 'translateX(calc(var(--pokémon-entry-width) * (-2) - 80px))';
        document.getElementById('base-stats-table').style.transform = 'translateX(calc(var(--pokémon-entry-width) * (-1) - 40px))';
        document.getElementById('moves-table').style.transform = 'translateX(0)';
    }
}

function removeHighlighting(info) {
    if (info == 'about') {
        document.getElementById('about').classList.remove('noHighlighting');
        document.getElementById('base-stats').classList.add('noHighlighting');
        document.getElementById('moves').classList.add('noHighlighting');
    }
    else if (info == 'base-stats') {
        document.getElementById('about').classList.add('noHighlighting');
        document.getElementById('base-stats').classList.remove('noHighlighting');
        document.getElementById('moves').classList.add('noHighlighting');
    }
    else if (info == 'moves') {
        document.getElementById('about').classList.add('noHighlighting');
        document.getElementById('base-stats').classList.add('noHighlighting');
        document.getElementById('moves').classList.remove('noHighlighting');
    }
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


