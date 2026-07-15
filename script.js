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

const subjectSelector = document.getElementById('subjects');
const tutorCards = document.querySelectorAll('.tutor-profile');

const statsNumbers = document.querySelectorAll('.stats-numbers');
const statsSection = document.getElementById('statistics');

const switchModeButton = document.querySelector(".switch-mode");

const tutorPopup = document.getElementById('tutor-popup');
const popupPhoto = document.querySelector('.popup-photo');
const popupName = document.querySelector('.popup-name');
const popupSubjects = document.querySelector('.popup-subjects');
const popupExperience = document.querySelector('.popup-experience');
const popupStyle = document.querySelector('.popup-style');
const popupFavourite = document.querySelector('.popup-favourite');
const popupNumber = document.querySelector('.popup-number');
const popupEmail = document.querySelector('.popup-email');
const profileCloseButton = document.querySelector('.profile-close-button');

const timerDay = document.querySelector('.timer-day');
const timerHour = document.querySelector('.timer-hour');
const timerMinute = document.querySelector('.timer-minute');
const timerSecond = document.querySelector('.timer-second');

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

const highlightNavigation = () => {
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
}

const showBackToTopButton = () => {
    if (window.scrollY > 300) {
        topButton.classList.add('show');
    } else {
        topButton.classList.remove('show');
    }
}

let hasAnimated = false;

const animateStatistics = () => {

    if (hasAnimated) return;

    const statsSectionTop = statsSection.getBoundingClientRect().top;

    if (statsSectionTop > -100 && statsSectionTop < 200) {

        hasAnimated = true;

        statsNumbers.forEach(statsNumber => {

            let startNumber = 0;
            const targetNumber = Number(statsNumber.dataset.target);

            const timer = setInterval(() => {

                startNumber++;

                statsNumber.textContent = startNumber;

                if (startNumber >= targetNumber) {
                    clearInterval(timer);
                }

            }, 20);

        });

    }

};

window.addEventListener('scroll', () => {
    highlightNavigation();

    showBackToTopButton();

    animateStatistics();
});


topButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
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

subjectSelector.addEventListener('change', () => {
    if (subjectSelector.value === 'All Subjects') {
        tutorCards.forEach(tutorCard => {
            tutorCard.classList.remove('hide');
        });
    } else {
        tutorCards.forEach(tutorCard => {
            const tutorSubjects = tutorCard.querySelector('.tutor-subjects');

            if (tutorSubjects.textContent.includes(subjectSelector.value)) {
                tutorCard.classList.remove('hide');
            } else {
                tutorCard.classList.add('hide');
            }
        });
    } 
});

switchModeButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        switchModeButton.textContent = "☀️ Light Mode";
        localStorage.setItem('theme', 'dark');
    } else {
        switchModeButton.textContent = "🌙 Dark Mode";
        localStorage.setItem('theme', 'light');
    }
});

if (localStorage.getItem ('theme') === 'dark') {
    body.classList.add('dark-mode');
    switchModeButton.textContent = "☀️ Light Mode";
}

const tutors = [
    {
        id: 1,
        photo: 'images/Myself.jpg',
        name: 'Tshokolo Ntho',
        subjects: ['English', 'Natural Science', 'Natural Science and Technology', 'Technology', 'Mathematics', 'Technical Mathematics', 'Physical Science', 'Computer Applications Technology', 'Information Technology'],
        experience: 'I have been tutoring at BrightMinds for the past six months, helping learners strengthen their understanding of key concepts and build confidence in their academic abilities. During this time, I have worked with learners across different grades, supporting them in developing problem-solving skills and preparing for assessments.',
        teachingStyle: "I believe that the best way to understand a learner's strengths and areas for improvement is through regular practice using tests and past examination papers. This approach helps me identify topics that learners have mastered as well as those that require additional attention. I then provide focused guidance and explanations to help learners improve their understanding and performance.",
        favouriteSubject: 'Mathematics is my favourite subject because it encourages logical thinking, problem-solving, and persistence. I enjoy helping learners break down challenging problems into manageable steps and seeing their confidence grow as they develop their mathematical skills.',
        phone: '068 268 3275',
        email: 'tshokolontho3@gmail.com'
    },

    {
        id: 2,
        photo: 'images/Lucia_Lebetsa.jpg',
        name: 'Lucia Lebetsa',
        subjects: ['English', 'Sesotho', 'Accounting', 'Mathematics Literacy', 'Business Studies', 'Economic Management Sciences', 'Economics'],
        experience: 'I have been tutoring at BrightMinds for the past six months, helping learners strengthen their understanding of key concepts and build confidence in their academic abilities. During this time, I have worked with learners across different grades, supporting them in developing problem-solving skills and preparing for assessments.',
        teachingStyle: "I like interacting with learners and helping them build their knownedge.",
        favouriteSubject: 'Economics',
        phone: '076 755 7914',
        email: 'lebetsalucia36@gmail.com'
    },

    {
        id: 3,
        photo: 'images/Kopanang_Lenkoe.jpg',
        name: 'Kopanang Lenkoe',
        subjects: ['Economics', 'Economic Management Sciences', 'Business Studies', 'Accounting'],
        experience: 'I have been tutoring at BrightMinds for the past 3 months, helping learners strengthen their understanding of key concepts and build confidence in their academic abilities. During this time, I have worked with learners across different grades, supporting them in developing problem-solving skills and preparing for assessments.',
        teachingStyle: "One-on-one interaction, delivering and building knowledge.",
        favouriteSubject: 'Economics.',
        phone: '076 288 8984',
        email: 'kopananglenkoe@gmail.com'
    }
];

detailsButtons.forEach(detailsButton => {
    detailsButton.addEventListener('click', () => {
        const currentTutor = tutors.find(tutor => tutor.id == detailsButton.id);

        popupPhoto.src =currentTutor.photo;
        popupName.textContent = currentTutor.name;
        popupSubjects.textContent = currentTutor.subjects.join(", ");
        popupExperience.textContent = currentTutor.experience;
        popupStyle.textContent = currentTutor.teachingStyle;
        popupFavourite.textContent = currentTutor.favouriteSubject;
        popupNumber.textContent = currentTutor.phone;
        popupEmail.textContent = currentTutor.email;

        tutorPopup.classList.add('show');
        body.classList.toggle('no-scroll');
    });
});

profileCloseButton.addEventListener('click', () => {
    tutorPopup.classList.remove('show');
    body.classList.remove('no-scroll');
});

const updateCountDown = () => {
    const today = new Date();
    const sessions = [
        {day: 1, hour: 16, minute: 0},
        {day: 2, hour: 16, minute: 0},
        {day: 3, hour: 16, minute: 0},
        {day: 4, hour: 16, minute: 0},
        {day: 5, hour: 16, minute: 0}
    ]

    let nextSession;
    for (const session of sessions) {
        if (today.getDay() === session.day) {
            if (session.hour > today.getHours()) {
                nextSession = session;
                break;
                } else if (session.hour === today.getHours()) {
                    if (session.minute > today.getMinutes()) {
                        nextSession = session;
                        break;
                        
                } 
            }
        } else if (session.day > today.getDay()) {
            nextSession = session;
            break;
        }
    };

    if (nextSession === undefined) {
        nextSession = sessions[0];
    }

    const sessionDate = new Date(today); 

    let daysAhead = nextSession.day - today.getDay();
    if (daysAhead < 0) {
        daysAhead += 7;
    }

    sessionDate.setDate(sessionDate.getDate() + daysAhead);
    sessionDate.setHours(nextSession.hour);
    sessionDate.setMinutes(nextSession.minute);
    sessionDate.setSeconds(0);
    sessionDate.setMilliseconds(0);

    const difference = sessionDate - today;

    const days = Math.floor(difference / 86400000);
    const hours = Math.floor((difference % 86400000) / 3600000);
    const minutes = Math.floor((difference % 3600000) / 60000);
    const seconds = Math.floor((difference % 60000) / 1000);

    timerDay.textContent = days.toString().padStart(2, '0');
    timerHour.textContent = hours.toString().padStart(2, '0');
    timerMinute.textContent = minutes.toString().padStart(2, '0');
    timerSecond.textContent = seconds.toString().padStart(2, '0');
}

const sessionTimer = setInterval(updateCountDown, 1000);
