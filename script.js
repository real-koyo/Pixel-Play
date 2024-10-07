
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

// Function to create individual pixels
function pixel(){
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
pixSize = 2;
width = Math.ceil(canvas.width / pixSize);
height = Math.ceil(canvas.height / pixSize);


for (let j=0; j< height; j++) {
    for (let i=0; i< width; i++) {
        ctx.fillStyle = getRandomColor();
        ctx.fillRect( i * pixSize, j *pixSize, pixSize, pixSize);
    }
}
}

// Function to generate a random color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let j = 0; j < 6; j++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function time() {
    pixel();
    setInterval(pixel, 1); // Call drawCubes every 1000ms (1 second)
}

window.addEventListener("load", time);
window.addEventListener("resize", pixel);
