document.addEventListener('DOMContentLoaded', () => {
    showSection('about-me');

    const note = document.getElementById("note");
    const noteText = document.getElementById("note-text");
    const originalText = "👋... I speak 🇬🇧🇩🇪🇷🇺 fluently. Feel free to contact me. To download my resume, click the file icon below my photo.";
    const truncatedText = "👋...";

    noteText.innerText = truncatedText;

    note.addEventListener("click", function() {
        if (!noteText.classList.contains("expanded")) {
            noteText.innerText = originalText;
            noteText.classList.add("expanded");
            highlightResume();
        } else {
            noteText.innerText = truncatedText;
            noteText.classList.remove("expanded");
        }
    });

    fetch('project.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('project-modal-placeholder').innerHTML = data;
        });

    fetchGitHubStats('shliamin');

    async function fetchGitHubStats(username) {
        try {
            const response = await fetch(`https://api.github.com/users/${username}/repos`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const repos = await response.json();
    
            let totalStars = 0;
            let totalForks = 0;
            let totalWatchers = 0;
    
            repos.forEach(repo => {
                totalStars += repo.stargazers_count;
                totalForks += repo.forks_count;
                totalWatchers += repo.watchers_count;
            });
    
            const statsElement = document.getElementById('github-stats');
    
            const stats = [
                {
                    icon: 'images/star-solid.svg',
                    label: 'Stars on GitHub',
                    value: totalStars
                },
                {
                    icon: 'images/code-fork-solid.svg',
                    label: 'Forks on GitHub',
                    value: totalForks
                },
                {
                    icon: 'images/eye-solid.svg',
                    label: 'Watchers on GitHub',
                    value: totalWatchers
                }
            ];
    
            stats.forEach(stat => {
                const item = document.createElement('div');
                item.classList.add('github-stats-item');
                
                const icon = document.createElement('img');
                icon.src = stat.icon;
                icon.alt = `${stat.label} Icon`;
                icon.classList.add('github-stats-icon');
                
                const detailContainer = document.createElement('div');
                detailContainer.classList.add('github-stats-detail-container');
                
                const detail = document.createElement('p');
                detail.classList.add('github-stats-detail');
                detail.id = "p-title";
                detail.innerText = stat.value;
                
                const label = document.createElement('p');
                label.classList.add('github-stats-label');
                label.innerText = stat.label;
                
                detailContainer.appendChild(detail);
                detailContainer.appendChild(label);
                item.appendChild(icon);
                item.appendChild(detailContainer);
                statsElement.appendChild(item);
            });
    
        } catch (error) {
            console.error('Error fetching GitHub stats:', error);
            document.getElementById('github-stats').innerHTML = `<p>Error fetching GitHub stats</p>`;
        }
    }
    

    const noResultsMessage = document.createElement('p');
    noResultsMessage.id = 'no-results-message';
    noResultsMessage.style.display = 'none';
    noResultsMessage.innerText = "Nothing found here (yet), maybe try another option or enjoy a coffee break! ☕";
    noResultsMessage.style.paddingBottom = '40px';
    document.querySelector('.projects-grid').appendChild(noResultsMessage);
});

function highlightResume() {
    const resumeIconMobile = document.querySelector(".icon-row a[href='path/to/your/resume.pdf']");
    const resumeIconDesktop = document.querySelector(".status-item a[href='path/to/your/resume.pdf']");
    const resumeElement = window.innerWidth <= 768 ? resumeIconMobile : resumeIconDesktop;

    resumeElement.classList.add('highlight');

    setTimeout(() => {
        resumeElement.classList.remove('highlight');
    }, 4000);
}

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

function loadProjectDetails(title, description, githubLink, websiteLink, status, imageUrl) {
    document.getElementById('project-title').innerText = title;
    document.getElementById('project-description').innerText = description;
    document.getElementById('project-link').href = githubLink;
    document.getElementById('project-website').href = websiteLink;
    document.getElementById('project-image').src = imageUrl;

    const statusElement = document.getElementById('project-status');
    statusElement.textContent = status;
    if (status === 'Completed') {
        statusElement.className = 'badge badge-success';
    } else if (status === 'In Development') {
        statusElement.className = 'badge badge-warning';
    } else {
        statusElement.className = 'badge badge-secondary';
    }
}

function updateTechStack() {
    const techFields = document.getElementById('tech-fields').value;
    const techStack = document.getElementById('tech-stack');
    techStack.innerHTML = '<option value="">Select Tech Stack</option>';

    if (techFields) {
        techStack.disabled = false;
        let options = [];
        if (techFields === 'full-stack') {
            options = ['MERN', 'Ruby on Rails', 'Python WebDev', 'JAM Stack', '.NET Stack', 'Microservices Java Stack'];
        } else if (techFields === 'data-science') {
            options = ['Python', 'OpenCV', 'NumPy', 'Nextflow', 'Fastp', 'Pandas', 'Matplotlib', 'Statistical Analysis'];
        } else if (techFields === 'bioinformatics') {
            options = ['Image Processing', 'Morphological Operations', 'Analysis and Visualization', 'SPAdes', 'QUAST', 'Bioinformatics Workflow', 'Genome Assembly', 'Data Analysis of Medical Records', 'DICOM Processing', '3D Visualization', 'Segmentation Algorithms'];
        } else if (techFields === 'machine-learning') {
            options = ['Collaborative Filtering', 'Content-Based Filtering', 'Hybrid Recommendation System'];
        } else if (techFields === 'quantum-computing') {
            options = ['Quantum Algorithms', 'Quantum Cryptography', 'Quantum Error Correction'];
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
    let hasVisibleProjects = false;

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
            hasVisibleProjects = true;
        } else {
            project.style.display = 'none';
        }
    });

    const noResultsMessage = document.getElementById('no-results-message');
    if (!hasVisibleProjects) {
        noResultsMessage.style.display = 'block';
    } else {
        noResultsMessage.style.display = 'none';
    }
}
