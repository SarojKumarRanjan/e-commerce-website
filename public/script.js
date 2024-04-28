function toggleDarkMode() {
    const elements = document.querySelectorAll('.home,.messagebtn button, #about p,.aman, #newslater h3, #footer, .content p, .top-navbar a, .top-navbar p');
    elements.forEach(element => {
        element.classList.toggle('dark-mode');
    });

   
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

const darkMode = localStorage.getItem('darkMode');
if (darkMode === 'true') {
    toggleDarkMode(); 
}

const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', toggleDarkMode);


