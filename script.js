const navigation = document.querySelector('.navigation');
const toggleButton = document.querySelector('.menu-toggle');

toggleButton.addEventListener('click', () => {
    navigation.classList.toggle('active');
});