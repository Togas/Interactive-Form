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
const costMarker = document.createElement('p');



//calculates the costs of selected activities
const calculateCostOfActivities = () => {
  let activitiesCounter = 0;
  for (let i = 0; i < checkBoxes.length; i++) {
      if(checkBoxes[i].checked){
          activitiesCounter++;
      }
  }
  return activitiesCounter= activitiesCounter*100 + "$";
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

activities.addEventListener("change", e => {
  for (let i = 0; i < checkBoxLabels.length; i++) {
    const resetCheckbox = () => {
      checkBoxLabels[i].style.color = "";
      checkBoxLabels[i].style.textDecoration = "";
      checkBoxes[i].disabled=false;
    };
    const text = checkBoxLabels[i].textContent.toString().split("—");
    const date = text[1];
    const onlyDate = date.split(",");

    let dateRegex = new RegExp(onlyDate[0]);

    if (e.target.getAttribute("name") == checkBoxes[i].getAttribute("name")) {
      
      continue;
    }

    if (e.target.nextSibling.textContent.match(dateRegex) != null) {
        if(checkBoxes[i].disabled){
            resetCheckbox();      
        } else {
      checkBoxes[i].disabled=true;
      checkBoxLabels[i].style.color = "grey";
      checkBoxLabels[i].style.textDecoration = "line-through";
        }
    }

  }
  let price= calculateCostOfActivities();
  costMarker.innerHTML=`costs for your selected activities: ${calculateCostOfActivities()}`;
  activities.appendChild(costMarker);
});
