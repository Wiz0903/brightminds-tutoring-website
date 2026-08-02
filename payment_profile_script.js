const paymentIndex = localStorage.getItem('selectedPaymentIndex');
const payments = localStorage.getItem('payments');
const paymentsArray = JSON.parse(payments);
const selectedPayment = paymentsArray[paymentIndex];

const paymentName = document.querySelector(".payment-name");
const paymentAmount = document.querySelector(".payment-amount");
const paymentDate = document.querySelector(".payment-date");
const paymentMethodElement = document.querySelector(".payment-method");
const paymentNotes = document.querySelector(".payment-notes");

paymentName.textContent = `${selectedPayment.learnerName}`;
paymentAmount.textContent = `R${Number(selectedPayment.amount).toFixed(2)}`;
paymentDate.textContent = selectedPayment.date;
paymentMethodElement.textContent = selectedPayment.paymentMethod;
paymentNotes.textContent = selectedPayment.notes.trim() || "No notes provided.";

const backButton = document.querySelector(".back-button");

backButton.addEventListener('click', () => {
    window.location.href = "payments.html";
});