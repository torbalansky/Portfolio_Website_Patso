document.addEventListener("DOMContentLoaded", function () {
    var logElement = document.querySelector('.navigation__logo');
    logElement.addEventListener("click", function () {
        location.reload();
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const typedText = document.getElementById('typed-text');
    const text = "Hello there!";

    function typeText(index) {
        if (index < text.length) {
            typedText.innerHTML += text.charAt(index);
            index++;
            setTimeout(function () {
                typeText(index);
            }, 250); 
        }
    }

    typeText(0);
});


const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show')
        }
    })
})

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));


document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('contact-form');
    const submitButton = document.getElementById('submit-button');

    submitButton.addEventListener('click', function () {
        const name = document.getElementById('Name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('Message').value;

        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }

        if (!isValidEmail(email)) {
            alert('Please enter a valid e-mail address');
            return;
        }

        alert('Message sent successfully');
        form.reset(); 
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});