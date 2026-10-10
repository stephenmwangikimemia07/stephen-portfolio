// ==============================
// STEPHEN'S PORTFOLIO
// Website functionality
// ==============================

document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");
    const yearElement = document.getElementById("year");
    const contactForm = document.getElementById("contact-form");
    const formNote = document.getElementById("form-note");

    // Update the copyright year
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Open and close the mobile navigation
    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function () {
            const isOpen = navLinks.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );
            menuToggle.textContent = isOpen ? "✕" : "☰";
        });

        // Close the mobile menu after selecting a link
        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navLinks.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation menu");
                menuToggle.textContent = "☰";
            });
        });
    }

    // Highlight the navigation link for the visible section
    const sections = document.querySelectorAll("main section[id]");
    const sectionLinks = document.querySelectorAll(
        '.nav-links a[href^="#"]'
    );

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        const sectionId = entry.target.id;

                        sectionLinks.forEach(function (link) {
                            const isActive =
                                link.getAttribute("href") === "#" + sectionId;

                            link.classList.toggle("active", isActive);
                        });
                    }
                });
            },
            {
                rootMargin: "-25% 0px -60% 0px"
            }
        );

        sections.forEach(function (section) {
            observer.observe(section);
        });
    }

    // Contact form: prepare an email in the visitor's email application
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();

            if (!name || !email || !message) {
                formNote.textContent = "Please complete all the fields.";
                return;
            }

            // Replace this with your own email address
            const ownerEmail = "your-email@example.com";

            if (ownerEmail === "your-email@example.com") {
                formNote.textContent =
                    "The form is ready! Open script.js and replace " +
                    '"your-email@example.com" with your own email address.';
                return;
            }

            const subject = encodeURIComponent(
                "Portfolio message from " + name
            );

            const body = encodeURIComponent(
                "Name: " + name +
                "\nEmail: " + email +
                "\n\nMessage:\n" + message
            );

            const mailtoLink =
                "mailto:" + ownerEmail +
                "?subject=" + subject +
                "&body=" + body;

            window.location.href = mailtoLink;
        });
    }
});