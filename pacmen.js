var pos = 0;
const pacArray = [
  ['pacman1.png', 'pacman2.png'],
  ['pacman3.png', 'pacman4.png']
];
var direction = 0;
const pacMen = [];

function setToRandom(scale) {
  return {
      x: Math.random() * scale,
      y: Math.random() * scale
  }
}
// Factory to make a PacMan
function makePac() {
  // returns an object with values scaled
  let velocity = setToRandom(10);
  let position = setToRandom(200);
  // Add image to div id = images
  let images = document.getElementById('images');
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  newimg.src = 'images/pacman1.png';
  newimg.width = 100;
  newimg.style.left = position.x;
  newimg.style.top = position.y;
  images.appendChild(newimg);
  // new style of creating an object
  return {
      position,
      velocity,
      newimg
  }
}

function chomp() {
  pacMen.forEach((item) => {
  if (item.newimg.src.match('images/pacman1.png$')) {
    item.newimg.src = 'images/pacman2.png';
  } else if (item.newimg.src.match('images/pacman2.png$')) {
    item.newimg.src = 'images/pacman1.png';
  } else if (item.newimg.src.match('images/pacman3.png$')) {
    item.newimg.src = 'images/pacman4.png';
  } else if (item.newimg.src.match('images/pacman4.png$')) {
    item.newimg.src = 'images/pacman3.png';
  }
  })
  setTimeout(chomp, 325);
}

function update() {
  //loop over pacmen array and move each one and move image in DOM
  pacMen.forEach((item) => {
      checkCollisions(item)
      item.position.x += item.velocity.x;
      item.position.y += item.velocity.y;

      item.newimg.style.left = item.position.x;
      item.newimg.style.top = item.position.y;

    })
    setTimeout(update, 20);
  }

  function checkCollisions(item) {
    if (item.position.x + item.velocity.x + item.newimg.width > window.innerWidth) {
      item.newimg.src = 'images/pacman3.png';
      item.velocity.x = -item.velocity.x;
    }

    if (item.position.x + item.velocity.x < 0) {
      item.newimg.src = 'images/pacman1.png';
      item.velocity.x = -item.velocity.x;
    }

    if (item.position.y + item.velocity.y + item.newimg.height > window.innerHeight ||
      item.position.y + item.velocity.y < 0) {
      item.velocity.y = -item.velocity.y;
    }

  }

function makeOne() {
  pacMen.push(makePac()); // add a new PacMan
}