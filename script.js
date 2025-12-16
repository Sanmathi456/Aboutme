// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  hamburger.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    hamburger.classList.remove("active");
  });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add scroll animation to sections
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "fadeInUp 0.6s ease-out";
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll(".section").forEach((section) => {
  observer.observe(section);
});

// Add scroll effect to navbar
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(26, 26, 46, 0.95)";
    navbar.style.backdropFilter = "blur(10px)";
  } else {
    navbar.style.background = "var(--dark-color)";
    navbar.style.backdropFilter = "none";
  }
});

// Add active class to current nav link
const sections = document.querySelectorAll(".section");
const navLinks = document.querySelectorAll(".nav-menu a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Add typing effect to hero name (optional enhancement)
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = "";

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Initialize typing effect for coding effect
window.addEventListener("load", () => {
  const codeLines = document.querySelectorAll(".code-line");
  codeLines.forEach((line, index) => {
    line.style.animation = `typing 2s steps(40) ${index * 0.3}s forwards`;
    line.style.opacity = "0";
  });
  // Rotating roles in hero tagline
  const roles = [
    "Java Developer",
    "Software Developer",
    "Java Full Stack Developer",
  ];
  const roleSpan = document.querySelector(".role-text");
  if (roleSpan) {
    let i = 0;
    setInterval(() => {
      i = (i + 1) % roles.length;
      roleSpan.textContent = roles[i];
    }, 2500);
  }

  // 3D tilt interaction for photo
  const tilt = document.querySelector(".tilt-card");
  const tiltWrap = document.querySelector(".tilt-3d");
  if (tilt && tiltWrap) {
    tiltWrap.addEventListener("mousemove", (e) => {
      const rect = tiltWrap.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateY = ((x - centerX) / centerX) * 10; // -10deg to 10deg
      const rotateX = -((y - centerY) / centerY) * 8; // -8deg to 8deg
      tilt.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateZ(12px)`;
    });
    tiltWrap.addEventListener("mouseleave", () => {
      tilt.style.transform = "rotateY(0deg) rotateX(0deg) translateZ(0)";
    });
  }
});

const toggleBtn = document.getElementById("theme-toggle");

// Load saved theme
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light-theme");
  toggleBtn.textContent = "☀️";
}

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");

  if (document.body.classList.contains("light-theme")) {
    toggleBtn.textContent = "☀️";
    localStorage.setItem("theme", "light");
  } else {
    toggleBtn.textContent = "🌙";
    localStorage.setItem("theme", "dark");
  }
});
