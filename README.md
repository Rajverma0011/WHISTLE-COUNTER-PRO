# WHISTLE-COUNTER-PRO
I’m thrilled to unveil Whistle Counter Pro, an app I designed and coded from scratch to tackle a common pressure cooking challenge! The idea sparked during a heartfelt conversation with my mom, who shared her struggle with timing whistles while cooking 



     HTML CODE
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Whistle Counter Pro 🍚🚀</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <canvas id="particles"></canvas>
    <div class="container">
        <header>
            <h1>WHISTLE COUNTER PRO 🍚🚀</h1>
        </header>

        <section class="controls">
            <button class="mode-toggle" onclick="toggleMode()">Switch to Cooking Mode</button>
            <button class="voice-btn" onclick="startVoiceRecognition()">🎙️ Voice Commands</button>
        </section>

        <!-- Free Mode Section -->
        <section class="mode-section free-section" id="freeMode">
            <div class="input-group">
                <label for="timeSelect">⏳ Set Timer (Optional):</label>
                <select id="timeSelect">
                    <option value="0">No Timer</option>
                    <option value="10">10 sec</option>
                    <option value="30">30 sec</option>
                    <option value="60">1 min</option>
                    <option value="120">2 min</option>
                    <option value="300">5 min</option>
                </select>
            </div>
            <div class="input-group">
                <label for="maxWhistles">🎯 Max Whistles:</label>
                <input type="number" id="maxWhistles" min="1" value="10" placeholder="Enter max whistles">
            </div>
        </section>

        <!-- Cooking Mode Section -->
        <section class="mode-section cooking-section" id="cookingMode">
            <div class="input-group">
                <label for="dishSelect">🍲 Select Dish:</label>
                <select id="dishSelect" onchange="updateCookingRecommendation()">
                    <option value="rice">Rice</option>
                    <option value="lentils">Lentils</option>
                    <option value="vegetables">Vegetables</option>
                </select>
            </div>
            <div class="input-group">
                <label for="quantity">⚖️ Quantity (cups):</label>
                <input type="number" id="quantity" min="1" value="1" onchange="updateCookingRecommendation()" placeholder="Enter cups">
            </div>
            <div class="box recommendation-box">
                Recommended: <span id="recommendedWhistles">2</span> whistles, <span id="recommendedTime">600</span> sec
            </div>
        </section>

        <div class="progress-circle">
            <svg width="100" height="100">
                <circle class="progress-bg" r="45" cx="50" cy="50"></circle>
                <circle class="progress-fill" r="45" cx="50" cy="50" stroke-dasharray="283" stroke-dashoffset="283"></circle>
            </svg>
            <div class="progress-text" id="timer">0</div>
        </div>

        <div class="box counter-box">
            Whistle Count: <span id="counter">0</span>
        </div>

        <section class="action-buttons">
            <button class="start-btn" onclick="startListening()">▶ Start</button>
            <button class="stop-btn" onclick="stopListening()">⏹ Stop</button>
            <button class="theme-btn" onclick="toggleTheme()">🌙 Theme</button>
            <button class="language-btn" onclick="toggleLanguage()">🌐 Language</button>
        </section>

        <div class="watermark">Raj</div>

        <audio id="whistleSound" src="https://www.myinstants.com/media/sounds/whistle.mp3"></audio>
        <audio id="alarmSound" src="https://www.myinstants.com/media/sounds/alarm.mp3"></audio>

        <div class="stats" id="stats">
            <h2>📊 Session Stats</h2>
            <p>Total Whistles: <span id="totalWhistles">0</span></p>
            <p>Time Taken: <span id="timeTaken">0</span> sec</p>
            <button onclick="closeStats()">Close</button>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>


       CSS 


@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

body {
    font-family: 'Poppins', sans-serif;
    text-align: center;
    background: linear-gradient(135deg, #8e44ad, #3498db);
    color: white;
    padding: 20px;
    margin: 0;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    max-width: 400px;
    background: rgba(255, 255, 255, 0.1);
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    position: relative;
    backdrop-filter: blur(10px);
    overflow-y: auto;
    width: 90%;
}

header h1 {
    font-size: 1.8em;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 15px;
}

.controls, .mode-section, .action-buttons {
    margin-bottom: 20px;
}

button {
    font-size: 1.1em;
    padding: 12px 25px;
    margin: 8px 0;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    width: 80%;
    color: white;
    font-weight: bold;
    transition: transform 0.3s ease;
}
button:hover {
    transform: scale(1.05);
}
button:active {
    transform: scale(0.95);
}
.mode-toggle { background: #f39c12; }
.voice-btn { background: #e74c3c; }
.start-btn { background: #2ecc71; }
.stop-btn { background: #e74c3c; }
.theme-btn { background: #3498db; }
.language-btn { background: #1abc9c; }

.input-group {
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.input-group label {
    margin-bottom: 5px;
    font-weight: 500;
}
select, input {
    font-size: 1em;
    padding: 8px;
    border-radius: 8px;
    border: none;
    width: 70%;
    background: rgba(255, 255, 255, 0.2);
    color: white;
    transition: background 0.3s ease;
}
select:hover, input:hover {
    background: rgba(255, 255, 255, 0.3);
}
select:focus, input:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.4);
}
select option {
    color: black;
    background: white;
}

.box {
    padding: 10px;
    margin: 10px 0;
    border-radius: 10px;
    font-size: 1.2em;
    font-weight: bold;
    background: rgba(255, 255, 255, 0.2);
}
.recommendation-box { color: #00ffcc; }
.counter-box { color: fuchsia; }

.progress-circle {
    position: relative;
    width: 100px;
    height: 100px;
    margin: 15px auto;
}
.progress-circle svg { transform: rotate(-90deg); }
.progress-circle circle {
    fill: none;
    stroke-width: 8;
    stroke-linecap: round;
    cx: 50;
    cy: 50;
    r: 45;
}
.progress-bg { stroke: rgba(255, 255, 255, 0.2); }
.progress-fill { stroke: #00ffcc; transition: stroke-dashoffset 0.3s ease; }
.progress-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.5em;
    font-weight: bold;
    color: white;
}

.action-buttons button {
    width: 40%;
    margin: 5px;
}

.stats {
    display: none;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.9);
    padding: 20px;
    border-radius: 15px;
    color: white;
    z-index: 10;
}

#particles {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
}

.mode-section {
    display: none;
    opacity: 0;
    transition: opacity 0.3s ease;
}
.mode-section.active {
    display: block;
    opacity: 1;
}

.watermark {
    position: absolute;
    bottom: 10px;
    right: 10px;
    font-size: 0.9em;
    color: rgba(255, 255, 255, 0.3);
    font-weight: 600;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    pointer-events: none;
}

@media (max-width: 480px) {
    .container {
        padding: 15px;
        width: 95%;
    }
    header h1 {
        font-size: 1.5em;
    }
    button {
        font-size: 1em;
        padding: 10px 20px;
        width: 85%;
    }
    .action-buttons button {
        width: 45%;
        margin: 5px 2px;
    }
    .box {
        font-size: 1.1em;
        padding: 8px;
    }
    select, input {
        width: 80%;
        font-size: 0.9em;
        padding: 6px;
    }
    .progress-circle {
        width: 80px;
        height: 80px;
    }
    .progress-text {
        font-size: 1.2em;
    }
    .watermark {
        font-size: 0.7em;
        bottom: 5px;
        right: 5px;
    }
}

           JAVA SCRIPT


let count = 0, timeLeft, timer, isListening = false;
let audioContext, analyser, microphone, dataArray;
let whistleDetected = false, lastWhistleTime = 0;
const cooldownTime = 5000; 
let maxWhistleCount = 10, startTime;
const whistleSound = document.getElementById("whistleSound");
const alarmSound = document.getElementById("alarmSound");
let isCookingMode = false; 
let recognition;


let language = localStorage.getItem("language") || "en"; 
let theme = localStorage.getItem("theme") || "neon";


const cookingData = {
    rice: { whistlesPerCup: 2, timePerCup: 600 },
    lentils: { whistlesPerCup: 3, timePerCup: 900 },
    vegetables: { whistlesPerCup: 1, timePerCup: 300 }
};


const translations = {
    en: {
        title: "WHISTLE COUNTER PRO ",
        modeToggleCooking: "Switch to Cooking Mode",
        modeToggleFree: "Switch to Free Mode",
        voiceBtn: "🎙️ Voice Commands",
        timerLabel: "⏳ Set Timer (Optional):",
        timerOptions: {
            0: "No Timer",
            10: "10 sec",
            30: "30 sec",
            60: "1 min",
            120: "2 min",
            300: "5 min"
        },
        maxWhistlesLabel: "🎯 Max Whistles:",
        dishLabel: "🍲 Select Dish:",
        dishOptions: {
            rice: "Rice",
            lentils: "Lentils",
            vegetables: "Vegetables"
        },
        quantityLabel: "⚖️ Quantity (cups):",
        recommendationText: "Recommended: ",
        whistlesText: "whistles",
        secondsText: "sec",
        whistleCount: "Whistle Count: ",
        startBtn: "▶ Start",
        stopBtn: "⏹ Stop",
        themeBtn: "🌙 Theme",
        languageBtn: "🌐 Language",
        statsTitle: "📊 Session Stats",
        totalWhistles: "Total Whistles: ",
        timeTaken: "Time Taken: ",
        closeStats: "Close",
        voiceNotSupported: "Sorry, your browser doesn't support voice recognition. Please use Chrome or Firefox.",
        voiceError: "Voice recognition failed. Please try again or check mic permissions.",
        commandNotRecognized: (cmd) => `Command not recognized: "${cmd}". Try "Start counting", "Stop counting", "Switch to cooking mode", "Switch to free mode", or "Change theme".`,
        voiceCommands: {
            startCounting: "start counting",
            stopCounting: "stop counting",
            switchToCookingMode: "switch to cooking mode",
            switchToFreeMode: "switch to free mode",
            changeTheme: "change theme"
        }
    },
    hi: {
        title: "व्हिसल काउंटर प्रो ",
        modeToggleCooking: "कुकिंग मोड में स्विच करें",
        modeToggleFree: "फ्री मोड में स्विच करें",
        voiceBtn: "🎙️ वॉयस कमांड",
        timerLabel: "⏳ टाइमर सेट करें (वैकल्पिक):",
        timerOptions: {
            0: "कोई टाइमर नहीं",
            10: "10 सेकंड",
            30: "30 सेकंड",
            60: "1 मिनट",
            120: "2 मिनट",
            300: "5 मिनट"
        },
        maxWhistlesLabel: "🎯 अधिकतम व्हिसल:",
        dishLabel: "🍲 डिश चुनें:",
        dishOptions: {
            rice: "चावल",
            lentils: "दाल",
            vegetables: "सब्जियाँ"
        },
        quantityLabel: "⚖️ मात्रा (कप):",
        recommendationText: "अनुशंसित: ",
        whistlesText: "व्हिसल",
        secondsText: "सेकंड",
        whistleCount: "व्हिसल गणना: ",
        startBtn: "▶ शुरू करें",
        stopBtn: "⏹ रुकें",
        themeBtn: "🌙 थीम",
        languageBtn: "🌐 भाषा",
        statsTitle: "📊 सत्र आँकड़े",
        totalWhistles: "कुल व्हिसल: ",
        timeTaken: "लिया गया समय: ",
        closeStats: "बंद करें",
        voiceNotSupported: "क्षमा करें, आपका ब्राउज़र वॉयस रिकग्निशन का समर्थन नहीं करता। कृपया क्रोम या फ़ायरफ़ॉक्स का उपयोग करें।",
        voiceError: "वॉयस रिकग्निशन विफल। कृपया पुनः प्रयास करें या माइक अनुमतियाँ जाँचें।",
        commandNotRecognized: (cmd) => `कमांड पहचानी नहीं गई: "${cmd}"। "काउंटिंग शुरू करें", "काउंटिंग रोकें", "कुकिंग मोड में स्विच करें", "फ्री मोड में स्विच करें", या "थीम बदलें" आज़माएँ।`,
        voiceCommands: {
            startCounting: "काउंटिंग शुरू करें",
            stopCounting: "काउंटिंग रोकें",
            switchToCookingMode: "कुकिंग मोड में स्विच करें",
            switchToFreeMode: "फ्री मोड में स्विच करें",
            changeTheme: "थीम बदलें"
        }
    }
};


applyTheme();
applyLanguage();
document.getElementById("freeMode").classList.add("active");


function applyLanguage() {
    const t = translations[language];
    document.querySelector("h1").innerText = t.title;
    document.querySelector(".mode-toggle").innerText = isCookingMode ? t.modeToggleFree : t.modeToggleCooking;
    document.querySelector(".voice-btn").innerText = t.voiceBtn;
    document.querySelector('label[for="timeSelect"]').innerText = t.timerLabel;
    document.querySelector('label[for="maxWhistles"]').innerText = t.maxWhistlesLabel;
    document.querySelector('label[for="dishSelect"]').innerText = t.dishLabel;
    document.querySelector('label[for="quantity"]').innerText = t.quantityLabel;
    document.querySelector(".counter-box").childNodes[0].textContent = t.whistleCount;
    document.querySelector(".start-btn").innerText = t.startBtn;
    document.querySelector(".stop-btn").innerText = t.stopBtn;
    document.querySelector(".theme-btn").innerText = t.themeBtn;
    document.querySelector(".language-btn").innerText = t.languageBtn;
    document.querySelector(".stats h2").innerText = t.statsTitle;
    document.querySelector(".stats p:nth-child(2)").childNodes[0].textContent = t.totalWhistles;
    document.querySelector(".stats p:nth-child(3)").childNodes[0].textContent = t.timeTaken;
    document.querySelector(".stats button").innerText = t.closeStats;

    const timeSelect = document.getElementById("timeSelect");
    for (let i = 0; i < timeSelect.options.length; i++) {
        const value = timeSelect.options[i].value;
        timeSelect.options[i].text = t.timerOptions[value];
    }

    const dishSelect = document.getElementById("dishSelect");
    for (let i = 0; i < dishSelect.options.length; i++) {
        const value = dishSelect.options[i].value;
        dishSelect.options[i].text = t.dishOptions[value];
    }

    const recommendationBox = document.querySelector(".recommendation-box");
    recommendationBox.childNodes[0].textContent = t.recommendationText;
    recommendationBox.childNodes[2].textContent = ` ${t.whistlesText}, `;
    recommendationBox.childNodes[4].textContent = ` ${t.secondsText}`;
}


function toggleLanguage() {
    language = language === "en" ? "hi" : "en";
    localStorage.setItem("language", language);
    applyLanguage();
}


function toggleMode() {
    isCookingMode = !isCookingMode;
    const freeMode = document.getElementById("freeMode");
    const cookingMode = document.getElementById("cookingMode");

    freeMode.classList.remove("active");
    cookingMode.classList.remove("active");

    if (isCookingMode) {
        cookingMode.classList.add("active");
        updateCookingRecommendation();
    } else {
        freeMode.classList.add("active");
    }

    const t = translations[language];
    document.querySelector(".mode-toggle").innerText = isCookingMode ? t.modeToggleFree : t.modeToggleCooking;
}


function updateCookingRecommendation() {
    const dish = document.getElementById("dishSelect").value;
    const quantity = parseInt(document.getElementById("quantity").value) || 1;
    const data = cookingData[dish];
    const recommendedWhistles = data.whistlesPerCup * quantity;
    const recommendedTime = data.timePerCup * quantity;

    document.getElementById("recommendedWhistles").innerText = recommendedWhistles;
    document.getElementById("recommendedTime").innerText = recommendedTime;
    maxWhistleCount = recommendedWhistles;
    timeLeft = recommendedTime;

    const t = translations[language];
    const recommendationBox = document.querySelector(".recommendation-box");
    recommendationBox.childNodes[0].textContent = t.recommendationText;
    recommendationBox.childNodes[2].textContent = ` ${t.whistlesText}, `;
    recommendationBox.childNodes[4].textContent = ` ${t.secondsText}`;
}


function startListening() {
    let selectedTime;
    if (isCookingMode) {
        updateCookingRecommendation();
        selectedTime = parseInt(document.getElementById("recommendedTime").innerText);
    } else {
        selectedTime = parseInt(document.getElementById("timeSelect").value);
        maxWhistleCount = parseInt(document.getElementById("maxWhistles").value) || 10;
        if (selectedTime === 0) {
            timeLeft = null;
        } else {
            timeLeft = selectedTime;
        }
    }

    count = 0;
    startTime = Date.now();

    document.getElementById("timer").innerText = timeLeft !== null ? timeLeft : "∞";
    document.getElementById("counter").innerText = count;
    updateProgress(timeLeft !== null ? selectedTime : 1, timeLeft !== null ? timeLeft : 1);

    if (timeLeft !== null) {
        startTimer();
    }

    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            audioContext = new AudioContext();
            analyser = audioContext.createAnalyser();
            microphone = audioContext.createMediaStreamSource(stream);
            microphone.connect(analyser);
            analyser.fftSize = 512;
            dataArray = new Uint8Array(analyser.frequencyBinCount);
            isListening = true;
            detectWhistle();
        })
        .catch(error => console.error("Mic Access Denied!", error));
}


function detectWhistle() {
    if (!isListening) return;
    analyser.getByteFrequencyData(dataArray);
    let currentTime = Date.now();

    let isWhistleNow = dataArray.some((value, index) => {
        let frequency = index * (audioContext.sampleRate / analyser.fftSize);
        return value > 200 && frequency >= 6000 && frequency <= 15000;
    });

    if (isWhistleNow && !whistleDetected && (currentTime - lastWhistleTime > cooldownTime)) {
        count++;
        document.getElementById("counter").innerText = count;
        whistleSound.play();
        lastWhistleTime = currentTime;
        whistleDetected = true;

        if (count >= maxWhistleCount) {
            stopListening();
            showStats();
        }
    }

    if (!isWhistleNow) whistleDetected = false;
    requestAnimationFrame(detectWhistle);
}


function startTimer() {
    if (timeLeft === null) return;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = timeLeft;
        const total = isCookingMode 
            ? parseInt(document.getElementById("recommendedTime").innerText) 
            : parseInt(document.getElementById("timeSelect").value);
        updateProgress(total || 1, timeLeft);

        if (timeLeft <= 0) {
            stopListening();
            showStats();
        }
    }, 1000);
}


function stopListening() {
    isListening = false;
    clearInterval(timer);
    if (audioContext) audioContext.close();
    document.getElementById("timer").innerText = "0";
    updateProgress(1, 0);

    if (count >= maxWhistleCount) {
        alarmSound.play();
    }
}


function updateProgress(total, remaining) {
    const circle = document.querySelector(".progress-fill");
    const circumference = 2 * Math.PI * 45; // Matches r=45 in SVG (≈ 283)
    const offset = circumference * (1 - (remaining !== null ? remaining / total : 1));
    circle.style.strokeDashoffset = offset;
}

function showStats() {
    const stats = document.getElementById("stats");
    document.getElementById("totalWhistles").innerText = count;
    document.getElementById("timeTaken").innerText = ((Date.now() - startTime) / 1000).toFixed(1);
    stats.style.display = "block";
    alarmSound.play();
}


function closeStats() {
    document.getElementById("stats").style.display = "none";
}


function toggleTheme() {
    theme = theme === "neon" ? "dark" : theme === "dark" ? "light" : "neon";
    localStorage.setItem("theme", theme);
    applyTheme();
}


function applyTheme() {
    const container = document.querySelector(".container");
    if (theme === "dark") {
        document.body.style.background = "linear-gradient(135deg, #2c3e50, #34495e)";
        container.style.background = "rgba(255, 255, 255, 0.1)";
    } else if (theme === "light") {
        document.body.style.background = "linear-gradient(135deg, #ecf0f1, #bdc3c7)";
        document.body.style.color = "#2c3e50";
        container.style.background = "rgba(0, 0, 0, 0.1)";
    } else {
        document.body.style.background = "linear-gradient(135deg, #8e44ad, #3498db)";
        document.body.style.color = "white";
        container.style.background = "rgba(255, 255, 255, 0.1)";
    }
}

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
for (let i = 0; i < 100; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        dx: Math.random() * 2 - 1,
        dy: Math.random() * 2 - 1
    });
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    }
    requestAnimationFrame(animateParticles);
}
animateParticles();

// Voice recognition function
function startVoiceRecognition() {
    if (!('webkitSpeechRecognition' in window)) {
        alert(translations[language].voiceNotSupported);
        return;
    }

    recognition = new webkitSpeechRecognition();
    recognition.lang = language === "en" ? "en-US" : "hi-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = function(event) {
        const command = event.results[0][0].transcript.toLowerCase().trim();
        console.log("Recognized command:", command);

        const t = translations[language].voiceCommands;
        if (command.includes(t.startCounting)) {
            startListening();
        } else if (command.includes(t.stopCounting)) {
            stopListening();
        } else if (command.includes(t.switchToCookingMode) && !isCookingMode) {
            toggleMode();
        } else if (command.includes(t.switchToFreeMode) && isCookingMode) {
            toggleMode();
        } else if (command.includes(t.changeTheme)) {
            toggleTheme();
        } else {
            alert(translations[language].commandNotRecognized(command));
        }
    };

    recognition.onerror = function(event) {
        console.error("Speech recognition error:", event.error);
        alert(translations[language].voiceError);
    };

    recognition.start();
}

