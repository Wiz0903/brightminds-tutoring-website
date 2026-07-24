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
        const learnersArray = JSON.parse(learners);

        learnersArray.forEach((learner, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${learner.firstName} ${learner.lastName}</td><td>${learner.grade}</td><td>Attendance</td><td>${learner.statusMethod}</td><td>${learner.parentPhone}</td><td><button class="view-button" data-index="${index}">View</button><button class="edit-button" data-index="${index}">Edit</button><button class="delete-button" data-index="${index}">Delete</button></td>`;
            tableBody.append(row);
        });
    }
}

displayLearners();

const viewButtons = document.querySelectorAll('.view-button');

viewButtons.forEach(viewButton => {
    viewButton.addEventListener('click', (event) => {
        const index = event.target.dataset.index;
        localStorage.setItem('selectedLearnerIndex', index);
        window.location.href = "learner-profile.html";
    });
});

const editButtons = document.querySelectorAll('.edit-button');

editButtons.forEach(editButton => {
    editButton.addEventListener('click', (event) => {
        const index = event.target.dataset.index;
        localStorage.setItem('selectedLearnerIndex', index);
        window.location.href = "edit-learner.html";
    });
});

const deleteButtons = document.querySelectorAll('.delete-button');

deleteButtons.forEach(deleteButton => {
    deleteButton.addEventListener('click', (event) => {
        const index = event.target.dataset.index;
        const userConfirmed = confirm('Are you sure you want to delete this learner?');

        if (userConfirmed) {
            learnersArray.splice(index, 1);
            const JSONArray = JSON.stringify(learnersArray);
            localStorage.setItem('learners', JSONArray);
            window.location.reload();
        }
    });
});
