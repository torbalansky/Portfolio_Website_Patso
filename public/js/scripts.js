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
