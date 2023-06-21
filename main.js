let film = ''; //

//Получить из DOM:
const addFormNode = document.querySelector('.js-form');
const filmAddInputNode = document.querySelector('.js-add__input');
const newFilmBtnNode = document.querySelector('.js-add__btn');
const filmsNode = document.querySelector('.js-films');

//добавление фильма
addFormNode.addEventListener('submit', addFilm);

//удаление фильма
filmsNode.addEventListener('click', deleteFilm);

function addFilm(event) {
  //отменяем перезагрузку страницы - отправку формы
  event.preventDefault();

  //достаем текст из поля ввода
  const filmTitle = filmAddInputNode.value;

  //формируем разметку для нового фильма

  const filmHTML = `<li class="js-film film">
                   
                      <input class="js-film__checkbox film__checkbox" >
                      <p class="film__text">${filmTitle}</p>
                      <button class="close-btn" data-action="delete"></button>
                   
                </li>`;

  //добавляем фильм на страницу
  filmsNode.insertAdjacentHTML('beforeend', filmHTML);

  //очищаем инпут
  filmAddInputNode.value = '';
  //возвращаем курсор в инпут
  filmAddInputNode.focus();
}

function deleteFilm(event) {
  //проверяем, что клик был по кнопке удаления
  console.log(event.target);

  if (event.target.dataset.action === 'delete') {
    const parentNode = event.target.closest('.film');

    parentNode.remove();
  }
}
