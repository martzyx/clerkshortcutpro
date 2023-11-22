(function spin() {
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

    let konamiPosition = 0;

    document.addEventListener("keydown", function (e) {
        const key = e.key;

        if (key === spinny[konamiPosition]) {
            konamiPosition++;

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
    const martz = ["m", "a", "r", "t", "z", "f", "u", "n"];

    let konamiPosition = 0;

    document.addEventListener("keydown", function (e) {
        const key = e.key;

        if (key === martz[konamiPosition]) {
            konamiPosition++;

            if (konamiPosition === martz.length) {
                (function () {
                    const colours = ["#ff6b6b", "#feca57", "#1dd1a1", "#5f27cd", "#54a0ff"];
                    const confettisCount = 500;

                    function confettiParticle() {
                        this.x = window.innerWidth / 2;
                        this.y = window.innerHeight;
                        this.size = Math.random() * 7 + 3;
                        this.speedY = Math.random() * -10 + -2;
                        this.speedX = Math.random() * 20 - 10;
                        this.gravity = 0.05;
                        this.decay = 0.015;
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

                        if (this.size < 0) this.size = 0;

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
                                particles.splice(i, 1);
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
                    }, 10000);
                })();

                konamiPosition = 0;
            }
        } else {
            konamiPosition = 0;
        }
    });
})();

(function runPrank() {
    const prank = ["p", "r", "a", "n", "k", "f", "u", "n"];

    let konamiPosition = 0;

    document.addEventListener("keydown", function (e) {
        const key = e.key;

        if (key === prank[konamiPosition]) {
            konamiPosition++;

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
    const bananaFun = ["b", "a", "n", "a", "n", "a", "f", "u", "n"];

    let bananaFunPosition = 0;

    document.addEventListener("keydown", function (e) {
        const key = e.key;

        if (key === bananaFun[bananaFunPosition]) {
            bananaFunPosition++;

            if (bananaFunPosition === bananaFun.length) {
                console.log("you got bananaed");
                document.body.style.cursor =
                    "url(" + chrome.runtime.getURL("/assets/visual_assets/banana1.svg") + "), auto";

                let style = document.createElement("style");
                let textNode = document.createTextNode(
                    `
                        a {
                            cursor: url('` +
                        chrome.runtime.getURL("/assets/visual_assets/openBanana.svg") +
                        `') 0 0, pointer !important;
                        }
                    `
                );
                style.appendChild(textNode);
                document.head.appendChild(style);
            }
        } else {
            // The user pressed the wrong key, reset the bananaFunPosition
            bananaFunPosition = 0;
        }
    });
})();
