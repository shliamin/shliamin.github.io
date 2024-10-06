

document.addEventListener("DOMContentLoaded", () => {
  showSection("about-me");

  fetch("project.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("project-modal-placeholder").innerHTML = data;
    });

  fetchGitHubStats("shliamin");

  async function fetchGitHubStats(username) {
    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const repos = await response.json();

      let totalStars = 0;
      let totalForks = 0;
      let totalWatchers = 0;

      repos.forEach((repo) => {
        totalStars += repo.stargazers_count;
        totalForks += repo.forks_count;
        totalWatchers += repo.watchers_count;
      });

      const statsElement = document.getElementById("github-stats");

      const stats = [
        {
          icon: "images/star-solid.svg",
          label: "Stars on GitHub",
          value: totalStars,
        },
        {
          icon: "images/code-fork-solid.svg",
          label: "Forks on GitHub",
          value: totalForks,
        },
        {
          icon: "images/eye-solid.svg",
          label: "Watchers on GitHub",
          value: totalWatchers,
        },
      ];

      stats.forEach((stat) => {
        const item = document.createElement("div");
        item.classList.add("github-stats-item");

        const icon = document.createElement("img");
        icon.src = stat.icon;
        icon.alt = `${stat.label} Icon`;
        icon.classList.add("github-stats-icon");

        const detailContainer = document.createElement("div");
        detailContainer.classList.add("github-stats-detail-container");

        const detail = document.createElement("p");
        detail.classList.add("github-stats-detail");
        detail.id = "p-title";
        detail.innerText = stat.value;

        detail.style.padding = "0";

        const label = document.createElement("p");
        label.classList.add("github-stats-label");
        label.innerText = stat.label;
        label.style.fontSize = "13px";

        detailContainer.appendChild(detail);
        detailContainer.appendChild(label);
        item.appendChild(icon);
        item.appendChild(detailContainer);
        statsElement.appendChild(item);
      });
    } catch (error) {
      console.error("Error fetching GitHub stats:", error);
      document.getElementById(
        "github-stats"
      ).innerHTML = `<p>Error fetching GitHub stats</p>`;
    }
  }

  // Pop-up functionality
  const popupContainer = document.getElementById("popup-container");
  const popupDocument = document.getElementById("popup-document");
  const popupClose = document.getElementById("popup-close");
  var languageSwitcher = document.querySelector(".language-switcher");

  document.querySelectorAll(".popup-word").forEach((word) => {
    word.addEventListener("click", function () {
      const documentSrc = this.getAttribute("data-document");
      popupDocument.setAttribute("src", documentSrc);
      popupContainer.style.display = "block";

      if (window.innerWidth <= 768) {
        languageSwitcher.classList.add("hidden");
      }
    });
  });

  popupClose.addEventListener("click", function () {
    popupContainer.style.display = "none";
    popupDocument.setAttribute("src", "");

    languageSwitcher.classList.remove("hidden");
  });

  window.addEventListener("click", function (event) {
    if (event.target == popupContainer) {
      popupContainer.style.display = "none";
      popupDocument.setAttribute("src", "");

      languageSwitcher.classList.remove("hidden");
    }
  });

  // Handler for clicking on "My Work" text
  document.querySelectorAll(".click-work").forEach((word) => {
    word.addEventListener("click", function () {
      const myWorkButton = document.querySelector(
        ".uk-button.uk-button-default[onclick=\"showSection('my-work')\"]"
      );
      if (myWorkButton) {
        myWorkButton.click();
      }
    });
  });

  // Handler for clicking on "Our match (AI)" button
  document.querySelector("#our-match-btn-en").addEventListener("click", function () {
    // Open the section first
    const ourMatchButton = document.querySelector(".uk-button.uk-button-default[onclick=\"showSection('our-fit')\"]");
    if (ourMatchButton) {
        ourMatchButton.click();
    }

    // Initialize the chart after the section is displayed
    setTimeout(function () {
        initializeChart();
    }, 300);  // Delay to ensure the section is fully visible before chart initialization
});

  

  // Handler for clicking on "Contact" text
  document.querySelectorAll(".click-contact").forEach((word) => {
    word.addEventListener("click", function () {
      const myWorkButton = document.querySelector(
        ".uk-button.uk-button-default[onclick=\"showSection('contact')\"]"
      );
      if (myWorkButton) {
        myWorkButton.click();
      }
    });
  });

  // Handler for clicking on "News" text
  document.querySelectorAll(".click-news").forEach((word) => {
    word.addEventListener("click", function () {
      const myWorkButton = document.querySelector(
        ".uk-button.uk-button-default[onclick=\"showSection('news')\"]"
      );
      if (myWorkButton) {
        myWorkButton.click();
      }
    });
  });
});

function showSection(sectionId) {
  window.scrollTo({ top: 0, behavior: "smooth" });

  const sections = document.querySelectorAll(".section");
  const buttons = document.querySelectorAll(".sidebar nav ul li button");

  sections.forEach((section) => {
    section.classList.remove("active");
    section.classList.add("hidden");
  });

  buttons.forEach((button) => {
    button.classList.remove("active");
  });

  document.getElementById(sectionId).classList.add("active");
  document.getElementById(sectionId).classList.remove("hidden");
  document
    .querySelector(`button[onclick="showSection('${sectionId}')"]`)
    .classList.add("active");
}

function switchLanguage(lang) {
  document.getElementById("btn-en").classList.remove("active");
  document.getElementById("btn-de").classList.remove("active");

  if (lang === "en") {
    document.getElementById("btn-en").classList.add("active");
    document.getElementById("content-en").style.display = "block";
    document.getElementById("content-de").style.display = "none";
    document.getElementById("content-en-2").style.display = "block";
    document.getElementById("content-de-2").style.display = "none";
    document.getElementById("welcome-en").style.display = "block";
    document.getElementById("welcome-de").style.display = "none";
    document.getElementById("new-opportunities-en").style.display = "block";
    document.getElementById("new-opportunities-de").style.display = "none";
    document.getElementById("current-location-en").style.display = "block";
    document.getElementById("current-location-de").style.display = "none";
    document.getElementById("schedule-meeting-en").style.display = "block";
    document.getElementById("schedule-meeting-de").style.display = "none";
    document.getElementById("certificates-title-en").style.display = "block";
    document.getElementById("certificates-title-de").style.display = "none";
    document.getElementById("books-title-en").style.display = "block";
    document.getElementById("books-title-de").style.display = "none";
    document.getElementById("degree-title-en").style.display = "block";
    document.getElementById("degree-title-de").style.display = "none";
    document.getElementById("notion-en").style.display = "block";
    document.getElementById("notion-de").style.display = "none";
    document.getElementById("p-title-medium-en").style.display = "block";
    document.getElementById("p-title-medium-de").style.display = "none";
    document.getElementById("p-title-linkedin-en").style.display = "block";
    document.getElementById("p-title-linkedin-de").style.display = "none";
    document.getElementById("p-title-github-en").style.display = "block";
    document.getElementById("p-title-github-de").style.display = "none";
    document.getElementById("p-title-x-en").style.display = "block";
    document.getElementById("p-title-x-de").style.display = "none";
    document.getElementById("p-title-hr-en").style.display = "block";
    document.getElementById("p-title-hr-de").style.display = "none";
    document.getElementById("p-title-udemy-en").style.display = "block";
    document.getElementById("p-title-udemy-de").style.display = "none";

  } else if (lang === "de") {
    document.getElementById("btn-de").classList.add("active");
    document.getElementById("content-en").style.display = "none";
    document.getElementById("content-de").style.display = "block";
    document.getElementById("content-en-2").style.display = "none";
    document.getElementById("content-de-2").style.display = "block";
    document.getElementById("welcome-en").style.display = "none";
    document.getElementById("welcome-de").style.display = "block";
    document.getElementById("new-opportunities-en").style.display = "none";
    document.getElementById("new-opportunities-de").style.display = "block";
    document.getElementById("current-location-en").style.display = "none";
    document.getElementById("current-location-de").style.display = "block";
    document.getElementById("schedule-meeting-en").style.display = "none";
    document.getElementById("schedule-meeting-de").style.display = "block";
    document.getElementById("certificates-title-en").style.display = "none";
    document.getElementById("certificates-title-de").style.display = "block";
    document.getElementById("books-title-en").style.display = "none";
    document.getElementById("books-title-de").style.display = "block";
    document.getElementById("degree-title-en").style.display = "none";
    document.getElementById("degree-title-de").style.display = "block";
    document.getElementById("notion-en").style.display = "none";
    document.getElementById("notion-de").style.display = "block";
    document.getElementById("p-title-medium-en").style.display = "none";
    document.getElementById("p-title-medium-de").style.display = "block";
    document.getElementById("p-title-linkedin-en").style.display = "none";
    document.getElementById("p-title-linkedin-de").style.display = "block";
    document.getElementById("p-title-github-en").style.display = "none";
    document.getElementById("p-title-github-de").style.display = "block";
    document.getElementById("p-title-x-en").style.display = "none";
    document.getElementById("p-title-x-de").style.display = "block";
    document.getElementById("p-title-hr-en").style.display = "none";
    document.getElementById("p-title-hr-de").style.display = "block";
    document.getElementById("p-title-udemy-en").style.display = "none";
    document.getElementById("p-title-udemy-de").style.display = "block";
  }
}

window.addEventListener("scroll", function () {
  var languageSwitcher = document.querySelector(".language-switcher");
  if (window.scrollY > 0) {
    languageSwitcher.classList.add("hidden");
  } else {
    languageSwitcher.classList.remove("hidden");
  }
});

// News

function truncateText(text, maxLength, newsLink = null) {
  if (text.length > maxLength) {
    if (newsLink) {
      return (
        text.slice(0, maxLength) +
        `... <a href="${newsLink}" target="_blank" class="read-more">Read more</a>`
      );
    } else {
      return text.slice(0, maxLength) + "...";
    }
  } else {
    return text;
  }
}

function getBadgeClass(category) {
  switch (category.toLowerCase()) {
    case "update":
      return "badge-update";
    case "milestone":
      return "badge-milestone";
    case "project":
      return "badge-project";
    case "news":
      return "badge-news";
    default:
      return "badge-default";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const newsList = document.getElementById("news-list");
  const authorFilter = document.getElementById("author-filter");
  let newsData = [];
  let authors = new Set();

  axios
    .get("news.json")
    .then((response) => {
      newsData = response.data;
      displayNews(newsData);
      populateAuthorFilter(newsData);
    })
    .catch((error) => {
      console.error("Error loading news:", error);
    });

  function formatDate(dateString) {
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  }

  function displayNews(filteredData) {
    filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));

    newsList.innerHTML = "";

    filteredData.forEach((newsItem) => {
      const newsElement = document.createElement("li");
      newsElement.classList.add("news-item");

      let badgeClass;
      switch (newsItem.category.toLowerCase()) {
        case "update":
          badgeClass = "badge-update";
          break;
        case "milestone":
          badgeClass = "badge-milestone";
          break;
        case "project":
          badgeClass = "badge-project";
          break;
        case "news":
          badgeClass = "badge-news";
          break;
        default:
          badgeClass = "badge-default";
          break;
      }

      let titleContent = `<h3>${newsItem.title}</h3>`;
      let content = truncateText(newsItem.content, 300);

      if (newsItem.category.toLowerCase() === "news") {
        const newsLink = newsItem.link;
        titleContent = `<h3><a href="${newsLink}" target="_blank">${newsItem.title}</a></h3>`;
        content = truncateText(newsItem.content, 300, newsLink);
      }

      newsElement.innerHTML = `
                    <div class="news-content">
                        <img src="${newsItem.image}" alt="${
        newsItem.title
      }" class="news-image">
                        <div class="news-text">
                            <div class="news-title">
                                <span class="badge ${badgeClass}">${
        newsItem.category
      }</span>
                                ${titleContent}
                            </div>
                            <p class="news-meta"><small>by ${
                              newsItem.author
                            } on ${formatDate(newsItem.date)}</small></p>
                            <p class="news-description">${content}</p>
                        </div>
                    </div>
                `;

      newsList.appendChild(newsElement);
    });
  }

  function populateAuthorFilter(data) {
    data.forEach((newsItem) => {
      authors.add(newsItem.author);
    });

    authors.forEach((author) => {
      const option = document.createElement("option");
      option.value = author;
      option.textContent = author;
      authorFilter.appendChild(option);
    });
  }

  const categoryFilter = document.getElementById("category-filter");
  const dateStartFilter = document.getElementById("date-start-filter");
  const dateEndFilter = document.getElementById("date-end-filter");

  // Add event listeners for automatic filtering
  categoryFilter.addEventListener("change", filterNews);
  authorFilter.addEventListener("change", filterNews);
  dateStartFilter.addEventListener("change", filterNews);
  dateEndFilter.addEventListener("change", filterNews);

  function filterNews() {
    const selectedCategory = categoryFilter.value.toLowerCase();
    const selectedAuthor = authorFilter.value;
    const selectedStartDate = new Date(dateStartFilter.value);
    const selectedEndDate = new Date(dateEndFilter.value);
    selectedEndDate.setHours(23, 59, 59, 999);

    let filteredData = newsData;

    if (selectedCategory !== "all") {
      filteredData = filteredData.filter((newsItem) => {
        const mainCategory = newsItem.category.toLowerCase().trim();
        const subCategory = newsItem.subcategory
          ? newsItem.subcategory.toLowerCase().trim()
          : "";

        return (
          mainCategory === selectedCategory ||
          `${mainCategory}:${subCategory}` === selectedCategory ||
          (selectedCategory === "news:all" && mainCategory === "news")
        );
      });
    }

    if (selectedAuthor !== "all") {
      filteredData = filteredData.filter(
        (newsItem) => newsItem.author === selectedAuthor
      );
    }

    if (dateStartFilter.value && dateEndFilter.value) {
      filteredData = filteredData.filter((newsItem) => {
        const newsDate = new Date(newsItem.date);
        return newsDate >= selectedStartDate && newsDate <= selectedEndDate;
      });
    }

    if (
      !dateStartFilter.value &&
      !dateEndFilter.value &&
      selectedCategory === "all" &&
      selectedAuthor === "all"
    ) {
      filteredData = newsData;
    }

    displayNews(filteredData);
  }
});

document.querySelectorAll(".button-docs").forEach((button) => {
  button.addEventListener("click", function () {
    this.classList.add("clicked");
  });
});

function adjustMargin() {
  const screenWidth = window.innerWidth;

  if (screenWidth < 500) {
    const marginLeft = screenWidth + 100;

    const firstButton = document.querySelector(".button-docs:first-child");
    if (firstButton) {
      firstButton.style.marginLeft = marginLeft + "px";
    }
  } else {
  }
}

window.addEventListener("load", adjustMargin);

window.addEventListener("resize", adjustMargin);

document.addEventListener("DOMContentLoaded", function () {
  let certificates = []; // To store the fetched data

  fetch("certificates.json")
    .then((response) => response.json())
    .then((data) => {
      certificates = data;
      updateCategoryCounts(certificates); // Update dropdown with counts
      displayCertificates(certificates); // Initially display all certificates
    })
    .catch((error) => console.error("Error fetching certificates:", error));

  const container = document.querySelector(".achievement-carousel");
  const filterDropdown = document.getElementById(
    "category-filter-certificates"
  );

  // Function to display certificates in the carousel
  function displayCertificates(certificates) {
    if (!container) {
      console.error("Container not found!");
      return;
    }

    // Clear the current items
    container.innerHTML = "";

    // Sort certificates by date in descending order
    certificates.sort((a, b) => new Date(b.date) - new Date(a.date));

    certificates.forEach((certificate) => {
      const achievementItem = document.createElement("div");
      achievementItem.classList.add("achievement-item");
      achievementItem.style.cssText =
        "position: relative; min-width: 120px; flex-shrink: 0;";

      const anchor = document.createElement("a");
      anchor.href = certificate.link;
      anchor.target = "_blank"; // Open in a new tab

      const image = document.createElement("img");
      image.src = certificate.image;
      image.alt = certificate.name + " Thumbnail";

      // Use width and height from the JSON data
      image.style.width = certificate.width + "px";
      image.style.height = certificate.height + "px";
      image.style.cssText +=
        "box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1); transition: transform 0.3s ease;";

      anchor.appendChild(image);
      achievementItem.appendChild(anchor);
      container.appendChild(achievementItem);
    });

    // Update the count in the dropdown for the current selected category
    updateDropdownLabel(certificates.length);
  }

  // Function to update the dropdown label with the number of certificates
  function updateDropdownLabel(count) {
    const selectedCategory =
      filterDropdown.options[filterDropdown.selectedIndex];
    selectedCategory.textContent = `${selectedCategory.value} (${count})`;
  }

  // Function to update category counts in the dropdown
  function updateCategoryCounts(certificates) {
    const allCount = certificates.length;
    const udemyCount = certificates.filter(
      (certificate) => certificate.category === "Udemy"
    ).length;
    const hackerRankCount = certificates.filter(
      (certificate) => certificate.category === "HackerRank"
    ).length;
    const workCount = certificates.filter(
      (certificate) => certificate.category === "Work"
    ).length;
    const educationCount = certificates.filter(
      (certificate) => certificate.category === "Education"
    ).length;

    filterDropdown.options[0].textContent = `All (${allCount})`;
    filterDropdown.options[1].textContent = `Udemy (${udemyCount})`;
    filterDropdown.options[2].textContent = `HackerRank (${hackerRankCount})`;
    filterDropdown.options[3].textContent = `Work (${workCount})`;
    filterDropdown.options[4].textContent = `Education (${educationCount})`;
  }

  // Event listener for the filter dropdown
  filterDropdown.addEventListener("change", function () {
    const selectedCategory = filterDropdown.value;

    // Filter the certificates based on the selected category
    const filteredCertificates =
      selectedCategory === "All"
        ? certificates
        : certificates.filter(
            (certificate) => certificate.category === selectedCategory
          );

    // Redisplay the filtered certificates
    displayCertificates(filteredCertificates);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  let books = []; // Store fetched data about books

  fetch("books.json")
    .then((response) => response.json())
    .then((data) => {
      books = data;
      updateDropdownCounts(); // Update dropdown with book counts
      displayBooks(books); // Initially display all books
    })
    .catch((error) => console.error("Error fetching books:", error));

  const container = document.querySelector(".books-carousel");
  const filterDropdown = document.getElementById("category-filter-books");

  // Function to display books in the carousel
  function displayBooks(books) {
    if (!container) {
      console.error("Container not found!");
      return;
    }

    container.innerHTML = ""; // Clear the current items
    books.sort((a, b) => a.title.localeCompare(b.title)); // Optional sorting

    books.forEach((book) => {
      const bookItem = document.createElement("div");
      bookItem.classList.add("book-item");
      bookItem.style.cssText =
        "position: relative; min-width: 120px; flex-shrink: 0;";

      const anchor = document.createElement("a");
      anchor.href = book.link;
      anchor.target = "_blank";

      const image = document.createElement("img");
      image.src = book.coverImage;
      image.alt = book.title + " Cover";
      image.style.width = "120px";
      image.style.height = "180px";
      image.style.cssText +=
        "box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1); transition: transform 0.3s ease;";

      anchor.appendChild(image);
      bookItem.appendChild(anchor);
      container.appendChild(bookItem);
    });
  }

  // Function to update dropdown with book counts
  function updateDropdownCounts() {
    const categoryCounts = {
      Technical: 0,
      "Business & Leadership": 0,
      "Innovation & Startups": 0,
      "Personal Development": 0,
    };

    books.forEach((book) => {
      if (categoryCounts[book.genre] !== undefined) {
        categoryCounts[book.genre]++;
      }
    });

    // Add total count for "All" option
    const allBooksCount = books.length;

    // Update dropdown options with counts
    document.querySelector(
      'option[value="All-genres"]'
    ).textContent = `All genres (${allBooksCount})`;

    for (const category in categoryCounts) {
      const option = document.querySelector(`option[value="${category}"]`);
      if (option) {
        option.textContent = `${category} (${categoryCounts[category]})`;
      }
    }
  }

  // Event listener for the filter dropdown
  filterDropdown.addEventListener("change", function () {
    const selectedCategory = filterDropdown.value;

    // Filter books by selected genre/category
    const filteredBooks =
      selectedCategory === "All-genres"
        ? books
        : books.filter((book) => book.genre === selectedCategory);

    // Redisplay the filtered books
    displayBooks(filteredBooks);
  });
});








// Function to detect language 
function detectLanguage(text) {
    // Convert text to lowercase for easier comparison
    const lowerText = text.toLowerCase();
    
    // English-specific characters and words
    const englishPattern = /[a-z]/;
    const commonEnglishWords = ['the', 'and', 'is', 'are', 'you'];
    
    // German-specific characters and words
    const germanPattern = /[äöüß]/;
    const commonGermanWords = ['der', 'und', 'ist', 'sie', 'das'];
    
    // Count occurrences of patterns and words
    let englishScore = 0;
    let germanScore = 0;

    // Check for English characters and words
    if (englishPattern.test(lowerText)) englishScore++;
    commonEnglishWords.forEach(word => {
        if (lowerText.includes(word)) englishScore++;
    });

    // Check for German characters and words
    if (germanPattern.test(lowerText)) germanScore++;
    commonGermanWords.forEach(word => {
        if (lowerText.includes(word)) germanScore++;
    });

    // Decide language based on scores
    if (germanScore > englishScore) {
        return 'de';  // German
    } else if (englishScore > germanScore) {
        return 'en';  // English
    } else {
        return null;  // Cannot determine language
    }
}


// Function to update character count dynamically
function updateCharacterCount(textArea, countDisplay, maxLength) {
    const textLength = textArea.value.length;
    countDisplay.textContent = `Characters: ${textLength}/${maxLength}`;
    countDisplay.style.color = textLength > maxLength ? 'red' : 'black';
}

// Show loading spinner
function showSpinner() {
    document.getElementById('loading-spinner').style.display = 'block';
    document.getElementById('result-container').style.display = 'none';
}

// Hide loading spinner and show results container
function hideSpinner() {
    document.getElementById('loading-spinner').style.display = 'none';
    document.getElementById('result-container').style.display = 'flex';  // Восстанавливаем видимость контейнера
}


// Display detected language
function displayDetectedLanguage(language) {
    const languageDisplay = document.getElementById('language-detected');
    languageDisplay.style.display = 'block';
    languageDisplay.textContent = `Detected Language: ${language === 'en' ? 'English' : 'German'}`;
}




// Colors for each category
const categoryColors = {
    'Experience': '#1E2F4F',   // Deep navy-blue
    'Skills': '#1E2F4F',       // Deep navy-blue
    'Tech Stack': '#1E2F4F',   // Deep navy-blue
    'Soft Skills': '#FFB02E',  // Golden yellow
    'Cultural Fit': '#FFB02E', // Golden yellow
    'University': '#A0C1B9',   // Soft turquoise
    'Certifications': '#A0C1B9', // Soft turquoise
    'Engagement': '#6C7B95',   // Gray-blue
    'Projects': '#6C7B95',     // Gray-blue
    'References': '#F39C6B',   // Soft orange
    'Languages': '#E5E9F0'     // Light grayish-blue
};

// Percentages for each category
const categoryPercentages = {
    'Experience': 25,
    'Skills': 20,
    'Tech Stack': 5,
    'Soft Skills': 10,
    'Cultural Fit': 10,
    'University': 5,
    'Certifications': 5,
    'Engagement': 5,
    'Projects': 5,
    'References': 5,
    'Languages': 5
};



// Функция для отображения результатов анализа
function displayResults(result) {
    const resultContainer = document.getElementById('loaded-cards');
    resultContainer.innerHTML = '';
    resultContainer.style.display = 'flex';

    

    // Упорядоченный список категорий
    const orderedCategories = [
        "Experience", "Skills", "Tech Stack", "Soft Skills", "Cultural Fit",
        "University", "Certifications", "Engagement", "Projects", "References", "Languages"
    ];

    orderedCategories.forEach(function(category) {
        // Проверяем, есть ли категория в результатах анализа
        if (result.analysis.hasOwnProperty(category)) {
            const card = document.createElement('div');
            card.classList.add('category-card');

            const columns = document.querySelectorAll('.column');
            columns.forEach(column => {
            column.style.visibility = 'visible';
            });


            // Устанавливаем цвет фона карточки в зависимости от категории
            const backgroundColor = categoryColors[category] || '#fff';
            card.style.backgroundColor = backgroundColor;

            // Устанавливаем цвет текста на карточке
            if (["Experience", "Skills", "Tech Stack", "Engagement", "Projects"].includes(category)) {
                // Для указанных категорий устанавливаем белый цвет текста
                card.style.color = '#fff';
            } else {
                // Для остальных категорий цвет текста по умолчанию (чёрный)
                card.style.color = '#000';
            }

            const title = document.createElement('div');
            title.classList.add('category-title');
            title.textContent = category;

            // Устанавливаем цвет заголовка
            if (["Experience", "Skills", "Tech Stack", "Engagement", "Projects"].includes(category)) {
                // Для указанных категорий устанавливаем светлый цвет заголовка
                title.style.color = '#E5E9F0'; // Светлый цвет из вашей палитры
            } else {
                // Для остальных категорий цвет заголовка по умолчанию (чёрный)
                title.style.color = '#000';
            }

            const text = document.createElement('div');
            text.classList.add('category-text');
            text.textContent = result.analysis[category] || '-';

            // Создаём бейджик с процентом
            const percentageBadge = document.createElement('div');
            percentageBadge.classList.add('percentage-badge');
            percentageBadge.textContent = `${categoryPercentages[category]}%`;
            percentageBadge.style.position = 'absolute';
            percentageBadge.style.top = '5px';
            percentageBadge.style.right = '5px';
            percentageBadge.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            percentageBadge.style.color = '#fff';
            percentageBadge.style.padding = '2px 7px';
            percentageBadge.style.borderRadius = '5px';

            // Добавляем элементы в карточку
            card.appendChild(title);
            card.appendChild(text);
            card.appendChild(percentageBadge);

            // Добавляем карточку в контейнер
            resultContainer.appendChild(card);
        }
    });
}


// Form submission handler
document.getElementById('resume-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const jobDescriptionEN = document.getElementById('job_description-en');
    let jobDescription = jobDescriptionEN.value;

    showSpinner();

    if (jobDescription.length > 2000) {
        alert('The job description exceeds 2000 characters.');
        hideSpinner();
        return;
    }

    const detectedLanguage = detectLanguage(jobDescription);
    if (!detectedLanguage) {
        alert('Only English or German text is supported.');
        hideSpinner();
        return;
    }

    // Display the detected language
    displayDetectedLanguage(detectedLanguage);

    const formData = new FormData();
    formData.append('job_description', jobDescription);

    try {
        const response = await fetch('https://scrape-jobs-c0657e779443.herokuapp.com/analyze_with_categories', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        hideSpinner();

        if (response.ok) {
            displayResults(result);
        } else {
            document.getElementById('result-container').innerHTML = `
                <div style="color: white; background-color: #dc3545; padding: 15px; border-radius: 8px;">
                    <strong>Error:</strong> ${result.error}
                </div>`;
        }
    } catch (error) {
        console.error('Error:', error);
        hideSpinner();
        document.getElementById('result-container').innerHTML = `
            <div style="color: white; background-color: #dc3545; padding: 15px; border-radius: 8px;">
                <strong>An error occurred while processing your request.</strong>
            </div>`;
    }
});

// Dynamic character count display
document.getElementById('job_description-en').addEventListener('input', function() {
    const countDisplay = document.getElementById('character-count');
    updateCharacterCount(this, countDisplay, 2000);
});





let donutChartInstance = null;


function initializeChart() {
    const donutChartElement = document.getElementById('donutChart').getContext('2d');

    // Check if a chart instance already exists and destroy it
    if (donutChartInstance !== null) {
        donutChartInstance.destroy();
    }

    const categories = {
        'Professional Skills': {
            value: 50,
            color: '#1E2F4F',
            subcategories: {
                'Experience': 25,
                'Skills': 20,
                'Tech Stack': 5
            }
        },
        'Cultural Fit': {
            value: 20,
            color: '#FFB02E',
            subcategories: {
                'Soft Skills': 10,
                'Cultural Fit': 10
            }
        },
        'Education': {
            value: 10,
            color: '#A0C1B9',
            subcategories: {
                'University': 5,
                'Certifications': 5
            }
        },
        'Portfolio': {
            value: 10,
            color: '#6C7B95',
            subcategories: {
                'Engagement': 5,
                'Projects': 5
            }
        },
        'References': {
            value: 5,
            color: '#F39C6B',
            subcategories: {}
        },
        'Languages': {
            value: 5,
            color: '#E5E9F0',
            subcategories: {}
        }
    };

    const labels = [];
    const data = [];
    const backgroundColors = [];

    for (const category in categories) {
        const categoryInfo = categories[category];

        if (Object.keys(categoryInfo.subcategories).length > 0) {
            for (const subcategory in categoryInfo.subcategories) {
                labels.push(subcategory);
                data.push(categoryInfo.subcategories[subcategory]);
                backgroundColors.push(categoryInfo.color);
            }
        } else {
            labels.push(category);
            data.push(categoryInfo.value);
            backgroundColors.push(categoryInfo.color);
        }
    }

    // Create the chart and store it in the global variable
    donutChartInstance = new Chart(donutChartElement, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: backgroundColors,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                }
            }
        }
    });

    
}






























