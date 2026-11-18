
/* ========================================
   ELEMENTI DEL SITO
======================================== */

const aboutMe = document.getElementById("aboutMe");
const home = document.getElementById("home");

const mano = document.getElementById("mano");
const container = document.getElementById("mano-container");

const face = document.getElementById("face");
const faceImage = document.getElementById("faceImage");

let timerMano;


/* ========================================
   ABOUT ME - APERTURA ANIMAZIONE
======================================== */

aboutMe.addEventListener("click", function(event) {

    event.preventDefault();

    clearTimeout(timerMano);

    document.body.classList.add("about-attivo");

    container.style.display = "flex";

    // GIF iniziale
    mano.src = "about me mano.gif";

    // Dopo 3 secondi parte la GIF in loop
    timerMano = setTimeout(function() {

        if (container.style.display !== "none") {
            mano.src = "about me mano loop.gif";
        }

    }, 3000);

});


/* ========================================
   HOME - CHIUSURA ABOUT ME
======================================== */

home.addEventListener("click", function(event) {

    event.preventDefault();

    clearTimeout(timerMano);

    container.style.display = "none";

    mano.src = "";

    document.body.classList.remove("about-attivo");

    window.scrollTo(0, 0);

});


/* ========================================
   MOVIMENTO DEGLI OCCHI
======================================== */

const grandi = "occhi_centro_grandi.png";
const normali = "occhi_centro_normali.png";

document.addEventListener("mousemove", function(event) {

    // Se il viso non esiste, interrompe la funzione
    if (!face || !faceImage) return;

    const rect = face.getBoundingClientRect();

    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);

    const distanza = Math.hypot(dx, dy);

    if (distanza < 180) {
        faceImage.src = normali;
    } else {
        faceImage.src = grandi;
    }

    const movimento = 12;

    const x = Math.max(
        -movimento,
        Math.min(
            movimento,
            dx / (window.innerWidth / 2) * movimento
        )
    );

    const y = Math.max(
        -movimento,
        Math.min(
            movimento,
            dy / (window.innerHeight / 2) * movimento
        )
    );

    face.style.transform = `translate(${x}px, ${y}px)`;

});


/* ========================================
   WORKS - SLIDER VIDEO
======================================== */

// Controlla se siamo nella pagina che contiene lo slider
const slider = document.getElementById("worksSlider");

if (slider) {

    const videos = slider.querySelectorAll("video");

    let currentIndex = 0;
    let isScrolling = false;

    function showVideo(index) {

        if (index < 0 || index >= videos.length) return;

        currentIndex = index;

        slider.style.transform =
            `translateX(-${currentIndex * 100}%)`;

        videos.forEach((video, i) => {

            if (i === currentIndex) {

                video.play().catch(() => {});

            } else {

                video.pause();
                video.currentTime = 0;

            }

        });

    }


    // Navigazione con rotella del mouse
    window.addEventListener("wheel", function(event) {

        if (event.clientY < window.innerHeight / 2) return;

        event.preventDefault();

        if (isScrolling || Math.abs(event.deltaY) < 5) return;

        isScrolling = true;

        if (event.deltaY > 0) {

            showVideo(
                Math.min(currentIndex + 1, videos.length - 1)
            );

        } else {

            showVideo(
                Math.max(currentIndex - 1, 0)
            );

        }

        setTimeout(function() {
            isScrolling = false;
        }, 850);

    }, { passive: false });


    // Avvia il primo video
    if (videos.length > 0) {
        showVideo(0);
    }

}


/* ========================================
   CONTACT ME
======================================== */

const contactButton = document.getElementById("contactMe");
const contactOverlay = document.getElementById("contactVideo");
const closeButton = document.getElementById("closeVideo");


if (contactButton && contactOverlay && closeButton) {

    // APRE CONTACT ME
    contactButton.addEventListener("click", function(event) {

        event.preventDefault();

        contactOverlay.style.display = "flex";

    });


    // CHIUDE CONTACT ME
    function closeContact() {

        contactOverlay.style.display = "none";

    }


    closeButton.addEventListener("click", closeContact);


    // CHIUDE CLICCANDO FUORI DAL FOGLIO
    contactOverlay.addEventListener("click", function(event) {

        if (event.target === contactOverlay) {
            closeContact();
        }

    });


    // CHIUDE CON ESC
    document.addEventListener("keydown", function(event) {

        if (event.key === "Escape") {
            closeContact();
        }

    });

}
