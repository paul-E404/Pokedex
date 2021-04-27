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