/**
 * Manages coloring depending on a pokémon's type.
 * 
 * @param  {number} id - Current pokémon id.
 * @param  {string} position - Position where a color should be filled in.
 */
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

/**
 * Checks if a pokémon has a second type.
 * 
 * @param  {object} currentPokémon - JSON with all API data about the current pokémon.
 * @returns {boolen} 
 */
function secondaryTypeExists(currentPokémon) {
    return currentPokémon.types.length > 1;
}

/**
 * Adds the correct color CSS class depending on a pokémon's type in order to fill the pokédex entry background.
 * 
 * @param  {number} id - Current pokémon id.
 * @param  {string} typePrimary - First type of the pokémon.
 * @param  {string} typeSecondary - Second type of the pokémon.
 */
function fillTypeColorBackground(id, typePrimary, typeSecondary) {
    //flying is never primary type => normal/flying types are handled as primary flying types
    if (typePrimary == 'normal' && typeSecondary == 'flying') {
        typePrimary = 'flying';
    }
    document.getElementById(`pokédex-element-${id}`).classList.add(typePrimary);
}

/**
 * Adds the correct button color CSS class depending on a pokémon's type in order to fill type-button-background in pokédex.
 * 
 * @param  {number} id - Current pokémon id.
 * @param  {string} typePrimary - First type of the pokémon.
 * @param  {string} typeSecondary - Second type of the pokémon.
 */
function fillTypeColorBtnPokédex(id, typePrimary, typeSecondary) {

    document.getElementById(`pokédex-type-btn-slot1-${id}`).classList.add(`${typePrimary}-btn`);
    document.getElementById(`pokédex-type-btn-slot2-${id}`).classList.add(`${typeSecondary}-btn`);
}

/**
 * Adds the correct background picture depending on the pokémon's type.
 * 
 * @param  {number} id - Current pokémon id.
 * @param  {string} typePrimary - First type of the pokémon.
 * @param  {string} typeSecondary - Second type of the pokémon.
 */
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

/**
 * Adds the correct background layer depending on the pokémon's type.
 * 
 * @param  {number} id - Current pokémon id.
 * @param  {string} typePrimary - First type of the pokémon.
 * @param  {string} typeSecondary - Second type of the pokémon.
 */
function fillTypeColorLayer(id, typePrimary, typeSecondary) {

    //flying is never primary type => normal/flying types are handled as primary flying types
    if (typePrimary == 'normal' && typeSecondary == 'flying') {
        typePrimary = 'flying';
    }
    document.getElementById(`pokémon-entry-background-layer-${id}`).classList.add(`${typePrimary}-layer`);
}

/**
 * Adds the correct button color CSS class depending on a pokémon's type in order to fill type-button-background in pokémon single view.
 * 
 * @param  {number} id - Current pokémon id.
 * @param  {string} typePrimary - First type of the pokémon.
 * @param  {string} typeSecondary - Second type of the pokémon.
 */
function fillTypeColorBtnPokémon(id, typePrimary, typeSecondary) {
    document.getElementById(`pokémon-type-btn-slot1-${id}`).classList.add(`${typePrimary}-btn`);
    document.getElementById(`pokémon-type-btn-slot2-${id}`).classList.add(`${typeSecondary}-btn`);
}

/**
 * Corrects the font color for normal, steel and electric types from white (regular) to dark because of light background pictures.
 * 
 * @param  {number} id - Current pokémon id.
 */
 function correctTypeFontColor(id) {

    let typePrimary = currentPokémon.types[0].type['name'];
    let typeSecondary;
    let typeMatch = (typePrimary == 'normal' && typeSecondary != 'flying') || typePrimary == 'steel' || typePrimary == 'electric';

     //if secondary type exists
     if (secondaryTypeExists(currentPokémon)) {
        typeSecondary = currentPokémon.types[1].type['name'];
    }

    if (typeMatch) {
            document.getElementById(`pokémon-name-${id}`).style.color = 'rgb(50, 54, 53)';
            document.getElementById(`pokémon-number-${id}`).style.color = 'rgb(50, 54, 53)';
            document.getElementById(`pokémon-number-${id}`).style.fontWeight = '500';
    } 

}