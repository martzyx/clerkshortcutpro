(function spin() {
    // Set up our array of keys for the Modified Konami Code
    const spinny = [
        "ArrowLeft",
        "ArrowUp",
        "ArrowRight",
        "ArrowDown",
        "ArrowLeft",
        "ArrowUp",
        "ArrowRight",
        "ArrowDown",
    ];

    // This will track the 'position' the user has reached typing the Konami Code
    let konamiPosition = 0;

    // Add keydown event listener
    document.addEventListener("keydown", function (e) {
        // Get the key of the key pressed
        const key = e.key;

        // Compare the key the user pressed to the key they should have pressed
        if (key === spinny[konamiPosition]) {
            // Move to the next position in the spinny sequence
            konamiPosition++;

            // If the user has finished typing the Konami Code, trigger the secret feature
            if (konamiPosition === spinny.length) {
                (function () {
                    document.documentElement.style.transitionDuration = "60s";
                    document.documentElement.style.transitionTimingFunction = "ease-in";
                    document.documentElement.style.transform = "rotate(360000deg)";
                })();

                // Reset konamiPosition so the user can do it again
                konamiPosition = 0;
            }
        } else {
            // The user pressed the wrong key, reset the konamiPosition
            konamiPosition = 0;
        }
    });
})();

(function martzFun() {
    // Set up our array of keys for the Modified Konami Code
    const martz = ["m", "a", "r", "t", "z"];

    // This will track the 'position' the user has reached typing the Konami Code
    let konamiPosition = 0;

    // Add keydown event listener
    document.addEventListener("keydown", function (e) {
        // Get the key of the key pressed
        const key = e.key;

        // Compare the key the user pressed to the key they should have pressed
        if (key === martz[konamiPosition]) {
            // Move to the next position in the martz sequence
            konamiPosition++;

            // If the user has finished typing the Konami Code, trigger the secret feature
            if (konamiPosition === martz.length) {
                (function () {
                    const colours = ["#ff6b6b", "#feca57", "#1dd1a1", "#5f27cd", "#54a0ff"];
                    const confettisCount = 500;

                    function confettiParticle() {
                        this.x = window.innerWidth / 2; // Start from middle of screen
                        this.y = window.innerHeight; // Start from bottom of screen
                        this.size = Math.random() * 7 + 3;
                        this.speedY = Math.random() * -10 + -2; // Blow upwards (negative y)
                        this.speedX = Math.random() * 20 - 10; // Random horizontal direction
                        this.gravity = 0.05; // Pull back down (increase y)
                        this.decay = 0.015; // Shrink confetti over time
                        this.colour = colours[Math.floor(Math.random() * colours.length)];
                    }

                    confettiParticle.prototype.draw = function () {
                        ctx.beginPath();
                        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                        ctx.closePath();
                        ctx.fillStyle = this.colour;
                        ctx.fill();
                    };

                    confettiParticle.prototype.update = function () {
                        this.speedY += this.gravity;
                        this.y += this.speedY;
                        this.x += this.speedX;
                        this.size -= this.decay;

                        if (this.size < 0) this.size = 0; // Make sure size can't be less than 0

                        this.draw();
                    };

                    const particles = [];
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");
                    canvas.style.position = "fixed";
                    canvas.style.top = 0;
                    canvas.style.left = 0;
                    canvas.style.pointerEvents = "none";
                    canvas.style.zIndex = 9999;

                    function adjustCanvasSize() {
                        canvas.width = window.innerWidth;
                        canvas.height = window.innerHeight;
                    }
                    adjustCanvasSize();
                    window.addEventListener("resize", adjustCanvasSize);

                    for (let i = 0; i < confettisCount; i++) {
                        particles.push(new confettiParticle());
                    }

                    document.body.appendChild(canvas);

                    let animationId;
                    function animateParticles() {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        for (let i = 0; i < particles.length; i++) {
                            particles[i].update();
                            if (particles[i].size === 0) {
                                particles.splice(i, 1); // Remove when size is 0
                            }
                        }
                        if (particles.length > 0) {
                            animationId = requestAnimationFrame(animateParticles);
                        }
                    }
                    animateParticles();

                    setTimeout(function () {
                        cancelAnimationFrame(animationId);
                        document.body.removeChild(canvas);
                    }, 2000); // stop the animation after 2 seconds
                })();

                // Reset konamiPosition so the user can do it again
                konamiPosition = 0;
            }
        } else {
            // The user pressed the wrong key, reset the konamiPosition
            konamiPosition = 0;
        }
    });
})();

(function runPrank() {
    // Set up our array of keys for the Modified Konami Code
    const prank = ["p", "r", "a", "n", "k", "f", "u", "n"];

    // This will track the 'position' the user has reached typing the Konami Code
    let konamiPosition = 0;

    // Add keydown event listener
    document.addEventListener("keydown", function (e) {
        // Get the key of the key pressed
        const key = e.key;

        // Compare the key the user pressed to the key they should have pressed
        if (key === prank[konamiPosition]) {
            // Move to the next position in the prank sequence
            konamiPosition++;

            // If the user has finished typing the Konami Code, trigger the secret feature
            if (konamiPosition === prank.length) {
                setInterval(() => {
                    const allElements = document.getElementsByTagName("*");
                    const randomElement =
                        allElements[Math.floor(Math.random() * allElements.length)];
                    randomElement.style.position = "relative";
                    randomElement.style.left =
                        (Math.random() > 0.5 ? "" : "-") + Math.floor(Math.random() * 100) + "px";
                }, 50);

                // Reset konamiPosition so the user can do it again
                konamiPosition = 0;
            }
        } else {
            // The user pressed the wrong key, reset the konamiPosition
            konamiPosition = 0;
        }
    });
})();

(function bananaCursor() {
    if (window.location.host == "my.clerk.io") {
        // Set up our array of keys for the banana fun
        const bananaFun = ["b", "a", "n", "a", "n", "a", "f", "u", "n"];

        // This will track the 'position' the user has reached typing the bananaFun
        let bananaFunPosition = 0;

        // Add keydown event listener
        document.addEventListener("keydown", function (e) {
            // Get the key of the key pressed
            const key = e.key;

            // Compare the key the user pressed to the key they should have pressed
            if (key === bananaFun[bananaFunPosition]) {
                // Move to the next position in the bananaFun sequence
                bananaFunPosition++;

                // If the user has finished typing the bananaFun, trigger the secret feature
                if (bananaFunPosition === bananaFun.length) {
                    console.log("bananaed");
                    document.body.style.cursor =
                        "url(" + chrome.runtime.getURL("banana.cur") + "), auto";
                    // // After 10 seconds, reset the cursor style
                    // setTimeout(() => {
                    //     document.body.style.cursor = "auto";
                    // }, 10000);

                    // Reset bananaFunPosition so the user can do it again
                    bananaFunPosition = 0;
                }
            } else {
                // The user pressed the wrong key, reset the bananaFunPosition
                bananaFunPosition = 0;
            }
        });
    }
})();
