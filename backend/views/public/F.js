let navBtn = document.getElementById('nav-btn');
let navDiv = document.getElementById("nav-list-div");
let nav = false;
let navIcon = document.getElementById("path-icon");
// false for close
// true for open
let cancelIcon = "./211651_close_round_icon.png";
let menuIcon= "./134216_menu_lines_hamburger_icon.png";
navBtn.addEventListener("click",() => {
  if(nav == false) {
  navDiv.style.transform = "translateX(0px)";
  nav = true;
  navIcon.setAttribute("src", cancelIcon);
  } else {
    navDiv.style.transform = "translateX(-300px)";
    nav = false;
    navIcon.setAttribute("src", menuIcon);
  }
 });
let btn = document.getElementById("trackbtn");
let userip = document.getElementById("ipaddress");
let city = document.getElementById("city");
let region = document.getElementById("region");
let country = document.getElementById("country");
let postal = document.getElementById("postal");
let org = document.getElementById("org");
let loc = document.getElementById("location");
let time = document.getElementById("timezone");
let ipform = document.getElementById('ipform');
let ipinput = document.getElementById("ipinput");  // Input field for IP
let longitude;
let latitude;

let map;  // Declare map variable globally to reuse it
let marker;  // Declare marker variable globally to update it

// Function to display IP information and location on the map
async function displayIpInfo(ip) {
    let url = `https://ipinfo.io/${ip}/json`;  // Use your token if required
    let response = await fetch(url);
    let data = await response.json();
    
    if (data.loc) {
        [latitude, longitude] = data.loc.split(',');
    } else {
        alert("Location data not available for this IP address.");
        return;
    }

    // Display the information on the webpage
    userip.innerText = ` ${data.ip}`;
    city.innerText = ` ${data.city}`;
    region.innerText = ` ${data.region}`;
    country.innerText = ` ${data.country}`;
    postal.innerText = ` ${data.postal}`;
    org.innerText = ` ${data.org}`;
    loc.innerText = ` ${data.loc}`;
    time.innerText = ` ${data.timezone}`;

    // Prepopulate the input field with the user's IP
    ipinput.value = data.ip;

    // If map is not initialized, initialize it
    if (!map) {
        map = L.map('map').setView([latitude, longitude], 13);

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Add the initial marker
        marker = L.marker([latitude, longitude]).addTo(map).bindPopup('IP Location').openPopup();
    } else {
        // Update the map view to the new location
        map.setView([latitude, longitude], 13);

        // Update the marker position and popup
        marker.setLatLng([latitude, longitude])
            .bindPopup('IP Location')
            .openPopup();
    }
}

// Event listener for form submission to prevent page refresh
ipform.addEventListener("submit", async (e) => {
    e.preventDefault();
});

// Event listener for the track button to fetch IP information based on user input
btn.addEventListener("click", async () => {
    let userIpInput = ipinput.value.trim();

    if (!userIpInput) {
        alert("Please enter a valid IP address.");
        return;
    }

    // Fetch and display information for the manually entered IP
    displayIpInfo(userIpInput);
});

// Automatically fetch and display user's IP information when the page loads
window.addEventListener("load", async () => {
    let url = `https://ipinfo.io/json`;  // Use your token if required
    let response = await fetch(url);
    let data = await response.json();

    // Display the user's IP and information on page load
    displayIpInfo(data.ip);
});