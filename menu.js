const sections = document.querySelectorAll(
    "#aboutme, section[id]"
);
const navLinks = document.querySelectorAll(".side-nav a");

function updateActiveNav() {
    const viewportCenter = window.innerHeight / 2;

    let activeSection = null;
    let smallestDistance = Infinity;

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();

        if (
            rect.bottom >= 0 &&
            rect.top <= window.innerHeight
        ) {
            const sectionCenter = rect.top + rect.height / 2;
            const distance = Math.abs(sectionCenter - viewportCenter);

            if (distance < smallestDistance) {
                smallestDistance = distance;
                activeSection = section;
            }
        }
    });

    if (!activeSection) return;

    navLinks.forEach(link => {
        link.classList.remove("active");
    });

    const activeLink = document.querySelector(
        `.side-nav a[href="#${activeSection.id}"]`
    );

    if (activeLink) {
        activeLink.classList.add("active");
    }
}

window.addEventListener("scroll", updateActiveNav, {
    passive: true
});

window.addEventListener("resize", updateActiveNav);

updateActiveNav();