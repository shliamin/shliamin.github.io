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

    // Загрузка шаблона попапа
    fetch('project.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('project-modal-placeholder').innerHTML = data;
        });
});

function loadProjectDetails(title, description, link) {
    document.getElementById('project-title').innerText = title;
    document.getElementById('project-description').innerText = description;
    document.getElementById('project-link').href = link;
}

function updateTechStack() {
    const techFields = document.getElementById('tech-fields').value;
    const techStack = document.getElementById('tech-stack');
    techStack.innerHTML = '<option value="">Select Tech Stack</option>';

    if (techFields) {
        techStack.disabled = false;
        let options = [];
        if (techFields === 'full-stack') {
            options = ['React', 'Node.js', 'Angular'];
        } else if (techFields === 'data-science') {
            options = ['Python', 'R', 'TensorFlow'];
        } else if (techFields === 'bioinformatics') {
            options = ['Python', 'R', 'Bioconductor'];
        }
        options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option.toLowerCase();
            opt.innerText = option;
            techStack.appendChild(opt);
        });
    } else {
        techStack.disabled = true;
    }

    filterProjects();
}

function filterProjects() {
    const techFields = document.getElementById('tech-fields').value;
    const techStack = document.getElementById('tech-stack').value;
    const projects = document.querySelectorAll('.projects-grid .project');

    projects.forEach(project => {
        const projectTechField = project.getAttribute('data-tech-field');
        const projectTechStack = project.getAttribute('data-tech-stack');
        let show = true;

        if (techFields && projectTechField !== techFields) {
            show = false;
        }

        if (techStack && projectTechStack !== techStack) {
            show = false;
        }

        if (show) {
            project.style.display = 'block';
        } else {
            project.style.display = 'none';
        }
    });
}
