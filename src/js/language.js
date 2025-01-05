import { languageData } from "./utils/constants.js";

export function setLanguage(lang) {
    sessionStorage.setItem('lang', lang);
    console.log(`set lang to ${lang}`)

    const selector = document.querySelector("#language-select"); 
    if (selector) {
        const option = selector.querySelector(`option[value="${lang}"]`);
        if (option) {
            option.selected = true;
        }
    }
    
    const elements = document.querySelectorAll("[data-translate]");
    elements.forEach((el) => {
      const key = el.getAttribute("data-translate");
      el.innerHTML = languageData[lang][key];
    });
}
