// Script for Z Notes 
document.addEventListener("DOMContentLoaded", () => {
    // Hamburger menu toggle
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (hamburger) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }

    // Canvas Animation
    const canvas = document.getElementById("animCanvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        const totalFrames = 300;
        const images = [];
        let loadedFrames = 0;
        let currentFrame = 0;

        // Load all frames
        for (let i = 1; i <= totalFrames; i++) {
            const img = new Image();
            // Format number to 3 digits (e.g., 001, 012, 300)
            const frameNum = String(i).padStart(3, '0');
            img.src = `animation_frames/ezgif-frame-${frameNum}.jpg`;
            img.onload = () => {
                loadedFrames++;
                if (loadedFrames === 1) {
                    // Draw first frame immediately as fallback
                    drawFrame(img);
                }
                if (loadedFrames === totalFrames) {
                    // All frames loaded, start animation
                    requestAnimationFrame(playAnimation);
                }
            };
            images.push(img);
        }

        // Draw a specific frame to canvas
        function drawFrame(img) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Draw image covering the canvas (you can adjust scaling based on actual image aspect ratio)
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
