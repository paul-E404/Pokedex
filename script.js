let currentPokémon;

async function loadPokémon() {
    let url = 'https://pokeapi.co/api/v2/pokemon/charmander';
    let response = await fetch(url);
    currentPokémon = await response.json();
    
    console.log(currentPokémon);
    renderPokémonInfo();
}

function renderPokémonInfo() {

    /* let pokédex = document.getElementById('pokédex'); */
    let pokédexName = document.getElementById('pokédex-name');
    let pokédexTypeBtnSlot1 = document.getElementById('pokédex-type-btn-slot1');
    let pokédexTypeBtnSlot2 = document.getElementById('pokédex-type-btn-slot2');
    let pokédexImageBox = document.getElementById('pokédex-image-box');


    let pokémonName = document.getElementById('pokémon-name');
    let pokémonNumber = document.getElementById('pokémon-number');
    let pokémonTypeBtnSlot1 = document.getElementById('pokémon-type-btn-slot1');
    let pokémonTypeBtnSlot2 = document.getElementById('pokémon-type-btn-slot2');
    let pokémonImageBox = document.getElementById('pokémon-image-box');

    pokédexName.innerHTML = upperCaseFirstLetter(currentPokémon.name);
    pokédexTypeBtnSlot1.innerHTML = upperCaseFirstLetter(currentPokémon.types[0].type['name']);
    if(currentPokémon.types.length > 1) {
        pokédexTypeBtnSlot2.classList.remove('d-none');
        pokédexTypeBtnSlot2.innerHTML = upperCaseFirstLetter(currentPokémon.types[1].type['name']);
    }
    pokédexImageBox.innerHTML = `<img src="${currentPokémon.sprites.other['official-artwork'].front_default}" alt="picture-${currentPokémon.name}">`;

 /*    pokédex.innerHTML += `<h2>${currentPokémon.name}</h2>`;
    pokédex.innerHTML += `<img src="${currentPokémon.sprites.other['official-artwork'].front_default}" alt="picture-${currentPokémon.name}">`; */

    pokémonTypeBtnSlot1.innerHTML = upperCaseFirstLetter(currentPokémon.types[0].type['name']);
    if(currentPokémon.types.length > 1) {
        pokémonTypeBtnSlot2.classList.remove('d-none');
        pokémonTypeBtnSlot2.innerHTML = upperCaseFirstLetter(currentPokémon.types[1].type['name']);
    }

    pokémonName.innerHTML = upperCaseFirstLetter(currentPokémon.name);
    pokémonNumber.innerHTML = '#00' + currentPokémon.game_indices[6].game_index;
    pokémonImageBox.innerHTML = `<img src="${currentPokémon.sprites.other['official-artwork'].front_default}" alt="picture-${currentPokémon.name}">`;
}

function upperCaseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function openEntry() {
    let pokédexSingle = document.getElementById('pokédex-single');
    pokédexSingle.classList.remove('d-none');
}

function closeEntry() {
    let pokédexSingle = document.getElementById('pokédex-single');
    pokédexSingle.classList.add('d-none');
}


function showInfoTable(info) {
    removeHighlighting(info);
    if(info == 'about') {
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
    if(info == 'about') {
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