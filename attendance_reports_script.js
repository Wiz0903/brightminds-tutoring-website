const sidebar = document.querySelector('aside');
const sidebarButton = document.querySelector('.sidebar-toggle');
const closeSidebarButton = document.querySelector('.close-sidebar');
const body = document.querySelector('body');
const overlay = document.querySelector('.overlay');

const importCSVButton = document.querySelector('.import-csv');
const csvFileInput = document.querySelector('.real-file-picker');

const totalAttendanceRecords = document.querySelector('.attendance-records');
const todayAttendanceRecords = document.querySelector('.today-attendance');
const recentImport = document.querySelector('.recent-import');
const recentActivityContainer = document.querySelector('.recent-activity');

const attendanceFilter = document.getElementById('attendance-filter');

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

const openFilePicker = () => {
    csvFileInput.click();
}

const processAttendance = (csvText) => {
    const rows = csvText.split("\n");
    const structuredData = rows.map(row => row.split(','));
    structuredData.shift();
    const attendanceRecords = [];

    for (const row of structuredData) {
        if (row[0] === "") {
            continue;
        }

        const attendance = {
            learnerId: row[0],
            learnerName: row[1].replaceAll('"', ''),
            date: row[2].replaceAll('"', ''),
            time: row[3].replaceAll('"', '')
        };

        attendanceRecords.push(attendance);
    };

    return attendanceRecords;
};

const saveAttendance = (attendanceRecords) => {
    if (localStorage.getItem('attendance') === null) {
        localStorage.setItem('attendance', JSON.stringify(attendanceRecords));
    } else {
        const JSONstring = localStorage.getItem('attendance')
        const attendanceArray = JSON.parse(JSONstring);

        for(const attendance of attendanceRecords) {
            const alreadyExists = attendanceArray.some(record => {
                return (record.learnerId === attendance.learnerId &&
                record.date === attendance.date &&
                record.time === attendance.time)
            });

            if(alreadyExists) {
                continue;
            }
            
            attendanceArray.push(attendance); 
        }
        localStorage.setItem('attendance', JSON.stringify(attendanceArray));
    }
}

const loadAttendance = () => {
    const attendance = localStorage.getItem("attendance");
    const attendanceArray = JSON.parse(attendance) || [];
    return attendanceArray;
}

const readCSV = (file) => {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
       const attendanceRecords = processAttendance(reader.result);
       saveAttendance(attendanceRecords);
       addRecentActivity("attendance_imported", `${attendanceRecords.length} attendance records imported.`);
       updateDashboard();
    });

    reader.readAsText(file);
};

const validateCSV = () => {
    const selectedFile = csvFileInput.files[0];

    if (selectedFile === undefined) {
        return;
    }
    
    const fileName = selectedFile.name.toLowerCase();
    if (fileName.endsWith(".csv")) {
        readCSV(selectedFile)
    } else {
        alert("Please choose a CSV file.")
    }
};

const attendanceImportManager = () => {
    openFilePicker();
};

importCSVButton.addEventListener('click', attendanceImportManager);

csvFileInput.addEventListener("change", () => {
    validateCSV();
});

const updateAttendanceStatistics = (attendanceArray) => {
    const today = new Date().toISOString().split("T")[0];
    totalAttendanceRecords.textContent = attendanceArray.length;

    const todayAttendance = attendanceArray.filter(record => {
        return record.date === today;
    });

    todayAttendanceRecords.textContent = todayAttendance.length;
};

const updateRecentImports = (attendanceArray) => {
   if (attendanceArray.length === 0) {
        recentImport.textContent = "Never";
        return;
    }

    attendanceArray.sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);

        return dateB - dateA;
    });

    const mostRecent = attendanceArray[0];
    recentImport.textContent = `${mostRecent.date} ${mostRecent.time}`;
}

let attendanceChart = null;

const updateAttendanceGraph = (attendanceArray) => {
    const countsByDate = attendanceArray.reduce((acc, record) => {
        acc[record.date] = (acc[record.date] || 0) + 1;
        return acc;
    }, {});

    const chartLabels = Object.keys(countsByDate).sort();
    const chartData = chartLabels.map(date => countsByDate[date]);

    if (attendanceChart) {
        attendanceChart.destroy();
    }

    const ctx = document.querySelector('.attendance-graph').getContext('2d');
    attendanceChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: chartLabels,
        datasets: [{
        label: 'Attendance',
        data: chartData,
        lineTension: 0.3,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        }]
    }
    });
}

const updateRecentActivity = (attendanceArray) => {
    if (attendanceArray.length === 0) {
        recentActivityContainer.innerHTML = `
            <p>No recent activity.</p>
        `;
        return;
    }

    attendanceArray.sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);

        return dateB - dateA;
    });

    const recentAttendance = attendanceArray.slice(0, 5);
    let html = '';

    for (const attendance of recentAttendance) {
        html += `
        <div class="activity-item">
            <span>${attendance.learnerName}</span>
            <span>${attendance.date}</span>
            <span>${attendance.time}</span>
        </div>
        `;
    }

     recentActivityContainer.innerHTML = html;
}

const updateDashboard = () => {
    const attendanceArray = loadAttendance();

    updateAttendanceGraph(attendanceArray);
    updateAttendanceStatistics(attendanceArray);
    updateRecentImports(attendanceArray);
    updateRecentActivity(attendanceArray);
}

updateDashboard();

const savedAdminName = localStorage.getItem('admin') || '';
const adminName = document.querySelector('.admin-name');

adminName.textContent = savedAdminName;

const filterAttendance = (attendanceRecords, selectedFilter) => {
    const today = new Date();

    switch (selectedFilter) {
        case "7-days":
            const sevenDaysAgo = new Date(today);
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

            return attendanceRecords.filter(record => (new Date(record.date) <= today) && (new Date(record.date) >= sevenDaysAgo));
        case "30-days":
            const thirtyDaysAgo = new Date(today);
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

            return attendanceRecords.filter(record => (new Date(record.date) <= today) && (new Date(record.date) >= thirtyDaysAgo));
        case "3-months":
            const threeMonthsAgo = new Date(today);
            threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

            return attendanceRecords.filter(record => (new Date(record.date) <= today) && (new Date(record.date) >= threeMonthsAgo));
        case "this-year":
            return attendanceRecords.filter(record => new Date(record.date) >= new Date(new Date().getFullYear(), 0, 1));
        default:
            return attendanceRecords;
    }
}

attendanceFilter.addEventListener('change', () => {
    const attendanceRecords = loadAttendance();
    const selectedFilter = attendanceFilter.value;

    const filteredAttendance = filterAttendance(attendanceRecords, selectedFilter);
    updateAttendanceGraph(filteredAttendance);
});
