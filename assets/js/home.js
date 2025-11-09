const totals = {
  artists: 15,
  concerts: 20,
  diary: 32,
  food: 13,
  home: 16,
  hoppings: 15,
  places: 31,
  portraits: 23,
  products: 12,
  queer_archive: 36,
  weddings: 26, 
}

let prevIndex = 0;
let nextIndex = 0;
let currentIndex = 1;
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

function onHashChange() {
  const hash = window.location.hash.substring(1).replace('-', '_');
  if(!Object.keys(totals).includes(hash)) {
    window.location.hash = '#';
    currentSection = 'home';
  } else {
    currentSection = hash;
  }

  sectionTotal = totals[currentSection];
  loadInitialImages(currentSection);

}

window.addEventListener('hashchange', onHashChange)
onHashChange();

function loadInitialImages(section) {
  currentIndex = 1;
  nextIndex = 2;
  prevIndex = totals[section];

  sectionTotal = totals[section];

  updatePictures();

}

previousButton.addEventListener('click', function() {
  if(currentIndex === 1) {
    currentIndex = sectionTotal;
  } else {
    currentIndex -= 1;
  }

  wrapIndices();

  updatePictures();
})

nextButton.addEventListener('click', function() {
  currentIndex += 1
  if (currentIndex > sectionTotal) {
    currentIndex %= sectionTotal;
  }

  wrapIndices();

  updatePictures();
})

function wrapIndices() {
  if(currentIndex === 1) {
    prevIndex = sectionTotal;
    nextIndex = currentIndex+1;
  } else if (currentIndex === sectionTotal) {
    prevIndex = currentIndex -1;
    nextIndex = (currentIndex+1) % sectionTotal;
  } else {
    prevIndex = currentIndex -1;
    nextIndex = currentIndex+1;
  }

}

function updatePictures() {
  picture.src = imageRoot + currentSection + '/' + padNumber(currentIndex) + '.jpg';
  hiddenPictures[0].src = imageRoot +currentSection + '/' + padNumber(prevIndex) + '.jpg';
  hiddenPictures[1].src = imageRoot +currentSection + '/' + padNumber(nextIndex) + '.jpg';

  current.textContent = padNumber(currentIndex);
  total.textContent = padNumber(sectionTotal);

}

