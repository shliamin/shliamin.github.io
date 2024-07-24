document.addEventListener('DOMContentLoaded', () => {
    showSection('about-me');

    const note = document.getElementById("note");
    const noteText = document.getElementById("note-text");
    const originalText = "👋 Hello! To download my resume, click the file icon below my photo.";
    const truncatedText = "👋";

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

    // Pop-up functionality
    const popupContainer = document.getElementById('popup-container');
    const popupDocument = document.getElementById('popup-document');
    const popupClose = document.getElementById('popup-close');
    var languageSwitcher = document.querySelector('.language-switcher');

    document.querySelectorAll('.popup-word').forEach(word => {
        word.addEventListener('click', function() {
            const documentSrc = this.getAttribute('data-document');
            popupDocument.setAttribute('src', documentSrc);
            popupContainer.style.display = 'block';
    
            
            if (window.innerWidth <= 768) {
                languageSwitcher.classList.add('hidden');
            }
        });
    });
    
    popupClose.addEventListener('click', function() {
        popupContainer.style.display = 'none';
        popupDocument.setAttribute('src', '');
    
       
        languageSwitcher.classList.remove('hidden');
    });
    
    window.addEventListener('click', function(event) {
        if (event.target == popupContainer) {
            popupContainer.style.display = 'none';
            popupDocument.setAttribute('src', '');
    
            
            languageSwitcher.classList.remove('hidden');
        }
    });
    
    

    // Handler for clicking on "My Work" text
    document.querySelectorAll('.click-work').forEach(word => {
        word.addEventListener('click', function() {
            const myWorkButton = document.querySelector('.uk-button.uk-button-default[onclick="showSection(\'my-work\')"]');
            if (myWorkButton) {
                myWorkButton.click();
            }
        });
    });

    // Handler for clicking on "Contact" text
    document.querySelectorAll('.click-contact').forEach(word => {
        word.addEventListener('click', function() {
            const myWorkButton = document.querySelector('.uk-button.uk-button-default[onclick="showSection(\'contact\')"]');
            if (myWorkButton) {
                myWorkButton.click();
            }
        });
    });

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
    window.scrollTo({ top: 0, behavior: 'smooth' }); 

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
    const projectsGrid = document.querySelector('.projects-grid');
    const projects = Array.from(projectsGrid.querySelectorAll('.project'));
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

        project.style.display = show ? 'block' : 'none';
        hasVisibleProjects = hasVisibleProjects || show;
    });

    const noResultsMessage = document.getElementById('no-results-message');
    noResultsMessage.style.display = hasVisibleProjects ? 'none' : 'block';

    const visibleProjects = projects.filter(project => project.style.display === 'block');
    visibleProjects.forEach(project => projectsGrid.appendChild(project));
}


function switchLanguage(lang) {
    document.getElementById('btn-en').classList.remove('active');
    document.getElementById('btn-de').classList.remove('active');

    if (lang === 'en') {
        document.getElementById('btn-en').classList.add('active');
    } else if (lang === 'de') {
        document.getElementById('btn-de').classList.add('active');
    }

    const translatableElements = document.querySelectorAll('#about-me p, #about-me ul li');
    translatableElements.forEach(element => {
        const key = element.id;
        if (translations[lang][key]) {
            element.innerHTML = translations[lang][key];
        }
    });
}


    const translations = {
        en: {
            'text-1': '<strong>I am a Computer Scientist</strong> with a <span class="popup-word" data-document="B.Sc. Degree Certificate - HTW Berlin.pdf">Bachelor of Science</span> in Computer Science from the University of Applied Sciences Berlin. From 2015 to 2019, I studied Electrical Engineering and IT Security at Ruhr University Bochum. Since 2019, I have been engaged in <span class="popup-word" data-document="Le Wagon Certificate.pdf">full stack development</span> and data science. I have completed three internships at IT companies and have received recommendation letters from <span class="popup-word" data-document="Internship Reference Rhenus Logistics.pdf">Rhenus Logistics</span>, the Data Centre of the <span class="popup-word" data-document="Praktikumszeugnis HTW Berlin.pdf">University of Applied Sciences Berlin</span>, and <span class="popup-word" data-document="Mercedes-Benz Certificate.pdf">Mercedes-Benz</span>. Additionally, I have been freelancing for several years. I author articles on technology and innovation in IT, which you can read on my Medium profile by clicking on the respective icons below my photo. I am always committed to lifelong learning: <span class="popup-word" data-document="The MERN Full Stack Certificate - Udemy.pdf">MERN</span>, <span class="popup-word" data-document="Spring Cloud Certificate - Udemy.pdf">Spring</span>.',
            'text-2': '<strong>What matters to me is</strong> solving business, scientific, and social problems through technological solutions. I believe this is the foundation for the development of individuals, companies, and society as a whole.',
            'text-3': '<strong>To align with my values</strong>, I create software that helps achieve these goals. Besides developing software, I write about my processes and frequently share open source code. Examples of my work can be found in the <span class="click-work">My Work</span> section.',
            'text-4': '<strong>My goal is</strong> to create IT solutions that directly impact the future development of individuals, companies, and society. By making our lives more automated and efficient, maintaining competitive advantages, and understanding and leveraging data effectively, we can make high-quality insights and decisions. This belief drives my work.',
            'text-5': '<strong>My clients include</strong> technology companies and institutes focused on research, innovation, production improvement, and developing proprietary technologies to gain a competitive edge. I freelance and often help non-IT professionals solve their technological problems as well.',
            'text-6': '<strong>Among my achievements and those of my clients</strong>:',
            'item-1': 'Participated in an Innovation Challenge with Mercedes-Benz, creating an IT solution to attract younger clients, earning a recommendation letter and a prize.',
            'item-2': 'Developed a software pipeline that improved genome assembly quality through enhanced RNA sequencing trimming methods, now used by other students in their dissertations.',
            'item-3': 'Contributed to the development of my university\'s web portal, now used by 14,000 students.',
            'item-4': 'Assisted Rhenus Logistics in passing an audit by creating technical documentation for ship employees on Data Protection Policies and Data Security Management.',
            'item-5': 'Helped the Institute of Geographic Information Technology in Saint Petersburg develop national technologies, reducing dependency on foreign software licenses.',
            'item-6': 'Created numerous web applications that provide value and continue to benefit users. Many of my GitHub repositories are open source and have received stars, forks, and watchers from the community.',
            'text-7': '<strong>I am interested in</strong> long-term full-time collaborations.',
            'text-8': '<strong>I am committed to being useful to you</strong>. Regardless of whether we work together, let me share a small, useful software tool to ease your resume analysis process. Visit the <span class="click-contact">Contact</span> section and click the link at the bottom of the page to test the web application.',
            'text-9': '<strong>I would love to hear about the challenges you face</strong> in software development or data analysis in your organization. What questions can I answer to help you make the best decision? I will explain how these challenges can be overcome, and you might find something useful.'
        },
        de: {
            'text-1': '<strong>Ich bin ein Informatiker</strong> mit einem <span class="popup-word" data-document="B.Sc. Degree Certificate - HTW Berlin.pdf">Bachelor of Science</span> in Informatik von der Hochschule für Technik und Wirtschaft Berlin. Von 2015 bis 2019 habe ich Elektrotechnik und IT-Sicherheit an der Ruhr-Universität Bochum studiert. Seit 2019 beschäftige ich mich mit <span class="popup-word" data-document="Le Wagon Certificate.pdf">Full-Stack-Entwicklung</span> und Datenwissenschaft. Ich habe drei Praktika bei IT-Unternehmen absolviert und Empfehlungsschreiben von <span class="popup-word" data-document="Internship Reference Rhenus Logistics.pdf">Rhenus Logistics</span>, dem Rechenzentrum der <span class="popup-word" data-document="Praktikumszeugnis HTW Berlin.pdf">Hochschule für Technik und Wirtschaft Berlin</span> und <span class="popup-word" data-document="Mercedes-Benz Certificate.pdf">Mercedes-Benz</span> erhalten. Zusätzlich arbeite ich seit mehreren Jahren freiberuflich. Ich verfasse Artikel über Technologie und Innovation in der IT, die Sie auf meinem Medium-Profil lesen können, indem Sie auf die entsprechenden Symbole unter meinem Foto klicken. Ich bin stets dem lebenslangen Lernen verpflichtet: <span class="popup-word" data-document="The MERN Full Stack Certificate - Udemy.pdf">MERN</span>, <span class="popup-word" data-document="Spring Cloud Certificate - Udemy.pdf">Spring</span>.',
            'text-2': '<strong>Wichtig ist mir</strong> Geschäfts-, wissenschaftliche und gesellschaftliche Probleme durch technologische Lösungen zu lösen. Ich glaube, dass dies die Grundlage für die Entwicklung von Individuen, Unternehmen und der Gesellschaft als Ganzes ist.',
            'text-3': '<strong>Um meinen Werten treu zu bleiben</strong> erstelle ich Software, die hilft, diese Ziele zu erreichen. Neben der Entwicklung von Software schreibe ich über meine Prozesse und teile häufig Open-Source-Code. Beispiele meiner Arbeit finden Sie im Abschnitt <span class="click-work">Meine Arbeit</span>.',
            'text-4': '<strong>Mein Ziel ist es</strong> IT-Lösungen zu schaffen, die die zukünftige Entwicklung von Individuen, Unternehmen und der Gesellschaft direkt beeinflussen. Indem wir unser Leben automatisierter und effizienter gestalten, Wettbewerbsvorteile erhalten und Daten effektiv verstehen und nutzen, können wir qualitativ hochwertige Erkenntnisse und Entscheidungen treffen. Dieser Glaube treibt meine Arbeit an.',
            'text-5': '<strong>Zu meinen Kunden gehören</strong> Technologieunternehmen und Institute, die sich auf Forschung, Innovation, Produktionsverbesserung und die Entwicklung eigener Technologien konzentrieren, um einen Wettbewerbsvorteil zu erlangen. Ich arbeite freiberuflich und helfe oft Nicht-IT-Profis bei der Lösung ihrer technologischen Probleme.',
            'text-6': '<strong>Zu meinen und den Erfolgen meiner Kunden gehören</strong>:',
            'item-1': 'Teilnahme an einer Innovations-Challenge mit Mercedes-Benz, bei der eine IT-Lösung zur Gewinnung jüngerer Kunden entwickelt wurde, was zu einem Empfehlungsschreiben und einem Preis führte.',
            'item-2': 'Entwicklung einer Software-Pipeline, die die Qualität der Genomassemblierung durch verbesserte Methoden zur RNA-Sequenzierung verbessert hat und nun von anderen Studierenden in ihren Dissertationen verwendet wird.',
            'item-3': 'Mitwirkung an der Entwicklung des Webportals meiner Universität, das jetzt von 14.000 Studierenden genutzt wird.',
            'item-4': 'Unterstützung von Rhenus Logistics beim Bestehen einer Prüfung durch Erstellung technischer Dokumentation für Schiffsmitarbeiter zu Datenschutzrichtlinien und Datenmanagement.',
            'item-5': 'Hilfe für das Institut für Geoinformationstechnologie in Sankt Petersburg bei der Entwicklung nationaler Technologien, um die Abhängigkeit von ausländischen Softwarelizenzen zu verringern.',
            'item-6': 'Erstellung zahlreicher Webanwendungen, die Mehrwert bieten und den Nutzern weiterhin zugutekommen. Viele meiner GitHub-Repositories sind Open Source und haben Sterne, Forks und Beobachter aus der Community erhalten.',
            'text-7': '<strong>Ich bin an</strong> langfristigen Vollzeit-Zusammenarbeiten interessiert.',
            'text-8': '<strong>Es ist mir wichtig, Ihnen nützlich zu sein</strong>. Unabhängig davon, ob wir zusammenarbeiten, möchte ich Ihnen ein kleines, nützliches Softwaretool vorstellen, um Ihren Lebenslaufanalyseprozess zu erleichtern. Besuchen Sie den Abschnitt <span class="click-contact">Kontakt</span> und klicken Sie auf den Link am unteren Ende der Seite, um die Webanwendung zu testen.',
            'text-9': '<strong>Ich würde gerne mehr über die Herausforderungen erfahren</strong>, denen Sie sich in der Softwareentwicklung oder Datenanalyse in Ihrer Organisation stellen. Welche Fragen kann ich beantworten, um Ihnen bei der besten Entscheidung zu helfen? Ich werde erklären, wie diese Herausforderungen überwunden werden können, und Sie könnten etwas Nützliches finden.'
        }
    };



    window.addEventListener('scroll', function() {
        var languageSwitcher = document.querySelector('.language-switcher');
        if (window.scrollY > 0) {
            languageSwitcher.classList.add('hidden');
        } else {
            languageSwitcher.classList.remove('hidden');
        }
    });