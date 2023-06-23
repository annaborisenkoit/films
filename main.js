let film = ''; //

//Получить из DOM:
const addFormNode = document.querySelector('.js-form');
const filmAddInputNode = document.querySelector('.js-add__input');
const newFilmBtnNode = document.querySelector('.js-add__btn');
const filmsNode = document.querySelector('.js-films');

let films = [];

if (localStorage.getItem('films')) {
  films = JSON.parse(localStorage.getItem('films'));
}

films.forEach(function (film) {
  renderFilm(film);
});

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

  //формируем объект для LS
  const newFilm = {
    id: Date.now(),
    text: filmTitle,
    done: false,
  };

  //добавляем новый фильм (объект) в массив с фильмами (для LS)
  films.push(newFilm);

  saveToLocalStorage();

  renderFilm(newFilm);

  //очищаем инпут
  filmAddInputNode.value = '';
  //возвращаем курсор в инпут
  filmAddInputNode.focus();
}

function deleteFilm(event) {
  //проверяем, что клик был по кнопке удаления

  if (event.target.dataset.action === 'delete') {
    const parentNode = event.target.closest('.film');

    //определяем id фильма в виде числа
    const id = Number(parentNode.id);

    //отфильтруем массив, чтобы новый фильм в него не попал, который - false
    //каждый элемент массива обозначим как film
    films = films.filter((film) => film.id !== id);

    saveToLocalStorage();

    //удаляем фильм из разметки
    parentNode.remove();
  }
}

function viewedFilm(event) {
  if (event.target.dataset.action === 'done') {
    const parentNode = event.target.closest('.film');

    //определяем id фильма в виде числа
    const id = Number(parentNode.id);

    //метод find возвращает сам найденный элемент - при true
    const film = films.find(function (film) {
      if (film.id === id) {
        return true;
      }
    });

    film.done = !film.done;

    saveToLocalStorage();

    parentNode.classList.toggle('checked');
  }
}

function saveToLocalStorage() {
  localStorage.setItem('films', JSON.stringify(films));
}

function renderFilm(film) {
  //формируем css класс - тернарный оператор
  const cssClass = film.done ? 'checked' : '';

  //формируем разметку для нового фильма
  const filmHTML = `<li id="${film.id}" class="js-film film ${cssClass}">
                   <div class="checkbox-wrap">
                      <input type="checkbox"class="js-film__checkbox film__checkbox" data-action="done">
                      </div>
                      <p class="film__text">${film.text}</p>
                      <button class="close-btn" data-action="delete"></button>
                   
                </li>`;

  //добавляем фильм на страницу
  filmsNode.insertAdjacentHTML('beforeend', filmHTML);
}
