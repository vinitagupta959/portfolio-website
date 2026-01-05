const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-item a");
const wrapper = document.querySelector(".projects-wrapper");
const projects = document.querySelectorAll(".project-item");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");

let index = 0;

menuBtn.addEventListener("click", () => {
  navbar.classList.toggle("active");
});
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navbar.classList.remove("active");
  });
});
function updateSlide() {
  wrapper.style.transform = `translateX(-${index * 100}%)`;

  prevBtn.disabled = index === 0;
  nextBtn.disabled = index === projects.length - 1;
}
updateSlide();

nextBtn.addEventListener("click", () => {
  if (index < projects.length - 1) {
    index++;
    updateSlide();
  }
});

prevBtn.addEventListener("click", () => {
  if (index > 0) {
    index--;
    updateSlide();
  }
});

document.querySelector(".contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = this;
  const nameInput = form.querySelector('input[name="name"]');
  const emailInput = form.querySelector('input[name="email"]');
  const messageInput = form.querySelector('textarea[name="message"]');
  const successMsg = form.querySelector(".form-success");

  let isValid = true;

  
  function showError(input, message) {
    const error = input.nextElementSibling;
    error.textContent = message;
    error.style.display = "block";
    input.classList.add("error");
    isValid = false;
  }

  function clearError(input) {
    const error = input.nextElementSibling;
    error.textContent = "";
    error.style.display = "none";
    input.classList.remove("error");
  }

  [nameInput, emailInput, messageInput].forEach(clearError);
  if (nameInput.value.trim() === "") {
    showError(nameInput, "Name is required");
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailInput.value.trim() === "") {
    showError(emailInput, "Email is required");
  } else if (!emailPattern.test(emailInput.value.trim())) {
    showError(emailInput, "Enter a valid email address");
  }
  if (messageInput.value.trim() === "") {
    showError(messageInput, "Message cannot be empty");
  }

  if (!isValid) return;
  fetch(form.action, {
    method: "POST",
    body: new FormData(form),
    headers: { Accept: "application/json" }
  })
    .then(response => {
      if (response.ok) {
        successMsg.style.display = "block";
        form.reset();

        setTimeout(() => {
          successMsg.style.display = "none";
        }, 4000);
      }
    });
});
