const monthlyFeeInput = document.querySelector('#monthly-fee');
const saveSettingsButton = document.querySelector('.save-settings');
const settingsMessage = document.querySelector('.settings-message');

const savedMonthlyFee = localStorage.getItem('monthlyFee');

if (savedMonthlyFee !== null) {
    monthlyFeeInput.value = savedMonthlyFee;
}

saveSettingsButton.addEventListener('click', () => {

    const monthlyFee = monthlyFeeInput.value;

    if (monthlyFee === '') {
        settingsMessage.textContent = 'Please enter a monthly fee.';
        return;
    }

    localStorage.setItem('monthlyFee', monthlyFee);

    settingsMessage.textContent = 'Settings saved successfully.';

});

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

const adminNameInput = document.querySelector('#administrator-name');
const saveAdminSettingsButton = document.querySelector('.save-admin-settings');
const adminSettingsMessage = document.querySelector('.admin-settings-message');

const savedAdminName = localStorage.getItem('admin');

if (savedAdminName !== null) {
    adminNameInput.value = savedAdminName;
}

saveAdminSettingsButton.addEventListener('click', () => {

    const admin = adminNameInput.value;

    if (admin === '') {
        adminSettingsMessage.textContent = 'Please enter an administrator name.';
        return;
    }

    localStorage.setItem('admin', admin);

    adminSettingsMessage.textContent = 'Settings saved successfully.';

});

const adminName = document.querySelector('.admin-name');

adminName.textContent = savedAdminName;

const tutors = JSON.parse(localStorage.getItem('tutors')) || [];
const learners = JSON.parse(localStorage.getItem("learners")) || [];
const attendance = JSON.parse(localStorage.getItem("attendance")) || [];
const payments = JSON.parse(localStorage.getItem("payments")) || [];

const backup = {
    learners,
    tutors,
    attendance,
    payments,
    monthlyFee: savedMonthlyFee,
    admin: savedAdminName
}

const exportDataButton = document.querySelector('.export-data');

exportDataButton.addEventListener('click', () => {
    const JSONFile = JSON.stringify(backup, null, 2);
    const JSONBlob = new Blob([JSONFile], { type: "application/json" });
    const tempUrl = URL.createObjectURL(JSONBlob);
    const downloadLink = document.createElement("a");

    downloadLink.href = tempUrl;
    downloadLink.download = "brightminds-backup.json";

    document.body.appendChild(downloadLink);
    downloadLink.click();

    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(tempUrl);
});

const logOUt = document.querySelector('.logout');

logOUt.addEventListener('click', (event) => {
    event.preventDefault();
    localStorage.removeItem('loggedIn');
    window.location.href = "login.html";
})
