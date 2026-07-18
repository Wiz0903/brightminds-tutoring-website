const sidebar = document.querySelector('aside');
const sidebarButton = document.querySelector('.sidebar-toggle');
const closeSidebarButton = document.querySelector('.close-sidebar');
const body = document.querySelector('body');
const overlay = document.querySelector('.overlay');

const addButton = document.querySelector('.add-button');

const tableBody = document.querySelector('tbody');

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

addButton.addEventListener('click', () => {
    window.location.href = "add-learner.html";
});

const displayLearners = () => {
    const learners = localStorage.getItem('learners');

    if (learners !== null) {
        const leanersArray = JSON.parse(learners);

        leanersArray.forEach(learner => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${learner.firstName} ${learner.lastName}</td><td>${learner.grade}</td><td>Attendance</td><td>${learner.statusMethod}</td><td>${learner.parentPhone}</td><td>Actions</td>`;
            tableBody.append(row);
        });
    }
}

displayLearners();