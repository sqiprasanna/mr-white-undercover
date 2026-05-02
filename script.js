// --- CONFIG & DATA ---
const WORD_PAIRS = [
    ["Apple", "Pear"], ["Coffee", "Tea"], ["Cat", "Dog"],
    ["Moon", "Sun"], ["Violin", "Cello"], ["Phone", "Tablet"],
    ["Pizza", "Pasta"], ["Forest", "Jungle"], ["Bicycle", "Motorcycle"],
    ["Doctor", "Nurse"], ["King", "Queen"], ["Ocean", "Sea"]
];

// --- STATE MANAGEMENT ---
let gameState = {
    names: [],
    roles: {}, // name -> { type, word }
    alive: {}, // name -> boolean
    config: { undercover: 1, mrwhite: 1 },
    seed: null,
    isHost: false,
    currentPlayer: null
};

// --- DOM ELEMENTS ---
const screens = {
    setup: document.getElementById('setup-screen'),
    lobby: document.getElementById('lobby-screen'),
    join: document.getElementById('join-screen'),
    reveal: document.getElementById('reveal-screen'),
    board: document.getElementById('game-board-screen')
};

// --- UTILS ---
function showScreen(screenId) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[screenId].classList.add('active');
    window.scrollTo(0, 0);
}

function generateSeed() {
    return Math.random().toString(36).substring(2, 9);
}

// Simple deterministic random based on seed
function seededRandom(seed) {
    let x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

function shuffle(array, seed) {
    let m = array.length, t, i;
    let s = 0;
    // Simple hash for seed string
    for(let j=0; j<seed.length; j++) s += seed.charCodeAt(j);
    
    while (m) {
        i = Math.floor(seededRandom(s++) * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}

// --- SETUP LOGIC ---
function addPlayerInput(name = "") {
    const container = document.getElementById('player-list');
    const div = document.createElement('div');
    div.className = 'player-input-row';
    div.innerHTML = `
        <input type="text" class="player-name-input" placeholder="Player Name" value="${name}">
        <button class="remove-player-btn danger-btn" style="width: 50px;">×</button>
    `;
    container.appendChild(div);

    div.querySelector('.remove-player-btn').onclick = () => {
        if (document.querySelectorAll('.player-input-row').length > 4) {
            div.remove();
        } else {
            alert("Minimum 4 players required.");
        }
    };
}

// Initialize setup with 4 players
for (let i = 0; i < 4; i++) addPlayerInput();
document.getElementById('add-player-btn').onclick = () => addPlayerInput();

// --- GAME LOGIC ---
function startGame() {
    const nameInputs = document.querySelectorAll('.player-name-input');
    const names = Array.from(nameInputs).map(i => i.value.trim()).filter(n => n !== "");
    
    if (names.length < 4) {
        alert("At least 4 players needed.");
        return;
    }

    const uCount = parseInt(document.getElementById('undercover-count').value);
    const wCount = parseInt(document.getElementById('mrwhite-count').value);
    
    if (uCount + wCount >= names.length - 1) {
        alert("Too many special roles for this number of players.");
        return;
    }

    const customCiv = document.getElementById('word-civilian').value.trim();
    const customUnd = document.getElementById('word-undercover').value.trim();
    
    let words;
    if (customCiv && customUnd) {
        words = [customCiv, customUnd];
    } else {
        words = WORD_PAIRS[Math.floor(Math.random() * WORD_PAIRS.length)];
    }

    const seed = generateSeed();
    
    // Create state object
    const state = {
        n: names,
        c: [uCount, wCount],
        w: words,
        s: seed
    };

    // Encode state to URL
    const jsonString = JSON.stringify(state);
    const encodedState = btoa(unescape(encodeURIComponent(jsonString)));
    const url = new URL(window.location.href);
    url.searchParams.set('s', encodedState);
    
    gameState.isHost = true;
    gameState.names = names;
    initFromState(state);
    
    // Show Lobby
    document.getElementById('game-link').value = url.toString();
    showScreen('lobby');
    
    // Generate QR
    document.getElementById('qrcode-container').innerHTML = "";
    new QRCode(document.getElementById('qrcode-container'), {
        text: url.toString(),
        width: 200,
        height: 200
    });
}

function initFromState(state) {
    gameState.names = state.n;
    gameState.config = { undercover: state.c[0], mrwhite: state.c[1] };
    gameState.seed = state.s;
    const words = state.w;

    // Deterministic Role Assignment
    const rolesPool = [];
    for (let i = 0; i < gameState.config.undercover; i++) rolesPool.push('undercover');
    for (let i = 0; i < gameState.config.mrwhite; i++) rolesPool.push('mrwhite');
    while (rolesPool.length < gameState.names.length) rolesPool.push('civilian');

    // Shuffle pool using seed
    const shuffledPool = shuffle([...rolesPool], gameState.seed);
    
    gameState.roles = {};
    gameState.alive = {};
    gameState.names.forEach((name, i) => {
        const type = shuffledPool[i];
        let word = "";
        if (type === 'civilian') word = words[0];
        else if (type === 'undercover') word = words[1];
        else word = "???"; // Mr. White has no word

        gameState.roles[name] = { type, word };
        gameState.alive[name] = true;
    });
}

function pickName(name) {
    gameState.currentPlayer = name;
    document.getElementById('player-name-display').innerText = `Hello, ${name}`;
    
    const role = gameState.roles[name];
    document.getElementById('role-type').innerText = role.type.replace('mrwhite', 'Mr. White');
    document.getElementById('secret-word').innerText = role.type === 'mrwhite' ? "You have no word!" : role.word;
    
    showScreen('reveal');
}

// --- CARD FLIP ---
const roleCard = document.getElementById('role-card');
roleCard.onclick = () => {
    roleCard.classList.toggle('flipped');
    document.getElementById('confirm-reveal-btn').classList.remove('hidden');
};

document.getElementById('confirm-reveal-btn').onclick = () => {
    if (gameState.isHost) {
        showScreen('board');
        updateBoard();
    } else {
        alert("Wait for the host to start the discussion!");
    }
};

// --- GAME BOARD ---
function updateBoard() {
    const list = document.getElementById('player-status-list');
    list.innerHTML = "";
    
    let civs = 0, unds = 0, whites = 0;

    gameState.names.forEach(name => {
        const isAlive = gameState.alive[name];
        const role = gameState.roles[name];
        
        if (isAlive) {
            if (role.type === 'civilian') civs++;
            else if (role.type === 'undercover') unds++;
            else whites++;
        }

        const div = document.createElement('div');
        div.className = `status-row ${isAlive ? '' : 'dead'}`;
        div.innerHTML = `
            <span>${name} ${!isAlive ? `(${role.type})` : ''}</span>
            ${isAlive ? `<button class="danger-btn eliminate-btn" data-name="${name}">Eliminate</button>` : ''}
        `;
        list.appendChild(div);
    });

    document.getElementById('civ-left').innerText = civs;
    document.getElementById('und-left').innerText = unds;
    document.getElementById('whi-left').innerText = whites;

    // Check Win Conditions
    if (unds === 0 && whites === 0) {
        alert("Civilians Win!");
    } else if (civs <= unds + whites) {
        alert("Undercovers / Mr. White Win!");
    }
}

document.addEventListener('click', e => {
    if (e.target.classList.contains('eliminate-btn')) {
        const name = e.target.getAttribute('data-name');
        if (confirm(`Eliminate ${name}?`)) {
            gameState.alive[name] = false;
            updateBoard();
        }
    }
});

// --- URL HANDLING (JOINING) ---
window.onload = () => {
    const params = new URLSearchParams(window.location.search);
    const s = params.get('s');
    
    if (s) {
        try {
            const decodedState = decodeURIComponent(escape(atob(s)));
            const state = JSON.parse(decodedState);
            initFromState(state);
            
            // Check if player name is already in params (persistent join)
            const pName = params.get('p');
            if (pName && gameState.names.includes(pName)) {
                pickName(pName);
            } else {
                // Show name selection
                showScreen('join');
                const list = document.getElementById('name-selection-list');
                list.innerHTML = "";
                gameState.names.forEach(name => {
                    const btn = document.createElement('button');
                    btn.className = "name-btn";
                    btn.innerText = name;
                    btn.onclick = () => {
                        // Optional: update URL with player name so refresh doesn't lose it
                        const url = new URL(window.location.href);
                        url.searchParams.set('p', name);
                        window.history.replaceState({}, '', url);
                        pickName(name);
                    };
                    list.appendChild(btn);
                });
            }
        } catch (e) {
            console.error("Invalid game state in URL");
            showScreen('setup');
        }
    }
};

// --- BUTTON BINDS ---
document.getElementById('start-game-btn').onclick = startGame;
document.getElementById('go-to-game-btn').onclick = () => {
    // If Host wants to play too, they pick their name
    showScreen('join');
    // But since it's the host, we also want to show the board later
    document.getElementById('host-controls').classList.remove('hidden');
};
document.getElementById('open-game-board-btn').onclick = () => {
    showScreen('board');
    updateBoard();
};
document.getElementById('back-to-setup-btn').onclick = () => showScreen('setup');
document.getElementById('copy-link-btn').onclick = () => {
    const input = document.getElementById('game-link');
    input.select();
    document.execCommand('copy');
    alert("Link copied!");
};
document.getElementById('reset-game-btn').onclick = () => {
    if (confirm("End this game and start a new one?")) {
        window.location.href = window.location.pathname;
    }
};
