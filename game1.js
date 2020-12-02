let lastHole;
let timeUp = false;
let score = 0;
let z = 0;
let z1 = 0;
let s = 0;

const scard = document.querySelector(".score");
const x = document.querySelectorAll(".hole");
const y = document.querySelectorAll(".mole");


function randomTime(min, max) 
{
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(x) 
{
  const i = Math.floor(Math.random() * x.length);
  const hole = x[i];
  if (hole === lastHole) 
  {
    
    return randomHole(x);
  }
  lastHole = hole;
  return hole;
}

function jump()
 {
  const time = randomTime(200, 1000);
  const hole = randomHole(x);
  hole.classList.add("up");
  setTimeout(() => 
  {
    hole.classList.remove("up");
    if (!timeUp) jump();
  }, time);
}

function StartGame() 
{
    if (score >= z1)
  {
    z1 = z;
    document.getElementById('highscore').innerHTML=score;
  }
  else{
    document.getElementById('highscore').innerHTML=z1;
  }
  scard.textContent = 0;
  timeUp = false;
  score = 0;
  jump();
  setTimeout(() => (timeUp = true), 10000);
}

function hit(e) 
{
  if (!e.isTrusted) return;
  score++;

//localStorage.setItem('s', score);
  document.cookie="s="+score;
  this.parentNode.classList.remove("up");
  
  scard.textContent = score;
  //z = localStorage.getItem('s');
  z = getCookie('s');
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
y.forEach(mole => mole.addEventListener("click", hit));



