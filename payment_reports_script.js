const payments = localStorage.getItem("payments");
const paymentsArray = JSON.parse(payments) || [];

const monthFilter = document.getElementById('month-filter');
const tableBody = document.querySelector("tbody");
const noPayments = document.querySelector('.no-payments');
const totalAmount = document.querySelector('.total-amount');

const displayPaymentReport = (paymentsArray) => {
    tableBody.innerHTML = "";
    let totalCollected = 0;
    let matchesFound = false;
    let allMonths = false;

    if (monthFilter.value === '') {
        allMonths = true;
    }

    paymentsArray.forEach(payment => {
        let paymentMatches = false

        if (allMonths) {
            paymentMatches = true
        } else {
            const paymentDate = new Date(payment.date);
            const paymentMonth = paymentDate.getMonth();

            if (paymentMonth === Number(monthFilter.value)) {
                paymentMatches = true
            }
        }

        if (paymentMatches) {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${payment.learnerName}</td>
                <td>R${Number(payment.amount).toFixed(2)}</td>
                <td>${payment.date}</td>
                <td>${payment.paymentMethod}</td>
            `;

            totalCollected += Number(payment.amount);
            tableBody.append(row);
            matchesFound = true;
        }
    });

    totalAmount.textContent = totalCollected.toFixed(2);

    if (matchesFound) {
        noPayments.classList.add('hide');
        noPayments.classList.remove('show');
    } else {
        noPayments.classList.add('show');
        noPayments.classList.remove('hide');
    }
};

monthFilter.addEventListener('change', () => {
    displayPaymentReport(paymentsArray)
});

displayPaymentReport(paymentsArray);
