let currentPokémon;

async function loadPokémon() {
    let url = 'https://pokeapi.co/api/v2/pokemon/charmander';
    let response = await fetch(url);
    currentPokémon = await response.json();
    
    console.log(currentPokémon);
    renderPokémonInfo();
}

function renderPokémonInfo() {

    let pokédex = document.getElementById('pokédex');
    let pokémonName = document.getElementById('pokémon-name');
    let pokémonNumber = document.getElementById('pokémon-number');
    let pokémonImage = document.getElementById('pokémon-image');

    pokédex.innerHTML += `<h2>${currentPokémon.name}</h2>`;
    pokédex.innerHTML += `<img src="${currentPokémon.sprites.other['official-artwork'].front_default}" alt="picture-${currentPokémon.name}">`;

    pokémonName.innerHTML = currentPokémon.name.charAt(0).toUpperCase() + currentPokémon.name.slice(1);
    pokémonNumber.innerHTML = '#00' + currentPokémon.game_indices[6].game_index;
    pokémonImage.innerHTML = `<img src="${currentPokémon.sprites.other['official-artwork'].front_default}" alt="picture-${currentPokémon.name}">`;
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