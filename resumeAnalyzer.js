

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

export function analyzeCategories(content, keywords) {
    const keywordArray = keywords.split('\n').map(keyword => keyword.trim());


    const subcategoryKeywords = {
        'Experience': [
            'experience', 'work experience', 'professional experience', 'career history', 
            'employment history', 'job experience', 'work background', 'professional background', 
            'industry experience', 'career experience'
        ],
        'Skills': [
            'skills', 'competencies', 'abilities', 'expertise', 
            'capabilities', 'proficiencies', 'talents', 'know-how', 
            'strengths', 'aptitudes'
        ],
        'Tech Stack': [
            'tech stack', 'technology stack', 'technical stack', 'technologies used', 
            'software stack', 'development stack', 'tools and technologies', 'technology environment', 
            'programming languages', 'software tools', 'skills'
        ],
        'Soft Skills': [
            'soft skills', 'interpersonal skills', 'communication skills', 'teamwork', 
            'emotional intelligence', 'problem-solving', 'adaptability', 'time management', 
            'collaboration', 'leadership skills'
        ],
        'Cultural Fit': [
            'cultural fit', 'company culture', 'organizational fit', 'values alignment', 
            'team fit', 'company values', 'corporate culture', 'workplace culture', 
            'company mission', 'company vision', 'cultural', 'team'
        ],
        'University': [
            'university', 'college', 'higher education', 'academic background', 
            'bachelor\'s degree', 'master\'s degree', 'academic qualifications', 'university degree', 
            'alma mater', 'graduate'
        ],
        'Certifications': [
            'certifications', 'certificates', 'professional certifications', 'training certificates', 
            'industry certifications', 'accreditations', 'professional training', 'qualifications', 
            'certified courses', 'certified programs'
        ],
        'Engagement': [
            'engagement', 'client engagement', 'project', 'stakeholder engagement', 
            'team engagement', 'user engagement', 'customer engagement', 'participant engagement', 
            'community engagement', 'collaboration engagement'
        ],
        'Projects': [
            'projects', 'work projects', 'initiatives', 'assignments', 
            'tasks', 'deliverables', 'project work', 'project management', 
            'project outcomes', 'case studies'
        ]
    };

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


                const keywordsForSubcategory = subcategoryKeywords[subcategory];
                const found = keywordsForSubcategory.some(keyword => content.toLowerCase().includes(keyword.toLowerCase()));



                finalCategories[subcategory] = {
                    value: found ? originalValue : originalValue,
                    color: found ? categoryInfo.color : '#d3d3d3'
                };
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
