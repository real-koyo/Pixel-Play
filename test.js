const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const squares = [];
const squareSize = 50; // Default size of squares

// Create random colored squares
function createSquares() {
    const cols = Math.floor(canvas.width / squareSize);
    const rows = Math.floor(canvas.height / squareSize);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            const x = i * squareSize;
            const y = j * squareSize;
            squares.push({
                x,
                y,
                size: squareSize,
                color: getRandomColor(),
            });
        }
    }
}

// Generate a random color
function getRandomColor() {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor.padStart(6, '0')}`;
}

// Draw squares on the canvas
function drawSquares() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    squares.forEach(square => {
        ctx.fillStyle = square.color;
        ctx.fillRect(square.x, square.y, square.size, square.size);
    });
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
        square.size = square.isHovered ? squareSize * 1.5 : squareSize;
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

// Initialize and draw squares
createSquares();
drawSquares();

// Adjust canvas size on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    squares.length = 0; // Clear current squares
    createSquares(); // Create new squares
    drawSquares(); // Draw new squares
});
