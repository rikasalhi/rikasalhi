document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("page-loaded");

  const pageLinks = document.querySelectorAll(".page-link");

  pageLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const destination = link.href;

      document.body.classList.remove("page-loaded");
      document.body.classList.add("page-leaving");

      window.setTimeout(() => {
        window.location.href = destination;
      }, 300);
    });
  });

  const galleryImages = document.querySelectorAll(".gallery-image");

  const imageObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  galleryImages.forEach((image) => {
    imageObserver.observe(image);
  });

  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const closeButton = document.querySelector(".lightbox-close");

  function openLightbox(image) {
    if (!lightbox || !lightboxImage) {
      return;
    }

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightbox.classList.add("open");
    document.body.classList.add("lightbox-open");
  }

  function closeLightbox() {
    if (!lightbox || !lightboxImage) {
      return;
    }

    lightbox.classList.remove("open");
    document.body.classList.remove("lightbox-open");
    lightboxImage.src = "";
  }

  galleryImages.forEach((image) => {
    image.addEventListener("click", () => {
      openLightbox(image);
    });
  });

  if (closeButton) {
    closeButton.addEventListener("click", closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLightbox();
    }
  });
});