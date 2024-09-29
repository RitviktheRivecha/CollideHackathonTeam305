// Get the button and container from HTML
const button = document.getElementById("theButton");

// Example user data
let users = [
  { id: "3442", Company: "LLN Energy", Department: "Business Development/Sales",
    Seniority: "Director/Management/Partner", role_start_at: "2024-04-01", State: "CA", City: "La Habra" },
  { id: "3445", Company: "AlphaSense", Department: "Business Development/Sales",
    Seniority: "Director/Management/Partner", role_start_at: "2023-11-01", State: "CO", City: "Evergreen" },
  { id: "3446", Company: "Arnold Operating, LLC", Department: "Engineering",
    Seniority: "C-suite/VP/Owner", role_start_at: "2024-05-01", State: "TX", City: "Tyler" }
];

function generateTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}

function generateTable(table, data) {
  let tbody = table.querySelector('tbody');
  for (let element of data) {
    let row = tbody.insertRow();
    for (let key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
}

let table = document.querySelector("table");
let userdata = Object.keys(users[0]);

generateTable(table, users);
generateTableHead(table, userdata);

// Optional: Fetching the data and displaying it on button click
button.onclick = function() {
  // Example: Sending data to the Flask API via fetch
  fetch("http://127.0.0.1:5000/receiver", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(users)
  }).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      alert("Something is wrong");
    }
  }).then(jsonResponse => {
    console.log(jsonResponse); // Handle response here
  }).catch(err => console.error(err));
};
