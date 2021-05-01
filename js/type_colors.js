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


/**
 * Corrects the font color for normal and steel types from white (regular) to dark because of light background pictures.
 * 
 * @param  {} id
 */
 function correctTypeFontColor(id) {

    let typePrimary = currentPokémon.types[0].type['name'];
    let typeSecondary;

     //if secondary type exists
     if (secondaryTypeExists(currentPokémon)) {
        typeSecondary = currentPokémon.types[1].type['name'];
    }

    if ((typePrimary == 'normal' && typeSecondary != 'flying') || typePrimary == 'steel') {
            document.getElementById(`pokémon-name-${id}`).style.color = 'rgb(50, 54, 53)';
            document.getElementById(`pokémon-number-${id}`).style.color = 'rgb(50, 54, 53)';
            document.getElementById(`pokémon-number-${id}`).style.fontWeight = '500';
    } 

}

