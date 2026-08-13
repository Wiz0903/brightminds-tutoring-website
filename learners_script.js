const sidebar = document.querySelector('aside');
const sidebarButton = document.querySelector('.sidebar-toggle');
const closeSidebarButton = document.querySelector('.close-sidebar');
const body = document.querySelector('body');
const overlay = document.querySelector('.overlay');

const addButton = document.querySelector('.add-button');

const tableBody = document.querySelector('tbody');

const learnerSearchInput = document.getElementById('learner-search');

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

function displayLearners(learnersArray) {
    tableBody.innerHTML = "";
    const JSONstring = localStorage.getItem('attendance')
    const attendanceArray = JSON.parse(JSONstring) || [];

    learnersArray.forEach((learner, index) => {
        const row = document.createElement("tr");

        const learnerAttendance = attendanceArray.filter(record => {
            return record.learnerName === learner.firstName + " " + learner.lastName;
        }).length;

        row.innerHTML = `
            <td>${learner.firstName} ${learner.lastName}</td>
            <td>${learner.grade}</td>
            <td>${learnerAttendance}</td>
            <td>${learner.statusMethod}</td>
            <td>${learner.parentPhone}</td>
            <td>
                <button class="view-button" data-index="${index}">View</button>
                <button class="edit-button" data-index="${index}">Edit</button>
                <button class="delete-button" data-index="${index}">Delete</button>
            </td>
        `;

        const viewButtons = row.querySelectorAll('.view-button');

        viewButtons.forEach(viewButton => {
            viewButton.addEventListener('click', (event) => {
                const index = event.target.dataset.index;
                localStorage.setItem('selectedLearnerIndex', index);
                window.location.href = "learner-profile.html";
            });
        });

        const editButtons = row.querySelectorAll('.edit-button');

        editButtons.forEach(editButton => {
            editButton.addEventListener('click', (event) => {
                const index = event.target.dataset.index;
                localStorage.setItem('selectedLearnerIndex', index);
                window.location.href = "edit-learner.html";
            });
        });

        const deleteButtons = row.querySelectorAll('.delete-button');

        deleteButtons.forEach(deleteButton => {
            deleteButton.addEventListener('click', (event) => {
                const index = event.target.dataset.index;
                const userConfirmed = confirm('Are you sure you want to delete this learner?');

                if (userConfirmed) {
                    const learners = localStorage.getItem('learners');
                    const learnersArray = JSON.parse(learners);
                    learnersArray.splice(index, 1);
                    const JSONArray = JSON.stringify(learnersArray);
                    localStorage.setItem('learners', JSONArray);
                    window.location.reload();
                }
            });
        });

        tableBody.append(row);
    });
}

const learners = localStorage.getItem("learners");
const learnersArray = JSON.parse(learners) || [];

displayLearners(learnersArray);

function filterLearners() {
    const filter = learnerSearchInput.value.toLowerCase();
    const learners = localStorage.getItem('learners');
    const learnersArray = JSON.parse(learners) || [];
    let matches = [];

    learnersArray.forEach(learner => {
        const fullName = `${learner.firstName} ${learner.lastName}`.toLowerCase();
        if (fullName.includes(filter)) {
            matches.push(learner);
        }
    });
    displayLearners(matches);
}

learnerSearchInput.addEventListener("input", filterLearners);

const savedAdminName = localStorage.getItem('admin') || '';
const adminName = document.querySelector('.admin-name');

adminName.textContent = savedAdminName;
