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
                    <button id="pokédex-type-btn-slot1-${id}" class="type-btn type-btn-pokédex"></button>
                    <button id="pokédex-type-btn-slot2-${id}" class="type-btn type-btn-pokédex d-none"></button>
                </div>
                <div id="pokédex-image-box-${id}" class="pokédex-image-box">
                </div>
            </div>`;
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