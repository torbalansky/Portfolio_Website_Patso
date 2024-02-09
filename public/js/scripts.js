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

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const loadingSpinner = document.getElementById("loading-spinner");
  
  form.addEventListener("submit", function (event) {
    event.preventDefault(); 

    loadingSpinner.classList.remove('hide');

    const formData = new FormData(form);

    sendMail(formData);
  });

  function sendMail(formData) {
    fetch("/send", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then((data) => {
        if (data.success) {
          loadingSpinner.classList.add('hide');
          alert("Message sent successfully");
          form.reset();
        } else {
          loadingSpinner.classList.add('hide');
          alert("Failed to send email");
        }
      })
      .catch((error) => {
        console.error(error);
        loadingSpinner.classList.add('hide');
        alert("Failed to send email");
      });
  }
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
