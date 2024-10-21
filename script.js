let btn = document.querySelector('#btn')
let menu = document.querySelector('.menu')

btn.onclick = function () {
    sidebar.classList.toggle('active')
};

document.addEventListener("DOMContentLoaded", function () {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Stop observing once visible
        }
      });
    }, {
      threshold: 0.1 // 10% of the section must be visible for the animation to trigger
    });
  
    // Observe each section with the "hidden-section" class
    document.querySelectorAll('.projects').forEach(section => {
      observer.observe(section);
    });
  });
  