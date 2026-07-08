const navigation = document.querySelector('.navigation');
const toggleButton = document.querySelector('.menu-toggle');
const overlay = document.querySelector('.overlay');
const navLinks = document.querySelectorAll('.navigation a');
const body = document.querySelector('body');
const closeMenuButton = document.querySelector('.close-menu');
const subjectSearchInput = document.getElementById('subject-search');
const subjectListItems = document.querySelectorAll('#subjects-offered ul li');
const sections = document.querySelectorAll('section');
const topButton = document.querySelector('.top-button');
const detailsButtons = document.querySelectorAll('.details-button');
const questionButtons = document.querySelectorAll('.question');
const months = document.getElementById('months');
const amount = document.querySelector('.amount');

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

window.addEventListener('scroll', () => {
    navLinks.forEach(navLink => {
        navLink.classList.remove('highlight');
    });

    sections.forEach(section => {
        const sectionTopBoundary = section.getBoundingClientRect().top;

        if (sectionTopBoundary > -100 && sectionTopBoundary < 200) {
            navLinks.forEach(navLink => {
                const sectionId = section.id;
                const link = navLink.getAttribute('href').replace('#', '');

                if (link === sectionId) {
                    navLink.classList.add('highlight');
                }
            });
        }
    });

    if (window.scrollY > 300) {
        topButton.classList.add('show');
    } else {
        topButton.classList.remove('show');
    }
});


topButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

detailsButtons.forEach(detailsButton => {
    detailsButton.addEventListener('click', () => {

        const tutorCard = detailsButton.closest('.tutor-info');

        const tutorDetails = tutorCard.querySelector('.tutor-details');

        tutorDetails.classList.toggle('expanded');

        if (tutorDetails.classList.contains('expanded')) {
            detailsButton.textContent = "Show Less";
        } else {
            detailsButton.textContent = "Learn More";
        }

    });
});

questionButtons.forEach(questionButton => {
    questionButton.addEventListener('click', () => {

        const faqCard = questionButton.closest('.faq-item');

        const answers = faqCard.querySelector('.answer');

        answers.classList.toggle('expanded');
        questionButton.classList.toggle('expanded');
    });
});

months.addEventListener('input', () => {
    const totalCost = 200 * months.value;
    amount.textContent = totalCost;
});
