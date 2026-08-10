const sidebar = document.querySelector('aside');
const sidebarButton = document.querySelector('.sidebar-toggle');
const closeSidebarButton = document.querySelector('.close-sidebar');
const body = document.querySelector('body');
const overlay = document.querySelector('.overlay');

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

const paymentReportButton = document.querySelector('.payment-report');
const outstandingReportButton = document.querySelector('.outstanding-report');
const attendanceReportButton = document.querySelector('.attendance-report');

paymentReportButton.addEventListener('click', () => {
    window.location.href = "payment-reports.html";
});

outstandingReportButton.addEventListener('click', () => {
    window.location.href = "outstanding-fees-reports.html";
});

attendanceReportButton.addEventListener('click', () => {
    window.location.href = "attendance-report.html";
});
