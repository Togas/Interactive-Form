//select first textfield
document.getElementById("name").select();

//hides initially other job textfield
const $other = $("#title option").eq(-1);
$("#other-title").hide();
let otherJobTextarea = false;

//Tshirt setup
const design1 = "Theme - JS Puns";
const design2 = "Theme - I ♥ JS";
const shirtColors = document.querySelector("#color").children;
const $shirtColors = $("#color").children();
$shirtColors.hide();
const option = document.createElement("option");
option.textContent = "Please select a T-Shirt Design";
option.selected = true;
document.querySelector("#color").appendChild(option);

//activities setup
const activities = document.querySelector(".activities");
const checkBoxLabels = document.querySelectorAll(".activities label");
const checkBoxes = document.querySelectorAll(".activities input");
const costMarker = document.createElement("p");

//payment setup: preselect credit-card and hide
//information about other payment methods
const $paymentOptions = $("#payment option");
$("fieldset")
  .last()
  .children()
  .eq(-1)
  .hide();
$("fieldset")
  .last()
  .children()
  .eq(-2)
  .hide();
$paymentOptions.eq(0).hide();
document.querySelectorAll("#payment option")[1].setAttribute("selected", true);

//validation
$("#name").prop("required", true);
$("#mail").prop("required", true);

//creates validation errors

let creditCardError = false;
let zipError = false;
let cvvError = false;
const failedValidationName = document.createElement('p');
const failedValidationCreditCard = document.createElement("p");
const failedValidationEmail = document.createElement("p");
const failedValidationCheckbox = document.createElement("p");
const failedValidationZip = document.createElement("p");
const failedValidationCvv = document.createElement("p");

failedValidationName.textContent='You must enter a name';
failedValidationEmail.textContent = "wrong e-mail format";
failedValidationCheckbox.textContent =
  "you have to at least select one activity";
failedValidationName.style.backgroundColor = "#FF7979";
failedValidationEmail.style.backgroundColor = "#FF7979";
failedValidationCheckbox.style.backgroundColor = "#FF7979";
failedValidationName.style.border = "1px solid grey";
failedValidationCheckbox.style.border = "1px solid grey";
failedValidationName.style.border = "1px solid grey";

$(failedValidationName).insertAfter($("#name"));
$(failedValidationEmail).insertAfter($("#mail"));
activities.appendChild(failedValidationCheckbox);
$(failedValidationName).hide();
$(failedValidationEmail).hide();
$(failedValidationCheckbox).hide();

//calculates the costs of selected activities
const calculateCostOfActivities = () => {
  let activitiesCounter = 0;
  for (let i = 0; i < checkBoxes.length; i++) {
    if (checkBoxes[i].checked) {
      activitiesCounter++;
    }
  }
  return (activitiesCounter = activitiesCounter * 100 + "$");
};

//checks for valid e-mail
const checkMail = email => {
  const emailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return emailRegex.test(email);
};

//checks that at least one checkbox is selected
const validateCheckboxes = () => {
  for (var i = 0; i < checkBoxes.length; i++) {
    if (checkBoxes[i].checked) {
      return true;
    }
  }
  return false;
};

//checks cardNumber
const checkCardNumber = cardNumber => {
  const cardNumberRegex = /^[0-9]{13,16}$/;
  if (cardNumberRegex.test(cardNumber) == false) {
    if (creditCardError == false) {
      failedValidationCreditCard.textContent =
        "Thats not a valid credit card number";
      failedValidationCreditCard.style.backgroundColor = "#FF7979";
      failedValidationCreditCard.style.border = "1px solid grey";
      $(failedValidationCreditCard).hide();
      $(failedValidationCreditCard).insertAfter($("#cc-num"));
      $(failedValidationCreditCard).slideDown(1000);
      creditCardError = true;
    }
  } else {
    $(failedValidationCreditCard).slideUp(1000);
    creditCardError = false;
  }
};

//checks zip code
const checkZip = zipCode => {
  const zipRegex = /^[0-9]{5}$/;
  if (zipRegex.test(zipCode) == false) {
    if (zipError == false) {
      failedValidationZip.textContent = "Thats not a valid Zip Code";
      failedValidationZip.style.backgroundColor = "#FF7979";
      failedValidationZip.style.border = "1px solid grey";
      $(failedValidationZip).hide();
      $(failedValidationZip).insertAfter($("#zip"));
      $(failedValidationZip).slideDown(1000);
      zipError = true;
    }
  } else {
    $(failedValidationZip).slideUp(1000);
    zipError = false;
  }
};

//checks CVV number
const checkCvv = cvvNumber => {
  const cvvRegex = /^[0-9]{3}$/;
  if (cvvRegex.test(cvvNumber) == false) {
    if (cvvError == false) {
      failedValidationCvv.textContent = "Thats not a valid CVV number";
      failedValidationCvv.style.backgroundColor = "#FF7979";
      failedValidationCvv.style.border = "1px solid grey";
      $(failedValidationCvv).hide();
      $(failedValidationCvv).insertAfter($("#cvv"));
      $(failedValidationCvv).slideDown(1000);
      cvvError = true;
    }
  } else {
    $(failedValidationCvv).slideUp(1000);
    cvvError = false;
  }
};

//event listener for change/select job title
$("#title").change(function() {
  if (otherJobTextarea) {
    $("#other-title").hide();
    otherJobTextarea = false;
  }
  if ($("#title option:selected").text() == $other.text()) {
    if (otherJobTextarea == false) {
      $("#other-title").show();
      otherJobTextarea = true;
    }
  }
});

// event listener for change/select TShirt Design. Note:I can select the elements also
// with regex
$("#design").change(function() {
  for (let i = 0; i < shirtColors.length; i++) {
    if (shirtColors[i].textContent == "Please select a T-Shirt Design") {
      console.log("deleted");
      document.querySelector("#color").removeChild(shirtColors[i]);
    }
  }

  if ($("#design option:selected").text() == design2) {
    if (shirtColors[0].hasAttribute("selected")) {
      shirtColors[0].setAttribute("selected", false);
    }
    shirtColors[0].style.display = "none";
    shirtColors[3].setAttribute("selected", true);
    shirtColors[1].style.display = "none";
    shirtColors[2].style.display = "none";
    shirtColors[3].style.display = "";
    shirtColors[4].style.display = "";
    shirtColors[5].style.display = "";
  } else if ($("#design option:selected").text() == design1) {
    if (shirtColors[3].hasAttribute("selected")) {
      shirtColors[3].setAttribute("selected", false);
    }
    shirtColors[0].style.display = "";
    shirtColors[1].style.display = "";
    shirtColors[2].style.display = "";
    shirtColors[3].style.display = "none";
    shirtColors[0].setAttribute("selected", true);
    shirtColors[4].style.display = "none";
    shirtColors[5].style.display = "none";
  }
});

//event listener for changing activities(events at the same time get crossed out)
activities.addEventListener("change", e => {
  if ($(failedValidationCheckbox).is(":visible")) {
    $(failedValidationCheckbox).slideUp(1000);
  }
  for (let i = 0; i < checkBoxLabels.length; i++) {
    const resetCheckbox = () => {
      checkBoxLabels[i].style.color = "";
      checkBoxLabels[i].style.textDecoration = "";
      checkBoxes[i].disabled = false;
    };
    const text = checkBoxLabels[i].textContent.toString().split("—");
    const date = text[1];
    const onlyDate = date.split(",");

    let dateRegex = new RegExp(onlyDate[0]);

    if (e.target.getAttribute("name") == checkBoxes[i].getAttribute("name")) {
      continue;
    }

    if (e.target.nextSibling.textContent.match(dateRegex) != null) {
      if (checkBoxes[i].disabled) {
        resetCheckbox();
      } else {
        checkBoxes[i].disabled = true;
        checkBoxLabels[i].style.color = "grey";
        checkBoxLabels[i].style.textDecoration = "line-through";
      }
    }
  }
  costMarker.innerHTML = `costs for your selected activities: ${calculateCostOfActivities()}`;
  activities.appendChild(costMarker);
});

//event listener for change in payment
$("#payment").change(function() {
  if ($(this).val() == "paypal") {
    $("#credit-card").hide();
    $("fieldset")
      .last()
      .children()
      .eq(-2)
      .show();
    $("fieldset")
      .last()
      .children()
      .eq(-1)
      .hide();
  } else if ($(this).val() == "bitcoin") {
    $("#credit-card").hide();
    $("fieldset")
      .last()
      .children()
      .eq(-1)
      .show();
    $("fieldset")
      .last()
      .children()
      .eq(-2)
      .hide();
  } else {
    $("#credit-card").show();
    $("fieldset")
      .last()
      .children()
      .eq(-1)
      .hide();
    $("fieldset")
      .last()
      .children()
      .eq(-2)
      .hide();
  }
});

//submit button event listener and error display if validation fails
$("button").click(function(e) {
  if ($("#payment option:selected").html() == 'Credit Card') {
      checkCardNumber($("#cc-num").val());
      checkZip($("#zip").val());
      checkCvv($("#cvv").val());
    if (creditCardError) {
      window.scrollTo(0, 1000);
      e.preventDefault();
    }
    if (zipError) {
        window.scrollTo(0, 1000);
      $(failedValidationZip).slideDown(1500);
      e.preventDefault();
    }
    if ( cvvError) {
      window.scrollTo(0, 1000);
      $(failedValidationCvv).slideDown(1500);
      e.preventDefault();
    }
  } 

  if (validateCheckboxes() == false) {
    window.scrollTo(0, 500);
    $(failedValidationCheckbox).slideDown(1500);
    e.preventDefault();
  }
  if($('#name').val()==''){
      window.scrollTo(0,0);
      $(failedValidationName).slideDown(1500);
  }
  if (checkMail($("#mail").val()) == false) {
    window.scrollTo(0, 0);
    $(failedValidationEmail).slideDown(1500);
    if ($("#mail").val() == "") {
      $("#mail")
        .next()
        .html("Please enter your e-mail address");
    } else {
      $("#mail")
        .next()
        .html("Your e-mail was not in the right format");
    }
    e.preventDefault();
  }
});

//event listener to close errors if you click into or select the right number format
$("#name").click(function(e) {
  if ($(failedValidationName).is(":visible")) {
    $(failedValidationName).slideUp(1000);
  }
});
$("#mail").click(function(e) {
  if ($(failedValidationEmail).is(":visible")) {
    $(failedValidationEmail).slideUp(1000);
  }
});
if ($paymentOptions.eq(1)){
$("#cc-num").on("input", function() {
  checkCardNumber($("#cc-num").val());
});

$("#zip").on("input", function() {
  checkZip($("#zip").val());
});

$("#cvv").on("input", function() {
  checkCvv($("#cvv").val());
});
}
