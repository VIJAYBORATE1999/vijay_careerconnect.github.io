var canvas = document.querySelector("canvas"),
    context = canvas.getContext("2d"),
    radius = 2.5,
    minDistance = 40,
    maxDistance = 60,
    minDistance2 = minDistance * minDistance,
    maxDistance2 = maxDistance * maxDistance;

var width = 0,
    height = 0
onResize()

var tau = 2 * Math.PI,
    n = 200,
    particles = new Array(n);

for (var i = 0; i < n; ++i) {
    particles[i] = {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 0,
        vy: 0
    };
}

function onResize() {
    width = document.body.clientWidth
    height = 280
    canvas.width = width;
    canvas.height = height;
}

window.onresize = function() {
    onResize()
}

let start, previousTimeStamp;

function step(timestamp) {
    if (start === undefined) {
        start = timestamp;
    }
    const elapsed = timestamp - start;

    context.save();
    context.clearRect(0, 0, width, height);
    context.fillStyle = "hsl(207, 90%, 72%)";
    context.strokeStyle = "hsl(207, 90%, 72%)";

    for (var i = 0; i < n; ++i) {
        var p = particles[i];
        p.x += p.vx;
        if (p.x < -maxDistance) p.x += width + maxDistance * 2;
        else if (p.x > width + maxDistance) p.x -= width + maxDistance * 2;
        p.y += p.vy;
        if (p.y < -maxDistance) p.y += height + maxDistance * 2;
        else if (p.y > height + maxDistance) p.y -= height + maxDistance * 2;
        p.vx += 0.2 * (Math.random() - .5) - 0.01 * p.vx;
        p.vy += 0.2 * (Math.random() - .5) - 0.01 * p.vy;
        context.beginPath();
        context.arc(p.x, p.y, radius, 0, tau);
        context.fill();
    }

    for (var i = 0; i < n; ++i) {
        for (var j = i + 1; j < n; ++j) {
            var pi = particles[i],
                pj = particles[j],
                dx = pi.x - pj.x,
                dy = pi.y - pj.y,
                d2 = dx * dx + dy * dy;
            if (d2 < maxDistance2) {
                context.globalAlpha = d2 > minDistance2 ? (maxDistance2 - d2) / (maxDistance2 - minDistance2) : 1;
                context.beginPath();
                context.moveTo(pi.x, pi.y);
                context.lineTo(pj.x, pj.y);
                context.stroke();
            }
        }
    }

    context.restore();

    previousTimeStamp = timestamp
    window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);