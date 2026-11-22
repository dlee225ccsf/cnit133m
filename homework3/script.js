document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });

  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      alert('Thank you! Your message has been received.');
      form.reset();
    });
  }

  const statusText = document.getElementById('locationStatus');
  const latitudeEl = document.getElementById('latitude');
  const longitudeEl = document.getElementById('longitude');
  const mapEl = document.getElementById('map');

  if (statusText && latitudeEl && longitudeEl && mapEl) {
    if (!navigator.geolocation) {
      statusText.textContent = 'Geolocation is not supported by this browser.';
      return;
    }

    statusText.textContent = 'Locating you...';

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        latitudeEl.textContent = latitude.toFixed(6);
        longitudeEl.textContent = longitude.toFixed(6);
        statusText.textContent = 'Your current location was found successfully.';

        const map = L.map('map').setView([latitude, longitude], 12);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);
        L.marker([latitude, longitude]).addTo(map).bindPopup('You are here.').openPopup();
      },
      () => {
        statusText.textContent = 'Unable to access your location. Please allow location access and try again.';
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }
});
