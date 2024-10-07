
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
pixSize = 2; //square size
const squares = [];


// Function to create individual pixels
function pixel(){

//width = Math.ceil(canvas.width / pixSize);
//height = Math.ceil(canvas.height / pixSize);

const cols = Math.floor(canvas.width / pixSize);
const rows = Math.floor(canvas.height / pixSize);


for (let j=0; j< cols; j++) {
    for (let i=0; i< rows; i++) {
        const x = i * pixSize;
            const y = j * pixSize;
            squares.push({
                x,
                y,
                size: pixSize,
                color: getRandomColor(),
            });
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

// Draw squares on the canvas
function drawSquares() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let hoveredSquare = null;

    squares.forEach(square => {
        if (square.isHovered) {
            hoveredSquare = square; // Save the hovered square
        } else {
            ctx.fillStyle = square.color;
            ctx.fillRect(square.x, square.y, square.size, square.size);
        }
    });

    // Draw the hovered square on top
    if (hoveredSquare) {
        ctx.fillStyle = hoveredSquare.color;
        ctx.fillRect(hoveredSquare.x, hoveredSquare.y, hoveredSquare.size, hoveredSquare.size);
    }
}


// Handle mouse movement to check for hover
canvas.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    squares.forEach(square => {
        square.isHovered = (
            mouseX >= square.x &&
            mouseX <= square.x + square.size &&
            mouseY >= square.y &&
            mouseY <= square.y + square.size
        );

        // Increase size if hovered, reset if not
        square.size = square.isHovered ? pixSize * 15 : pixSize;
    });

    drawSquares();
});


// Handle touch movement for increasing square size
canvas.addEventListener('touchmove', (event) => {
    event.preventDefault(); // Prevent scrolling

    const touchX = event.touches[0].clientX;
    const touchY = event.touches[0].clientY;

    squares.forEach(square => {
        square.isHovered = (
            touchX >= square.x &&
            touchX <= square.x + square.size &&
            touchY >= square.y &&
            touchY <= square.y + square.size
        );

        // Increase size if touched
        square.size = square.isHovered ? squareSize * 1.5 : squareSize;
    });

    drawSquares();
});

function time() {
    pixel();
    drawSquares();
    setInterval(pixel, 10000); // Call drawCubes every 1000ms (1 second)
}

window.addEventListener("load", time);
window.addEventListener("resize", pixel);
