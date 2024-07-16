import { emojis } from "../js/emojis.js";

(function (arrOfEmojis) {
  const objOfEmojis = arrOfEmojis.reduce((acc, emoji) => {
    acc[emoji.title] = emoji;
    return acc;
  }, {});

  const div = document.getElementById("emoji");

  renderAllEmojis(objOfEmojis);

  // вывод смайлов на страницу
  function renderAllEmojis(emojisCards) {
    if (!emojisCards) {
      console.error("Передайте список смайлов");
      return;
    }
    const fragment = document.createDocumentFragment();
    Object.values(emojisCards).forEach((emoji) => {
      const card = emojiCardTemplate(emoji);
      fragment.appendChild(card);
      return fragment;
    });
    div.innerHTML = '';
    div.appendChild(fragment);
  }

  function emojiCardTemplate({ title, symbol, keywords } = {}) {
    // console.log(symbol)
    const div = document.createElement("div");
    div.classList.add("emoji-card");
    const img = document.createElement("h2");
    img.classList.add("emoji-card__title");
    img.textContent = symbol;
    const h2 = document.createElement("h3");
    h2.classList.add("emoji-card__subtitle");
    h2.textContent = title;
    const p = document.createElement("p");
    p.classList.add("emoji-card__text");
    p.textContent = uniqKeywords(keywords);

    div.appendChild(img);
    div.appendChild(h2);
    div.appendChild(p);
    return div;
  }

  // uniqKeywords
  function uniqKeywords (keywords) {
    const strKeywordsToArray = keywords.split(' ');
    const uniqArrayKeywords = [... new Set(strKeywordsToArray)];
    const uniqStrKeywords = uniqArrayKeywords.join(' ')
    //console.log(uniqStrKeywords);
    return uniqStrKeywords;
  };

  const form = document.getElementById("form");
  const input = document.getElementById("input");
  //console.log(form);

  form.addEventListener("submit", onSubmitHandler);

  function onSubmitHandler(e) {
    e.preventDefault();
    let inputValue = input.value;
    filterArr(inputValue);
  }

  function filterArr(inputValue) {
    const arrOfObjEmojis = Object.values(objOfEmojis);
    const filterArrOfObjEmojis = arrOfObjEmojis.filter((emoji) => {
      return (
        emoji.keywords.includes(inputValue) || emoji.title == inputValue
      );
    });
    if (filterArrOfObjEmojis.length > 0) {
    renderAllEmojis(filterArrOfObjEmojis);
    console.log(filterArrOfObjEmojis);
    }
  
  }
})(emojis);
