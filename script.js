const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    entry.target.classList.toggle("show", entry.isIntersecting)
    if (entry.isIntersecting) observer.unobserve(entry.target)
  })
  console.log(entries)
},
  {
    threshold: 0.5,
    //rootMargin: "0px",
  } 
)

observer.observe(projects)
observer.observe(education)

const floating = document.querySelectorAll('.floating');
const initialTop = [];

floating.forEach((floating, index) => {
  initialTop[index] = parseFloat(getComputedStyle(floating).top);
});

window.addEventListener('scroll', function(){
  var value = window.scrollY;
  requestAnimationFrame(() => {
    //=========================================================
    floating[0].style.top = initialTop[0];
    floating[1].style.top = initialTop[1] + value * 0.2 + 'px';
    floating[2].style.top = initialTop[2] + value * 0.3 + 'px';
    floating[3].style.top = initialTop[3] + value * 0.4 + 'px';
    floating[4].style.top = initialTop[4];
    floating[5].style.top = initialTop[5] + value * 0.15 + 'px';
    //=========================================================
    //=========================================================
    floating[6].style.top = initialTop[6] + value * 0.5 + 'px';
    floating[7].style.top = initialTop[7] + value * 0.6 + 'px';
    floating[8].style.top = initialTop[8];
    floating[9].style.top = initialTop[9] + value * 0.3 + 'px';
    floating[10].style.top = initialTop[10] + value * 0.5 + 'px';
    floating[11].style.top = initialTop[11] + value * 0.6 + 'px';
    //=========================================================

    floating[12].style.top = initialTop[12];
    floating[13].style.top = initialTop[13] + value * 0.45 + 'px';
    floating[14].style.top = initialTop[14] + value * 0.3 + 'px';
    floating[15].style.top = initialTop[15] + value * 0.5 + 'px';
  });
})

document.addEventListener("DOMContentLoaded", function() {
  const floatingElements = document.querySelectorAll(".floating");

  floatingElements.forEach(element => {
    const randomDelay = Math.random() * 3; // Generates a delay between 0 and 4 seconds
    element.style.animationDelay = `${randomDelay}s`;
  });
});