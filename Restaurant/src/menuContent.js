export default function menuContent(main){
  let menuTitle = document.createElement('ul');
  menuTitle.textContent = "Menu";
  main.appendChild(menuTitle);
  let menuItem1 = document.createElement('li');
  menuItem1.textContent = "Russian Blue";
  menuTitle.appendChild(menuItem1);
  let menuItem2 = document.createElement('li');
  menuItem2.textContent = "Persian";
  menuTitle.appendChild(menuItem2);
  let menuItem3 = document.createElement('li');
  menuItem3.textContent = "Siamese";
  menuTitle.appendChild(menuItem3);
}
