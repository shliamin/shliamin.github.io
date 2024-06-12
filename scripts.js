function toggleSidebar() {
    document.querySelector('.sidebar').classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', () => {
    showSection('home');
});
