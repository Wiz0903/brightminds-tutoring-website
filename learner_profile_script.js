const learnerIndex = localStorage.getItem('selectedLearnerIndex');
const payments = JSON.parse(localStorage.getItem("payments")) || [];

const learners = localStorage.getItem('learners');
const learnersArray = JSON.parse(learners);
const selectedLearner = learnersArray[learnerIndex];

const learnerNameElement = document.querySelector('.learner-name');
const gradeElement = document.querySelector('.learner-grade');
const schoolElement = document.querySelector('.learner-school');
const parentNameElement = document.querySelector('.parent-name');
const parentPhoneElement = document.querySelector('.parent-phone');
const parentEmailElement = document.querySelector('.parent-email');
const subjectElement = document.querySelector('.learner-subjects');
const currentChallengesElement = document.querySelector('.current-challenges');
const paymentMethodElement = document.querySelector('.payment-method');
const statusMethodElement = document.querySelector('.payment-status');
const attendanceElement = document.querySelector('.attendance-history');

learnerNameElement.textContent = `${selectedLearner.firstName} ${selectedLearner.lastName}`;
gradeElement.textContent = selectedLearner.grade;
schoolElement.textContent = selectedLearner.school;
parentNameElement.textContent = selectedLearner.parentName;
parentPhoneElement.textContent = selectedLearner.parentPhone;
parentEmailElement.textContent = selectedLearner.parentEmail;
subjectElement.innerHTML = selectedLearner.subjects.map(subject => `<li>${subject}</li>`).join('');
currentChallengesElement.textContent = selectedLearner.currentChallenges;
paymentMethodElement.textContent = selectedLearner.paymentMethod;
statusMethodElement.textContent = selectedLearner.statusMethod;

const learnerFullName = `${selectedLearner.firstName} ${selectedLearner.lastName}`;

const loadAttendance = () => {
    const JSONstring = localStorage.getItem('attendance')
    const attendanceArray = JSON.parse(JSONstring) || [];

    const learnerAttendance = attendanceArray.filter(record => {
        return record.learnerName === selectedLearner.firstName + " " + selectedLearner.lastName;
    });

    attendanceElement.innerHTML = learnerAttendance.map(attendance => `<li>${attendance.date} ${attendance.time}</li>`).join('');
}

loadAttendance();

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
