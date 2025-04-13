// Define mealList
const mealList = [
    "Spaghetti", "Tacos", "Grilled Chicken", "Fried Rice", "Burgers", "Salmon with Veggies", "Vegetable Stir Fry"
  ];
  
  function getMealIndex(dayOffset) {
    const startDate = new Date("2025-01-01"); // Anchor date
    const today = new Date();
    today.setDate(today.getDate() + dayOffset);
  
    const daysPassed = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
    return daysPassed % mealList.length;
  }
  
  function loadMeals() {
    document.getElementById("today-meal").innerText = "Today: " + mealList[getMealIndex(0)];
    document.getElementById("tomorrow-meal").innerText = "Tomorrow: " + mealList[getMealIndex(1)];
  }
  
  function showCalendar() {
    const calendarDiv = document.getElementById('calendar');
  
    // Check if on
    if (calendarDiv.style.display === "block") {
      // If Visable Hide
      calendarDiv.style.display = "none";
    } else {
      // If Hidden Show
      calendarDiv.style.display = "block";
  
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth(); // 0-based
  
      $('#calendar').fullCalendar({
        header: {
          left: 'next today', // Keep navigation buttons
          center: 'title', // Title is shown in the center
          right: '' // Remove Week/Day
        },
        buttonText: {
            today: 'Today'
        },
        defaultView: 'month', // Only Month
        events: function(start, end, timezone, callback) {
          let events = [];
  
          const daysInMonth = new Date(year, month + 1, 0).getDate();
          for (let day = 1; day <= daysInMonth; day++) {
            const currentDate = new Date(year, month, day);
            const meal = mealList[getMealIndex(day - now.getDate())];
  
            events.push({
              title: meal,
              start: new Date(year, month, day).toISOString(),
              allDay: true
            });
          }
          callback(events);
        }
      });
    }
  }
  
  window.onload = loadMeals;