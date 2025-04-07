document.addEventListener('DOMContentLoaded', function() {
    const book = document.getElementById('book');
    const pages = document.querySelectorAll('.page');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentPage = 0;
    const totalPages = pages.length;
    
    // Configurar las páginas inicialmente
    function setupPages() {
        pages.forEach((page, index) => {
            if (index === 0) {
                page.style.zIndex = totalPages;
            } else {
                page.style.zIndex = totalPages - index;
            }
            
            if (index % 2 === 0) {
                page.style.left = '0';
            } else {
                page.style.left = '100%';
            }
        });
    }
    
    setupPages();
    
    // Girar página
    function flipPage(direction) {
        if (direction === 'next' && currentPage < totalPages - 1) {
            pages[currentPage].classList.add('flipped');
            currentPage++;
        } else if (direction === 'prev' && currentPage > 0) {
            currentPage--;
            pages[currentPage].classList.remove('flipped');
        }
        
        // Actualizar z-index para el efecto de apilamiento
        pages.forEach((page, index) => {
            if (index < currentPage) {
                page.style.zIndex = currentPage - index;
            } else {
                page.style.zIndex = totalPages + currentPage - index;
            }
        });
    }
    
    // Eventos para botones
    nextBtn.addEventListener('click', () => flipPage('next'));
    prevBtn.addEventListener('click', () => flipPage('prev'));
    
    // Eventos para deslizar en móvil
    let touchStartX = 0;
    let touchEndX = 0;
    
    book.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    book.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        const threshold = 50; // Mínimo de píxeles para considerar un deslizamiento
        
        if (touchEndX < touchStartX - threshold) {
            // Deslizamiento a la izquierda (siguiente página)
            flipPage('next');
        } else if (touchEndX > touchStartX + threshold) {
            // Deslizamiento a la derecha (página anterior)
            flipPage('prev');
        }
    }
    
    // También permitir navegación con teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            flipPage('next');
        } else if (e.key === 'ArrowLeft') {
            flipPage('prev');
        }
    });
});