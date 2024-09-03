

export function detectLanguage(text, englishKeywords, germanKeywords) {
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

export async function analyzeCategories(content, keywords, language) {  
    const keywordArray = keywords.split('\n').map(keyword => keyword.trim());

    const response = await fetch('./subcategoryKeywords.json');
    if (!response.ok) {
        throw new Error('Failed to load subcategory keywords');
    }
    const subcategoryKeywords = await response.json();

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

    const finalCategories = {};

    for (const category in categories) {
        const categoryInfo = categories[category];

        const totalSubcategoriesValue = Object.values(categoryInfo.subcategories).reduce((sum, value) => sum + value, 0);

        if (totalSubcategoriesValue > 0) {
            for (const subcategory in categoryInfo.subcategories) {
                const originalValue = categoryInfo.subcategories[subcategory];


                if (subcategoryKeywords[subcategory] && Array.isArray(subcategoryKeywords[subcategory][language])) {
                    const keywordsForSubcategory = subcategoryKeywords[subcategory][language].map(keyword => keyword.toLowerCase().trim());
 

                    const found = keywordsForSubcategory.some(keyword => content.includes(keyword));

                    finalCategories[subcategory] = {
                        value: found ? originalValue : originalValue,
                        color: found ? categoryInfo.color : '#d3d3d3'
                    };
                } else {
                    console.warn(`Keywords for subcategory "${subcategory}" not found or not an array.`);
                    finalCategories[subcategory] = {
                        value: originalValue,
                        color: '#d3d3d3'
                    };
                }
            }
        } else {
            finalCategories[category] = {
                value: categoryInfo.value,
                color: categoryInfo.color
            };
        }
    }

    return finalCategories;
}
  