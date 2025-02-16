document.addEventListener("DOMContentLoaded", loadEvents);
document.getElementById("eventForm").addEventListener("submit", addEvent);

function addEvent(event) {
    event.preventDefault();

    let name = document.getElementById("eventName").value;
    let date = document.getElementById("eventDate").value;
    let time = document.getElementById("eventTime").value;
    let location = document.getElementById("eventLocation").value;

    let eventObj = { name, date, time, location };
    let events = JSON.parse(localStorage.getItem("events")) || [];

    events.push(eventObj);
    localStorage.setItem("events", JSON.stringify(events));

    displayEvent(eventObj);
    document.getElementById("eventForm").reset();
}

function loadEvents() {
    let events = JSON.parse(localStorage.getItem("events")) || [];
    events.forEach(displayEvent);
}

function displayEvent(eventObj) {
    let eventList = document.getElementById("eventList");
    let listItem = document.createElement("li");

    listItem.innerHTML = `<strong>${eventObj.name}</strong> - ${eventObj.date} at ${eventObj.time} <br> Location: ${eventObj.location} 
                          <button class="delete-btn">Delete</button>`;

    listItem.querySelector(".delete-btn").addEventListener("click", function () {
        removeEvent(eventObj, listItem);
    });

    eventList.appendChild(listItem);
}

function removeEvent(eventObj, listItem) {
    let events = JSON.parse(localStorage.getItem("events")) || [];
    events = events.filter(event => JSON.stringify(event) !== JSON.stringify(eventObj));
    localStorage.setItem("events", JSON.stringify(events));
    listItem.remove();
}
