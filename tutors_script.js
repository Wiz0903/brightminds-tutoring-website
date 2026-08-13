const sidebar = document.querySelector('aside');
const sidebarButton = document.querySelector('.sidebar-toggle');
const closeSidebarButton = document.querySelector('.close-sidebar');
const body = document.querySelector('body');
const overlay = document.querySelector('.overlay');

const addButton = document.querySelector('.add-button');

const tableBody = document.querySelector('tbody');

const tutorSearchInput = document.getElementById('tutor-search');

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
    window.location.href = "add-tutor.html";
});

function displayTutors(tutorsArray) {
    tableBody.innerHTML = "";

    tutorsArray.forEach((tutor, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `<td>${tutor.firstName} ${tutor.lastName}</td><td>${tutor.subjects.join(', ')}</td><td>${tutor.tutorPhone}</td><td><button class="view-button" data-index="${index}">View</button><button class="edit-button" data-index="${index}">Edit</button><button class="delete-button" data-index="${index}">Delete</button></td>`;

        const viewButtons = row.querySelectorAll('.view-button');

        viewButtons.forEach(viewButton => {
            viewButton.addEventListener('click', (event) => {
                const index = event.target.dataset.index;
                localStorage.setItem('selectedTutorIndex', index);
                window.location.href = "tutor-profile.html";
            });
        });

        const editButtons = row.querySelectorAll('.edit-button');

        editButtons.forEach(editButton => {
            editButton.addEventListener('click', (event) => {
                const index = event.target.dataset.index;
                localStorage.setItem('selectedTutorIndex', index);
                window.location.href = "edit-tutor.html";
            });
        });

        const deleteButtons = row.querySelectorAll('.delete-button');

        deleteButtons.forEach(deleteButton => {
            deleteButton.addEventListener('click', (event) => {
                const index = event.target.dataset.index;
                const userConfirmed = confirm('Are you sure you want to delete this tutor?');

                if (userConfirmed) {
                    const tutors = localStorage.getItem('tutors');
                    const tutorsArray = JSON.parse(tutors);
                    tutorsArray.splice(index, 1);
                    const JSONArray = JSON.stringify(tutorsArray);
                    localStorage.setItem('tutors', JSONArray);
                    window.location.reload();
                }
            });
        });

        tableBody.append(row);
    });
 }

const tutors = localStorage.getItem("tutors");
const tutorsArray = JSON.parse(tutors) || [];

displayTutors(tutorsArray);

function filterTutors() {
    const filter = tutorSearchInput.value.toLowerCase();
    const tutors = localStorage.getItem('tutors');
    const tutorsArray = JSON.parse(tutors) || [];
    let matches = [];

    tutorsArray.forEach(tutor => {
        const fullName = `${tutor.firstName} ${tutor.lastName}`.toLowerCase();
        if (fullName.includes(filter)) {
            matches.push(tutor);
        }
    });
    displayTutors(matches);
}

tutorSearchInput.addEventListener("input", filterTutors);

const savedAdminName = localStorage.getItem('admin') || '';
const adminName = document.querySelector('.admin-name');

adminName.textContent = savedAdminName;

const logOUt = document.querySelector('.logout');

logOUt.addEventListener('click', (event) => {
    event.preventDefault();
    localStorage.removeItem('loggedIn');
    window.location.href = "login.html";
})
