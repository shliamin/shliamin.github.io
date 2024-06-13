function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    const buttons = document.querySelectorAll('.sidebar nav ul li button');

    sections.forEach(section => {
        section.classList.remove('active');
        section.classList.add('hidden');
    });

    buttons.forEach(button => {
        button.classList.remove('active');
    });
    
    document.getElementById(sectionId).classList.add('active');
    document.getElementById(sectionId).classList.remove('hidden');
    document.querySelector(`button[onclick="showSection('${sectionId}')"]`).classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
    showSection('about-me');

    const note = document.getElementById("note");
    const originalText = note.innerText;
    const halfLength = Math.floor(originalText.length / 3);
    const truncatedText = originalText.substring(0, halfLength) + '...';

    note.innerText = truncatedText;

    note.addEventListener("click", function() {
        if (note.classList.contains("expanded")) {
            note.innerText = truncatedText;
        } else {
            note.innerText = originalText;
        }
        note.classList.toggle("expanded");
    });
});
