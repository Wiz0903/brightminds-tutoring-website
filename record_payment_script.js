const learners = localStorage.getItem("learners");
const learnersArray = JSON.parse(learners) || [];

const dropdownList = document.getElementById('learners');

const amountInput = document.getElementById("amount");
const dateInput = document.getElementById("date");
const notesInput = document.getElementById("notes");
const saveButton = document.querySelector('.save');

learnersArray.forEach((learner, index) => {
    const option = document.createElement("option");

    option.textContent = `${learner.firstName} ${learner.lastName}`;
    option.value = index;

    dropdownList.appendChild(option);
});

const generateReceiptNumber = () => {
    const lastReceiptNumber = Number(localStorage.getItem("lastReceiptNumber")) || 0;

    const nextNumber = lastReceiptNumber + 1;

    localStorage.setItem("lastReceiptNumber", nextNumber);

    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `BM-${year}${month}${day}-${String(nextNumber).padStart(4, "0")}`;
};

const savePayment = (event) => {
    event.preventDefault();
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked');

    if (!paymentMethod) {
        alert("Please select a payment method.");
        return;
    }

    const selectedIndex = dropdownList.value;
    const amount = amountInput.value;
    const date = dateInput.value;
    const notes = notesInput.value;
    const checkedPaymentMethod = paymentMethod.value;

    if (selectedIndex === "") {
        alert("Please select a learner.");
        return;
    }

    const selectedLearner = learnersArray[selectedIndex];

    const receiptNumber = generateReceiptNumber();

    const payment = {
        learnerName: `${selectedLearner.firstName} ${selectedLearner.lastName}`,
        parentName: selectedLearner.parentName,
        parentPhone: selectedLearner.parentPhone,
        amount,
        date,
        notes,
        paymentMethod: checkedPaymentMethod,
        receiptNumber
    };

    savePayments(payment);

    addRecentActivity("payment_recorded", `Payment of ${amount} recorded for ${selectedLearner.firstName} ${selectedLearner.lastName}.`);

    window.location.href = "receipt.html?receiptNumber=" + receiptNumber;
}

const savePayments = (payment) => {
    const payments = JSON.parse(localStorage.getItem("payments")) || [];

    payments.push(payment);

    localStorage.setItem("payments", JSON.stringify(payments));
};

saveButton.addEventListener("click", savePayment);
