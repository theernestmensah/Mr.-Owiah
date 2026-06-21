// The homepage keeps only the arc preview; the complete archive lives in gallery.html.
document.querySelector(".home-page .archive")?.remove();

const revealElements = document.querySelectorAll(".reveal:not(.is-visible)");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

const memoryPhotos = [
  "viva and dad 1.jpeg",
  "WhatsApp Image 2026-06-21 at 15.42.32.jpeg",
  "WhatsApp Image 2026-06-21 at 15.42.55.jpeg",
  "WhatsApp Image 2026-06-21 at 15.43.17.jpeg",
  "WhatsApp Image 2026-06-21 at 15.43.25.jpeg",
  "WhatsApp Image 2026-06-21 at 15.43.33.jpeg",
  "WhatsApp Image 2026-06-21 at 15.44.21.jpeg",
  "WhatsApp Image 2026-06-21 at 15.46.03.jpeg",
  "WhatsApp Image 2026-06-21 at 15.46.14.jpeg",
  "WhatsApp Image 2026-06-21 at 15.46.19 (2).jpeg",
  "WhatsApp Image 2026-06-21 at 15.46.19 (3).jpeg",
  "WhatsApp Image 2026-06-21 at 15.46.19.jpeg",
  "WhatsApp Image 2026-06-21 at 15.46.22 (1).jpeg",
  "WhatsApp Image 2026-06-21 at 15.46.22 (2).jpeg",
  "WhatsApp Image 2026-06-21 at 15.46.22.jpeg",
  "WhatsApp Image 2026-06-21 at 15.46.23 (1).jpeg",
  "WhatsApp Image 2026-06-21 at 15.46.23 (2).jpeg",
  "WhatsApp Image 2026-06-21 at 15.46.24 (1).jpeg",
  "WhatsApp Image 2026-06-21 at 15.46.24 (2).jpeg",
  "WhatsApp Image 2026-06-21 at 15.46.24 (3).jpeg",
  "WhatsApp Image 2026-06-21 at 15.46.24.jpeg",
  "WhatsApp Image 2026-06-21 at 15.46.25 (1).jpeg",
  "WhatsApp Image 2026-06-21 at 15.55.39.jpeg",
  "WhatsApp Image 2026-06-21 at 15.58.20.jpeg",
  "WhatsApp Image 2026-06-21 at 16.05.34.jpeg",
  "WhatsApp Image 2026-06-21 at 16.22.34.jpeg",
  "WhatsApp Image 2026-06-21 at 16.26.13.jpeg",
  "WhatsApp Image 2026-06-21 at 16.31.26.jpeg",
  "WhatsApp Image 2026-06-21 at 16.38.21 (1).jpeg",
  "WhatsApp Image 2026-06-21 at 16.38.21 (2).jpeg",
  "WhatsApp Image 2026-06-21 at 16.38.21.jpeg",
  "WhatsApp Image 2026-06-21 at 16.38.22 (1).jpeg",
  "WhatsApp Image 2026-06-21 at 16.38.22 (2).jpeg",
  "WhatsApp Image 2026-06-21 at 16.38.22 (3).jpeg",
  "WhatsApp Image 2026-06-21 at 16.38.22.jpeg",
];

const rotatedPhotos = new Set([
  "WhatsApp Image 2026-06-21 at 15.43.17.jpeg",
  "WhatsApp Image 2026-06-21 at 15.46.24 (2).jpeg",
]);

const galleryArc = document.querySelector("#galleryArc");
const arcPreviewPhotos = [
  "assets/stephen and dad.jpeg",
  "assets/WhatsApp Image 2026-06-21 at 15.43.25.jpeg",
  "assets/kukua and dad.jpeg",
  "assets/WhatsApp Image 2026-06-21 at 15.42.47.jpeg",
  "assets/viva and dad.jpeg",
  "assets/WhatsApp Image 2026-06-21 at 15.42.19.jpeg",
  "assets/mum and dad.jpeg",
  "assets/WhatsApp Image 2026-06-21 at 15.44.21.jpeg",
  "assets/ebo and dad.jpeg",
  "assets/WhatsApp Image 2026-06-21 at 15.58.20.jpeg",
  "assets/WhatsApp Image 2026-06-21 at 16.05.34.jpeg",
];

if (galleryArc) {
  const arcCards = arcPreviewPhotos.map((source, index) => {
    const frame = document.createElement("div");
    const image = document.createElement("img");

    frame.className = "gallery-portal__memory";
    frame.style.setProperty("--delay", `${120 + index * 75}ms`);
    image.src = source;
    image.alt = "";
    image.draggable = false;
    frame.appendChild(image);
    galleryArc.appendChild(frame);
    return frame;
  });

  const layoutGalleryArc = () => {
    const width = window.innerWidth;
    const radius = width < 640 ? Math.min(270, width * 0.7) : width < 1024 ? 380 : Math.min(560, width * 0.42);
    const cardSize = width < 640 ? Math.max(68, width * 0.2) : width < 1024 ? 104 : 132;
    const startAngle = 20;
    const endAngle = 160;
    const step = (endAngle - startAngle) / Math.max(arcCards.length - 1, 1);
    const centerIndex = (arcCards.length - 1) / 2;

    galleryArc.parentElement?.style.setProperty("--arc-radius", `${radius}px`);
    galleryArc.parentElement?.style.setProperty("--arc-card", `${cardSize}px`);

    arcCards.forEach((card, index) => {
      const angle = startAngle + step * index;
      const radians = (angle * Math.PI) / 180;
      const x = Math.cos(radians) * radius;
      const y = Math.sin(radians) * radius;
      const rotation = (angle - 90) * 0.075;

      card.style.setProperty("--x", `${x}px`);
      card.style.setProperty("--y", `${y}px`);
      card.style.setProperty("--rotation", `${rotation}deg`);
      card.style.setProperty("--z", `${20 - Math.abs(index - centerIndex)}`);
    });
  };

  let arcResizeFrame;
  layoutGalleryArc();
  window.addEventListener("resize", () => {
    window.cancelAnimationFrame(arcResizeFrame);
    arcResizeFrame = window.requestAnimationFrame(layoutGalleryArc);
  });
}

const memoryReel = document.querySelector("#memoryReel");
const lightbox = document.querySelector("#photoLightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const lightboxCaption = document.querySelector("#lightboxCaption");
const archiveToggle = document.querySelector("#archiveToggle");
const archiveStatus = document.querySelector("#archiveStatus");
const archivePreviewCount = Math.min(12, memoryPhotos.length);
const isGalleryPage = document.body.classList.contains("gallery-page");

if (memoryReel && isGalleryPage) memoryPhotos.forEach((filename, index) => {
  const source = `assets/${filename}`;
  const label = `Archive photograph ${index + 1} of ${memoryPhotos.length}`;
  const button = document.createElement("button");
  const image = document.createElement("img");

  button.className = "archive-item";
  button.dataset.plate = `PLATE ${String(index + 4).padStart(3, "0")}`;
  button.classList.toggle("archive-item--concealed", index >= archivePreviewCount);
  button.classList.toggle("is-rotated", rotatedPhotos.has(filename));
  button.type = "button";
  button.setAttribute("aria-label", `Open ${label.toLowerCase()}`);
  image.src = source;
  image.alt = label;
  image.loading = "lazy";
  image.decoding = "async";
  button.appendChild(image);

  button.addEventListener("click", () => {
    if (!lightbox || !lightboxImage || !lightboxCaption) return;
    lightboxImage.src = source;
    lightboxImage.alt = label;
    lightboxImage.classList.toggle("is-rotated", rotatedPhotos.has(filename));
    lightboxCaption.textContent = label;
    lightbox.showModal();
  });

  memoryReel.appendChild(button);
});

if (archiveStatus) {
  archiveStatus.textContent = `${archivePreviewCount} photographs on view`;
}

archiveToggle?.addEventListener("click", () => {
  const expanded = archiveToggle.getAttribute("aria-expanded") === "true";
  const nextState = !expanded;
  const label = archiveToggle.querySelector("span");

  archiveToggle.setAttribute("aria-expanded", String(nextState));
  memoryReel?.classList.toggle("is-expanded", nextState);
  if (label) label.textContent = nextState ? "Close the full archive" : "Enter the full archive";
  if (archiveStatus) {
    archiveStatus.textContent = nextState
      ? `${memoryPhotos.length} photographs on view`
      : `${archivePreviewCount} photographs on view`;
  }
});

document.querySelector("#lightboxClose")?.addEventListener("click", () => lightbox?.close());

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});

const heartButton = document.querySelector("#heartButton");
const heartLayer = document.querySelector("#heartLayer");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

heartButton?.addEventListener("click", () => {
  const totalHearts = reduceMotion.matches ? 4 : 20;
  const colors = ["#c94f55", "#d6a950", "#e98787", "#f0c975", "#28584b"];

  for (let index = 0; index < totalHearts; index += 1) {
    window.setTimeout(() => {
      const heart = document.createElement("span");
      heart.className = "floating-heart";
      heart.textContent = index % 4 === 0 ? "♥" : "❤";
      heart.style.left = `${8 + Math.random() * 84}%`;
      heart.style.setProperty("--heart-size", `${0.85 + Math.random() * 1.3}rem`);
      heart.style.setProperty("--heart-color", colors[index % colors.length]);
      heart.style.setProperty("--duration", `${3.5 + Math.random() * 2}s`);
      heart.style.setProperty("--drift", `${-70 + Math.random() * 140}px`);
      heart.style.setProperty("--spin", `${-50 + Math.random() * 100}deg`);
      heartLayer.appendChild(heart);

      heart.addEventListener("animationend", () => heart.remove());
    }, index * 55);
  }
});
