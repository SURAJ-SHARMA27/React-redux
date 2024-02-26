const form = document.getElementById("surveyForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const feedbackTextarea = document.getElementById("feedback");
const thankYou = document.getElementById("thankYou");
const displayName = document.getElementById("displayName");
const displayEmail = document.getElementById("displayEmail");
const displayFeedback = document.getElementById("displayFeedback");

form.addEventListener("submit", function(event) {
	event.preventDefault();

	thankYou.style.display = "block";
	displayName.textContent = nameInput.value;
	displayEmail.textContent = emailInput.value;
});