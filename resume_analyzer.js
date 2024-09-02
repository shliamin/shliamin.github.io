
function toggleInfoPanel() {
    const infoPanelElement = document.getElementById('infoPanel');
    const toggleButtonElement = document.getElementById('toggleButton');
    infoPanelElement.classList.toggle('open');
    toggleButtonElement.innerHTML = infoPanelElement.classList.contains('open') ? '<i class="fas fa-chevron-left"></i>' : '<i class="fas fa-chevron-right"></i>';
    resizeChart();  
}

function initializeChart() {
    const donutChartElement = document.getElementById('donutChart').getContext('2d');


    const categories = {
        'Professional Skills': {
            value: 50,
            color: '#007aff',
            subcategories: {
                'Experience': 25,
                'Skills': 20,
                'Tech Stack': 5
            }
        },
        'Cultural Fit': {
            value: 20,
            color: '#28a745',
            subcategories: {
                'Soft Skills': 10,
                'Alignment': 10
            }
        },
        'Education': {
            value: 10,
            color: '#ffc107',
            subcategories: {
                'Education': 5,
                'Certifications': 5
            }
        },
        'Portfolio': {
            value: 10,
            color: '#ff5733',
            subcategories: {
                'Community': 5,
                'Portfolio': 5
            }
        },
        'References': {
            value: 5,
            color: '#17a2b8',
            subcategories: {}
        },
        'Languages': {
            value: 5,
            color: '#e83e8c',
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

    new Chart(donutChartElement, {
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
                    position: 'bottom',
                }
            }
        }
    });

    document.getElementById('donutChart').style.height = '200px';
}


function lightenColor(color, percent) {
    const num = parseInt(color.slice(1), 16),
          amt = Math.round(2.55 * percent),
          R = (num >> 16) + amt,
          G = (num >> 8 & 0x00FF) + amt,
          B = (num & 0x0000FF) + amt;

    return "#" + (
        0x1000000 + 
        (R < 255 ? R : 255) * 0x10000 + 
        (G < 255 ? G : 255) * 0x100 + 
        (B < 255 ? B : 255)
    ).toString(16).slice(1).toUpperCase();
}

function resizeChart() {
    const donutChartElement = document.getElementById('donutChart');
    donutChartElement.style.width = '100%';
    donutChartElement.style.height = '200px';
}

window.onload = function() {
    toggleInfoPanel();
    initializeChart();
};











// Обработчик загрузки резюме
document.getElementById('resume').addEventListener('change', function(event) {
    const resumeFile = event.target.files[0];
    if (resumeFile) {
        analyzeResume(resumeFile);
    }
});

function analyzeResume(resume) {
    const reader = new FileReader();

    reader.onload = function(e) {
        const content = e.target.result;

        // Загрузка ключевых слов для английского и немецкого языков
        fetch('english_keywords.txt')
            .then(response => response.text())
            .then(englishKeywords => {
                fetch('german_keywords.txt')
                    .then(response => response.text())
                    .then(germanKeywords => {
                        const language = detectLanguage(content, englishKeywords, germanKeywords);
                        if (language !== 'en' && language !== 'de') {
                            alert('The document must be in English or German.');
                            return;
                        }

                        const categories = analyzeCategories(content, language === 'en' ? englishKeywords : germanKeywords);
                        displayChart(categories);
                    });
            });
    };

    if (resume.type === 'application/pdf') {
        reader.readAsBinaryString(resume);
    } else if (resume.type === 'text/plain') {
        reader.readAsText(resume);
    } else {
        alert('Unsupported file type. Please upload a PDF or TXT file.');
    }
}

function detectLanguage(text, englishKeywords, germanKeywords) {
    const englishWords = englishKeywords.split('\n').map(word => word.trim());
    const germanWords = germanKeywords.split('\n').map(word => word.trim());

    let englishCount = 0;
    let germanCount = 0;

    englishWords.forEach(word => {
        if (text.includes(word)) {
            englishCount++;
        }
    });

    germanWords.forEach(word => {
        if (text.includes(word)) {
            germanCount++;
        }
    });

    if (englishCount > germanCount) {
        return 'en';
    } else if (germanCount > englishCount) {
        return 'de';
    } else {
        return 'unknown';
    }
}

function analyzeCategories(content, keywords) {
    const categories = {
        'Professional Skills': keywords.split('\n').some(word => content.includes(word)) ? 50 : 0,
        'Cultural Fit': content.includes('cultural') ? 20 : 0,
        'Education': content.includes('education') ? 10 : 0,
        'Portfolio': content.includes('portfolio') ? 10 : 0,
        'References': content.includes('references') ? 5 : 0,
        'Languages': content.includes('languages') ? 5 : 0
    };

    return categories;
}

function displayChart(categories) {
    const labels = Object.keys(categories);
    const data = Object.values(categories); // Значения категорий остаются такими, как они есть (например, 50, 10 и т.д.)
    const backgroundColors = Object.values(categories).map(value => {
        return value > 0 ? getColorForCategory(value) : '#d3d3d3'; // Если значение больше 0, используем цвет, иначе - серый
    });

    const canvas = document.getElementById('backgroundChart');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        new Chart(ctx, {
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
                plugins: {
                    legend: {
                        position: 'bottom',
                    }
                }
            }
        });
    } else {
        console.error("Element with id 'backgroundChart' not found.");
    }
}

function analyzeCategories(content) {
    const categories = {
        'Professional Skills': content.includes('skills') ? 50 : 0,
        'Cultural Fit': content.includes('cultural fit') ? 20 : 0,
        'Education': content.includes('education') ? 10 : 0,
        'Portfolio': content.includes('portfolio') ? 10 : 0,
        'References': content.includes('references') ? 5 : 0,
        'Languages': content.includes('languages') ? 5 : 0
    };

    // Устанавливаем значения по умолчанию для серых категорий
    for (let category in categories) {
        if (categories[category] === 0) {
            categories[category] = getDefaultValueForCategory(category);
        }
    }

    return categories;
}

function getDefaultValueForCategory(category) {
    switch (category) {
        case 'Professional Skills': return 50;
        case 'Cultural Fit': return 20;
        case 'Education': return 10;
        case 'Portfolio': return 10;
        case 'References': return 5;
        case 'Languages': return 5;
        default: return 0;
    }
}

function getColorForCategory(value) {
    switch (value) {
        case 50: return '#007aff';
        case 20: return '#28a745';
        case 10: return '#ffc107';
        case 5: return '#ff5733';
        default: return '#d3d3d3'; // Серый цвет по умолчанию для отсутствующих категорий
    }
}




function getColorForCategory(value) {
    switch (value) {
        case 50: return '#007aff';
        case 20: return '#28a745';
        case 10: return '#ffc107';
        case 5: return '#ff5733';
        default: return '#d3d3d3';
    }
}

