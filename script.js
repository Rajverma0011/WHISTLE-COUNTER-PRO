
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
        return value > 200 && frequency >= 4000 && frequency <= 10000;
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