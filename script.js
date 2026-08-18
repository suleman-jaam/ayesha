// ===============================
// BIRTHDAY WEBSITE JAVASCRIPT
// ===============================

const music = document.getElementById("birthdayMusic");


// ===============================
// MUSIC
// ===============================

function toggleMusic() {
    if (!music) return;

    if (music.paused) {
        music.play().catch(() => {});
    } else {
        music.pause();
    }
}


// ===============================
// START CELEBRATION
// ===============================

function startCelebration() {

    // Start music
    if (music) {
        music.play().catch(() => {});
    }

    // Confetti burst
    createConfetti(100);

    // Small vibration on mobile
    if (navigator.vibrate) {
        navigator.vibrate(100);
    }
}


// ===============================
// CONFETTI
// ===============================

function createConfetti(amount = 80) {

    const symbols = [
        "🎉",
        "🎊",
        "✨",
        "💖",
        "🎈",
        "⭐",
        "💫"
    ];

    for (let i = 0; i < amount; i++) {

        const piece = document.createElement("div");

        piece.className = "confetti-piece";

        piece.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        piece.style.left = Math.random() * 100 + "vw";

        piece.style.top = "-50px";

        piece.style.fontSize =
            Math.random() * 18 + 14 + "px";

        piece.style.animationDuration =
            Math.random() * 2 + 3 + "s";

        piece.style.animationDelay =
            Math.random() * 0.8 + "s";

        piece.style.transform =
            `rotate(${Math.random() * 360}deg)`;

        document.body.appendChild(piece);

        setTimeout(() => {
            piece.remove();
        }, 5000);
    }
}


// ===============================
// CONFETTI CSS
// ===============================

const confettiStyle = document.createElement("style");

confettiStyle.textContent = `

.confetti-piece {

    position: fixed;

    z-index: 99999;

    pointer-events: none;

    animation:
        birthdayConfetti
        linear
        forwards;

}

@keyframes birthdayConfetti {

    0% {

        opacity: 1;

        transform:
            translateY(0)
            rotate(0deg)
            scale(1);

    }

    50% {

        opacity: 1;

        transform:
            translateY(50vh)
            rotate(360deg)
            scale(1.1);

    }

    100% {

        opacity: 0;

        transform:
            translateY(110vh)
            rotate(720deg)
            scale(0.7);

    }

}

`;

document.head.appendChild(confettiStyle);


// ===============================
// MAKE A WISH
// ===============================

function blowCandles() {

    createConfetti(70);

    const cake = document.querySelector(".cake");

    if (cake) {

        cake.classList.add("wish-animation");

        setTimeout(() => {

            cake.textContent = "🎂✨";

        }, 250);

        setTimeout(() => {

            cake.classList.remove("wish-animation");

        }, 1000);
    }

    showWishMessage();
}


// ===============================
// WISH ANIMATION
// ===============================

const wishStyle = document.createElement("style");

wishStyle.textContent = `

.wish-animation {

    animation:
        wishPop
        0.8s
        ease;

}

@keyframes wishPop {

    0% {
        transform: scale(1);
    }

    40% {
        transform: scale(1.3) rotate(-5deg);
    }

    70% {
        transform: scale(1.15) rotate(5deg);
    }

    100% {
        transform: scale(1);
    }

}

`;

document.head.appendChild(wishStyle);


// ===============================
// BEAUTIFUL WISH POPUP
// ===============================

function showWishMessage() {

    const popup = document.createElement("div");

    popup.className = "wish-popup";

    popup.innerHTML = `

        <div class="wish-popup-card">

            <div class="wish-icon">
                ✨
            </div>

            <h2>
                Wish Made!
            </h2>

            <p>
                May all your dreams come true,
                and may this year bring you
                endless happiness. ❤️
            </p>

            <button class="close-wish">
                Continue Celebrating 🎉
            </button>

        </div>

    `;

    document.body.appendChild(popup);

    requestAnimationFrame(() => {
        popup.classList.add("show");
    });

    popup.querySelector(".close-wish")
        .addEventListener("click", () => {

            popup.classList.remove("show");

            setTimeout(() => {
                popup.remove();
            }, 300);

        });

}


// ===============================
// POPUP CSS
// ===============================

const popupStyle = document.createElement("style");

popupStyle.textContent = `

.wish-popup {

    position: fixed;

    inset: 0;

    display: flex;

    justify-content: center;

    align-items: center;

    background: rgba(40, 20, 35, 0.55);

    backdrop-filter: blur(8px);

    z-index: 100000;

    opacity: 0;

    transition: opacity 0.3s ease;

    padding: 20px;

}

.wish-popup.show {

    opacity: 1;

}

.wish-popup-card {

    width: 100%;

    max-width: 430px;

    padding: 45px 30px;

    text-align: center;

    border-radius: 30px;

    background: white;

    box-shadow:
        0 30px 80px
        rgba(0,0,0,0.25);

    transform: translateY(30px) scale(0.9);

    transition:
        transform 0.4s ease;

}

.wish-popup.show
.wish-popup-card {

    transform:
        translateY(0)
        scale(1);

}

.wish-icon {

    font-size: 60px;

    margin-bottom: 15px;

    animation:
        sparkle 1.5s
        infinite;

}

.wish-popup-card h2 {

    color: #d94f86;

    margin-bottom: 15px;

}

.wish-popup-card p {

    color: #725568;

    line-height: 1.7;

}

.wish-popup-card button {

    margin-top: 25px;

}

@keyframes sparkle {

    0%, 100% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.2);
    }

}

`;

document.head.appendChild(popupStyle);


// ===============================
// BALLOON POP
// ===============================

document
    .querySelectorAll(".balloons span")
    .forEach(balloon => {

        balloon.addEventListener("click", () => {

            createConfetti(15);

            balloon.style.transition =
                "all 0.3s ease";

            balloon.style.transform =
                "scale(1.8)";

            balloon.style.opacity = "0";

            setTimeout(() => {

                balloon.style.transform =
                    "scale(1)";

                balloon.style.opacity = "";

            }, 500);

        });

    });


// ===============================
// SCROLL REVEAL
// ===============================

const revealElements = document.querySelectorAll(
    ".letter-box, .wish-card, .special-list p, .gallery img"
);

const observer = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add(
                    "reveal-active"
                );

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.15
    }
);

revealElements.forEach(element => {

    element.classList.add("reveal");

    observer.observe(element);

});


// ===============================
// REVEAL CSS
// ===============================

const revealStyle = document.createElement("style");

revealStyle.textContent = `

.reveal {

    opacity: 0;

    transform:
        translateY(30px);

    transition:
        opacity 0.8s ease,
        transform 0.8s ease;

}

.reveal-active {

    opacity: 1;

    transform:
        translateY(0);

}

`;

document.head.appendChild(revealStyle);


// ===============================
// PAGE LOAD
// ===============================

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});


// ===============================
// KEYBOARD ESCAPE
// ===============================

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        const popup =
            document.querySelector(".wish-popup");

        if (popup) {

            popup.classList.remove("show");

            setTimeout(() => {
                popup.remove();
            }, 300);

        }

    }

});