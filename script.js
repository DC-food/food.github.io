//Food
const mealList = [
  "Spaghetti", "Makaroni", "Lasagna", "Pastitsio", "Supa", "Zelena Riza", "Kotopolo", "Burania"
];



function getMealIndex(dayOffset) {
  const startDate = new Date("2025-01-01"); // Anchor date
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + dayOffset);

  const daysPassed = Math.floor((targetDate - startDate) / (1000 * 60 * 60 * 24));
  return ((daysPassed % mealList.length) + mealList.length) % mealList.length; // Safe modulo
}


function loadMeals() {
  document.getElementById("today-meal").innerText = "Danas: " + mealList[getMealIndex(0)];
  document.getElementById("tomorrow-meal").innerText = "Sutra: " + mealList[getMealIndex(1)];
}


function showCalendar() {
  const calendarDiv = document.getElementById('calendar');

  if (calendarDiv.style.display === "block") {
    calendarDiv.style.display = "none";
  } else {
    calendarDiv.style.display = "block";

    $('#calendar').fullCalendar('destroy');
    $('#calendar').fullCalendar({
      header: {
        left: 'next today',
        center: 'title',
        right: ''
      },
      buttonText: {
        today: 'Danas'
      },
      defaultView: 'month',
      events: function(start, end, timezone, callback) {
        let events = [];

        const startDate = start.toDate();
        const endDate = end.toDate();

        for (
          let d = new Date(startDate);
          d <= endDate;
          d.setDate(d.getDate() + 1)
        ) {
          const currentDate = new Date(d); // clone date
          const daysPassed = Math.floor(
            (currentDate - new Date("2025-01-01")) / (1000 * 60 * 60 * 24)
          );
          const mealIndex = ((daysPassed % mealList.length) + mealList.length) % mealList.length;
          const meal = mealList[mealIndex];

          events.push({
            title: meal,
            start: currentDate.toISOString().slice(0, 10),
            allDay: true
          });
        }
        callback(events);
      }
    });
  }
}



window.onload = () => {
  loadMeals();
};
