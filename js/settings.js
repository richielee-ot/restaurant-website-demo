(function () {
  var homeField = document.getElementById("home-snippet");
  var reservationsField = document.getElementById("reservations-snippet");
  var statusEl = document.getElementById("status");

  function setStatus(message) {
    statusEl.textContent = message;
  }

  function fillFields() {
    homeField.value = Restref.get("home");
    reservationsField.value = Restref.get("reservations");
  }

  document.getElementById("home-form").addEventListener("submit", function (event) {
    event.preventDefault();
    var html = homeField.value.trim();
    if (!html) {
      setStatus("Add a Home Page Widget snippet first.");
      return;
    }
    Restref.set("home", html);
    window.location.reload();
  });

  document.getElementById("reservations-form").addEventListener("submit", function (event) {
    event.preventDefault();
    var html = reservationsField.value.trim();
    if (!html) {
      setStatus("Add a Reservation Page Widget snippet first.");
      return;
    }
    Restref.set("reservations", html);
    setStatus("Saved. The reservations page body now uses this embedded snippet.");
  });

  document.getElementById("home-reset").addEventListener("click", function () {
    homeField.value = Restref.reset("home");
    window.location.reload();
  });

  document.getElementById("reservations-reset").addEventListener("click", function () {
    reservationsField.value = Restref.reset("reservations");
    setStatus("Reset Reservation Page Widget to the default embedded snippet.");
  });

  document.getElementById("home-copy").addEventListener("click", function () {
    navigator.clipboard.writeText(homeField.value).then(
      function () {
        setStatus("Copied Home Page Widget snippet.");
      },
      function () {
        setStatus("Copy failed. Select the Home snippet and copy it manually.");
      }
    );
  });

  document.getElementById("reservations-copy").addEventListener("click", function () {
    navigator.clipboard.writeText(reservationsField.value).then(
      function () {
        setStatus("Copied Reservation Page Widget snippet.");
      },
      function () {
        setStatus("Copy failed. Select the Reservations snippet and copy it manually.");
      }
    );
  });

  fillFields();
})();
