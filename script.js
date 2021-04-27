let currentPokémon;

async function loadPokémon() {
    let url = 'https://pokeapi.co/api/v2/pokemon/charmander';
    let response = await fetch(url);
    currentPokémon = await response.json();

    console.log(currentPokémon);
    renderPokédexInfo();
}

function renderPokédexInfo() {

    let pokédexName = document.getElementById('pokédex-name');
    let pokédexTypeBtnSlot1 = document.getElementById('pokédex-type-btn-slot1');
    let pokédexTypeBtnSlot2 = document.getElementById('pokédex-type-btn-slot2');
    let pokédexImageBox = document.getElementById('pokédex-image-box');

    pokédexName.innerHTML = upperCaseFirstLetter(currentPokémon.name);
    pokédexTypeBtnSlot1.innerHTML = upperCaseFirstLetter(currentPokémon.types[0].type['name']);
    if (currentPokémon.types.length > 1) {
        pokédexTypeBtnSlot2.classList.remove('d-none');
        pokédexTypeBtnSlot2.innerHTML = upperCaseFirstLetter(currentPokémon.types[1].type['name']);
    }
    pokédexImageBox.innerHTML = `<img src="${currentPokémon.sprites.other['official-artwork'].front_default}" alt="picture-${currentPokémon.name}">`;

}



function upperCaseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function openEntry() {
    renderPokémonInfo();
    let pokédexSingle = document.getElementById('pokédex-single');
    pokédexSingle.classList.remove('d-none');
}

function closeEntry() {
    let pokédexSingle = document.getElementById('pokédex-single');
    pokédexSingle.classList.add('d-none');
}

function renderPokémonInfo() {

    console.log("renderPokémonInfo() wird aufgerufen!");

    let pokémonName = document.getElementById('pokémon-name');
    let pokémonNumber = document.getElementById('pokémon-number');
    let pokémonTypeBtnSlot1 = document.getElementById('pokémon-type-btn-slot1');
    let pokémonTypeBtnSlot2 = document.getElementById('pokémon-type-btn-slot2');
    let pokémonImageBox = document.getElementById('pokémon-image-box');

    pokémonName.innerHTML = upperCaseFirstLetter(currentPokémon.name);
    pokémonNumber.innerHTML = '#00' + currentPokémon.game_indices[6].game_index;
    pokémonTypeBtnSlot1.innerHTML = upperCaseFirstLetter(currentPokémon.types[0].type['name']);
    if (currentPokémon.types.length > 1) {
        pokémonTypeBtnSlot2.classList.remove('d-none');
        pokémonTypeBtnSlot2.innerHTML = upperCaseFirstLetter(currentPokémon.types[1].type['name']);
    }
    pokémonImageBox.innerHTML = `<img src="${currentPokémon.sprites.other['official-artwork'].front_default}" alt="picture-${currentPokémon.name}">`;

    renderAbout();
    renderBaseStats();
    renderMoves();

}


function renderAbout() {

    let pkmnHeight = document.getElementById('pkmn-height');
    let pkmnWeight = document.getElementById('pkmn-weight');
    let pkmnAbilities = document.getElementById('pkmn-abilities');
    let abilitiesArr = [];

    pkmnHeight.innerHTML = currentPokémon.height / 10 + " m";
    pkmnWeight.innerHTML = currentPokémon.weight / 10 + " kg";
    for (let i = 0; i < currentPokémon.abilities.length; i++) {
        let ability = currentPokémon.abilities[i].ability['name'];
        abilitiesArr.push(ability);
    }
    pkmnAbilities.innerHTML = abilitiesArr.join(", ");

}


function renderBaseStats() {

    let hp = document.getElementById('hp');
    let attack = document.getElementById('attack');
    let defense = document.getElementById('defense');
    let spAtk = document.getElementById('sp-atk');
    let spDef = document.getElementById('sp-def');
    let speed = document.getElementById('speed');

    let hpValue = currentPokémon.stats[0].base_stat;
    let attackValue = currentPokémon.stats[1].base_stat;
    let defenseValue = currentPokémon.stats[2].base_stat;
    let spAtkValue = currentPokémon.stats[3].base_stat;
    let spDefValue = currentPokémon.stats[4].base_stat;
    let speedValue = currentPokémon.stats[5].base_stat;

    hp.innerHTML = hpValue;
    attack.innerHTML = attackValue;
    defense.innerHTML = defenseValue;
    spAtk.innerHTML = spAtkValue;
    spDef.innerHTML = spDefValue
    speed.innerHTML = speedValue

    renderBaseStatsBar(hpValue, attackValue, defenseValue, spAtkValue, spDefValue, speedValue);
}

function renderBaseStatsBar(hpValue, attackValue, defenseValue, spAtkValue, spDefValue, speedValue) {
    const maxHP = 255;
    const maxAttack = 190;
    const maxDefense = 230;
    const maxSpAtk = 194;
    const maxSpDef = 230;
    const maxSpeed = 200;

    document.getElementById('hp-bar').style.width = `calc(var(--pokémon-entry-width) * 0.6 * (${hpValue} / ${maxHP})`;
    document.getElementById('attack-bar').style.width = `calc(var(--pokémon-entry-width) * 0.6 * (${attackValue} / ${maxAttack})`;
    document.getElementById('defense-bar').style.width = `calc(var(--pokémon-entry-width) * 0.6 * (${defenseValue} / ${maxDefense})`;
    document.getElementById('sp-atk-bar').style.width = `calc(var(--pokémon-entry-width) * 0.6 * (${spAtkValue} / ${maxSpAtk})`;
    document.getElementById('sp-def-bar').style.width = `calc(var(--pokémon-entry-width) * 0.6 * (${spDefValue} / ${maxSpDef})`;
    document.getElementById('speed-bar').style.width = `calc(var(--pokémon-entry-width) * 0.6 * (${speedValue} / ${maxSpeed})`;

}

function renderMoves() {
   
    levelAndMovesArray = [];

    for (let i = 0; i < currentPokémon.moves.length; i++) {
        for (let j = 0; j < currentPokémon.moves[i].version_group_details.length; j++) {
            let moveInfo = currentPokémon.moves[i].version_group_details;
            if (moveLearnedByLevelUp(moveInfo, j)) {
                if (moveVersionRubySapphire(moveInfo, j)) {
                    let level = moveInfo[j].level_learned_at;
                    let move = currentPokémon.moves[i].move['name'];
                    let levelAndMoveJSON = {"level" : level, "move" : move};
                    levelAndMovesArray.push(levelAndMoveJSON);
                }
            }
            
        }
    }
    console.log("levelAndMovesArray", levelAndMovesArray);
    showMoves(levelAndMovesArray);
}


function moveLearnedByLevelUp(moveInfo, j) {
    return moveInfo[j].move_learn_method['name'] == 'level-up';
}


function moveVersionRubySapphire(moveInfo, j) {
    return moveInfo[j].version_group['name'] == 'ruby-sapphire';
}


function showMoves(levelAndMovesArray) {
    let movesTableTbody = document.getElementById('moves-table-tbody');
    for (let i = 0; i < levelAndMovesArray.length; i++) {
        let levelAndMove = levelAndMovesArray[i];
        movesTableTbody.innerHTML += generateHTMLForMovesTable(levelAndMove);
        console.log("levelAndMove", levelAndMove);
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


