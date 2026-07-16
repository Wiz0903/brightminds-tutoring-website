const sidebar = document.querySelector('aside');
const sidebarButton = document.querySelector('.sidebar-toggle');
const closeSidebarButton = document.querySelector('.close-sidebar');
const body = document.querySelector('body');
const overlay = document.querySelector('.overlay');

const statsNumbers = document.querySelectorAll('.stats-numbers');
const statsSection = document.querySelector('.stats-container');

const toggleSidebar = () => {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    body.classList.toggle('no-scroll');
}

const closeSidebar = () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    body.classList.remove('no-scroll');
}

sidebarButton.addEventListener('click', () => {
    toggleSidebar();
});

closeSidebarButton.addEventListener('click', () => {
    closeSidebar();
});

overlay.addEventListener('click', () => {
    closeSidebar();
});

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
