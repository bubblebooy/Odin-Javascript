export default function contactContent(main){
  let contactTitle = document.createElement('h2');
  contactTitle.textContent = "Contact Us";
  main.appendChild(contactTitle);
  let contactNumber = document.createElement('span');
  contactNumber.textContent = "Phone Number: (###) ### - ####";
  main.appendChild(contactNumber);
}
