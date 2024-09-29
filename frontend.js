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
  tbody.innerHTML = ""; // Clear previous data before adding new rows
  for (let element of data) {
    let row = tbody.insertRow();
    for (let key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
}

// Initial table generation
let table = document.querySelector("table");
let userdata = Object.keys(users[0]);
generateTable(table, users);
generateTableHead(table, userdata);

// Add new user data from form
document.getElementById("addUserButton").onclick = function() {
  console.log("button clicked")
  let newUser = {
    id: document.getElementById("id").value,
    Company: document.getElementById("company").value,
    Department: document.getElementById("department").value,
    Seniority: document.getElementById("seniority").value,
    role_start_at: document.getElementById("role_start_at").value,
    State: document.getElementById("state").value,
    City: document.getElementById("city").value
  };
  console.log(newUser);
    // Add new user to users array
  users.push(newUser);

  // Regenerate the table with updated data
  generateTable(table, users);

  // Optionally, clear form fields after submission
  document.getElementById("userForm").reset();
};
