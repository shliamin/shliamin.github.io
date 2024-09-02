
export function toggleInfoPanel() {
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
                'Cultural Fit': 10
            }
        },
        'Education': {
            value: 10,
            color: '#ffc107',
            subcategories: {
                'University': 5,
                'Certifications': 5
            }
        },
        'Portfolio': {
            value: 10,
            color: '#ff5733',
            subcategories: {
                'Engagement': 5,
                'Projects': 5
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









import { analyzeCategories, detectLanguage } from './resumeAnalyzer.js';

let chartInstance = null; 


function extractTextFromPDF(pdfData) {
    const pdfjsLib = window['pdfjsLib'];
    if (!pdfjsLib) {
        console.error('pdfjsLib is not loaded');
        return;
    }

    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';

    const loadingTask = pdfjsLib.getDocument({data: pdfData});
    return loadingTask.promise.then(pdf => {
        const maxPages = pdf.numPages;
        const pagePromises = [];
        for (let i = 1; i <= maxPages; i++) {
            pagePromises.push(pdf.getPage(i).then(page => {
                return page.getTextContent().then(textContent => {
                    return textContent.items.map(item => item.str).join(' ');
                });
            }));
        }
        return Promise.all(pagePromises).then(pagesText => pagesText.join(' '));
    });
}




// Resume upload handler
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
        if (resume.type === 'application/pdf') {
            extractTextFromPDF(content).then(text => {
                analyzeTextContent(text);
            });
        } else {
            analyzeTextContent(content);
        }
    };

    if (resume.type === 'application/pdf') {
        reader.readAsArrayBuffer(resume);
    } else if (resume.type === 'text/plain') {
        reader.readAsText(resume);
    } else {
        alert('Unsupported file type. Please upload a PDF or TXT file.');
    }
}

function analyzeTextContent(content) {
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
}





function displayChart(categories) {
    const labels = Object.keys(categories);
    const data = labels.map(label => categories[label].value);
    const backgroundColors = labels.map(label => categories[label].value > 0 ? categories[label].color : '#d3d3d3');

    const canvas = document.getElementById('backgroundChart');
    if (canvas) {
        const ctx = canvas.getContext('2d');

        
        if (chartInstance) {
            chartInstance.destroy();
        }

       
        chartInstance = new Chart(ctx, {
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
                        position: 'right',
                        align: 'left',
                        labels: {
                            usePointStyle: false, 
                            boxWidth: 35,
                            padding: 8 
                        },
                        title: {
                            display: true,
                            text: 'Gray categories missing in your resume:',
                            color: '#000', 
                            font: {
                                size: 12,
                                style: 'normal'
                            },
                            padding: {
                                top: 10,
                                bottom: 10
                            }
                        }
                    }
                },
                layout: {
                    padding: {
                        right: 0
                    }
                }
            }
        });
    } else {
        console.error("Element with id 'backgroundChart' not found.");
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
