// Mobile menu, "open now" badge on the café page, and the subscription summary.

(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Café hours, Eastern time. [open, close] in 24h, by day (0 = Sunday).
  var HOURS = {
    0: [8, 15],
    1: [7, 16],
    2: [7, 16],
    3: [7, 16],
    4: [7, 16],
    5: [7, 17],
    6: [8, 17]
  };

  var badge = document.querySelector("[data-open-now]");
  if (badge) {
    var parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York",
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      hour12: false
    }).formatToParts(new Date());
    var get = function (type) {
      for (var i = 0; i < parts.length; i++) if (parts[i].type === type) return parts[i].value;
      return "";
    };
    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var day = days.indexOf(get("weekday"));
    var hour = parseInt(get("hour"), 10) % 24 + parseInt(get("minute"), 10) / 60;
    var today = HOURS[day];
    if (today && hour >= today[0] && hour < today[1]) {
      badge.textContent = "Open now";
      badge.classList.add("is-open");
    } else {
      badge.textContent = "Closed right now";
    }
  }

  // Subscription builder
  var builder = document.querySelector("[data-builder]");
  if (builder) {
    var PRICE_PER_BAG = 19;
    var summary = builder.querySelector("[data-summary]");
    var update = function () {
      var bags = parseInt(builder.querySelector("input[name=bags]:checked").value, 10);
      var every = builder.querySelector("input[name=every]:checked").value;
      var grind = builder.querySelector("select[name=grind]").value;
      var total = bags * PRICE_PER_BAG;
      summary.textContent =
        bags + (bags === 1 ? " bag" : " bags") + " every " + every + ", " + grind.toLowerCase() +
        " — $" + total + " per delivery, shipping included.";
    };
    builder.addEventListener("change", update);
    update();
  }
})();
