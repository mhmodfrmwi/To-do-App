import moonImage from "/images/icon-moon.svg";
import sunImage from "/images/icon-sun.svg";
import { elements, listItemArray } from "./elements";
import { saveToDataBase } from "./dataStorage";
export const toggleDarkTheme = () => {
  elements.topScreen.classList.toggle("darkTop");
  document.body.classList.toggle("darkBody");
  elements.listItems.classList.toggle("darkList");
  elements.secondUl.classList.toggle("darkList");
  elements.bottomContent.classList.toggle("darkBottomContent");
  elements.inputField.classList.toggle("darkInputField");
  elements.themeIcon.src = document.body.classList.contains("darkBody")
    ? moonImage
    : sunImage;
  listItemArray().forEach((item) => item?.classList.toggle("darkListItem"));
  saveToDataBase("darkModeFlag", document.body.classList.contains("darkBody"));
};
