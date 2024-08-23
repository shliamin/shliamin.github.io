document.addEventListener('DOMContentLoaded', () => {
    showSection('about-me');

    const note = document.getElementById("note");
    const noteText = document.getElementById("note-text");
    const originalText = "👋 Hello! To download my resume, click the file icon below my photo.";
    const truncatedText = "👋";

    noteText.innerText = truncatedText;

    note.addEventListener("click", function () {
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


    // Pop-up functionality
    const popupContainer = document.getElementById('popup-container');
    const popupDocument = document.getElementById('popup-document');
    const popupClose = document.getElementById('popup-close');
    var languageSwitcher = document.querySelector('.language-switcher');

    document.querySelectorAll('.popup-word').forEach(word => {
        word.addEventListener('click', function () {
            const documentSrc = this.getAttribute('data-document');
            popupDocument.setAttribute('src', documentSrc);
            popupContainer.style.display = 'block';


            if (window.innerWidth <= 768) {
                languageSwitcher.classList.add('hidden');
            }
        });
    });

    popupClose.addEventListener('click', function () {
        popupContainer.style.display = 'none';
        popupDocument.setAttribute('src', '');


        languageSwitcher.classList.remove('hidden');
    });
    

    window.addEventListener('click', function (event) {
        if (event.target == popupContainer) {
            popupContainer.style.display = 'none';
            popupDocument.setAttribute('src', '');


            languageSwitcher.classList.remove('hidden');
        }
    });

    // Handler for clicking on "My Work" text
    document.querySelectorAll('.click-work').forEach(word => {
        word.addEventListener('click', function () {
            const myWorkButton = document.querySelector('.uk-button.uk-button-default[onclick="showSection(\'my-work\')"]');
            if (myWorkButton) {
                myWorkButton.click();
            }
        });
    });

    // Handler for clicking on "Contact" text
    document.querySelectorAll('.click-contact').forEach(word => {
        word.addEventListener('click', function () {
            const myWorkButton = document.querySelector('.uk-button.uk-button-default[onclick="showSection(\'contact\')"]');
            if (myWorkButton) {
                myWorkButton.click();
            }
        });
    });

});

function highlightResume() {
    const resumeIconMobile = document.querySelector("#initial-download-link-mobile img.status-icon-mobile");
    const resumeIconDesktop = document.querySelector("#initial-download-link-desktop img.status-icon");
    const resumeElement = window.innerWidth <= 768 ? resumeIconMobile : resumeIconDesktop;

    if (resumeElement) {
        resumeElement.classList.add('highlight');

        setTimeout(() => {
            resumeElement.classList.remove('highlight');
        }, 4000);
    }
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


function switchLanguage(lang) {
    document.getElementById('btn-en').classList.remove('active');
    document.getElementById('btn-de').classList.remove('active');

    if (lang === 'en') {
        document.getElementById('btn-en').classList.add('active');
        document.getElementById('content-en').style.display = 'block';
        document.getElementById('content-de').style.display = 'none';
        document.getElementById('welcome-en').style.display = 'block';
        document.getElementById('welcome-de').style.display = 'none';
        document.getElementById('new-opportunities-en').style.display = 'block';
        document.getElementById('new-opportunities-de').style.display = 'none';
        document.getElementById('current-location-en').style.display = 'block';
        document.getElementById('current-location-de').style.display = 'none';
        document.getElementById('schedule-meeting-en').style.display = 'block';
        document.getElementById('schedule-meeting-de').style.display = 'none';
        document.getElementById('tool-info-en').style.display = 'block';
        document.getElementById('tool-info-de').style.display = 'none';
    } else if (lang === 'de') {
        document.getElementById('btn-de').classList.add('active');
        document.getElementById('content-en').style.display = 'none';
        document.getElementById('content-de').style.display = 'block';
        document.getElementById('welcome-en').style.display = 'none';
        document.getElementById('welcome-de').style.display = 'block';
        document.getElementById('new-opportunities-en').style.display = 'none';
        document.getElementById('new-opportunities-de').style.display = 'block';
        document.getElementById('current-location-en').style.display = 'none';
        document.getElementById('current-location-de').style.display = 'block';
        document.getElementById('schedule-meeting-en').style.display = 'none';
        document.getElementById('schedule-meeting-de').style.display = 'block';
        document.getElementById('tool-info-en').style.display = 'none';
        document.getElementById('tool-info-de').style.display = 'block';
    }
}

window.addEventListener('scroll', function () {
    var languageSwitcher = document.querySelector('.language-switcher');
    if (window.scrollY > 0) {
        languageSwitcher.classList.add('hidden');
    } else {
        languageSwitcher.classList.remove('hidden');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Desktop link event listener
    document.getElementById('initial-download-link-desktop').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default link behavior
        
        // Hide the initial link text and show the language selection buttons
        document.getElementById('initial-download-link-desktop').style.display = 'none';
        document.getElementById('language-selection-desktop').style.display = 'block';
    });

    document.getElementById('english-button-desktop').addEventListener('click', function() {
        window.location.href = 'Efim Shliamin Computer Scientist, ENG.pdf';
    });

    document.getElementById('german-button-desktop').addEventListener('click', function() {
        window.location.href = 'Efim Shliamin Informatiker, DEU.pdf';
    });

    // Mobile link event listener
    document.getElementById('initial-download-link-mobile').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default link behavior
        
        // Hide the initial link text and show the language selection buttons
        document.getElementById('initial-download-link-mobile').style.display = 'none';
        document.getElementById('language-selection-mobile').style.display = 'block';
    });

    document.getElementById('english-button-mobile').addEventListener('click', function() {
        window.location.href = 'Efim Shliamin Computer Scientist, ENG.pdf';
    });

    document.getElementById('german-button-mobile').addEventListener('click', function() {
        window.location.href = 'Efim Shliamin Informatiker, DEU.pdf';
    });
});


function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + '... <a href="#" class="read-more">Read more</a>';
    } else {
        return text;
    }
}

function getBadgeClass(category) {
    switch (category.toLowerCase()) {
        case 'update':
            return 'badge-update';
        case 'milestone':
            return 'badge-milestone';
        case 'project':
            return 'badge-project';
        default:
            return 'badge-default';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const newsList = document.getElementById('news-list');
    const authorFilter = document.getElementById('author-filter');
    let newsData = [];
    let authors = new Set();

    axios.get('news.json')
        .then(response => {
            newsData = response.data;
            displayNews(newsData);
            populateAuthorFilter(newsData);
        })
        .catch(error => {
            console.error('Error loading news:', error);
        });

    function displayNews(filteredData) {
        newsList.innerHTML = '';
        filteredData.forEach(newsItem => {
            const newsElement = document.createElement('li');
            newsElement.classList.add('news-item');

            const badgeClass = getBadgeClass(newsItem.category);

            newsElement.innerHTML = `
                <div class="news-header">
                    <h3>${newsItem.title}</h3>
                    <span class="badge ${badgeClass}">${newsItem.category}</span>
                </div>
                <p><small>by ${newsItem.author} on ${newsItem.date}</small></p>
                <p>${newsItem.content}</p>
                <a href="${newsItem.link}" target="_blank">Read more</a>
            `;

            newsList.appendChild(newsElement);
        });
    }

    function populateAuthorFilter(data) {
        data.forEach(newsItem => {
            authors.add(newsItem.author);
        });

        authors.forEach(author => {
            const option = document.createElement('option');
            option.value = author;
            option.textContent = author;
            authorFilter.appendChild(option);
        });
    }

    const categoryFilter = document.getElementById('category-filter');
    const dateStartFilter = document.getElementById('date-start-filter');
    const dateEndFilter = document.getElementById('date-end-filter');

    // Add event listeners for automatic filtering
    categoryFilter.addEventListener('change', filterNews);
    authorFilter.addEventListener('change', filterNews);
    dateStartFilter.addEventListener('change', filterNews);
    dateEndFilter.addEventListener('change', filterNews);

    function filterNews() {
        const selectedCategory = categoryFilter.value;
        const selectedAuthor = authorFilter.value;
        const selectedStartDate = new Date(dateStartFilter.value);
        const selectedEndDate = new Date(dateEndFilter.value);
        selectedEndDate.setHours(23, 59, 59, 999); // Account for the end of the day

        let filteredData = newsData;

        if (selectedCategory !== 'all') {
            filteredData = filteredData.filter(newsItem => newsItem.category.toLowerCase() === selectedCategory);
        }

        if (selectedAuthor !== 'all') {
            filteredData = filteredData.filter(newsItem => newsItem.author === selectedAuthor);
        }

        if (dateStartFilter.value && dateEndFilter.value) {
            filteredData = filteredData.filter(newsItem => {
                const newsDate = new Date(newsItem.date);
                return newsDate >= selectedStartDate && newsDate <= selectedEndDate;
            });
        }

        if (!dateStartFilter.value && !dateEndFilter.value && selectedCategory === 'all' && selectedAuthor === 'all') {
            filteredData = newsData; // Show all news if no filters are applied
        }

        displayNews(filteredData);
    }
});




