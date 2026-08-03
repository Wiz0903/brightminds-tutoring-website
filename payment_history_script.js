const learnerIndex = localStorage.getItem('selectedLearnerIndex');
const payments = JSON.parse(localStorage.getItem("payments")) || [];

const learners = localStorage.getItem('learners');
const learnersArray = JSON.parse(learners) || [];

if (learnerIndex === null || !learnersArray[learnerIndex]) {
    window.location.href = "learners.html";
}

const selectedLearner = learnersArray[learnerIndex];

const learnerNameElement = document.querySelector('.learner-name');
const gradeElement = document.querySelector('.learner-grade');
const schoolElement = document.querySelector('.learner-school');

const learnerFullName = `${selectedLearner.firstName} ${selectedLearner.lastName}`;

learnerNameElement.textContent = learnerFullName;
gradeElement.textContent = selectedLearner.grade;
schoolElement.textContent = selectedLearner.school

const tableBody = document.querySelector("tbody");

const displayPaymentHistory = () => {
    tableBody.innerHTML = "";

    payments.forEach(payment => {
        if (payment.learnerName === learnerFullName) {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${payment.date}</td>
                <td>R${Number(payment.amount).toFixed(2)}</td>
                <td>${payment.paymentMethod}</td>
            `;

            tableBody.append(row);
        }
    });
};

displayPaymentHistory();

const totalAmount = document.querySelector('.total-amount');

const updateTotalPaid = () => {
    let totalPaid = 0;

    payments.forEach(payment => {
        if (payment.learnerName === learnerFullName) {
            totalPaid += Number(payment.amount);
        }
    });

    totalAmount.textContent = totalPaid.toFixed(2);
};

updateTotalPaid();

const MONTHLY_FEE = 200;
const outstandingAmount = document.querySelector('.outstanding-amount');

const updateOutstandingAmount = () => {
    let amountPaid = 0;
    const today = new Date();
    const currentMonth = today.getMonth();

    payments.forEach(payment => {
        const paymentDate = new Date(payment.date);
        const paymentMonth = paymentDate.getMonth();

        if ((payment.learnerName === learnerFullName) &&  (paymentMonth === currentMonth)) {
            amountPaid += Number(payment.amount);
        }
    });

    const outstanding = Math.max(0, MONTHLY_FEE - amountPaid);
    outstandingAmount.textContent = outstanding.toFixed(2);
};

updateOutstandingAmount();