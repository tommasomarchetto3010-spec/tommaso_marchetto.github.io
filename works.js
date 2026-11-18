
const dockFiles = document.querySelectorAll(".dock-file");

const videoModal = document.getElementById("videoModal");
const youtubePlayer = document.getElementById("youtubePlayer");
const videoClose = document.getElementById("videoClose");

dockFiles.forEach(file => {
    file.addEventListener("click", () => {
        const videoID = file.dataset.video;

        youtubePlayer.src =
            "https://www.youtube-nocookie.com/embed/" +
            videoID +
            "?autoplay=1&playsinline=1";

        videoModal.classList.add("active");
    });
});

function closeVideo() {
    videoModal.classList.remove("active");
    youtubePlayer.src = "";
}

videoClose.addEventListener("click", closeVideo);

videoModal.addEventListener("click", event => {
    if (event.target === videoModal) {
        closeVideo();
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeVideo();
    }
});
