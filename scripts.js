function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    
    // Закрываем меню на мобильных устройствах после выбора секции
    if (window.innerWidth <= 768) {
        document.querySelector('.sidebar').classList.remove('active');
    }
}

function toggleMenu() {
    document.querySelector('.sidebar').classList.toggle('active');
}


document.addEventListener('DOMContentLoaded', () => {
    showSection('home');
});
