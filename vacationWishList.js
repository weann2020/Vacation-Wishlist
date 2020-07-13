//start the procedure when the "form" is "submitted"
document
  .getElementById("form-submit")
  .addEventListener("submit", WhatHappensWhenButtonClicked);

function WhatHappensWhenButtonClicked(event) {
  //prevent the page from being refreshed after submit
  event.preventDefault();

  //get the value of the inputs
  var destName = event.target.elements["name"].value;
  var destLocation = event.target.elements["location"].value;
  var destPhoto = event.target.elements["photo"].value;
  var destDescription = event.target.elements["description"].value;

  //use the values of inputs to create a card
  var destCard = createCard(destName, destLocation, destPhoto, destDescription);

  //put the newly created card into the card container
  document.getElementById("destination-container").appendChild(destCard);

  //clear the input and reset the form
  clearInputs(event);
}

function createCard(name, location, photoUrl, description) {
  //create a "div" as card container
  var cardContainer = document.createElement("div");
  cardContainer.setAttribute("class", "card-container");
  cardContainer.setAttribute(
    "style",
    "width:15rem; height:fit-content; margin:20px"
  );

  //create an "img" element for the card photo
  var pic = document.createElement("img");
  pic.setAttribute("class", "card-img");
  pic.setAttribute("alt", name);
  if (photoUrl.length === 0) {
    pic.setAttribute(
      "src",
      "https://best-rate-repair.com/wp-content/uploads/Vacation.jpg"
    );
  } else {
    pic.setAttribute("src", photoUrl);
  }
  cardContainer.appendChild(pic);

  //create another "div" as card body
  var cardBody = document.createElement("div");
  cardBody.setAttribute("class", "card-body");

  //create an "h4" as the card title for destination name
  var cardTitle = document.createElement("h4");
  cardTitle.setAttribute("class", "card-title");
  cardTitle.innerText = name;
  cardBody.appendChild(cardTitle);

  //create another "h5" as the card subtitle for destination location
  var cardSubTitle = document.createElement("h5");
  cardSubTitle.setAttribute("class", "card-subtitle mb-2 text-muted");
  cardSubTitle.innerText = location;
  cardBody.appendChild(cardSubTitle);

  //create a "p" as the card description box
  var descriptionText = document.createElement("p");
  descriptionText.setAttribute("class", "card-text");
  if (descriptionText.length !== 0) {
    descriptionText.innerText = description;
  } else {
    descriptionText.innerText = "No description";
  }
  cardBody.appendChild(descriptionText);

  //create another "div" as card button container
  var buttonContainer = document.createElement("div");
  buttonContainer.setAttribute("class", "buttons_container");

  //create "edit" button
  var editBtn = document.createElement("button");
  editBtn.setAttribute("class", "btn btn-warning");
  editBtn.innerText = "Edit";
  editBtn.addEventListener("click", edit);

  //create "remove" button
  var rmvBtn = document.createElement("button");
  rmvBtn.setAttribute("class", "btn btn-danger");
  rmvBtn.innerText = "Remove";
  rmvBtn.addEventListener("click", remove);

  //add buttons to card body
  buttonContainer.appendChild(editBtn);
  buttonContainer.appendChild(rmvBtn);
  cardBody.appendChild(buttonContainer);

  //add card body into card container
  cardContainer.appendChild(cardBody);

  return cardContainer;
}

function edit(event) {
  //trace the parent element of the "click" event target
  var buttonContainer = event.target.parentElement;
  var cardBody = buttonContainer.parentElement;
  var card = cardBody.parentElement;

  var title = cardBody.children[0];
  var subTitle = cardBody.children[1];
  var description = cardBody.children[2];
  var photoUrl = card.children[0];

  var newTitle = prompt("Please enter new destination");
  var newSubTitle = prompt("Please enter new location");
  var newPhotoUrl = prompt("Please enter new photo url");
  var newDescription = prompt("Please enter new description");

  //substitute data with new entries
  if (newTitle !== "") {
    title.innerText = newTitle;
  }
  if (newSubTitle !== "") {
    subTitle.innerText = newSubTitle;
  }
  if (newDescription !== "") {
    description.innerText = newDescription;
  }
  if (newPhotoUrl !== "") {
    photoUrl.setAttribute("src", newPhotoUrl);
  }
}

function remove(event) {
  //trace the parent element of the "click" event target
  var buttonContainer = event.target.parentElement;
  var cardBody = buttonContainer.parentElement;
  var card = cardBody.parentElement;
  //remove the card
  card.remove();
}

function clearInputs(event) {
  var i = 0;
  while (i < event.target.length) {
    event.target.elements[i].value = "";
    i++;
  }
}
