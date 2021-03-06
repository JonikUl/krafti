export default ({app, $axios}, inject) => {
  const settings = {
    site_url: process.env.SITE_URL,
    image_url: $axios.defaults.baseURL.replace('api/', 'image'),
    file_url: $axios.defaults.baseURL.replace('api/', 'file'),
    copyright: `KRAFTi © 2019 — ${app.$moment().format('YYYY')}.`,
    menu: {
      admin: [
        {to: {name: 'orders'}, title: 'Заказы', scope: 'orders'},
        {to: {name: 'users'}, title: 'Пользователи', scope: 'users'},
        {to: {name: 'discounts'}, title: 'Скидки', scope: 'discounts'},
        {to: {name: 'comments'}, title: 'Комментарии', scope: 'comments'},
        {to: {name: 'homeworks'}, title: 'Домашние работы', scope: 'homeworks'},
        {to: {name: 'courses'}, title: 'Курсы', scope: 'courses'},
        {to: {name: 'settings'}, title: 'Настройки', scope: 'settings'},
      ],
      header: [
        // {to: {name: '/'}, title: 'Главная', scope: false},
        {to: {name: 'courses'}, title: 'Курсы', scope: false},
        {to: {name: 'reviews'}, title: 'Отзывы', scope: false},
        {to: {name: 'office'}, title: 'Личный кабинет', scope: 'profile'},
        {to: {name: 'team'}, title: 'Наша команда', scope: false},
        {to: {name: 'contacts'}, title: 'Контакты', scope: false},
        // {to: {name: 'admin'}, title: 'Админка', scope: 'admin'},
      ],
      footer: {
        left: [
          {to: {name: 'courses'}, title: 'Курсы', scope: false},
          {to: {name: 'office'}, title: 'Личный кабинет', scope: 'profile'},
          {to: {name: 'team'}, title: 'Наша команда', scope: false},
        ],
        center: [
          {to: {name: 'reviews'}, title: 'Отзывы', scope: false},
          {to: {name: 'contacts'}, title: 'Контакты', scope: false},
        ],
        right: [
          {to: {name: 'info-slug', params: {slug: 'agreement'}}, title: 'Пользовательское соглашение', scope: false},
          {to: {name: 'info-slug', params: {slug: 'offer'}}, title: 'Публичная оферта', scope: false},
          {to: {name: 'info-slug', params: {slug: 'privacy'}}, title: 'Политика конфиденциальности', scope: false},
        ],
      },
    },
  }

  inject('settings', settings)
}
