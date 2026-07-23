const learnerIndex = localStorage.getItem('selectedLearnerIndex');
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