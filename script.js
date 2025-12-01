// Sélectionner tous les éléments étoiles
const stars = document.querySelectorAll('.star');
const popup = document.getElementById('popup');
const closePopup = document.getElementById('closePopup');
const popupGift = document.querySelector('.popup-gift');
const lockedPopup = document.getElementById('lockedPopup');
const closeLocked = document.getElementById('closeLocked');
const countdownElement = document.getElementById('countdown');

// Photos pour Papa (une par jour)
const gifts = {
    1: "papa-1.jpg",
    2: "papa-2.jpg",
    3: "papa-3.jpg",
    4: "papa-4.jpg",
    5: "papa-5.jpg",
    6: "papa-6.jpg",
    7: "papa-7.jpg",
    8: "papa-8.jpg",
    9: "papa-9.jpg",
    10: "papa-10.jpg",
    11: "papa-11.jpg",
    12: "papa-12.jpg",
    13: "papa-13.jpg",
    14: "papa-14.jpg",
    15: "papa-15.jpg",
    16: "papa-16.jpg",
    17: "papa-17.jpg",
    18: "papa-18.jpg",
    19: "papa-19.jpg",
    20: "papa-20.jpg",
    21: "papa-21.jpg",
    22: "papa-22.jpg",
    23: "papa-23.jpg",
    24: "papa-24.jpg"
};

// Vérifier si une case peut être ouverte
function canOpenDay(day) {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0 = janv, 11 = déc

    // Décembre uniquement
    if (currentMonth === 11) {
        const unlockDate = new Date(currentYear, 11, day, 0, 0, 0);
        return now >= unlockDate;
    }

    // Après décembre : tout est ouvert
    if (currentMonth > 11 || (currentMonth === 0 && now.getFullYear() > currentYear)) {
        return true;
    }

    // Avant décembre : tout verrouillé
    return false;
}

// Temps restant
function getTimeUntilUnlock(day) {
    const now = new Date();
    const currentYear = now.getFullYear();
    const unlockDate = new Date(currentYear, 11, day, 0, 0, 0);

    const diff = unlockDate - now;
    if (diff <= 0) return "maintenant !";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) {
        return `${days} jour${days > 1 ? 's' : ''} et ${hours}h`;
    } else if (hours > 0) {
        return `${hours}h et ${minutes}min`;
    } else {
        return `${minutes} minute${minutes > 1 ? 's' : ''}`;
    }
}

// Cadenas + clics
stars.forEach(star => {
    const day = parseInt(star.getAttribute('data-day'));

    if (!canOpenDay(day)) {
        star.classList.add('locked');
    }

    star.addEventListener('click', function () {
        const day = parseInt(this.getAttribute('data-day'));

        // Case verrouillée → popup verrouillage
        if (!canOpenDay(day)) {
            const timeLeft = getTimeUntilUnlock(day);
            countdownElement.textContent = timeLeft;
            lockedPopup.classList.add('active');
            return;
        }

        // Case ouverte → afficher la photo
        const fileName = gifts[day];

        popupGift.innerHTML = '';

        const giftCard = document.createElement('div');
        giftCard.className = 'gift-card';

        const img = document.createElement('img');
        img.src = `images/papa/${fileName}`;
        img.className = 'gift-photo';

        giftCard.appendChild(img);
        popupGift.appendChild(giftCard);

        popup.classList.add('active');
    });
});

// Fermer popup photo
closePopup.addEventListener('click', function () {
    popup.classList.remove('active');
});

popup.addEventListener('click', function (e) {
    if (e.target === popup) {
        popup.classList.remove('active');
    }
});

// Fermer popup verrouillage
closeLocked.addEventListener('click', function () {
    lockedPopup.classList.remove('active');
});

lockedPopup.addEventListener('click', function (e) {
    if (e.target === lockedPopup) {
        lockedPopup.classList.remove('active');
    }
});

// Escape
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        if (popup.classList.contains('active')) popup.classList.remove('active');
        if (lockedPopup.classList.contains('active')) lockedPopup.classList.remove('active');
    }
});

// Neige
function createSnowflakes() {
    const snowflakeChars = ['❄', '❅', '❆', '✻', '✼', '❉'];
    const snowContainer = document.body;

    for (let i = 0; i < 50; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.innerHTML = snowflakeChars[Math.floor(Math.random() * snowflakeChars.length)];

        snowflake.style.left = Math.random() * 100 + '%';
        snowflake.style.fontSize = (Math.random() * 1.5 + 0.5) + 'em';
        snowflake.style.animationDelay = Math.random() * 10 + 's';
        snowflake.style.animationDuration = (Math.random() * 10 + 5) + 's';

        snowContainer.appendChild(snowflake);
    }
}
window.addEventListener('load', createSnowflakes);

// POPUP message secret (enveloppe)
const envelopeBtn = document.getElementById('envelopeBtn');
const messagePopup = document.getElementById('messagePopup');
const closeMessage = document.getElementById('closeMessage');

envelopeBtn.addEventListener('click', function () {
    messagePopup.classList.add('active');
});

closeMessage.addEventListener('click', function () {
    messagePopup.classList.remove('active');
});

messagePopup.addEventListener('click', function (e) {
    if (e.target === messagePopup) {
        messagePopup.classList.remove('active');
    }
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && messagePopup.classList.contains('active')) {
        messagePopup.classList.remove('active');
    }
});
