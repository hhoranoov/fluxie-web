const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let mouseMoved = false;

const pointer = {
  x: window.innerWidth * 0.5,
  y: window.innerHeight * 0.5,
};

const params = {
  pointsNumber: 40,
  widthFactor: 0.7,
  spring: 0.4,
  friction: 0.5,
};

const trail = Array.from({ length: params.pointsNumber }, () => ({
  x: pointer.x,
  y: pointer.y,
  dx: 0,
  dy: 0,
}));

window.addEventListener("mousemove", (e) => {
  mouseMoved = true;
  pointer.x = e.pageX - window.pageXOffset;
  pointer.y = e.pageY - window.pageYOffset;
});

window.addEventListener("touchmove", (e) => {
  mouseMoved = true;
  pointer.x = e.targetTouches[0].pageX - window.pageXOffset;
  pointer.y = e.targetTouches[0].pageY - window.pageYOffset;
});

window.addEventListener("resize", setupCanvas);

setupCanvas();
update(0);

function update(t) {
  if (!mouseMoved) {
    pointer.x =
      (0.5 + 0.3 * Math.cos(0.002 * t) * Math.sin(0.005 * t)) * window.innerWidth;
    pointer.y =
      (0.5 + 0.2 * Math.cos(0.005 * t) + 0.1 * Math.cos(0.01 * t)) * window.innerHeight;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  trail.forEach((p, i) => {
    const prev = i === 0 ? pointer : trail[i - 1];
    const spring = i === 0 ? 0.4 * params.spring : params.spring;

    p.dx += (prev.x - p.x) * spring;
    p.dy += (prev.y - p.y) * spring;

    p.dx *= params.friction;
    p.dy *= params.friction;

    p.x += p.dx;
    p.y += p.dy;
  });

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "#d3b0b9");
  gradient.addColorStop(1, "#915BAC");

  ctx.strokeStyle = gradient;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(trail[0].x, trail[0].y);

  for (let i = 1; i < trail.length - 1; i++) {
    const xc = (trail[i].x + trail[i + 1].x) * 0.5;
    const yc = (trail[i].y + trail[i + 1].y) * 0.5;
    ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
    ctx.lineWidth = params.widthFactor * (params.pointsNumber - i);
  }

  ctx.stroke();

  window.requestAnimationFrame(update);
}

function setupCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
