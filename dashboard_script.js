const sidebar = document.querySelector('aside');
const sidebarButton = document.querySelector('.sidebar-toggle');
const closeSidebarButton = document.querySelector('.close-sidebar');
const body = document.querySelector('body');
const overlay = document.querySelector('.overlay');

const statsNumbers = document.querySelectorAll('.stats-numbers');
const statsSection = document.querySelector('.stats-container');

const totalLearnersElement = document.querySelector('.total-learners');
const totalTutorsElement = document.querySelector('.total-tutors');
const attendanceElement = document.querySelector('.attendance-percentage');
const paymentsElement = document.querySelector('.total-payments');

const addLearnerButton = document.querySelector('.add-learner');
const addTutorButton = document.querySelector('.add-tutor');
const viewReportButton = document.querySelector('.view-report');

const recentActivityContainer = document.querySelector('.recent-activity');

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

const learners = JSON.parse(localStorage.getItem('learners')) || [];
totalLearnersElement.textContent = learners.length;

const tutors = JSON.parse(localStorage.getItem('tutors')) || [];
totalTutorsElement.textContent = tutors.length;

const activities = {
    type: "learner_created",
    learnerName: "Amanda Smith",
    date: "2026-07-18",
    time: "14:02"
}

addLearnerButton.addEventListener('click', () => {
    window.location.href = "add-learner.html";
});

addTutorButton.addEventListener('click', () => {
    window.location.href = "add-tutor.html";
});

const updateAttendancePercentage = () => {
    const attendance = localStorage.getItem("attendance");
    const attendanceArray = JSON.parse(attendance) || [];

    const today = new Date().toISOString().split("T")[0];

    const learnersCount = learners.length;
    const todayAttendance = attendanceArray.filter(record => {
            return record.date === today;
        }).length;

    if (learnersCount === 0 || todayAttendance === 0) {
        attendanceElement.textContent = "0";
        return;
    }

    const learnerPercentage = Math.floor((todayAttendance / learnersCount) * 100);
    attendanceElement.textContent = `${learnerPercentage}`;
}

updateAttendancePercentage();

const payments = localStorage.getItem("payments");
const paymentsArray = JSON.parse(payments) || [];

const displayMonthlyPayments = (paymentsArray) => {
    let total = 0;
    const today = new Date();
    const currentMonth = today.getMonth();

    paymentsArray.forEach(payment => {
        const paymentDate = new Date(payment.date);
        const paymentMonth = paymentDate.getMonth();

        if (paymentMonth === currentMonth) {
            total += Number(payment.amount);
        }
    });

    paymentsElement.textContent = total.toFixed(2);
}

displayMonthlyPayments(paymentsArray);

viewReportButton.addEventListener('click', () => {
    window.location.href = "reports.html";
});

const savedAdminName = localStorage.getItem('admin') || '';
const adminName = document.querySelector('.admin-name');

adminName.textContent = savedAdminName;

const logOUt = document.querySelector('.logout');

logOUt.addEventListener('click', (event) => {
    event.preventDefault();
    localStorage.removeItem('loggedIn');
    window.location.href = "login.html";
})

const addRecentActivity = (activityType, activityMessage) => {
    const today = new Date();
    const isoString = today.toISOString();

    const activity = {
        type: activityType,
        message: activityMessage,
        date: isoString.slice(0, 10),
        time: isoString.slice(11, 16)
    }

    const JSONstring = localStorage.getItem('activities')
    const activityArray = JSON.parse(JSONstring) || [];
    activityArray.push(activity);
    const last20 = activityArray.slice(-20); 
    localStorage.setItem('activities', JSON.stringify(last20));
}

const loadRecentActivities = () => {
    const JSONstring = localStorage.getItem('activities')
    const activityArray = JSON.parse(JSONstring) || [];
    return activityArray;
}

const displayRecentActivities = (activityArray) => {
    if (activityArray.length === 0) {
        recentActivityContainer.innerHTML = `
            <p>No recent activity.</p>
        `;
        return;
    }

    activityArray.sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);

        return dateB - dateA;
    });

    const recentActivities = activityArray.slice(0, 5);
    let html = '';

    for (const activity of recentActivities) {
        html += `
        <div class="activity-item">
            <span>${activity.message}</span>
            <span>${activity.date}</span>
            <span>${activity.time}</span>
        </div>
        `;
    }

     recentActivityContainer.innerHTML = html;
}

loadRecentActivities();
displayRecentActivities(loadRecentActivities());
