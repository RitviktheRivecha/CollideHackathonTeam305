//create initial table of user information
let users = [
  { id: "3442", Company: "LLN Energy", Department: "Business Development/Sales",
    Seniority: "Director/Management/Partner", role_start_at: "2024-04-01", State: "CA", City: "La Habra", usertext: "Most Californians aren't fond of oil drilling, which is why I hope to change their negative perception through social media outreach" },
  { id: "3445", Company: "AlphaSense", Department: "Business Development/Sales",
    Seniority: "Director/Management/Partner", role_start_at: "2023-11-01", State: "CO", City: "Evergreen", usertext: "I am proud to announce a new project working with the state government of Colorado to develop eco-friendly energy solutions!" },
  { id: "3446", Company: "Arnold Operating, LLC", Department: "Engineering",
    Seniority: "C-suite/VP/Owner", role_start_at: "2024-05-01", State: "TX", City: "Tyler", usertext: "There was a 5.1 earthquake yesterday in Martin County, and it got me thinking. I wonder if anyone has done any study of quakes affecting well production?" }
];

// Function to create links for each user
function generateUserLinks() {
  const userLinksDiv = document.getElementById("userLinks");
  userLinksDiv.innerHTML = ""; // Clear previous content
  users.forEach((user) => {
    const userLink = document.createElement("a");
    userLink.href = `?user=${user.id}`; // Use query parameter to navigate
    userLink.textContent = `View Description for User ${user.id}`;
    userLink.onclick = function(event) {
      event.preventDefault();
      displayUserDescription(user.id);
    };
    userLinksDiv.appendChild(userLink);
    userLinksDiv.appendChild(document.createElement("br"));
  });
}

// Function to get URL query parameter
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Function to display the description of the user and hide the main page
function displayUserDescription(userId) {
  const user = users.find(u => u.id === userId);
  if (user) {
    // Hide the main page content
    document.getElementById("mainPage").style.display = "none";

    // Show the user description section
    document.getElementById("userDescriptionSection").style.display = "block";

    // Send a request to generate a blurb for the user on the first visit
    fetch("http://127.0.0.1:5000/receiver", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify([user])  // Send the user data
    }).then(res => res.json())
      .then(blurbs => {
        const userDescriptionDiv = document.getElementById("userDescription");
        userDescriptionDiv.innerHTML = `
          <p>${blurbs[0]}</p>
          <p>User's Posts/Comments: ${user.usertext || "No posts or comments yet."}</p>
          <textarea id="newComment" placeholder="Add a post/comment"></textarea><br>
          <button id="addCommentButton">Add Post/Comment</button>
        `;

        // Event listener for the Add Comment button
        document.getElementById("addCommentButton").onclick = function () {
          const newComment = document.getElementById("newComment").value;
          if (newComment) {
            // Append the new comment to the user's existing text
            user.usertext = user.usertext ? user.usertext + " " + newComment : newComment;

            // Regenerate the blurb based on the updated user profile and text
            fetch("http://127.0.0.1:5000/receiver", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify([user])  // Send the updated user data to the backend
            }).then(res => res.json())
              .then(blurbs => {
                userDescriptionDiv.innerHTML = `
                  <p>${blurbs[0]}</p>
                  <p>User's Posts/Comments: ${user.usertext}</p>
                  <textarea id="newComment" placeholder="Add another post/comment"></textarea><br>
                  <button id="addCommentButton">Add Post/Comment</button>
                `;
              }).catch(err => console.error(err));
          }
        };
      }).catch(err => console.error(err));
  }
}

// Function to show the main page and hide the description
function showMainPage() {
  document.getElementById("mainPage").style.display = "block";
  document.getElementById("userDescriptionSection").style.display = "none";
}

// Bind the back button to show the main page
document.getElementById("backButton").onclick = showMainPage;

// Function to handle the creation of a new user
function addUser() {
  const newUser = {
    id: document.getElementById("id").value,
    Company: document.getElementById("company").value,
    Department: document.getElementById("department").value,
    Seniority: document.getElementById("seniority").value,
    role_start_at: document.getElementById("role_start_at").value,
    State: document.getElementById("state").value,
    City: document.getElementById("city").value,
    usertext: document.getElementById("usertext").value // Capture user's text input
  };

  // Add the new user to the users array
  users.push(newUser);

  // Regenerate the user links with the newly added user
  generateUserLinks();

  // Clear the form
  document.getElementById("userForm").reset();
}

// Bind the add user button to the addUser function
document.getElementById("addUserButton").onclick = addUser;

// Generate user links on page load and display description if user is in URL
window.onload = function() {
  generateUserLinks();
  const userId = getQueryParam("user");
  if (userId) {
    displayUserDescription(userId);
  }
};
