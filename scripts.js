

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
    document.getElementById("ad-info-en").style.display = "block";
    document.getElementById("ad-info-de").style.display = "none";
    document.getElementById("prof-exp-en").style.display = "block";
    document.getElementById("prof-exp-de").style.display = "none";
    document.getElementById("edu-en").style.display = "block";
    document.getElementById("edu-de").style.display = "none";
    document.getElementById("Hobbies-en").style.display = "block";
    document.getElementById("Hobbies-de").style.display = "none";
    document.getElementById("hobby-2-en").style.display = "block";
    document.getElementById("hobby-2-de").style.display = "none";
    document.getElementById("karate-en").style.display = "block";
    document.getElementById("karate-de").style.display = "none";
    document.getElementById("hobby-1-en").style.display = "block";
    document.getElementById("hobby-1-de").style.display = "none";
    document.getElementById("hobby-description-en").style.display = "block";
    document.getElementById("hobby-description-de").style.display = "none";
    document.getElementById("three_months-en").style.display = "block";
    document.getElementById("three_months-de").style.display = "none";
    document.getElementById("two_years-en").style.display = "block";
    document.getElementById("two_years-de").style.display = "none";
    document.getElementById("three_months-2-en").style.display = "block";
    document.getElementById("three_months-2-de").style.display = "none";
    document.getElementById("six_months-en").style.display = "block";
    document.getElementById("six_months-de").style.display = "none";
    document.getElementById("six_months-2-en").style.display = "block";
    document.getElementById("six_months-2-de").style.display = "none";
    document.getElementById("four_years-en").style.display = "block";
    document.getElementById("four_years-de").style.display = "none";
    document.getElementById("three_months_3-en").style.display = "block";
    document.getElementById("three_months_3-de").style.display = "none";
    document.getElementById("three_years-en").style.display = "block";
    document.getElementById("three_years-de").style.display = "none";
    document.getElementById("one_year-en").style.display = "block";
    document.getElementById("one_year-de").style.display = "none";
    document.getElementById("one_year-2-en").style.display = "block";
    document.getElementById("one_year-2-de").style.display = "none";
    document.getElementById("eleven_years-en").style.display = "block";
    document.getElementById("eleven_years-de").style.display = "none";
    document.getElementById("eleven_years-2-en").style.display = "block";
    document.getElementById("eleven_years-2-de").style.display = "none";
    document.getElementById("eleven_years-3-en").style.display = "block";
    document.getElementById("eleven_years-3-de").style.display = "none";
    document.getElementById("sole-tech-exp-en").style.display = "block";
    document.getElementById("sole-tech-exp-de").style.display = "none";
    document.getElementById("software-htw-en").style.display = "block";
    document.getElementById("software-htw-de").style.display = "none";
    document.getElementById("htw-data-centre-fullstack-en").style.display = "block";
    document.getElementById("htw-data-centre-fullstack-de").style.display = "none";
    document.getElementById("IGIT-en").style.display = "block";
    document.getElementById("IGIT-de").style.display = "none";
    document.getElementById("RMS-en").style.display = "block";
    document.getElementById("RMS-de").style.display = "none";
    document.getElementById("htw-edu-en").style.display = "block";
    document.getElementById("htw-edu-de").style.display = "none";
    document.getElementById("edu-lewagon-en").style.display = "block";
    document.getElementById("edu-lewagon-de").style.display = "none";
    document.getElementById("bochum-edu-en").style.display = "block";
    document.getElementById("bochum-edu-de").style.display = "none";
    document.getElementById("studienkolleg-en").style.display = "block";
    document.getElementById("studienkolleg-de").style.display = "none";
    document.getElementById("language-edu-en").style.display = "block";
    document.getElementById("language-edu-de").style.display = "none";
    document.getElementById("school-en").style.display = "block";
    document.getElementById("school-de").style.display = "none";
    document.getElementById("mercedes-en").style.display = "block";
    document.getElementById("mercedes-de").style.display = "none";
    document.getElementById("HTW-HIWI-en").style.display = "block";
    document.getElementById("HTW-HIWI-de").style.display = "none";
    document.getElementById("htw-internship-en").style.display = "block";
    document.getElementById("htw-internship-de").style.display = "none";
    document.getElementById("IGIT-1-en").style.display = "block";
    document.getElementById("IGIT-1-de").style.display = "none";
    document.getElementById("rhenus-en").style.display = "block";
    document.getElementById("rhenus-de").style.display = "none";
    document.getElementById("cs-en").style.display = "block";
    document.getElementById("cs-de").style.display = "none";
    document.getElementById("lewagon-en").style.display = "block";
    document.getElementById("lewagon-de").style.display = "none";
    document.getElementById("ei-en").style.display = "block";
    document.getElementById("ei-de").style.display = "none";
    document.getElementById("kolleg-en").style.display = "block";
    document.getElementById("kolleg-de").style.display = "none";
    document.getElementById("eurasia-en").style.display = "block";
    document.getElementById("eurasia-de").style.display = "none";
    document.getElementById("school-1-en").style.display = "block";
    document.getElementById("school-1-de").style.display = "none";
    document.getElementById("cto-en").style.display = "block";
    document.getElementById("cto-de").style.display = "none";
    document.getElementById("tendex-en").style.display = "block";
    document.getElementById("tendex-de").style.display = "none";
    document.getElementById("today_months-en").style.display = "block";
    document.getElementById("today_months-de").style.display = "none";
    document.getElementById("prof-exp-auto-en").style.display = "block";
    document.getElementById("prof-exp-auto-de").style.display = "none";


  } else if (lang === "de") {
    document.getElementById("btn-de").classList.add("active");
    document.getElementById("content-en").style.display = "none";
    document.getElementById("content-de").style.display = "block";
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
    document.getElementById("ad-info-en").style.display = "none";
    document.getElementById("ad-info-de").style.display = "block";
    document.getElementById("prof-exp-en").style.display = "none";
    document.getElementById("prof-exp-de").style.display = "block";
    document.getElementById("edu-en").style.display = "none";
    document.getElementById("edu-de").style.display = "block";
    document.getElementById("Hobbies-en").style.display = "none";
    document.getElementById("Hobbies-de").style.display = "block";
    document.getElementById("hobby-2-en").style.display = "none";
    document.getElementById("hobby-2-de").style.display = "block";
    document.getElementById("karate-en").style.display = "none";
    document.getElementById("karate-de").style.display = "block";
    document.getElementById("hobby-1-en").style.display = "none";
    document.getElementById("hobby-1-de").style.display = "block";
    document.getElementById("hobby-description-en").style.display = "none";
    document.getElementById("hobby-description-de").style.display = "block";
    document.getElementById("three_months-en").style.display = "none";
    document.getElementById("three_months-de").style.display = "block";
    document.getElementById("two_years-en").style.display = "none";
    document.getElementById("two_years-de").style.display = "block";
    document.getElementById("three_months-2-en").style.display = "none";
    document.getElementById("three_months-2-de").style.display = "block";
    document.getElementById("six_months-en").style.display = "none";
    document.getElementById("six_months-de").style.display = "block";
    document.getElementById("six_months-2-en").style.display = "none";
    document.getElementById("six_months-2-de").style.display = "block";
    document.getElementById("four_years-en").style.display = "none";
    document.getElementById("four_years-de").style.display = "block";
    document.getElementById("three_months_3-en").style.display = "none";
    document.getElementById("three_months_3-de").style.display = "block";
    document.getElementById("three_years-en").style.display = "none";
    document.getElementById("three_years-de").style.display = "block";
    document.getElementById("one_year-en").style.display = "none";
    document.getElementById("one_year-de").style.display = "block";
    document.getElementById("one_year-2-en").style.display = "none";
    document.getElementById("one_year-2-de").style.display = "block";
    document.getElementById("eleven_years-en").style.display = "none";
    document.getElementById("eleven_years-de").style.display = "block";
    document.getElementById("eleven_years-2-en").style.display = "none";
    document.getElementById("eleven_years-2-de").style.display = "block";
    document.getElementById("eleven_years-3-en").style.display = "none";
    document.getElementById("eleven_years-3-de").style.display = "block";
    document.getElementById("sole-tech-exp-en").style.display = "none";
    document.getElementById("sole-tech-exp-de").style.display = "block";
    document.getElementById("software-htw-en").style.display = "none";
    document.getElementById("software-htw-de").style.display = "block";
    document.getElementById("htw-data-centre-fullstack-en").style.display = "none";
    document.getElementById("htw-data-centre-fullstack-de").style.display = "block";
    document.getElementById("IGIT-en").style.display = "none";
    document.getElementById("IGIT-de").style.display = "block";
    document.getElementById("RMS-en").style.display = "none";
    document.getElementById("RMS-de").style.display = "block";
    document.getElementById("htw-edu-en").style.display = "none";
    document.getElementById("htw-edu-de").style.display = "block";
    document.getElementById("edu-lewagon-en").style.display = "none";
    document.getElementById("edu-lewagon-de").style.display = "block";
    document.getElementById("bochum-edu-en").style.display = "none";
    document.getElementById("bochum-edu-de").style.display = "block";
    document.getElementById("studienkolleg-en").style.display = "none";
    document.getElementById("studienkolleg-de").style.display = "block";
    document.getElementById("language-edu-en").style.display = "none";
    document.getElementById("language-edu-de").style.display = "block";
    document.getElementById("school-en").style.display = "none";
    document.getElementById("school-de").style.display = "block";
    document.getElementById("mercedes-en").style.display = "none";
    document.getElementById("mercedes-de").style.display = "block";
    document.getElementById("HTW-HIWI-en").style.display = "none";
    document.getElementById("HTW-HIWI-de").style.display = "block";
    document.getElementById("htw-internship-en").style.display = "none";
    document.getElementById("htw-internship-de").style.display = "block";
    document.getElementById("IGIT-1-en").style.display = "none";
    document.getElementById("IGIT-1-de").style.display = "block";
    document.getElementById("rhenus-en").style.display = "none";
    document.getElementById("rhenus-de").style.display = "block";
    document.getElementById("cs-en").style.display = "none";
    document.getElementById("cs-de").style.display = "block";
    document.getElementById("lewagon-en").style.display = "none";
    document.getElementById("lewagon-de").style.display = "block";
    document.getElementById("ei-en").style.display = "none";
    document.getElementById("ei-de").style.display = "block";
    document.getElementById("kolleg-en").style.display = "none";
    document.getElementById("kolleg-de").style.display = "block";
    document.getElementById("eurasia-en").style.display = "none";
    document.getElementById("eurasia-de").style.display = "block";
    document.getElementById("school-1-en").style.display = "none";
    document.getElementById("school-1-de").style.display = "block";
    document.getElementById("cto-en").style.display = "none";
    document.getElementById("cto-de").style.display = "block";
    document.getElementById("tendex-en").style.display = "none";
    document.getElementById("tendex-de").style.display = "block";
    document.getElementById("today_months-en").style.display = "none";
    document.getElementById("today_months-de").style.display = "block";
    document.getElementById("prof-exp-auto-en").style.display = "none";
    document.getElementById("prof-exp-auto-de").style.display = "block";
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
                        <img src="${newsItem.image}" alt="${newsItem.title
        }" class="news-image">
                        <div class="news-text">
                            <div class="news-title">
                                <span class="badge ${badgeClass}">${newsItem.category
        }</span>
                                ${titleContent}
                            </div>
                            <p class="news-meta"><small>by ${newsItem.author
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
    const testdomeCount = certificates.filter(
      (certificate) => certificate.category === "Testdome"
    ).length;
    const workCount = certificates.filter(
      (certificate) => certificate.category === "Work"
    ).length;
    const educationCount = certificates.filter(
      (certificate) => certificate.category === "Education"
    ).length;

    filterDropdown.options[0].textContent = `All Categories (${allCount})`;
    filterDropdown.options[1].textContent = `Udemy (${udemyCount})`;
    filterDropdown.options[2].textContent = `HackerRank (${hackerRankCount})`;
    filterDropdown.options[3].textContent = `Testdome (${testdomeCount})`;
    filterDropdown.options[4].textContent = `Work (${workCount})`;
    filterDropdown.options[5].textContent = `Education (${educationCount})`;
  }

  // Event listener for the filter dropdown
  filterDropdown.addEventListener("change", function () {
    const selectedCategory = filterDropdown.value;

    // Filter the certificates based on the selected category
    const filteredCertificates =
      selectedCategory === "All Categories"
        ? certificates
        : certificates.filter(
          (certificate) => certificate.category === selectedCategory
        );

    // Redisplay the filtered certificates
    displayCertificates(filteredCertificates);
  });
});


document.addEventListener("DOMContentLoaded", function () {
  let certificates = []; // To store the fetched data

  fetch("certificates.json")
    .then((response) => response.json())
    .then((data) => {
      certificates = data;
      updateTechnologyFilter(certificates); // Initialize technology filter with counts
      displayCertificates(certificates); // Initially display all certificates
    })
    .catch((error) => console.error("Error fetching certificates:", error));

  const container = document.querySelector(".achievement-carousel");
  const technologyDropdown = document.getElementById("technology-filter-certificates");

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
  }

  // Separate function to update the technology filter dropdown with counts
  function updateTechnologyFilter(certificates) {
    const technologyCounts = {}; // Object to store technology counts

    // Count occurrences of each technology
    certificates.forEach((certificate) => {
      if (certificate.technology && Array.isArray(certificate.technology)) { // Ensure `technology` is an array
        certificate.technology.forEach((tech) => {
          technologyCounts[tech] = (technologyCounts[tech] || 0) + 1;
        });
      }
    });

    // Populate the technology dropdown with counts
    technologyDropdown.innerHTML = `<option value="All Technologies">All Technologies (${certificates.length})</option>`;
    Object.keys(technologyCounts).forEach((tech) => {
      const option = document.createElement("option");
      option.value = tech;
      option.textContent = `${tech} (${technologyCounts[tech]})`;
      technologyDropdown.appendChild(option);
    });
  }

  // Function to filter certificates by selected technology
  function filterByTechnology() {
    const selectedTechnology = technologyDropdown.value;

    const filteredCertificates =
      selectedTechnology === "All Technologies"
        ? certificates
        : certificates.filter(
          (certificate) =>
            certificate.technology && certificate.technology.includes(selectedTechnology)
        );

    // Redisplay the filtered certificates
    displayCertificates(filteredCertificates);
  }

  // Event listener for the technology filter dropdown
  technologyDropdown.addEventListener("change", filterByTechnology);
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
      "Technical": 0,
      "Business & Leadership": 0,
      "Innovation & Startups": 0,
      "Personal Development": 0,
      "Philosophy": 0,
      "Biography": 0
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

// Функция для создания карточек с индикатором загрузки
function createLoadingCard(category) {
  const card = document.createElement('div');
  card.classList.add('category-card');
  card.style.backgroundColor = categoryColors[category] || '#fff';

  const title = document.createElement('div');
  title.classList.add('category-title');
  title.textContent = category;

  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = '<div class="loading-spinner"></div>';

  card.appendChild(title);
  card.appendChild(spinner);
  return card;
}

// Вспомогательная функция для создания карточки категории
function createCategoryCard(category, textContent = '-', isLoading = true) {
  const card = document.createElement('div');
  card.classList.add('category-card');

  const backgroundColor = categoryColors[category] || '#fff';
  card.style.backgroundColor = backgroundColor;

  if (["Experience", "Skills", "Tech Stack", "Engagement", "Projects"].includes(category)) {
    card.style.color = '#fff';
  } else {
    card.style.color = '#000';
  }

  const title = document.createElement('div');
  title.classList.add('category-title');
  title.textContent = category;
  title.style.color = ["Experience", "Skills", "Tech Stack", "Engagement", "Projects"].includes(category) ? '#E5E9F0' : '#000';

  const text = document.createElement('div');
  text.classList.add('category-text');
  text.textContent = isLoading ? '' : textContent;

  // Добавляем индикатор загрузки, если `isLoading` равно `true`
  if (isLoading) {
    const spinner = document.createElement('div');
    spinner.classList.add('spinner'); // Добавьте CSS класс для индикатора загрузки
    text.appendChild(spinner);
  }

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

  card.appendChild(title);
  card.appendChild(text);
  card.appendChild(percentageBadge);

  return card;
}

// Функция для отображения данных в `other-cards` и в "analydid-cards"
// Функция для отображения данных в `other-cards` и в "analysis-cards"
async function displayExtendedResults(analysisData) {
  const otherContainer = document.getElementById('other-cards');
  const analysisContainer = document.getElementById('analysis-cards');

  otherContainer.innerHTML = '';
  analysisContainer.innerHTML = '';

  const endpoints = [
    { name: "Experience", url: "/experience" },
    { name: "Skills", url: "/skills" },
    { name: "Tech Stack", url: "/tech_stack" },
    { name: "Soft Skills", url: "/soft_skills" },
    { name: "Cultural Fit", url: "/cultural_fit" },
    { name: "University", url: "/university" },
    { name: "Certifications", url: "/certifications" },
    { name: "Engagement", url: "/engagement" },
    { name: "Projects", url: "/projects" },
    { name: "References", url: "/references" },
    { name: "Languages", url: "/languages" }
  ];

  // Массив для хранения взвешенных значений каждой категории
  const weightedScores = [];

  // Создаем пустые карточки с индикаторами загрузки
  endpoints.forEach(endpoint => {
    const loadingCard = createCategoryCard(endpoint.name, '', true);
    otherContainer.appendChild(loadingCard);
    const compatibilityLoadingCard = createCategoryCard(endpoint.name, '', true);
    analysisContainer.appendChild(compatibilityLoadingCard);
  });

  // Выполняем запросы по каждому эндпоинту и обновляем содержимое карточек
  for (let i = 0; i < endpoints.length; i++) {
    const endpoint = endpoints[i];
    try {
      const formData = new FormData();
      const categoryData = analysisData[endpoint.name] || ''; // Данные для конкретной категории
      formData.append('job_description', categoryData);

      const response = await fetch(`https://scrape-jobs-c0657e779443.herokuapp.com${endpoint.url}`, {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      if (response.ok) {
        const { actual_data, compatibility_percentage } = result[endpoint.name] || {};

        // Рассчитываем взвешенное значение процента и добавляем его в массив
        const weight = categoryPercentages[endpoint.name];
        const weightedScore = (compatibility_percentage * weight) / 100;
        weightedScores.push(weightedScore);  // Сохраняем взвешенное значение

        // Обновляем карточку для 'other-cards' 
        const updatedCard = createCategoryCard(
          endpoint.name,
          actual_data,
          false
        );
        otherContainer.replaceChild(updatedCard, otherContainer.childNodes[i]);

        // Создаем и обновляем карточку совместимости для 'analysis-cards' с compatibility_percentage
        const compatibilityCard = createCompatibilityCard(
          endpoint.name,
          `${compatibility_percentage}% compatibility (${weightedScore.toFixed(2)}% weighted)`
        );
        analysisContainer.replaceChild(compatibilityCard, analysisContainer.childNodes[i]);

      } else {
        throw new Error(result.error || 'Error fetching data');
      }
    } catch (error) {
      console.error(`Error loading ${endpoint.name}:`, error);

      const errorCard = createCategoryCard(endpoint.name, 'Error loading data', false);
      otherContainer.replaceChild(errorCard, otherContainer.childNodes[i]);

      const compatibilityErrorCard = createCompatibilityCard(endpoint.name, 'Error loading data');
      analysisContainer.replaceChild(compatibilityErrorCard, analysisContainer.childNodes[i]);
    }
  }


  // Выводим итоговый взвешенный результат в `#total_weighted_score`
  const totalWeightedScore = weightedScores.reduce((sum, score) => sum + score, 0).toFixed(2);
  const totalScoreDiv = document.getElementById("total_weighted_score");

  // Стилизация и отображение итогового результата
  totalScoreDiv.style.display = 'block';
  totalScoreDiv.style.backgroundColor = '#A0C1B9'; // Мягкий зеленый фон
  totalScoreDiv.style.color = 'white';           // Темно-синий цвет текста
  totalScoreDiv.style.padding = '5px';
  totalScoreDiv.style.borderRadius = '5px';
  totalScoreDiv.style.fontWeight = 'bold';
  totalScoreDiv.style.textAlign = 'center';


  // Устанавливаем текст итогового результата
  totalScoreDiv.innerHTML = `Overall Compatibility Score: ${totalWeightedScore}%`;
}





// Функция для обновления карточки с данными из API
function updateExtendedResultCard(container, categoryName, result) {
  const card = Array.from(container.children).find(card => card.querySelector('.category-title').textContent === categoryName);
  if (card) {
    card.querySelector('.spinner').style.display = 'none'; // Скрыть спиннер
    const content = document.createElement('div');
    content.classList.add('category-text');
    content.textContent = result[categoryName] || '-';
    card.appendChild(content);
  }
}

// Функция для отображения ошибки в карточке
function updateErrorCard(container, categoryName) {
  const card = Array.from(container.children).find(card => card.querySelector('.category-title').textContent === categoryName);
  if (card) {
    card.querySelector('.spinner').style.display = 'none';
    card.style.backgroundColor = '#dc3545'; // Красный цвет для ошибки
    const errorText = document.createElement('div');
    errorText.classList.add('category-text');
    errorText.textContent = 'Error loading data';
    card.appendChild(errorText);
  }
}



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

  orderedCategories.forEach(function (category) {
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
document.getElementById('resume-form').addEventListener('submit', async function (event) {
  event.preventDefault();

  const jobDescriptionEN = document.getElementById('job_description-en');
  let jobDescription = jobDescriptionEN.value;

  showSpinner();

  if (jobDescription.length > 4000) {
    alert('The job description exceeds 4000 characters.');
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
      await displayExtendedResults(result.analysis);
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
document.getElementById('job_description-en').addEventListener('input', function () {
  const countDisplay = document.getElementById('character-count');
  updateCharacterCount(this, countDisplay, 4000);
});





// Function to create a compatibility card with styling
function createCompatibilityCard(category, percentage) {
  const card = document.createElement('div');
  card.classList.add('category-card');

  // Set background color based on category
  const backgroundColor = categoryColors[category] || '#fff';
  card.style.backgroundColor = backgroundColor;

  // Set text color based on category
  card.style.color = ["Experience", "Skills", "Tech Stack", "Engagement", "Projects"].includes(category) ? '#fff' : '#000';

  const title = document.createElement('div');
  title.classList.add('category-title');
  title.textContent = category;

  // Set title color based on category
  title.style.color = ["Experience", "Skills", "Tech Stack", "Engagement", "Projects"].includes(category) ? '#E5E9F0' : '#000';

  const text = document.createElement('div');
  text.classList.add('category-text');
  text.textContent = `${percentage}`;

  // Create percentage badge
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

  // Append elements to the card
  card.appendChild(title);
  card.appendChild(text);
  card.appendChild(percentageBadge);

  return card;
}


// Calculate overall compatibility score
function calculateOverallCompatibility() {
  let totalScore = 0;          // Сумма итогового результата
  let totalWeight = 0;         // Сумма весов с учётом пропущенных категорий
  let adjustedWeights = {};    // Массив для пропорциональных весов

  // Собираем категории с их фактическими значениями и весами
  Object.keys(categoryPercentages).forEach(category => {
    const card = Array.from(document.querySelectorAll('.category-card'))
      .find(card => card.querySelector('.category-title').textContent === category);
    if (card) {
      const text = card.querySelector('.category-text').textContent;
      const percentageMatch = parseInt(text.replace('% compatibility', '').trim());

      // Если есть валидное число для совместимости, добавляем его в расчёт
      if (!isNaN(percentageMatch)) {
        totalScore += percentageMatch * categoryPercentages[category];
        totalWeight += categoryPercentages[category];
      }
    }
  });

  // Если totalWeight меньше 100 из-за пропущенных категорий, пересчитываем веса пропорционально
  Object.keys(categoryPercentages).forEach(category => {
    if (totalWeight < 100) {
      adjustedWeights[category] = (categoryPercentages[category] / totalWeight) * 100;
    } else {
      adjustedWeights[category] = categoryPercentages[category];
    }
  });

  // Пересчёт общего результата с учётом пропорциональных весов
  let adjustedScore = 0;
  Object.keys(adjustedWeights).forEach(category => {
    const card = Array.from(document.querySelectorAll('.category-card'))
      .find(card => card.querySelector('.category-title').textContent === category);
    if (card) {
      const text = card.querySelector('.category-text').textContent;
      const percentageMatch = parseInt(text.replace('% compatibility', '').trim());

      if (!isNaN(percentageMatch)) {
        adjustedScore += (percentageMatch * adjustedWeights[category]) / 100;
      }
    }
  });

  console.log("Overall Compatibility Score:", Math.round(adjustedScore), "%");
  return Math.round(adjustedScore);
}





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



function refreshAd() {
  // Обновить рекламный блок
  (adsbygoogle = window.adsbygoogle || []).push({});
}



let allProjects = [];
let originalURL = window.location.href;

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('tech-fields').addEventListener('change', updateTechStack);
  document.getElementById('tech-stack').addEventListener('change', filterProjects);

  axios.get('projects.json')
    .then(response => {
      allProjects = response.data;
      displayProjects(allProjects);
      addEventListenersToProjects();
    })
    .catch(error => {
      console.error('Error loading projects:', error);
    });
});

function displayProjects(projects) {
  projects.sort((a, b) => a.priority - b.priority);

  const projectsGrid = document.getElementById('projects-grid');
  projectsGrid.innerHTML = '';
  const projectCount = document.getElementById('project-count');
  projectCount.innerText = `${projects.length} projects found:`;

  projects.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.classList.add('col-md-4', 'col-sm-6', 'col-12', 'mb-4', 'project');
    projectCard.setAttribute('data-tech-field', project.techField);
    projectCard.setAttribute('data-tech-stack', project.techStack);

    const projectLink = document.createElement('a');
    projectLink.href = `?project=${encodeURIComponent(project.name)}`;
    projectLink.className = 'project-link';
    projectLink.setAttribute('data-project', project.name);

    projectCard.innerHTML = `
              <div class="card project" onclick="loadProjectDetails('${project.name}', '${project.description}', '${project.github}', '${project.demo}', '${project.status}', '${project.images.description}', '${project.technologies}');" uk-toggle="target: #project-modal">
                  <div class="card-img-top" style="background-image: url('${project.images.card}');">
                      
                      
                  </div>
              </div>
          `;

    projectCard.appendChild(projectLink);
    projectsGrid.appendChild(projectCard);
  });

  const noResultsMessage = document.getElementById('no-results-message');
  noResultsMessage.style.display = projects.length > 0 ? 'none' : 'block';
}

function loadProjectDetails(name, description, githubLink, websiteLink, status, imageUrl, techStack) {
  originalURL = window.location.href;
  history.pushState(null, '', `?project=${encodeURIComponent(name)}`);

  document.getElementById('project-title').innerText = name;
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

  // Display delay message for all projects
  const delayMessage = document.getElementById('delay-message');
  delayMessage.style.display = 'block';
  delayMessage.innerText = 'The website may take up to 30 seconds to load. Please be patient.';

  if (status === 'Completed') {
    statusElement.className = 'badge-status badge-success';
  } else if (status === 'In Development') {
    statusElement.className = 'badge-status badge-warning';
  } else {
    statusElement.className = 'badge-status badge-secondary';
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
      options = ['React', 'Java Spring Boot', '.NET', 'Node.js', 'Python'];
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
  const techStack = document.getElementById('tech-stack').value.trim().toLowerCase().replace(/ /g, '-');
  const projectsGrid = document.querySelector('.projects-grid');

  const filteredProjects = allProjects.filter(project => {
    const projectTechField = project.techField.split(', ');
    const projectTechStack = project.techStack.split(', ').map(stack => stack.trim().toLowerCase().replace(/ /g, '-'));


    let matchesField = true;
    let matchesStack = true;

    if (techFields) {
      matchesField = projectTechField.some(field => field.includes(techFields));
    }

    if (techStack) {
      matchesStack = projectTechStack.some(stack => stack.includes(techStack));
    }

    return matchesField && matchesStack;
  }).sort((a, b) => a.priority - b.priority);

  displayProjects(filteredProjects);

  const projectCount = document.getElementById('project-count');
  projectCount.innerText = `${filteredProjects.length} projects found:`;

  const noResultsMessage = document.getElementById('no-results-message');
  noResultsMessage.style.display = filteredProjects.length > 0 ? 'none' : 'block';
}

function addEventListenersToProjects() {
  const urlParams = new URLSearchParams(window.location.search);
  const projectParam = urlParams.get('project');

  if (projectParam) {
    // Ensure the section is shown first
    showSection('my-work');

    // Wait until the section is fully shown before opening the project
    setTimeout(() => openProjectByParam(projectParam), 300); // Adding a delay to ensure everything is ready
  }

  window.onpopstate = function () {
    const projectParam = new URLSearchParams(window.location.search).get('project');
    if (projectParam) {
      openProjectByParam(projectParam);
    } else {
      UIkit.modal('#project-modal').hide();
    }
  };

  const closeModalButton = document.querySelector('#project-modal .uk-modal-close-default');
  if (closeModalButton) {
    closeModalButton.addEventListener('click', closeProjectDetails);
  }

  UIkit.util.on('#project-modal', 'hide', closeProjectDetails);
}


function openProjectByParam(projectName) {
  UIkit.modal('#project-modal').hide();
  setTimeout(() => {
    const project = allProjects.find(proj => proj.name === decodeURIComponent(projectName));
    if (project) {
      loadProjectDetails(
        project.name,
        project.description,
        project.github,
        project.demo,
        project.status,
        project.images.description,
        project.technologies
      );
      UIkit.modal('#project-modal').show();
    }
  }, 300);
}

function closeProjectDetails() {
  history.replaceState(null, '', originalURL);
  UIkit.modal('#project-modal').hide();
}

document.addEventListener('DOMContentLoaded', () => {
  addEventListenersToProjects();
});





UIkit.util.on('#project-modal', 'hide', closeProjectDetails);




document.addEventListener("DOMContentLoaded", function () {
  let photos = []; // Store fetched data about photos

  fetch("photos.json")
    .then((response) => response.json())
    .then((data) => {
      photos = data;
      displayPhotos(photos); // Display all photos initially
    })
    .catch((error) => console.error("Error fetching photos:", error));

  const container = document.querySelector(".photo-carousel");

  // Function to display photos in the carousel
  function displayPhotos(photos) {
    if (!container) {
      console.error("Container not found!");
      return;
    }

    container.innerHTML = ""; // Clear the current items

    photos.forEach((photo) => {
      const photoItem = document.createElement("div");
      photoItem.classList.add("photo-item");
      photoItem.style.cssText =
        "position: relative; min-width: 120px; flex-shrink: 0;";

      const anchor = document.createElement("a");
      anchor.href = photo.link; // Assume there's a link to view the photo in detail or download
      anchor.target = "_blank";

      const image = document.createElement("img");
      image.src = photo.imageSource; // Adjust property name based on your actual data
      image.alt = photo.description; // Use description for alt text
      image.style.cssText =
        "width: auto; height: 180px; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1); transition: transform 0.3s ease;";

      anchor.appendChild(image);
      photoItem.appendChild(anchor);
      container.appendChild(photoItem);
    });
  }
});





document.addEventListener("DOMContentLoaded", function () {
  let photos = []; // Store fetched data about photos

  fetch("photos-2.json")
    .then((response) => response.json())
    .then((data) => {
      photos = data;
      displayPhotos(photos); // Display all photos initially
    })
    .catch((error) => console.error("Error fetching photos:", error));

  const container = document.querySelector(".photo-carousel-2");

  // Function to display photos in the carousel
  function displayPhotos(photos) {
    if (!container) {
      console.error("Container not found!");
      return;
    }

    container.innerHTML = ""; // Clear the current items

    photos.forEach((photo) => {
      const photoItem = document.createElement("div");
      photoItem.classList.add("photo-item");
      photoItem.style.cssText =
        "position: relative; min-width: 120px; flex-shrink: 0;";

      const anchor = document.createElement("a");
      anchor.href = photo.link; // Assume there's a link to view the photo in detail or download
      anchor.target = "_blank";

      const image = document.createElement("img");
      image.src = photo.imageSource; // Adjust property name based on your actual data
      image.alt = photo.description; // Use description for alt text
      image.style.cssText =
        "width: auto; height: 180px; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1); transition: transform 0.3s ease;";

      anchor.appendChild(image);
      photoItem.appendChild(anchor);
      container.appendChild(photoItem);
    });
  }
});

function calculateMonthsSinceJuly2024() {
  const startDate = new Date('2024-07-01');
  const currentDate = new Date();
  const months = (currentDate.getFullYear() - startDate.getFullYear()) * 12 + currentDate.getMonth() - startDate.getMonth();
  return months;
}

document.addEventListener('DOMContentLoaded', function () {
  const monthsEn = calculateMonthsSinceJuly2024();
  const monthsDe = monthsEn; // Количество месяцев одинаково для обоих языков

  document.getElementById('today_months-en').querySelector('.time_summary').textContent = `${monthsEn} months`;
  document.getElementById('today_months-de').querySelector('.time_summary').textContent = `${monthsDe} Monate`;
});


document.addEventListener("DOMContentLoaded", function() {
  const startDate = new Date(2018, 8, 1); // 1 сентября 2018 года
  const currentDate = new Date();
  
  let totalMonths = (currentDate.getFullYear() - startDate.getFullYear()) * 12 + currentDate.getMonth() - startDate.getMonth();
  
  totalMonths -= 26;

  let years = Math.floor(totalMonths / 12);
  let months = totalMonths % 12;

  const yearText = years === 1 ? "year" : "years";
  const monthText = months === 1 ? "month" : "months";
  const yearTextDe = years === 1 ? "Jahr" : "Jahre";
  const monthTextDe = months === 1 ? "Monat" : "Monate";

  const experienceText = `${years} ${yearText}, ${months} ${monthText}`;
  const experienceTextDe = `${years} ${yearTextDe}, ${months} ${monthTextDe}`;
  const profExpElement = document.getElementById("prof-exp-auto-en");
  const profExpElementDe = document.getElementById("prof-exp-auto-de");

  profExpElement.textContent = experienceText;
  profExpElement.style.display = "block"; 
  profExpElementDe.textContent = experienceTextDe;
  profExpElementDe.style.display = "none"; 
});





























