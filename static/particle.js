tsParticles.load("tsparticles", {
    fpsLimit: 60,
    background: {
        color: { value: "#000000" } // Black background
    },
    particles: {
        number: {
            value: 75,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: "#2196F3"  // Blue particles (change to any hex color you like)
        },
        shape: {
            type: "circle"
        },
        opacity: {
            value: 0.4,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 2.5,
            random: true,
            anim: {
                enable: true,
                speed: 5,
                size_min: 0.1,
                sync: false
            }
        },
        links: {
            enable: true,
            distance: 150,
            color: "#2196F3", // Blue link lines
            opacity: 0.5,
            width: 1
        },
        move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "repulse"
            },
            onclick: {
                enable: true,
                mode: "push"
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 200,
                links: {
                    opacity: 0.5
                }
            },
            bubble: {
                distance: 400,
                size: 5,
                duration: 2,
                opacity: 0.8,
                speed: 3
            },
            repulse: {
                distance: 100,
                duration: 0.4
            },
            push: {
                particles_nb: 4
            },
            remove: {
                particles_nb: 2
            }
        }
    },
    retina_detect: true
});
