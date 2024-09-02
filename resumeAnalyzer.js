

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
    const categories = {
        'Professional Skills': {
            value: 50,
            color: '#007aff',
            subcategories: {
                'Experience': {
                    value: 25,
                    keywords: [
                        'experience', 'work experience', 'professional experience', 'career history', 
                        'employment history', 'job experience', 'work background', 'professional background', 
                        'industry experience', 'career experience'
                    ]
                },
                'Skills': {
                    value: 20,
                    keywords: [
                        'skills', 'competencies', 'abilities', 'expertise', 
                        'capabilities', 'proficiencies', 'talents', 'know-how', 
                        'strengths', 'aptitudes'
                    ]
                },
                'Tech Stack': {
                    value: 5,
                    keywords: [
                        'tech stack', 'technology stack', 'technical stack', 'technologies used', 
                        'software stack', 'development stack', 'tools and technologies', 'technology environment', 
                        'programming languages', 'software tools'
                    ]
                }
            }
        },
        'Cultural Fit': {
            value: 20,
            color: '#28a745',
            subcategories: {
                'Soft Skills': {
                    value: 10,
                    keywords: [
                        'soft skills', 'interpersonal skills', 'communication skills', 'teamwork', 
                        'emotional intelligence', 'problem-solving', 'adaptability', 'time management', 
                        'collaboration', 'leadership skills'
                    ]
                },
                'Cultural Fit': {
                    value: 10,
                    keywords: [
                        'cultural fit', 'company culture', 'organizational fit', 'values alignment', 
                        'team fit', 'company values', 'corporate culture', 'workplace culture', 
                        'company mission', 'company vision'
                    ]
                }
            }
        },
        'Education': {
            value: 10,
            color: '#ffc107',
            subcategories: {
                'University': {
                    value: 5,
                    keywords: [
                        'university', 'college', 'higher education', 'academic background', 
                        'bachelor\'s degree', 'master\'s degree', 'academic qualifications', 'university degree', 
                        'alma mater', 'graduate'
                    ]
                },
                'Certifications': {
                    value: 5,
                    keywords: [
                        'certifications', 'certificates', 'professional certifications', 'training certificates', 
                        'industry certifications', 'accreditations', 'professional training', 'qualifications', 
                        'certified courses', 'certified programs'
                    ]
                }
            }
        },
        'Portfolio': {
            value: 10,
            color: '#ff5733',
            subcategories: {
                'Engagement': {
                    value: 5,
                    keywords: [
                        'engagement', 'client engagement', 'project engagement', 'stakeholder engagement', 
                        'team engagement', 'user engagement', 'customer engagement', 'participant engagement', 
                        'community engagement', 'collaboration engagement'
                    ]
                },
                'Projects': {
                    value: 5,
                    keywords: [
                        'projects', 'work projects', 'initiatives', 'assignments', 
                        'tasks', 'deliverables', 'project work', 'project management', 
                        'project outcomes', 'case studies'
                    ]
                }
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
        const subcategories = categoryInfo.subcategories;

        for (const subcategory in subcategories) {
            const subcategoryInfo = subcategories[subcategory];
            const found = subcategoryInfo.keywords.some(keyword => content.toLowerCase().includes(keyword.toLowerCase()));

            finalCategories[subcategory] = {
                value: found ? subcategoryInfo.value : 0,
                color: found ? categoryInfo.color : '#d3d3d3'
            };
        }
    }

    return finalCategories;
}