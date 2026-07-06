const navigation = document.querySelector('.navigation');
const toggleButton = document.querySelector('.menu-toggle');
const overlay = document.querySelector('.overlay');
const navLinks = document.querySelectorAll('.navigation a');
const body = document.querySelector('body');
const closeMenuButton = document.querySelector('.close-menu');
const subjectSearchInput = document.getElementById('subject-search');
const subjectListItems = document.querySelectorAll('#subjects-offered ul li');

const toggleMenu = () => {
    navigation.classList.toggle('active');
    overlay.classList.toggle('active');
    body.classList.toggle('no-scroll');
}

const closeMenu = () => {
    navigation.classList.remove('active');
    overlay.classList.remove('active');
    body.classList.remove('no-scroll');
}

toggleButton.addEventListener('click', () => {
    toggleMenu();
});

closeMenuButton.addEventListener('click', () => {
    closeMenu();
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeMenu();
    });
});

overlay.addEventListener('click', () => {
    closeMenu();
});

function filterSubjects() {
    const filter = subjectSearchInput.value.toLowerCase();
    subjectListItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(filter)) {
            item.style.display = 'list-item';
        } else {
            item.style.display = 'none';
        }
    });
}
