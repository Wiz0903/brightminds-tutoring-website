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

    const payment = {
        learnerName: `${selectedLearner.firstName} ${selectedLearner.lastName}`,
        amount,
        date,
        notes,
        paymentMethod: checkedPaymentMethod
    };

    savePayments(payment);

    window.location.href = "payments.html";
}

const savePayments = (payment) => {
    const payments = JSON.parse(localStorage.getItem("payments")) || [];

    payments.push(payment);

    localStorage.setItem("payments", JSON.stringify(payments));
};

saveButton.addEventListener("click", savePayment);