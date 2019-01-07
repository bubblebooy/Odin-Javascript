const myForm = document.getElementById('form');

myForm["email"].addEventListener("input", function(e){
  if (myForm["email"].validity.typeMismatch) {
    myForm["email"].setCustomValidity("Not a Valid e-mail address");
    myForm["email"].classList.add("error")
  } else {
    myForm["email"].setCustomValidity("");
    myForm["email"].classList.remove("error")
  }
})


myForm["emailConfirmation"].addEventListener("input", function(e){
  if (myForm["emailConfirmation"].value != myForm["email"].value) {
    myForm["emailConfirmation"].setCustomValidity("Does not match e-mail");
    myForm["emailConfirmation"].classList.add("error")
  } else {
    myForm["emailConfirmation"].setCustomValidity("");
    myForm["emailConfirmation"].classList.remove("error")
  }
})

myForm["country"].addEventListener("input", function(e){
  if (myForm["country"].validity.tooLong) {
    myForm["country"].setCustomValidity("Country Name Too Long");
    myForm["country"].classList.add("error")
  }else if (myForm["country"].validity.tooShort) {
      myForm["country"].setCustomValidity("Country Name Too Short");
      myForm["country"].classList.add("error")
    } else {
    myForm["country"].setCustomValidity("");
    myForm["country"].classList.remove("error")
  }
})

myForm["zipCode"].addEventListener("input", function(e){
  if (myForm["zipCode"].validity.patternMismatch) {
    myForm["zipCode"].setCustomValidity("Not a Vaild zipCode");
    myForm["zipCode"].classList.add("error")
  } else {
    myForm["zipCode"].setCustomValidity("");
    myForm["zipCode"].classList.remove("error")
  }
})

myForm["password"].addEventListener("input", function(e){
  if (myForm["password"].validity.tooLong) {
    myForm["password"].setCustomValidity("Password Too Long");
    myForm["password"].classList.add("error")
  }else if (myForm["password"].validity.tooShort) {
      myForm["password"].setCustomValidity("Password Too Short");
      myForm["password"].classList.add("error")
    } else {
    myForm["password"].setCustomValidity("");
    myForm["password"].classList.remove("error")
  }
})

myForm["passwordConfirmation"].addEventListener("input", function(e){
  if (myForm["passwordConfirmation"].value != myForm["password"].value) {
    myForm["passwordConfirmation"].setCustomValidity("Does not match password");
  } else {
    myForm["passwordConfirmation"].setCustomValidity("");
  }
})
