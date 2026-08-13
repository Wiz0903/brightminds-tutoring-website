const payments = JSON.parse(localStorage.getItem("payments")) || [];
const learners = localStorage.getItem('learners') || [];
const learnersArray = JSON.parse(learners);

const tableBody = document.querySelector("tbody");
const totalAmountOutstanding =document.querySelector('.outstanding-total');
const noOutstanding = document.querySelector('.no-outstanding');

const savedMonthlyFee = JSON.parse(localStorage.getItem('monthlyFee')) || '';

const displayOutstandingReport = (learnersArray, payments) => {
    tableBody.innerHTML = "";

    let totalOutstanding = 0;
    const today = new Date();
    const currentMonth = today.getMonth();

    let matchesFound = false;

    learnersArray.forEach(learner => {
        let amountPaid = 0;

        payments.forEach(payment => {
            const paymentDate = new Date(payment.date);
            const paymentMonth = paymentDate.getMonth();

            if ((payment.learnerName === `${learner.firstName} ${learner.lastName}`) &&  (paymentMonth === currentMonth)) {
                amountPaid += Number(payment.amount);
            }
        });

        const outstanding = Math.max(0, savedMonthlyFee - amountPaid);
        totalOutstanding += outstanding;

        if (outstanding > 0) {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${learner.firstName} ${learner.lastName}</td>
                <td>${learner.grade}</td>
                <td>${learner.school}</td>
                <td>R${Number(amountPaid).toFixed(2)}</td>
                <td>R${Number(outstanding).toFixed(2)}</td>
            `;

            tableBody.append(row);
            matchesFound = true;
        }
    });
    totalAmountOutstanding.textContent = totalOutstanding.toFixed(2);

    if (matchesFound) {
        noOutstanding.classList.add('hide');
    } else {
        noOutstanding.classList.add('show');
    }
};

displayOutstandingReport(learnersArray, payments);

console.log(learnersArray);
