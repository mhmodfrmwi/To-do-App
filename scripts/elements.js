// module.js
export const elements = {
  topScreen: document.querySelector(".top"),
  themeIcon: document.querySelector(".theme__icon"),
  listItems: document.querySelector(".list__items"),
  secondUl: document.querySelector(".second__ul"),
  bottomContent: document.querySelector(".bottom__content"),
  inputField: document.querySelector(".input__field"),
  numOfItemsLabel: document.querySelector(".item"),
  clear: document.querySelector(".clear"),
  completed: document.querySelector(".show__completed"),
  active: document.querySelector(".show__active"),
  all: document.querySelector(".show__all"),
  inputFieldCircle: document.querySelector(".circleInputField"),
  ulElement: document.querySelector(".first__ul"),
};

export const listItemArray = () => document.querySelectorAll(".list__item");
export const circleIconArray = () => document.querySelectorAll(".circle");
export const getDeleteIcons = () => document.querySelectorAll(".deleteIcon");
