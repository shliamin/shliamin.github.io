let allProjects = [];

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('tech-fields').addEventListener('change', updateTechStack);
    document.getElementById('tech-stack').addEventListener('change', filterProjects);

    axios.get('projects.json')
        .then(response => {
            allProjects = response.data; 
            const projectsGrid = document.getElementById('projects-grid');
            projectsGrid.innerHTML = '';

            
            allProjects.sort((a, b) => a.priority - b.priority);

            
            displayProjects(allProjects);
        })
        .catch(error => {
            console.error('Error loading projects:', error);
        });
});

function displayProjects(projects) {
    const projectsGrid = document.getElementById('projects-grid');
    projectsGrid.innerHTML = '';

    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.classList.add('col-md-4', 'col-sm-6', 'col-12', 'mb-4', 'project');
        projectCard.setAttribute('data-tech-field', project.techField);
        projectCard.setAttribute('data-tech-stack', project.techStack);
        projectCard.innerHTML = `
            <div class="card project" onclick="loadProjectDetails('${project.name}', '${project.description}', '${project.github}', '${project.demo}', '${project.status}', '${project.images.description}', '${project.technologies}');" uk-toggle="target: #project-modal">
                <div class="card-img-top" style="background-image: url('${project.images.card}');">
                    <div class="badge-ribbon">${project.name}</div>
                    <div class="card-body-overlay">
                        <div class="icons-row">
                            ${project.icons.map(icon => `<img src="${icon}" class="technology-icon" alt="${icon.split('/').pop().split('.')[0]} Icon">`).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
        projectsGrid.appendChild(projectCard);
    });

    const noResultsMessage = document.getElementById('no-results-message');
    noResultsMessage.style.display = projects.length > 0 ? 'none' : 'block';
}

function loadProjectDetails(title, description, githubLink, websiteLink, status, imageUrl, techStack) {
    document.getElementById('project-title').innerText = title;
    document.getElementById('project-description').innerText = description;
    document.getElementById('project-link').href = githubLink;
    document.getElementById('project-link').innerText = githubLink;
    document.getElementById('project-website').href = websiteLink;
    document.getElementById('project-website').innerText = websiteLink;
    document.getElementById('project-image').src = imageUrl;

    const statusElement = document.getElementById('status-text');
    statusElement.textContent = status;

    const techStackElement = document.getElementById('tech-stack-text');
    techStackElement.textContent = techStack;

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
            options = ['Collaborative Filtering', 'Content-Based Filtering', 'Hybrid Recommendation System', 'K-Means Clustering', 'Marching Cubes Algorithm'];
        } else if (techFields === 'quantum-computing') {
            options = ['Quantum Algorithms', 'Quantum Cryptography', 'Quantum Error Correction'];
        }
        options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option.toLowerCase().replace(/ /g, '-');
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

    let filteredProjects = allProjects.filter(project => {
        const projectTechField = project.techField || '';
        const projectTechStack = project.techStack || '';
        let show = true;

        if (techFields && !projectTechField.includes(techFields)) {
            show = false;
        }

        if (techStack && !projectTechStack.includes(techStack)) {
            show = false;
        }

        return show;
    });

    filteredProjects.sort((a, b) => a.priority - b.priority);

    displayProjects(filteredProjects);

    const noResultsMessage = document.getElementById('no-results-message');
    noResultsMessage.style.display = filteredProjects.length > 0 ? 'none' : 'block';
}
