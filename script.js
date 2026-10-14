document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (hamburger) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }

    const canvas = document.getElementById("animCanvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        const totalFrames = 300;
        const images = [];
        let loadedFrames = 0;
        let currentFrame = 0;

        for (let i = 1; i <= totalFrames; i++) {
            const img = new Image();
            const frameNum = String(i).padStart(3, '0');
            img.src = `animation_frames/ezgif-frame-${frameNum}.jpg`;
            img.onload = () => {
                loadedFrames++;
                if (loadedFrames === 1) {
                    drawFrame(img);
                }
                if (loadedFrames === totalFrames) {
                    requestAnimationFrame(playAnimation);
                }
            };
            images.push(img);
        }

        function drawFrame(img) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }

        let lastTime = 0;
        const fps = 24;
        const interval = 1000 / fps;

        function playAnimation(timestamp) {
            if (!lastTime) lastTime = timestamp;
            const delta = timestamp - lastTime;

            if (delta > interval) {
                drawFrame(images[currentFrame]);
                currentFrame = (currentFrame + 1) % totalFrames;
                lastTime = timestamp - (delta % interval);
            }

            requestAnimationFrame(playAnimation);
        }
    }
});
