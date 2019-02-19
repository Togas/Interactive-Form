//initial setup
document.getElementById("name").select();
const $other = $("#title option").eq(-1);
$("#other-title").hide();
let otherJobTextarea = false;

//Tshirt setup
const design1 = "Theme - JS Puns";
const design2 = "Theme - I ♥ JS";
const shirtColors = document.querySelector("#color").children;
const $shirtColors = $("#color").children();

//activities setup
const activities = document.querySelector(".activities");

$shirtColors.hide();
const option = document.createElement("option");
option.textContent = "Please select a T-Shirt Design";
option.selected = true;
document.querySelector("#color").appendChild(option);

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

activities.addEventListener("change", e => {
  const checkBoxLabels = document.querySelectorAll(".activities label");
  const checkBoxes = document.querySelectorAll(".activities input");

  for (let i = 0; i < checkBoxLabels.length; i++) {
    const resetCheckbox = () => {
      checkBoxLabels[i].style.color = "";
      checkBoxLabels[i].style.textDecoration = "";
    };
    const text = checkBoxLabels[i].textContent.toString().split("—");
    const date = text[1];
    const onlyDate = date.split(",");

    let dateRegex = new RegExp(onlyDate[0]);

    if (e.target.getAttribute("name") == checkBoxes[i].getAttribute("name")) {
      if (checkBoxLabels[i].style.color == "grey") {
       resetCheckbox();
      }
      continue;
    }

    if (e.target.nextSibling.textContent.match(dateRegex) != null) {
      checkBoxes[i].checked = false;
      checkBoxLabels[i].style.color = "grey";
      checkBoxLabels[i].style.textDecoration = "line-through";
    }
  }
});
