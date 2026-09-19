const shape = document.getElementById('sprt');
const sound = document.getElementById('sound');
const tune = document.getElementById('tune');
const toggleButton = document.getElementById('toggleButton');
const statusText = document.getElementById('statusText');

shape.addEventListener('click', () => {
  sound.currentTime = 0; 
  sound.play();
});

toggleButton.addEventListener('change', function() {
  if (this.checked) {
    document.getElementById('container').classList.add('is-on');
    tune.currentTime = 0; 
    tune.play();
  } 
  else {
    document.getElementById('container').classList.remove('is-on');
    tune.pause();
  }
});


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function createParticle() {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    size: Math.random() * 10 + 3,
    speedX: (Math.random() - 0.5) * 5,
    speedY: Math.random() * 5 + 2,
    rotation: (Math.random() - 0.5) * 6,
    color: `hsl(${Math.random() * 360}, 80%, 60%)`
  });
}

function updateParticle(particle) {
  particle.x += particle.speedX;
  particle.y += particle.speedY;

  particle.x += Math.sin(particle.y * 0.1) * Math.random() * 0.5;

  if (particle.y > canvas.height + 20) {
    particle.y = Math.random() * canvas.height - canvas.height;
    particle.x = Math.random() * canvas.width;
  }
}

function drawParticle(particle) {
  ctx.save();
  ctx.translate(particle.x, particle.y);
  ctx.rotate(particle.rotation);
  ctx.fillStyle = particle.color;

  ctx.fillRect(
    particle.size,
    particle.size / 4,
    particle.size * 2,
    particle.size / 2
  );

  ctx.restore();
}

for (let i = 0; i < 200; i++) {
  createParticle();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particle) => {
    updateParticle(particle);
    drawParticle(particle);
  });

  requestAnimationFrame(animate);
}

animate();