/* ==========================================================================
   Vision College Learning Centre - main script file
   Using jQuery here since that was part of the tech stack we were asked
   to use. Nothing fancy, just small touches that make the site feel nicer
   to use (this is basically what we learned in our web dev labs).
   ========================================================================== */

$(document).ready(function () {

  /* ---------- 1) Close the mobile hamburger menu after a link is clicked ----------
     Without this, if you tap "About" on a phone, the menu stays open in the
     background after the new page loads for a split second - closing it first
     just feels more polished. */
  $(".navbar-nav .nav-link").on("click", function () {
    var $navbarCollapse = $(".navbar-collapse");
    if ($navbarCollapse.hasClass("show")) {
      $navbarCollapse.collapse("hide");
    }
  });

  /* ---------- 2) Back to top button ----------
     Show the button only once the visitor has scrolled down a bit, so it's
     not just sitting there uselessly on a short page. */
  var $backToTopBtn = $("#backToTopBtn");

  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 400) {
      $backToTopBtn.fadeIn(200);
    } else {
      $backToTopBtn.fadeOut(200);
    }
  });

  $backToTopBtn.on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 500);
  });

  /* ---------- 3) Contact form validation ----------
     This project is frontend only for now (no server/database hooked up),
     so we just check the fields look sensible and then show a friendly
     "message sent" note instead of actually emailing anyone. Whoever wires
     this up to a real backend later (Laravel Herd / PHP mailer etc.) can
     swap the fake-submit part out for a real AJAX call. */
  var $contactForm = $("#contactForm");

  if ($contactForm.length) {
    $contactForm.on("submit", function (event) {
      event.preventDefault();

      var isValid = true;

      var $name = $("#contactName");
      var $email = $("#contactEmail");
      var $message = $("#contactMessage");

      // simple "did you type anything" checks
      if ($name.val().trim() === "") {
        showError($name, "Please tell us your name.");
        isValid = false;
      } else {
        hideError($name);
      }

      // fairly basic email pattern - good enough to catch obvious typos
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test($email.val().trim())) {
        showError($email, "Please enter a valid email address.");
        isValid = false;
      } else {
        hideError($email);
      }

      if ($message.val().trim() === "") {
        showError($message, "Please write a short message for us.");
        isValid = false;
      } else {
        hideError($message);
      }

      if (isValid) {
        $("#formSuccessAlert").fadeIn(300);
        $contactForm[0].reset();

        // hide the success note again after a few seconds so it doesn't
        // just sit on the page forever
        setTimeout(function () {
          $("#formSuccessAlert").fadeOut(400);
        }, 5000);
      }
    });
  }

  function showError($field, message) {
    var $errorEl = $field.next(".field-error");
    $errorEl.text(message).show();
    $field.addClass("is-invalid");
  }

  function hideError($field) {
    $field.next(".field-error").hide();
    $field.removeClass("is-invalid");
  }

});
