const totals = {
  home: 16,
  artists: 21,
  portraits: 23,
  concerts: 20,
  diary: 32,
  food: 13,
  hoppings: 15,
  places: 31,
  products: 12,
  queer_archive: 37,
  weddings: 26, 
}

let currentPicture = 1;
let currentSection = 'home';
let sectionTotal = totals.home;

const imageRoot = 'assets/images/photos/';

const picture = document.getElementById('visible-picture');
const hiddenPictures = document.getElementsByClassName('hidden-picture');
const previousButton = document.getElementById('previous');
const nextButton = document.getElementById('next');
const current = document.getElementById('current-photo');
const total = document.getElementById('total-photos');

function padNumber(number) {
  return String(number).padStart(2, '0')
}

window.addEventListener('hashchange', function() {
  let hash = window.location.hash.substring(1);
  if(!Object.keys(totals).includes(hash)) {
    window.location.hash = '#';
    currentSection = 'home';
  } else {
    currentSection = hash.replace('-', '_');
  }
  loadInitialImages(currentSection);

})


// set hiddenpictures to prev and next
if(window.location.hash) {
  const section = window.location.hash.split('#')[1];
  loadInitialImages(section);
} else {
  loadInitialImages('home');
}

function loadInitialImages(section) {
  currentPicture = 1;
  sectionTotal = totals[section];


  current.textContent = padNumber(currentPicture);
  total.textContent = padNumber(sectionTotal);

}

previousButton.addEventListener('click', function() {
  let prev;
  let next;
  if(currentPicture === 1) {
    currentPicture = sectionTotal;
    prev = currentPicture -1;
    next = 1;
  } else {
    currentPicture -= 1;
    if(currentPicture === 1) {
      prev = sectionTotal;
    } else {
      prev = currentPicture-1;
    }
    next = currentPicture+1;
  }

  picture.src = imageRoot + currentSection + '/' + padNumber(currentPicture) + '.jpg';
  hiddenPictures[0].src = imageRoot +currentSection + '/' + padNumber(prev) + '.jpg';
  hiddenPictures[1].src = imageRoot +currentSection + '/' + padNumber(next) + '.jpg';

  current.textContent = padNumber(currentPicture);
  total.textContent = padNumber(sectionTotal);
})

nextButton.addEventListener('click', function() {
  currentPicture += 1
  if (currentPicture > sectionTotal) {
    currentPicture %= sectionTotal;
  }

  let prev;
  let next;
  if(currentPicture === 1) {
    prev = sectionTotal;
    next = currentPicture+1;
  } else {
    prev = currentPicture - -1;
    next = (currentPicture+1) % sectionTotal;
  }

  picture.src = imageRoot + currentSection + '/' + padNumber(currentPicture) + '.jpg';
  hiddenPictures[0].src = imageRoot +currentSection + '/' + padNumber(prev) + '.jpg';
  hiddenPictures[1].src = imageRoot +currentSection + '/' + padNumber(next) + '.jpg';

  current.textContent = padNumber(currentPicture);
  total.textContent = padNumber(sectionTotal);

  // move image forwards one

})

