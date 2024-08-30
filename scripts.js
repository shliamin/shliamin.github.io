document.addEventListener('DOMContentLoaded', () => {
    showSection('about-me');

    const note = document.getElementById("note");
    const noteText = document.getElementById("note-text");
    const originalText = "👋 In tech, the only limit is your imagination.";
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

    // Handler for clicking on "News" text
    document.querySelectorAll('.click-news').forEach(word => {
        word.addEventListener('click', function () {
            const myWorkButton = document.querySelector('.uk-button.uk-button-default[onclick="showSection(\'news\')"]');
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

        document.getElementById('greeting-en').style.display = 'block';
        document.getElementById('greeting-de').style.display = 'none';

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

        document.getElementById('greeting-en').style.display = 'none';
        document.getElementById('greeting-de').style.display = 'block';


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

// News

function truncateText(text, maxLength, newsLink = null) {
    if (text.length > maxLength) {
        if (newsLink) {
            return text.slice(0, maxLength) + `... <a href="${newsLink}" target="_blank" class="read-more">Read more</a>`;
        } else {
            return text.slice(0, maxLength) + '...';
        }
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
        case 'news':
            return 'badge-news';
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

        function formatDate(dateString) {
            const options = { day: '2-digit', month: 'long', year: 'numeric' };
            return new Date(dateString).toLocaleDateString('en-GB', options);
        }
        
        function displayNews(filteredData) {

            filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));
        
            newsList.innerHTML = '';
        
            filteredData.forEach(newsItem => {
                const newsElement = document.createElement('li');
                newsElement.classList.add('news-item');
        
                let badgeClass;
                switch (newsItem.category.toLowerCase()) {
                    case 'update':
                        badgeClass = 'badge-update';
                        break;
                    case 'milestone':
                        badgeClass = 'badge-milestone';
                        break;
                    case 'project':
                        badgeClass = 'badge-project';
                        break;
                    case 'news':
                        badgeClass = 'badge-news';
                        break;
                    default:
                        badgeClass = 'badge-default';
                        break;
                }
        
                
                let titleContent = `<h3>${newsItem.title}</h3>`;
                let content = truncateText(newsItem.content, 300);
        
                if (newsItem.category.toLowerCase() === 'news') {
                    const newsLink = newsItem.link; 
                    titleContent = `<h3><a href="${newsLink}" target="_blank">${newsItem.title}</a></h3>`;
                    content = truncateText(newsItem.content, 300, newsLink);
                }
        
                newsElement.innerHTML = `
                    <div class="news-content">
                        <img src="${newsItem.image}" alt="${newsItem.title}" class="news-image">
                        <div class="news-text">
                            <div class="news-title">
                                <span class="badge ${badgeClass}">${newsItem.category}</span>
                                ${titleContent}
                            </div>
                            <p class="news-meta"><small>by ${newsItem.author} on ${formatDate(newsItem.date)}</small></p>
                            <p class="news-description">${content}</p>
                        </div>
                    </div>
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
        const selectedCategory = categoryFilter.value.toLowerCase();
        const selectedAuthor = authorFilter.value;
        const selectedStartDate = new Date(dateStartFilter.value);
        const selectedEndDate = new Date(dateEndFilter.value);
        selectedEndDate.setHours(23, 59, 59, 999); 
    
        let filteredData = newsData;
    
        if (selectedCategory !== 'all') {
            filteredData = filteredData.filter(newsItem => {
                const mainCategory = newsItem.category.toLowerCase().trim(); 
                const subCategory = newsItem.subcategory ? newsItem.subcategory.toLowerCase().trim() : ''; 
                
                
                return mainCategory === selectedCategory || 
                       `${mainCategory}:${subCategory}` === selectedCategory || 
                       (selectedCategory === 'news:all' && mainCategory === 'news');
            });
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
            filteredData = newsData; 
        }
    
        displayNews(filteredData);
    }
    
    
    
    
});




document.querySelectorAll('.button-docs').forEach(button => {
    button.addEventListener('click', function() {
        this.classList.add('clicked'); 
    });
});

window.addEventListener('load', function() {
    const contentDocs = document.getElementById('content-docs');
    const maxScrollLeft = contentDocs.scrollWidth + 100;

    contentDocs.scrollLeft = 0;

    setTimeout(() => {
        contentDocs.scrollTo({
            left: maxScrollLeft, 
            behavior: 'smooth'
        });

        setTimeout(() => {
            contentDocs.scrollTo({
                left: 0,
                behavior: 'smooth'
            });
        }, 2000); 
    }, 1000); 
});


function adjustMargin() {
    const screenWidth = window.innerWidth;

    if (screenWidth < 500) { 
        const marginLeft = screenWidth + 100; 

        
        const firstButton = document.querySelector('.button-docs:first-child');
        if (firstButton) {
            firstButton.style.marginLeft = marginLeft + 'px';
        }
    } else {
        
        
    }
}


window.addEventListener('load', adjustMargin);


window.addEventListener('resize', adjustMargin);


document.addEventListener("DOMContentLoaded", function() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const formattedDate = `${day}.${month}.${year}`;
    document.querySelector('.date-stamp').textContent = formattedDate;
});
