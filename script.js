const form = document.getElementById("bookingForm");
const bookingsList = document.getElementById("bookingsList");

// Explicitly get input fields (prevents undefined issue)
const restaurantInput = document.getElementById("restaurant");
const nameInput = document.getElementById("name");
const guestsInput = document.getElementById("guests");
const dateInput = document.getElementById("date");
const timeInput = document.getElementById("time");

let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

function displayBookings() {
  bookingsList.innerHTML = "";

  if (bookings.length === 0) {
    bookingsList.innerHTML = "<p>No bookings yet.</p>";
    return;
  }

  bookings.forEach((booking, index) => {
    const div = document.createElement("div");
    div.classList.add("booking-item");

    div.innerHTML = `
      <strong>${booking.restaurant}</strong><br>
      Name: ${booking.name}<br>
      Guests: ${booking.guests}<br>
      Date: ${booking.date}<br>
      Time: ${booking.time}
      <br><button onclick="deleteBooking(${index})">Cancel</button>
    `;

    bookingsList.appendChild(div);
  });
}

function saveBookings() {
  localStorage.setItem("bookings", JSON.stringify(bookings));
}

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const booking = {
    restaurant: restaurantInput.value,
    name: nameInput.value,
    guests: guestsInput.value,
    date: dateInput.value,
    time: timeInput.value
  };

  bookings.push(booking);
  saveBookings();
  displayBookings();
  form.reset();
});

function deleteBooking(index) {
  bookings.splice(index, 1);
  saveBookings();
  displayBookings();
}

// Load bookings on page load
displayBookings();
