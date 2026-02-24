const toolCards = document.querySelectorAll('.tool-card');
let currentTool = 0;

setInterval(() => {
    toolCards[currentTool].classList.remove('active');
    currentTool = (currentTool + 1) % toolCards.length;
    toolCards[currentTool].classList.add('active');
}, 2500);
