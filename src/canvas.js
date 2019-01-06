import utils from './utils'

var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var mouse = {
    x: null,
    y: null
};

addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

var maxRadius = 25;

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

function Circle(x, y, dx, dy, radius, minRadius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.fillStyle = utils.randomColor(colors);
    this.strokeStyle = utils.randomColor(colors);

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = this.strokeStyle;
        c.stroke();
        c.fillStyle = this.fillStyle;
        c.fill();
        this.update()
    };

    this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
          mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius &&
              mouse.x > this.radius && mouse.x < innerWidth - this.radius &&
              mouse.y > this.radius && mouse.y < innerHeight - this.radius) {
                this.radius += 1.5;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }
    };
}

var circleArr = [];
function init() {
    circleArr = [];
    for (var i = 1; i < 1500; i++) {
        let radius = Math.random() * 3 + 1;
        let x = Math.random() * (innerWidth - radius * 3) + radius;
        let y = Math.random() * (innerHeight - radius * 3) + radius;
        let dx = (Math.random() - 0.5) * 2;
        let dy = (Math.random() - 0.5) * 2;
        circleArr.push(new Circle(x, y, dx, dy, radius));
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    circleArr.map(circle => circle.draw());

}
init();
animate();
