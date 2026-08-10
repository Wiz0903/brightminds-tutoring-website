const learners = localStorage.getItem('learners');
const learnersArray = JSON.parse(learners);

const attendance = localStorage.getItem("attendance");
const attendanceArray = JSON.parse(attendance) || [];

const tableBody = document.querySelector('tbody');
const sessionsCount = document.querySelector('.sessions-count');
const averagePercentage = document.querySelector('.average-percentage');
const noAttendance = document.querySelector('.no-attendance');

const sessionKeys = new Set();

attendanceArray.forEach(attendance => {
    const sessionKey = `${attendance.date}`

    sessionKeys.add(sessionKey);
});

sessionsCount.textContent = sessionKeys.size;

tableBody.innerHTML = "";
let totalAttendancePercent = 0;
let matchesFound = false;

learnersArray.forEach(learner => {
    const attendanceKeys = new Set();

    attendanceArray.forEach(attendance => {
        if (`${learner.firstName} ${learner.lastName}` === `${attendance.learnerName}`) {
            attendanceKeys.add(attendance.date);
        }
    });

    let attendancePercent = 0;

    if (sessionKeys.size !== 0) {
        attendancePercent = (attendanceKeys.size / sessionKeys.size) * 100;
    }

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${learner.firstName} ${learner.lastName}</td>
        <td>${learner.grade}</td>
        <td>${learner.school}</td>
        <td>${sessionKeys.size}</td>
        <td>${attendanceKeys.size}</td>
        <td>${Number(attendancePercent).toFixed(2)}%</td>
    `;

    tableBody.append(row);
    matchesFound = true;

    totalAttendancePercent += attendancePercent;
});

let averageAttendance = 0;

if (learnersArray.length !== 0) {
    averageAttendance = totalAttendancePercent / learnersArray.length;
}

averagePercentage.textContent = `${Number(averageAttendance).toFixed(2)}`;

if (matchesFound) {
    noAttendance.classList.add('hide');
} else {
    noAttendance.classList.add('show');
}
