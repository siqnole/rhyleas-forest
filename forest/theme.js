(function forestTheme() {
    "use strict";

    function init() {
        console.log("🍂 Theme Loaded");

        // Prevent duplicate initialization
        if (document.getElementById("forest-container")) {
            console.log("🍂 petals already initialized");
            return;
        }

        /* =========================================
           CREATE STYLES
           ========================================= */

        const style = document.createElement("style");

        style.id = "forest-petal-styles";

        style.textContent = `
            #forest-container {
                position: fixed !important;
                inset: 0 !important;

                width: 100vw !important;
                height: 100vh !important;

                pointer-events: none !important;
                overflow: hidden !important;

                z-index: 2147483647 !important;
            }

            .forest-petal {
                position: absolute !important;

                top: -50px;

                display: block !important;

                pointer-events: none !important;

                background: var(
                    --forest-leaf-color,
                    #c65d18
                ) !important;

                border-radius: 80% 0 80% 0 !important;

                transform-origin: center center !important;

                opacity: 0;

                animation:
                    forestFall
                    var(--forest-duration, 12s)
                    linear
                    forwards !important;

                filter:
                    blur(0.25px)
                    drop-shadow(
                        0 1px 5px
                        rgba(65, 35, 8, 0.35)
                    ) !important;

                will-change:
                    transform,
                    opacity;
            }

            @keyframes forestFall {

                0% {
                    transform:
                        translate3d(
                            0,
                            -50px,
                            0
                        )
                        rotate(0deg)
                        scale(0.75);

                    opacity: 0;
                }

                8% {
                    opacity:
                        var(
                            --forest-opacity,
                            0.8
                        );
                }

                25% {
                    transform:
                        translate3d(
                            var(
                                --forest-sway1,
                                60px
                            ),
                            25vh,
                            0
                        )
                        rotate(130deg)
                        scale(1);
                }

                50% {
                    transform:
                        translate3d(
                            var(
                                --forest-sway2,
                                -80px
                            ),
                            50vh,
                            0
                        )
                        rotate(250deg)
                        scale(0.92);
                }

                75% {
                    transform:
                        translate3d(
                            var(
                                --forest-sway3,
                                100px
                            ),
                            75vh,
                            0
                        )
                        rotate(340deg)
                        scale(0.86);
                }

                100% {
                    transform:
                        translate3d(
                            var(
                                --forest-sway4,
                                -100px
                            ),
                            115vh,
                            0
                        )
                        rotate(450deg)
                        scale(0.65);

                    opacity: 0;
                }
            }

            @media (prefers-reduced-motion: reduce) {
                #forest-container {
                    display: none !important;
                }
            }
        `;

        document.head.appendChild(style);


        /* =========================================
           CREATE CONTAINER
           ========================================= */

        const container = document.createElement("div");

        container.id = "forest-container";

        // Spotify's main root is preferable to body
        // for stacking/visibility.
        const spotifyRoot =
            document.querySelector("#main");

        if (spotifyRoot) {
            spotifyRoot.appendChild(container);
        } else {
            document.body.appendChild(container);
        }


        /* =========================================
           AUTUMN COLORS
           ========================================= */

        const leafColors = [
            "#c65d18", // burnt orange
            "#d4771f", // pumpkin
            "#b74718", // autumn red
            "#e0a52d", // golden
            "#c88b20", // amber
            "#8b521d", // brown
            "#704019", // dark brown
            "#9b651d", // earthy gold
            "#a95720", // copper
            "#d18a2b"  // warm orange
        ];


        /* =========================================
           RANDOM HELPER
           ========================================= */

        function random(min, max) {
            return Math.random() * (max - min) + min;
        }


        /* =========================================
           CREATE LEAF
           ========================================= */

        function createPetal() {

            if (document.hidden) {
                return;
            }

            // Don't create unnecessary leaves if
            // the tab has accumulated too many.
            if (container.children.length > 80) {
                return;
            }

            const petal =
                document.createElement("div");

            petal.className =
                "forest-petal";


            /* -----------------------------------------
               SIZE
               ----------------------------------------- */

            const size =
                random(7, 17);

            petal.style.width =
                size + "px";

            petal.style.height =
                size * random(
                    0.55,
                    0.8
                ) + "px";


            /* -----------------------------------------
               START POSITION
               ----------------------------------------- */

            petal.style.left =
                random(-5, 105) + "vw";


            /* -----------------------------------------
               COLOR
               ----------------------------------------- */

            petal.style.setProperty(
                "--forest-leaf-color",
                leafColors[
                    Math.floor(
                        Math.random() *
                        leafColors.length
                    )
                ]
            );


            /* -----------------------------------------
               OPACITY
               ----------------------------------------- */

            petal.style.setProperty(
                "--forest-opacity",
                random(
                    0.55,
                    0.9
                )
            );


            /* -----------------------------------------
               FALL SPEED
               ----------------------------------------- */

            petal.style.setProperty(
                "--forest-duration",
                random(
                    9,
                    16
                ) + "s"
            );


            /* -----------------------------------------
               SIDEWAYS MOVEMENT
               ----------------------------------------- */

            petal.style.setProperty(
                "--forest-sway1",
                random(
                    -80,
                    100
                ) + "px"
            );

            petal.style.setProperty(
                "--forest-sway2",
                random(
                    -140,
                    140
                ) + "px"
            );

            petal.style.setProperty(
                "--forest-sway3",
                random(
                    -110,
                    160
                ) + "px"
            );

            petal.style.setProperty(
                "--forest-sway4",
                random(
                    -190,
                    130
                ) + "px"
            );


            /* -----------------------------------------
               RANDOM INITIAL ROTATION
               ----------------------------------------- */

            petal.style.marginLeft =
                random(
                    -20,
                    20
                ) + "px";


            /* -----------------------------------------
               ADD TO PAGE
               ----------------------------------------- */

            container.appendChild(petal);


            /* -----------------------------------------
               REMOVE AFTER ANIMATION
               ----------------------------------------- */

            petal.addEventListener(
                "animationend",
                function () {
                    petal.remove();
                },
                {
                    once: true
                }
            );
        }


        /* =========================================
           REDUCED MOTION
           ========================================= */

        const motionQuery =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            );


        /* =========================================
           INTERVAL
           ========================================= */

        let petalInterval = null;


        /* =========================================
           START PETALS
           ========================================= */

        function startPetals() {

            if (petalInterval !== null) {
                return;
            }

            console.log(
                "🍂 Starting petals"
            );


            /* -----------------------------------------
               INITIAL BURST
               ----------------------------------------- */

            for (
                let i = 0;
                i < 15;
                i++
            ) {

                setTimeout(
                    createPetal,
                    i * 120
                );
            }


            /* -----------------------------------------
               CONTINUOUS FALL
               ----------------------------------------- */

            petalInterval =
                setInterval(
                    createPetal,
                    420
                );
        }


        /* =========================================
           STOP PETALS
           ========================================= */

        function stopPetals() {

            if (
                petalInterval !== null
            ) {

                clearInterval(
                    petalInterval
                );

                petalInterval = null;

                console.log(
                    "🍂 Stopped petals"
                );
            }
        }


        /* =========================================
           UPDATE STATE
           ========================================= */

        function updatePetals() {

            if (
                motionQuery.matches ||
                document.hidden
            ) {

                stopPetals();

            } else {

                startPetals();
            }
        }


        /* =========================================
           PAGE VISIBILITY
           ========================================= */

        document.addEventListener(
            "visibilitychange",
            updatePetals
        );


        /* =========================================
           REDUCED MOTION CHANGES
           ========================================= */

        if (
            motionQuery.addEventListener
        ) {

            motionQuery.addEventListener(
                "change",
                updatePetals
            );

        } else {

            // Older browser fallback
            motionQuery.addListener(
                updatePetals
            );
        }


        /* =========================================
           CLEANUP ON PAGE UNLOAD
           ========================================= */

        window.addEventListener(
            "beforeunload",
            function () {

                stopPetals();

                if (
                    container &&
                    container.parentNode
                ) {

                    container.remove();
                }

                if (
                    style &&
                    style.parentNode
                ) {

                    style.remove();
                }
            }
        );


        /* =========================================
           START
           ========================================= */

        updatePetals();

        console.log(
            "🍂 petals ready!"
        );
    }


    /* =============================================
       INITIALIZE AFTER DOM LOAD
       ============================================= */

    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            init,
            {
                once: true
            }
        );

    } else {

        init();
    }

})();
