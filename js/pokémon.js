/**
 * Shows datailed information about a special pokémon in an extra window.
 * 
 * @param  {number} id - Current pokémon id.
 */
function showPokémon(id) {
    let pokédexSingle = document.getElementById('pokédex-single');
    pokédexSingle.innerHTML = generateHTMLForSingleEntry(id);
    correctTypeFontColor(id);
    fillTypeColor(id, 'pic');
    fillTypeColor(id, 'layer');
    fillTypeColor(id, 'btn-pokémon');
    renderPokémonInfo(id);
}

/**
 * Generates the html code for the single pokémon entry.
 * 
 *  @param  {number} id - Current pokémon id.
 *  @returns {HTMLDivElement}
 */
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

/**
 * Injects API data into the single pokémon entry.
 * 
 * @param  {number} id - Current pokémon id.
 */
function renderPokémonInfo(id) {

    let pokémonName = document.getElementById(`pokémon-name-${id}`);
    let pokémonNumber = document.getElementById(`pokémon-number-${id}`);
    let pokémonTypeBtnSlot1 = document.getElementById(`pokémon-type-btn-slot1-${id}`);
    let pokémonTypeBtnSlot2 = document.getElementById(`pokémon-type-btn-slot2-${id}`);
    let pokémonImageBox = document.getElementById(`pokémon-image-box-${id}`);

    pokémonName.innerHTML = upperCaseFirstLetter(currentPokémonList[id].name);
    pokémonNumber.innerHTML = showPokémonNumber(id);
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

/**
 * Shows the correct pokémon number depending on the number of digits.
 * 
 * @param  {number} id - Current pokémon id.
 * @returns {string}
 */
function showPokémonNumber(id) {
    return '#' + ("000" + currentPokémonList[id].game_indices[6].game_index).slice(-3);
}

/**
 * Injects API data into the single pokémon entry category "about" (general information).
 * 
 * @param  {number} id - Current pokémon id.
 */
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

/**
 * Injects API data into the single pokémon entry category "base stats" (base stats).
 * 
 * @param  {number} id - Current pokémon id.
 */
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

/**
 * Creates a progress bar for each base stat depending on the highest base stats a pokémon from generation 1 to 3 can have.
 * 
 * @param  {number} hpValue - Base stat hp from API data.
 * @param  {number} attackValue - Base stat attack from API data.
 * @param  {number} defenseValue - Base stat defense from API data.
 * @param  {number} spAtkValue - Base stat special attack from API data.
 * @param  {number} spDefValue - Base stat special defense from API data.
 * @param  {number} speedValue - Base stat speed from API data.
 */
function renderBaseStatsBar(hpValue, attackValue, defenseValue, spAtkValue, spDefValue, speedValue) {

    const maxBaseStats = [{ "maxHP": 255 }, { "maxAttack": 180 }, { "maxDefense": 230 }, { "maxSpAtk": 180 }, { "maxSpDef": 230 }, { "maxSpeed": 180 }];

    document.getElementById('hp-bar').style.width = `calc(var(--pokémon-entry-width) * 0.6 * (${hpValue} / ${maxBaseStats[0]['maxHP']})`;
    document.getElementById('attack-bar').style.width = `calc(var(--pokémon-entry-width) * 0.6 * (${attackValue} / ${maxBaseStats[1]['maxAttack']})`;
    document.getElementById('defense-bar').style.width = `calc(var(--pokémon-entry-width) * 0.6 * (${defenseValue} / ${maxBaseStats[2]['maxDefense']})`;
    document.getElementById('sp-atk-bar').style.width = `calc(var(--pokémon-entry-width) * 0.6 * (${spAtkValue} / ${maxBaseStats[3]['maxSpAtk']})`;
    document.getElementById('sp-def-bar').style.width = `calc(var(--pokémon-entry-width) * 0.6 * (${spDefValue} / ${maxBaseStats[4]['maxSpDef']})`;
    document.getElementById('speed-bar').style.width = `calc(var(--pokémon-entry-width) * 0.6 * (${speedValue} / ${maxBaseStats[5]['maxSpeed']})`;

}

/**
 * Fetches the API data regarding moves learned by level up and saves them into a JSON array.
 * 
 * @param  {number} id - Current pokémon id.
 */
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

/**
 * Fetches only the moves which are learned by level up.
 * 
 * @param  {object} moveInfo - JSON array with all information about a special move.
 * @param  {number} j - Index of the current version of a special move.
 * @returns {boolen}
 */
function moveLearnedByLevelUp(moveInfo, j) {
    return moveInfo[j].move_learn_method['name'] == 'level-up';
}

/**
 * Fetches only the moves which are learned in the third generation (ruby and sapphire).
 * 
 * @param  {object} moveInfo - JSON array with all information about a special move.
 * @param  {number} j - Index of the current version of a special move.
 * @returns {boolen}
 */
function moveVersionRubySapphire(moveInfo, j) {
    return moveInfo[j].version_group['name'] == 'ruby-sapphire';
}

/**
 * Injects the filtered API data into the single pokémon entry category "moves".
 * 
 * @param  {object} levelAndMovesArray - JSON array with filtered level and move information about a special pokémon.
 */
function showMoves(levelAndMovesArray) {
    let movesTableTbody = document.getElementById('moves-table-tbody');
    for (let i = 0; i < levelAndMovesArray.length; i++) {
        let levelAndMove = levelAndMovesArray[i];
        movesTableTbody.innerHTML += generateHTMLForMovesTable(levelAndMove);
    }
}

/**
 * Generates html code for showing level and move information.
 * 
 * @param  {object} levelAndMove - JSON with level and name of a special move.
 * @returns {HTMLDivElement}
 */
function generateHTMLForMovesTable(levelAndMove) {
    return ` <tr>
                <td>${levelAndMove['level']}</td>
                <td>${levelAndMove['move']}</td>
             </tr>`;
}

/**
 * Slides in current information within a single pokémon entry.
 * 
 * @param  {string} info - Category of information (about, base stats or moves).
 */
function showInfoTable(info) {

    let aboutTable = document.getElementById('about-table');
    let baseStatsTable = document.getElementById('base-stats-table');
    let movesTable = document.getElementById('moves-table');

    toggleHighlighting(info);
    if (info == 'about') {
        aboutTable.style.transform = 'translateX(0)';
        baseStatsTable.style.transform = 'translateX(calc(var(--pokémon-entry-width) + 40px))';
        movesTable.style.transform = 'translateX(calc(var(--pokémon-entry-width)*2 + 80px))';
    }
    else if (info == 'base-stats') {
        aboutTable.style.transform = 'translateX(calc(var(--pokémon-entry-width) * (-1) - 40px))';
        baseStatsTable.style.transform = 'translateX(0)';
        movesTable.style.transform = 'translateX(calc(var(--pokémon-entry-width) + 40px))';
    }
    else if (info == 'moves') {
        aboutTable.style.transform = 'translateX(calc(var(--pokémon-entry-width) * (-2) - 80px))';
        baseStatsTable.style.transform = 'translateX(calc(var(--pokémon-entry-width) * (-1) - 40px))';
        movesTable.style.transform = 'translateX(0)';
    }
}

/**
 * Highlights the headline the user has clicked on.
 * 
 * @param  {string} info - Category of information (about, base stats or moves).
 */
function toggleHighlighting(info) {

    let aboutHeadline = document.getElementById('about');
    let baseStatsHeadline = document.getElementById('base-stats');
    let movesHeadline = document.getElementById('moves');

    if (info == 'about') {
        aboutHeadline.classList.remove('noHighlighting');
        baseStatsHeadline.classList.add('noHighlighting');
        movesHeadline.classList.add('noHighlighting');
    }
    else if (info == 'base-stats') {
        aboutHeadline.classList.add('noHighlighting');
        baseStatsHeadline.classList.remove('noHighlighting');
        movesHeadline.classList.add('noHighlighting');
    }
    else if (info == 'moves') {
        aboutHeadline.classList.add('noHighlighting');
        baseStatsHeadline.classList.add('noHighlighting');
        movesHeadline.classList.remove('noHighlighting');
    }
}