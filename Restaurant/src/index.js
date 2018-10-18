console.log("Script Started")

import homeContent from './homeContent'
import contactContent from './contactContent'
import menuContent from './menuContent'

const content = document.getElementById('content');


function navBar() {
  let nav = document.createElement('nav');
  nav.classList.add("navbar-dark");
    let tabList = nav.getElementsByClassName("navbar-tab");
    let homeTab = document.createElement('a')
      homeTab.classList.add("navbar-tab", "active")
      homeTab.textContent = "Home"
      homeTab.addEventListener("click", function(){tabEventListener(this, tabList, main, homeContent)});
      nav.appendChild(homeTab)
    let contactTab = document.createElement('a')
      contactTab.textContent = "Contact"
      contactTab.classList.add("navbar-tab")
      contactTab.addEventListener("click", function(){tabEventListener(this, tabList, main, contactContent)});
      nav.appendChild(contactTab)
    let menuTab = document.createElement('a')
      menuTab.classList.add("navbar-tab")
      menuTab.textContent = "Menu"
      menuTab.addEventListener("click", function(){tabEventListener(this, tabList, main, menuContent)});
      nav.appendChild(menuTab)
  return nav;
}

function tabEventListener( tab, tabList, main, contentFunction ){
  while (main.hasChildNodes()) {
    main.firstChild.remove();
  }
  for (let i = 0; i < tabList.length; i++){
    tabList[i].classList.remove("active")
  };
  tab.classList.toggle("active")
  contentFunction(main);
}


content.appendChild(navBar());

let carousel = document.createElement('div')
carousel.classList.add("carousel")
content.appendChild(carousel);
  let carouselImage = document.createElement('IMG')
  carouselImage.src="http://placekitten.com/g/1000/700";
  carouselImage.classList.add("carousel-img")
  carousel.appendChild(carouselImage);
  let title = document.createElement('h1');
  title.textContent = "My Restaurant"
  title.classList.add("carousel-title")
  carousel.appendChild(title);

let main = document.createElement('main')
content.appendChild(main);
homeContent(main)
