// ===================== SECTION ANIMATIONS =====================

const projects = document.getElementById("projects");
const experience = document.getElementById("experience");
const education = document.getElementById("education");
const contact = document.getElementById("contact");

const triggerOffset = Math.min(
    400,
    Math.max(60, window.innerHeight * 0.3)
);

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0,
        rootMargin: `0px 0px -${triggerOffset}px 0px`
    }
);

[projects, experience, education, contact].forEach(section => {
    if (section) {
        observer.observe(section);
    }
});


// ===================== GALLERY =====================

const galleryImages = {
    0: [
        "Images/armgif.gif",
        "Images/roboArm_real.jpg",
        "Images/teachpendant.png",
        "Images/robo_arm.jpg",
        "Images/Shaft.png",
        "Images/FlangeCoupling.png"
    ],

    1: [
        "Images/cncgif.gif",
        "Images/cnc_pic.jpg"
    ],

    2: [
        "Images/cubegif.gif"
    ]
};

const main_image_arm = document.getElementById("main_image_arm");
const main_image_cnc = document.getElementById("main_image_cnc");
const main_image_cube = document.getElementById("main_image_cube");

const gallery = document.getElementById("gallery");
const close_button = document.querySelector(".close");
const html = document.documentElement;
const prev_button = document.querySelector(".prev_button");
const next_button = document.querySelector(".next_button");
const gallery_image = document.getElementById("gallery_image");

let currentIndex = 0;
let galleryIndex = 0;


// ===================== OPEN GALLERY =====================

function openGallery(index) {
    galleryIndex = index;
    currentIndex = 0;

    gallery_image.src = galleryImages[galleryIndex][currentIndex];

    gallery.style.display = "flex";
    html.style.overflowY = "hidden";

    check_image_index();
}


if (main_image_arm) {
    main_image_arm.addEventListener("click", () => {
        openGallery(0);
    });
}

if (main_image_cnc) {
    main_image_cnc.addEventListener("click", () => {
        openGallery(1);
    });
}

if (main_image_cube) {
    main_image_cube.addEventListener("click", () => {
        openGallery(2);
    });
}


// ===================== CLOSE GALLERY =====================

if (close_button) {
    close_button.addEventListener("click", () => {
        gallery.style.display = "none";
        html.style.overflowY = "auto";
        currentIndex = 0;
    });
}


// ===================== GALLERY BUTTONS =====================

function check_image_index() {
    prev_button.style.visibility =
        currentIndex <= 0 ? "hidden" : "visible";

    next_button.style.visibility =
        currentIndex >= galleryImages[galleryIndex].length - 1
            ? "hidden"
            : "visible";
}


if (prev_button) {
    prev_button.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
        }

        check_image_index();

        gallery_image.src =
            galleryImages[galleryIndex][currentIndex];
    });
}


if (next_button) {
    next_button.addEventListener("click", () => {
        if (
            currentIndex <
            galleryImages[galleryIndex].length - 1
        ) {
            currentIndex++;
        }

        check_image_index();

        gallery_image.src =
            galleryImages[galleryIndex][currentIndex];
    });
}