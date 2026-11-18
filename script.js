// python -c "import imageio_ffmpeg, subprocess; subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(), '-i', 'MasterThesis.mp4', '-c:v', 'libx264', '-preset', 'medium', '-crf', '23', '-pix_fmt', 'yuv420p', '-an', '-movflags', '+faststart', 'MasterThesis_web.mp4'], check=True)"
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
        { src: "Videos/MasterThesis_web_optimized.mp4", speed: 3.0 },
    ],
    1: [
        { src: "Videos/6AxisArm_web_optimized.mp4", speed: 2.0 },
        "Images/roboArm_real.jpg",
        "Images/teachpendant.png",
        "Images/robo_arm.jpg",
        "Images/Shaft.png",
        "Images/FlangeCoupling.png"
    ],
    2: [
        { src: "Videos/CNC_web_optimized.mp4", speed: 1.0 },
        "Images/cnc_pic.jpg"
    ],
    3: [
        { src: "Videos/LedCube_web_optimized.mp4", speed: 1.0 },
    ],

    4: [
        { src: "Videos/Drone_web_optimized.mp4", speed: 1.0 },
    ]
};

const main_image_masters = document.getElementById("main_image_masters");
const main_image_arm = document.getElementById("main_image_arm");
const main_image_cnc = document.getElementById("main_image_cnc");
const main_image_cube = document.getElementById("main_image_cube");
const main_image_drone = document.getElementById("main_image_drone");

const gallery = document.getElementById("gallery");
const close_button = document.querySelector(".close");
const html = document.documentElement;
const prev_button = document.querySelector(".prev_button");
const next_button = document.querySelector(".next_button");

const gallery_image = document.getElementById("gallery_image");
const gallery_video = document.getElementById("gallery_video");

let currentIndex = 0;
let galleryIndex = 0;
let previousOverflow = "";


// ===================== DISPLAY MEDIA =====================

function displayMedia(media) {
    const src = typeof media === "string" ? media : media.src;
    const speed = typeof media === "string" ? 1.0 : (media.speed ?? 1.0);

    gallery_video.pause();
    gallery_video.removeAttribute("src");
    gallery_video.load();
    gallery_image.removeAttribute("src");

    const isVideo = /\.(mp4|webm)$/i.test(src);

    if (isVideo) {
        gallery_image.style.display = "none";
        gallery_video.style.display = "block";

        gallery_video.src = src;
        gallery_video.load();
        gallery_video.playbackRate = speed;

        gallery_video.play().catch(error => {
            console.warn("Video playback failed:", error);
        });

    } else {
        gallery_video.style.display = "none";
        gallery_image.style.display = "block";
        gallery_image.src = src;
    }
}


// ===================== OPEN GALLERY =====================

function openGallery(index) {
    if (!gallery || !galleryImages[index]?.length) {
        return;
    }

    galleryIndex = index;
    currentIndex = 0;

    previousOverflow = html.style.overflowY;

    gallery.style.display = "flex";
    html.style.overflowY = "hidden";

    displayMedia(galleryImages[galleryIndex][currentIndex]);
    check_image_index();
}


// ===================== OPEN EVENTS =====================

if (main_image_masters) {
    main_image_masters.addEventListener("click", () => openGallery(0));
}

if (main_image_arm) {
    main_image_arm.addEventListener("click", () => openGallery(1));
}

if (main_image_cnc) {
    main_image_cnc.addEventListener("click", () => openGallery(2));
}

if (main_image_cube) {
    main_image_cube.addEventListener("click", () => openGallery(3));
}

if (main_image_drone) {
    main_image_drone.addEventListener("click", () => openGallery(4));
}


// ===================== CLOSE GALLERY =====================

function closeGallery() {
    if (!gallery) {
        return;
    }

    gallery.style.display = "none";
    html.style.overflowY = previousOverflow;

    if (gallery_video) {
        gallery_video.pause();
        gallery_video.removeAttribute("src");
        gallery_video.load();
    }

    if (gallery_image) {
        gallery_image.removeAttribute("src");
    }

    currentIndex = 0;
}

if (close_button) {
    close_button.addEventListener("click", closeGallery);
}


// ===================== GALLERY BUTTONS =====================

function check_image_index() {
    const mediaCount = galleryImages[galleryIndex].length;

    if (prev_button) {
        prev_button.style.visibility =
            currentIndex <= 0 ? "hidden" : "visible";
    }

    if (next_button) {
        next_button.style.visibility =
            currentIndex >= mediaCount - 1 ? "hidden" : "visible";
    }
}

function changeGalleryMedia(direction) {
    const newIndex = currentIndex + direction;
    const mediaCount = galleryImages[galleryIndex].length;

    if (newIndex < 0 || newIndex >= mediaCount) {
        return;
    }

    currentIndex = newIndex;

    displayMedia(galleryImages[galleryIndex][currentIndex]);
    check_image_index();
}

if (prev_button) {
    prev_button.addEventListener("click", () => {
        changeGalleryMedia(-1);
    });
}

if (next_button) {
    next_button.addEventListener("click", () => {
        changeGalleryMedia(1);
    });
}


// ===================== KEYBOARD CONTROLS =====================

document.addEventListener("keydown", event => {
    if (!gallery || gallery.style.display !== "flex") {
        return;
    }

    if (event.key === "Escape") {
        closeGallery();
    }

    if (event.key === "ArrowLeft") {
        changeGalleryMedia(-1);
    }

    if (event.key === "ArrowRight") {
        changeGalleryMedia(1);
    }
});


// ===================== PROJECT TABS =====================

const projectTabs = document.querySelectorAll(".project-tab");
const projectItems = document.querySelectorAll(".project");

projectTabs.forEach(tab => {
    tab.addEventListener("click", () => {

        projectTabs.forEach(t => t.classList.remove("active"));
        projectItems.forEach(project => project.classList.remove("active"));

        tab.classList.add("active");

        const targetProject = document.getElementById(tab.dataset.project);

        if (targetProject) {
            targetProject.classList.add("active");
        }
    });
});


// ===================== EXPERIENCE TABS =====================

const experienceTabs = document.querySelectorAll(".experience-tab");
const experiences = document.querySelectorAll(".experiences");

experienceTabs.forEach(tab => {
    tab.addEventListener("click", () => {

        experienceTabs.forEach(t => t.classList.remove("active"));
        experiences.forEach(experience => experience.classList.remove("active"));

        tab.classList.add("active");

        const targetExperience = document.getElementById(tab.dataset.experience);

        if (targetExperience) {
            targetExperience.classList.add("active");
        }
    });
});
