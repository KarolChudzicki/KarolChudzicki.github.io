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
observer.observe(skills)
observer.observe(experience)
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
  threshold: 1 // Keep as is if you want the entire element visible before triggering
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

// Observe all floating elements
floating.forEach(elem => {
  observerFloating.observe(elem);
});



// const observerFloating = new IntersectionObserver(entries => {
//   entries.forEach(entry => {
//       if (entry.isIntersecting) {
//         window.addEventListener('scroll', function(){
//           var value = window.scrollY;
//           requestAnimationFrame(() => {
//             //=========================================================
//             floating[0].style.top = initialTop[0] + value * 0.4 + 'px';
//             floating[1].style.top = initialTop[1] + value * 0.2 + 'px';
//             floating[2].style.top = initialTop[2] + value * 0.4 + 'px';
//             floating[3].style.top = initialTop[3] + value * 0.2 + 'px';
//             floating[4].style.top = initialTop[4] + value * 0.3 + 'px';
//             floating[5].style.top = initialTop[5] + value * 0.25 + 'px';
//             //=========================================================
//             floating[6].style.top = initialTop[6] + value * 0.4 + 'px';
//             floating[7].style.top = initialTop[7] + value * 0.2 + 'px';
//             floating[8].style.top = initialTop[8] + value * 0.3 + 'px';
//             floating[9].style.top = initialTop[9] + value * 0.4 + 'px';
//             floating[10].style.top = initialTop[10] + value * 0.2 + 'px';
//             floating[11].style.top = initialTop[11] + value * 0.25 + 'px';
//             //=========================================================
//             floating[12].style.top = initialTop[12] + value * 0.1 + 'px';
//             floating[13].style.top = initialTop[13] + value * 0.4 + 'px';
//             floating[14].style.top = initialTop[14] + value * 0.2 + 'px';
//             floating[15].style.top = initialTop[15] + value * 0.5 + 'px';
//             floating[16].style.top = initialTop[16] + value * 0.3 + 'px';
//             floating[17].style.top = initialTop[17] + value * 0.5 + 'px';
//           });
//         })
//         observerFloating.unobserve(entry.target);
//       }
//     });
// }, 
// {
//   threshold: 0.5
// }
// );

// // Observe all floating elements
// floating.forEach(element => {
//   observerFloating.observe(element);
// });

document.addEventListener("DOMContentLoaded", function() {
  const floatingElements = document.querySelectorAll(".floating");

  floatingElements.forEach(element => {
    const randomDelay = Math.random() * 3; // Generates a delay between 0 and 4 seconds
    element.style.animationDelay = `${randomDelay}s`;
  });
});


//=====================GALLERY========================
const galleryImages = {
  0:[
    'Images/roboArm.PNG',
    'Images/roboArm_real.jpg',
    'Images/teachpendant.png',
    'Images/robo_arm.jpg',
    'Images/Shaft.png',
    'Images/FlangeCoupling.png'
  ],
  1: [
    'Images/cnc.PNG',
    'Images/cnc_pic.jpg'
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