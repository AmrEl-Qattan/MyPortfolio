const nav = document.querySelectorAll(".nav-list li");
const cube = document.querySelector(".box");
const section = document.querySelectorAll(".section");

const resumeLists = document.querySelectorAll(".resume-list");
const resumeBox = document.querySelectorAll(".resume-box");
const portfolioLists = document.querySelectorAll(".portfolio-list");
const portfolioLBox = document.querySelectorAll(".portfolio-box");

// navbar action and all section rotating when click navbar

nav.forEach((nav, idx) => {
  nav.addEventListener("click", () => {
    document.querySelector(".nav-list li.active").classList.remove("active");
    nav.classList.add("active");

    cube.style.transform = `rotateY(${idx * -90}deg)`;

    document.querySelector(".section.active").classList.remove("active");
    section[idx].classList.add("active");

    const array = Array.from(section);
    const arrSecs = array.slice(1, -1);
    arrSecs.forEach((arrSecs) => {
      if (arrSecs.classList.contains("active")) {
        section[4].classList.add("action-contact");
      }
    });
    if (section[0].classList.contains("active")) {
      section[4].classList.remove("action-contact");
    }
  });
});

// resume section when clicking tab-list

resumeLists.forEach((list, idx) => {
  list.addEventListener("click", () => {
    document.querySelector(".resume-list.active").classList.remove("active");
    list.classList.add("active");

    document.querySelector(".resume-box.active").classList.remove("active");
    resumeBox[idx].classList.add("active");
  });
});

// portfolio section wen clicking tab-list

portfolioLists.forEach((list, idx) => {
  list.addEventListener("click", () => {
    document.querySelector(".portfolio-list.active").classList.remove("active");
    list.classList.add("active");

    document.querySelector(".portfolio-box.active").classList.remove("active");
    portfolioLBox[idx].classList.add("active");
  });
});

// visibility  for contact action when reloading

setTimeout(() => {
  section[4].classList.remove("active");
}, 1500);

// email js


function validateName() {
  const name = document.getElementById("name").value.trim();
  return name.length >= 2;
}

function validateEmail() {
  const emailInput = document.getElementById("email").value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return emailRegex.test(emailInput);
}

function validatePhone() {
  const phone = document.getElementById("phone").value.trim();
  const phoneRegex = /^\+?[0-9]{7,15}$/; // Allows optional '+' and 7 to 15 digits
  return phoneRegex.test(phone);
}

function validateSubject() {
  const subject = document.getElementById("subject").value.trim();
  return subject.length >= 5;
}

function validateMessage() {
  const message = document.getElementById("message").value.trim();
  return message.length >= 10;
}

// Send Mail Function
function sendMail(event) {
  event.preventDefault(); 

  // Reference to the submit button
  const submitButton = document.querySelector(".contact-btn .btn");
  
  // Disable the submit button and show loading state
  submitButton.disabled = true;
  submitButton.textContent = "Sending...";

  // Perform Validations
  if (!validateName()) {
    Swal.fire({
      title: 'Invalid Name!',
      html: '<span class="custom-message">Name must be at least 2 characters long.</span>',
      icon: 'error',
      
      customClass: {
        popup: 'custom-swal-popup',
        title: 'custom-swal-title',
      }
    });
    submitButton.disabled = false;
    submitButton.textContent = "Send Message";
    return;
  }

  if (!validateEmail()) {
    Swal.fire({
      title: "Invalid Email!",
      html: '<span class="custom-message">Please enter a valid email address.</span>',
      icon: "error",
    });
    submitButton.disabled = false;
    submitButton.textContent = "Send Message";
    return;
  }

  if (!validatePhone()) {
    Swal.fire({
      title: "Invalid Phone!",
      html: '<span class="custom-message">Please enter a valid phone number.</span>',
      icon: "error",
    });
    submitButton.disabled = false;
    submitButton.textContent = "Send Message";
    return;
  }

  if (!validateSubject()) {
    Swal.fire({
      title: "Invalid Subject!",
      html: '<span class="custom-message">Subject must be at least 5 characters long.</span>',
      icon: "error",
    });
    submitButton.disabled = false;
    submitButton.textContent = "Send Message";
    return;
  }

  if (!validateMessage()) {
    Swal.fire({
      title: "Invalid Message!",
      html: '<span class="custom-message">Message must be at least 10 characters long.</span>',
      icon: "error",
    });
    submitButton.disabled = false;
    submitButton.textContent = "Send Message";
    return;
  }

  // Gather Form Data
  const params = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    subject: document.getElementById("subject").value.trim(),
    message: document.getElementById("message").value.trim(),
  };

  const serviceId = "service_flcc8ja";
  const templateID  = "template_xfkjk6a";

  // Send Email via EmailJS
  emailjs.send(serviceId, templateID, params)
    .then((res) => {
      // Clear Form Fields
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("subject").value = "";
      document.getElementById("message").value = "";

      // Show Success Alert
      Swal.fire({
        title: "Good job!",
        html: '<span class="custom-message">Your Message Sent Successfully!</span>',
        icon: "success",
      });

      // Re-enable the submit button
      submitButton.disabled = false;
      submitButton.textContent = "Send Message";
    })
    .catch((err) => {
      // console.error('Failed to send message:', err);

      Swal.fire({
        title: "Error!",
        html: "<span class='custom-message'>Your Message Can't be sent!</span>",
        icon: "error",
      });

      // Re-enable the submit button
      submitButton.disabled = false;
      submitButton.textContent = "Send Message";
    });
}