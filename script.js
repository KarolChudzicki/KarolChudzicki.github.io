const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    entry.target.classList.toggle("show", entry.isIntersecting)
    if (entry.isIntersecting) observer.unobserve(entry.target)
  })
  console.log(entries)
},
  {
    threshold: 0.2,
    //rootMargin: "0px",
  } 
)

observer.observe(projects)
observer.observe(experience)
observer.observe(education)
observer.observe(contact)

const floating = document.querySelectorAll('.floating');
const initialTop = [];

floating.forEach((floating, index) => {
  initialTop[index] = parseFloat(getComputedStyle(floating).top);
});

const observerFloating = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Unobserve the target since we only want to activate the scroll effect once
      observerFloating.unobserve(entry.target);
    }
  });
}, 
{
  threshold: 0.5 // Keep as is if you want the entire element visible before triggering
});

// Add the scroll event listener only once
window.addEventListener('scroll', function() {
  var value = window.scrollY;
  requestAnimationFrame(() => {
    // Loop through floating elements and update their position
    for (let i = 0; i < floating.length; i++) {
      floating[i].style.top = initialTop[i] + value * (i % 2 === 0 ? 0.4 : 0.2) + 'px';
    }
  });
});



//=====================GALLERY========================
const galleryImages = {
  0:[
    'Images/armgif.gif',
    'Images/roboArm_real.jpg',
    'Images/teachpendant.png',
    'Images/robo_arm.jpg',
    'Images/Shaft.png',
    'Images/FlangeCoupling.png'
  ],
  1: [
    'Images/cncgif.gif',
    'Images/cnc_pic.jpg'
  ],
  2: [
    'Images/cubegif.gif'
  ]
};


const main_image_arm = document.getElementById('main_image_arm');
const gallery = document.getElementById('gallery');
const close_button = document.querySelector('.close');
const html = document.documentElement;
const prev_button = document.querySelector('.prev_button');
const next_button = document.querySelector('.next_button');
const gallery_image = document.getElementById('gallery_image');
currentIndex = 0;
galleryIndex = 0;

main_image_arm.addEventListener('click', () => {
  gallery_image.src = galleryImages[0][0];
  galleryIndex = 0;
  openGallery()
});

main_image_cnc.addEventListener('click', () => {
  gallery_image.src = galleryImages[1][0];
  galleryIndex = 1;
  openGallery()
});

main_image_cube.addEventListener('click', () => {
  gallery_image.src = galleryImages[2][0];
  galleryIndex = 2;
  openGallery()
});

function openGallery() {
  gallery.style.display = 'flex';
  html.style.overflowY = 'hidden';
  currentIndex = 0;
  check_image_index();
}

close_button.addEventListener('click', () => {
  gallery.style.display = 'none';
  html.style.overflowY = 'auto';
  currentIndex = 0;
});

function check_image_index() {
  if (currentIndex <= 0) {
    prev_button.style.visibility = 'hidden';
  }
  else {
    prev_button.style.visibility = 'visible';
  }
  
  if (currentIndex == galleryImages[galleryIndex].length - 1) {
    next_button.style.visibility = 'hidden';
  }
  else {
    next_button.style.visibility = 'visible';
  }
}


// Previous button event
prev_button.addEventListener('click', () => {
  currentIndex = currentIndex - 1;
  check_image_index();
  gallery_image.src = galleryImages[galleryIndex][currentIndex];
});

// Next button event
next_button.addEventListener('click', () => {
  currentIndex = currentIndex + 1;
  check_image_index();
  gallery_image.src = galleryImages[galleryIndex][currentIndex];
});