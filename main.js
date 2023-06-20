let film = ''; //

//Получить из DOM:
const addFormNode = document.querySelector('.js-form');
const filmAddInputNode = document.querySelector('.js-add__input');
const newFilmBtnNode = document.querySelector('.js-add__btn');
const filmsNode = document.querySelector('.js-films');

addFormNode.addEventListener('submit', addFilm);

function addFilm(event) {
  //отменяем перезагрузку страницы - отправку формы
  event.preventDefault();

  //достаем текст из поля ввода
  const filmTitle = filmAddInputNode.value;

  //формируем разметку для нового фильма

  const filmHTML = `<li class="js-film film">
                   
                      <input class="js-film__checkbox film__checkbox" >
                      <p class="film__text">${filmTitle}</p>
                      <button class="close-btn" ></button>
                   
                </li>`;

  //добавляем фильм на страницу
  filmsNode.insertAdjacentHTML('beforeend', filmHTML);

  //очищаем инпут
  filmAddInputNode.value = '';
  //возвращаем курсор в инпут
  filmAddInputNode.focus();
}
