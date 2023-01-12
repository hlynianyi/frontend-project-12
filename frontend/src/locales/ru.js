// eslint-disable-next-line import/no-anonymous-default-export
export default {
  translation: {
    navbar: {
      title: 'Hexlet Chat',
      button: 'Выйти'
    },
    login: {
      username: 'Ваш ник',
      password: 'Пароль',
      entry: 'Войти',
      question: 'Нет аккаунта?',
      signup: 'Регистрация',
      space: ' ',
    },
    signup: {
      title: 'Регистрация',
      username: 'Имя пользователя',
      password: 'Пароль',
      passwordConfirmation: 'Подтвердите пароль',
      toRegister: 'Зарегистрироваться',
    },
    homepage: {
      channels: 'Каналы',
      channelSign: '#',
      remove: 'Удалить',
      rename: 'Переименовать',
      send: 'Отправить',
      input: 'Введите сообщение..',
      inputAriaLabel: 'Новое сообщение',
      plus: '+',
      separator: ': ',
      message_one: '{{count}} сообщение',
      message_few: '{{count}} сообщения',
      message_many: '{{count}} сообщений',
    },
    errors: {
      required: 'Обязательное поле',
      login: 'Неверные имя пользователя или пароль',
      confirmation: 'Пароли должны совпадать',
      passwordLength: 'Не менее 6 символов',
      loginLength: 'От 3 до 20 символов',
      unique: 'Должно быть уникальным',
      userExist: 'Такой пользователь уже существует',
    },
    modals: {
      add: 'Добавить канал',
      channelName: 'Имя канала',
      rename: 'Переименовать канал',
      delete: 'Удалить канал',
      confirmation: 'Уверены?',
      send: 'Отправить',
      cancel: 'Отменить',
      remove: 'Удалить',
    },
    notFound: {
      title: 'Страница не найдена!',
      suggestion1: 'Но вы можете перейти ',
      suggestionLink: 'на главную страницу',
    },
    toastify: {
      added: 'Канал создан',
      renamed: 'Канал переименован',
      deleted: 'Канал удален',
      network: 'Ошибка соединения',
    }
  },
};