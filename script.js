// Function to show the selected page
function showPage(pageId) {
    var pages = document.getElementsByClassName('page');
    for (var i = 0; i < pages.length; i++) {
        pages[i].style.display = 'none';
    }
    document.getElementById(pageId).style.display = 'block';
    highlightActiveLink(pageId);
    fadeInPage(pageId);
}



// Function to highlight the active link
function highlightActiveLink(objective) {
    var links = document.querySelectorAll('.sidebar a');
    links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('onclick').includes(objective)) {
            link.classList.add('active');
        }
    });
}



// Function to add fade-in effect to the page content
function fadeInPage(pageId) {
    var page = document.getElementById(pageId);
    page.style.opacity = 0;
    page.style.transition = 'opacity 0.5s';
    setTimeout(() => {
        page.style.opacity = 1;
    }, 10);
}



// Function to update the breadcrumb
function updateBreadcrumb(pageId) {
    console.log('Updating breadcrumb for page:', pageId); // Debug log
    var breadcrumb = document.getElementById('breadcrumb');
    if (!breadcrumb) {
        console.error('Breadcrumb element not found');
        return;
    }
    var pageNames = {
        objective: 'Objective',
        theory: 'Theory',
        procedure: 'Procedure',
        simulation: 'Simluation',
        result: 'Result'
    };
    breadcrumb.innerHTML = `
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#" onclick="showPage('pagename')">''</a></li>
            <li class="breadcrumb-item active" aria-current="page">${pageNames[pageId]}</li>
        </ol>
    `;
    console.log('Breadcrumb updated:', breadcrumb.innerHTML); // Debug log
}



// Function to toggle the sidebar
function toggleSidebar() {
    var sidebar = document.querySelector('.sidebar');
    var toggleButton = document.querySelector('.sidebar-toggle');
    sidebar.classList.toggle('active');
    toggleButton.classList.toggle('active');
}

// Function to hide the sidebar
function hideSidebar() {
    var sidebar = document.querySelector('.sidebar');
    var toggleButton = document.querySelector('.sidebar-toggle');
    sidebar.classList.remove('active');
    toggleButton.classList.remove('active');
}


// Smooth scrolling for sidebar links
document.querySelectorAll('.sidebar a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        var targetId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
        document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
    });
});


// Show the home page by default
document.getElementById('objective').style.display = 'block';
highlightActiveLink('objective');
fadeInPage('objective');


// simulation project
const canvas = document.getElementById('simulationCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
let shaking = false;

// Initialize particles
for (let i = 0; i < 100; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 5,
        color: 'gray'
    });
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        ctx.closePath();
    });
}

function shakeParticles() {
    if (shaking) {
        particles.forEach(particle => {
            particle.x += (Math.random() - 0.5) * 2;
            particle.y += (Math.random() - 0.5) * 2;
        });
        drawParticles();
        requestAnimationFrame(shakeParticles);
    }
}

function startShaking() {
    shaking = true;
    shakeParticles();
}

function stopShaking() {
    shaking = false;
}

function weighSample() {
    let totalWeight = particles.length * 0.1; // Assume each particle weighs 0.1g
    alert(`Total weight of sample: ${totalWeight.toFixed(2)}g`);
}

drawParticles();
