document.addEventListener('click', (event) => {
    if (event.target && event.target.id === 'portfolio-btn') {
        window.open("../html/portfolio.html", "_blank");
    }
});