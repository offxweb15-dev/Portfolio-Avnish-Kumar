// Skills Data
console.log('Loading skills data...');
var skillsData = {
    frontend: [
        { name: 'HTML5', icon: 'fab fa-html5', level: 90 },
        { name: 'CSS', icon: 'fab fa-css3-alt', level: 85 },
        { name: 'JavaScript', icon: 'fab fa-js', level: 80 },
    ],
    tools: [
        { name: 'Git', icon: 'fab fa-git-alt', level: 80 },
        { name: 'GitHub', icon: 'fab fa-github', level: 80 },
        { name: 'VS Code', icon: 'fas fa-code', level: 90 },
        { name: 'Responsive Design', icon: 'fas fa-mobile-alt', level: 85 }
    ]
};

// Projects Data
console.log('Loading projects data...');
var projectsData = [
    {
        title: 'Portfolio Website',
        description: 'A responsive portfolio website built with HTML, CSS, and JavaScript.',
        image: 'img/project-placeholder.jpg',
        category: 'web',
        demo: 'https://offxweb15-dev.github.io/Portfolio-Avnish-Kumar/',
    },
    {
        title: 'Weather App',
        description: 'A weather application that shows current weather and forecast using a weather API.',
        image: 'img/project-placeholder.jpg',
        category: 'web',
        demo: 'https://avanishmourya6-web.github.io/Weather-by-Avnish/',
        github: 'https://github.com/AvanishMourya6-Web/Weather-by-Avnish'
    },
    {
        title: 'Modern Calculator',
        description: 'A sleek and responsive calculator with advanced mathematical functions and a clean UI.',
        image: 'img/project-placeholder.jpg',
        category: 'web',
        demo: 'https://avanishmourya6-web.github.io/CALCULATOR/',
        github: 'https://github.com/AvanishMourya6-Web/CALCULATOR'
    },
];

console.log('Data loaded successfully!');
console.log('Skills:', skillsData);
console.log('Projects:', projectsData);
