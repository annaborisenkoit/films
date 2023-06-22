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

//отмечаем просмотренный фильм
filmsNode.addEventListener('click', viewedFilm);

//функции
function addFilm(event) {
  //отменяем перезагрузку страницы - отправку формы
  event.preventDefault();

  //достаем текст из поля ввода
  //обрезаем пробелы - trim
  const filmTitle = filmAddInputNode.value.trim();

  //проверяем, не пустой ли инпут
  if (!filmTitle) {
    alert('Необходимо ввести название фильма');
    return;
  }

  //формируем разметку для нового фильма

  const filmHTML = `<li class="js-film film">
                   
                      <input type="checkbox"class="js-film__checkbox film__checkbox" data-action="done">
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

function viewedFilm(event) {
  if (event.target.dataset.action === 'done') {
    const parentNode = event.target.closest('.film');
    parentNode.classList.toggle('checked');
  }
}
