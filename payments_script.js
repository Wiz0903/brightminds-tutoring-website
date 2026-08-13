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

const payments = localStorage.getItem("payments");
const paymentsArray = JSON.parse(payments) || [];

const tableBody = document.querySelector("tbody");

const displayPayments = (paymentsArray) => {
    tableBody.innerHTML = "";

    paymentsArray.forEach((payment, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${payment.learnerName}</td>
            <td>R${Number(payment.amount).toFixed(2)}</td>
            <td>${payment.date}</td>
            <td>${payment.paymentMethod}</td>
            <td>
                <button class="view-button" data-index="${index}">View</button>
                <button class="delete-button" data-index="${index}">Delete</button>
            </td>
        `;

        const viewButtons = row.querySelectorAll('.view-button');

        viewButtons.forEach(viewButton => {
            viewButton.addEventListener('click', (event) => {
                const index = event.target.dataset.index;
                localStorage.setItem('selectedPaymentIndex', index);
                window.location.href = "payment-profile.html";
            });
        });

        const deleteButtons = row.querySelectorAll('.delete-button');

        deleteButtons.forEach(deleteButton => {
            deleteButton.addEventListener('click', (event) => {
                const index = event.target.dataset.index;
                const userConfirmed = confirm("Are you sure you want to delete this payment?");

                if (userConfirmed) {
                    paymentsArray.splice(index, 1);
                    const JSONArray = JSON.stringify(paymentsArray);
                    localStorage.setItem('payments', JSONArray);
                    displayPayments(paymentsArray);
                }
            });
        });

        tableBody.append(row);
    });
};

const transactions = document.querySelector(".transactions");
const totalPayments = document.querySelector('.total-payments');
const monthlyPayments = document.querySelector(".monthly-payments");
const outstandingBalance = document.querySelector('.outstanding-balance');

const updateTransactions = (paymentsArray) => {
    transactions.textContent = paymentsArray.length;
};

const updateTotalCollected = (paymentsArray) => {
    let total = 0;

    paymentsArray.forEach(payment => {
        total += Number(payment.amount);
    });

    totalPayments.textContent = total.toFixed(2);
};

const updateMonthlyPayments = (paymentsArray) => {
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

    monthlyPayments.textContent = total.toFixed(2);
}

const savedMonthlyFee = JSON.parse(localStorage.getItem('monthlyFee')) || '';

const updateOutstandingBalance = (learnersArray, paymentsArray) => {
    let outstandingTotal = 0;
    const today = new Date();
    const currentMonth = today.getMonth();

    learnersArray.forEach(learner => {
        let amountPaid = 0;

        paymentsArray.forEach(payment => {
            const paymentDate = new Date(payment.date);
            const paymentMonth = paymentDate.getMonth();

            if ((payment.learnerName === `${learner.firstName} ${learner.lastName}`) &&  (paymentMonth === currentMonth)) {
                amountPaid += Number(payment.amount);
            }
        });

        const outstanding = Math.max(0, savedMonthlyFee - amountPaid);
        outstandingTotal += outstanding;
    });

    outstandingBalance.textContent = outstandingTotal.toFixed(2);
}

const updateDashboard = () => {
    const paymentsArray = JSON.parse(localStorage.getItem("payments")) || [];
    const learnersArray = JSON.parse(localStorage.getItem("learners")) || [];

    displayPayments(paymentsArray);
    updateTransactions(paymentsArray);
    updateTotalCollected(paymentsArray);
    updateMonthlyPayments(paymentsArray);
    updateOutstandingBalance(learnersArray, paymentsArray);
};

updateDashboard();

const paymentSearchInput = document.getElementById('learner-search');

function filterPayments() {
    const filter = paymentSearchInput.value.toLowerCase();
    const payments = localStorage.getItem('payments');
    const paymentsArray = JSON.parse(payments) || [];
    let matches = [];

    paymentsArray.forEach(payment => {
        const fullName = payment.learnerName.toLowerCase();
        const paymentMethod = payment.paymentMethod.toLowerCase();
        if (fullName.includes(filter) || paymentMethod.includes(filter)) {
            matches.push(payment);
        }
    });
    displayPayments(matches);
}

paymentSearchInput.addEventListener("input", filterPayments);

const recordPaymentButton = document.querySelector('.record-payment');

recordPaymentButton.addEventListener('click', () => {
    window.location.href = "record-payment.html";
});

const savedAdminName = localStorage.getItem('admin') || '';
const adminName = document.querySelector('.admin-name');

adminName.textContent = savedAdminName;
