# strongcat

Данный проект исключительно ознакомительный и был создан для того, чтобы иметь представление о написаний кода. В проекте выполнены типичные CRUD-функций: создание, чтение, изменение и удаление упражнений/тренировок/подходов. Благодаря грамотной структуре проект является расширяемым. 

## Содержание
* [Структура проекта](#структура-проекта)
* [Используемые инструменты](#используемые-инструменты)
* [Компоненты](#компоненты)
* [Миксины](#миксины)
* [Навигация. Vue Router](#навигация)
* [Состоянии. Vuex](#состоянии)
* [Дополнительные инструменты](#дополнительные-инструменты)
* [Страницы](#страницы)
* [App.vue и main.js](#app.vue-и-main.js)
* [Дополнительно о будущем проекта](#дополнительно-о-будущем-проекта)

## Структура проекта
Проект состоит из следующих папок и файлов:
* `App.vue` — главный компонент приложения. Родитель всех компонентов. Здесь прописываются только общие случаи;
* `main.js` — JS файл для инициализации приложения
* `components` — папка компонентов, которые используется в страницах (`views`)
    * `components/UI` — базовые компоненты, которые являеются строительным блоком для других компонентов
* `mixins` — папка для хранения миксинов
* `router` — папка для настройки навигаций (Vue Router)
* `store` — папка для настройки состояний приложения (Vuex)
* `utils` — папка для хранения JS-файлов, внутри которых описаные частные случаи функций
* `views` — папка страниц (Vue компоненты)

## Используемые инструменты
* Vue `3.0.0`
* Vue Router `4.0.0`
* Vuex `4.0.0`
* Bootstrap `5.2.3`

## Компоненты
Вне UI компонентов используется только `Header.vue` компонент. В дальнейшем здесь могут использоваться такие компоненты, как специальные карточки и улучшенные версии модальных окон. Сам `Header.vue` использует в шаблоне `<router-link>`:

```
<template>
  <header class="d-flex justify-content-center p-3">
    <ul class="nav nav-pills">
      <li class="nav-item">
        <router-link to="/" class="nav-link">Главная страница</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/trainings" class="nav-link">Тренировки</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/manage" class="nav-link">Упражнения</router-link>
      </li>
    </ul>
  </header>
</template>
```

В UI папке имеются такие компоненты как модальное окно, карточка и уведомление. Причем уведомление (`Toast`) является составным компонентом и состоит из `Toast.vue` (родительский компонент) и `ToastItem.vue` (дочерный компонент). Уведомления используют Vuex, так как являются глобальными данными. Частичка важного кода:
```
<template>
  <div class="toast-container position-fixed top-0 end-0 p-3">
    <div v-for="item in items" :key="item.id">
      <toast-item :item="item" @delete-toast="deleteToast"></toast-item>
    </div>
  </div>
</template>
```

```
export default {
  ...
  methods: {
    handleToasts() {
      if (this.toasts.length === 0) {
        return
      }

      // Стэк (массив) для вывода уведомления, которые НЕ зависимы от Vuex
      for (let i = 0; i < this.toasts.length; i++) {
        this.items.push({
          id: this.items.length + 1,
          text: this.toasts[i].text,
          options: this.toasts[i].options
        })
      }

      // Очищаем Vuex (при этом уведомления (this.items) не исчезнут)
      this.$store.dispatch('cleanToasts')
    },
    deleteToast(id) {
      this.items.forEach((item, index, array) => {
        if (item.id === id) {
          array.splice(index, 1)
          return
        }
      })
    }
  },
  watch: {
    toastsCount() {
      this.handleToasts()
    }
  }
}
```

Так же в `ToastItem.vue`:
```
export default {
  ...
  mounted() {
    const toastEl = document.getElementById(this.item.id)
    const toast = new bootstrap.Toast(toastEl)
    toastEl.addEventListener('hidden.bs.toast', () => {
      this.$emit('delete-toast', this.item.id)
    })

    toast.show()
  }
  ...
}
```

Все компоненты, которые находятся в `components` экспортируются в `index.js`, что означает расширяемость проекта:
```
import Modal from "@/components/UI/Modal.vue";
import Card from "@/components/UI/Card.vue";
import Toast from "@/components/UI/Toast/Toast.vue";

export default [
    Modal,
    Card,
    Toast,
];
```

## Миксины
В данном случае используется только один миксин для управления уведомлениями (toast.js). Однако наличие папки так же подразумевает расширяемость проекта:
```
export default {
    methods: {
        addToast(text, options = {}) {
            this.$store.dispatch('addToast', {text: text, options: options})
        }
    }
}
```

## Навигация
Приложение используется Vue Router. В массиве `routes` прописаны все настройки навигаций. Используются именнованные маршруты и динамическая навигация:
```
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Manage from "@/views/Manage.vue";
import Trainings from "@/views/Trainings.vue";
import Training from "@/views/Training.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/manage',
    name: 'Manage',
    component: Manage
  },
  {
    path: '/trainings',
    name: 'Trainings',
    component: Trainings
  },
  {
    path: '/training/:id',
    name: 'Training',
    component: Training
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
```

## Состоянии
Состоянии были введены после проблемы с уведомлениями. Уведомления являются глобальными и передавать с одного компонента в родительский компонент на счет уведомлений или использовать исключительно миксины являются не особо хорошим решением. Поэтому используется Vuex. Наличие Vuex также указывает на расширяемость проекта:
```
import { createStore } from 'vuex'

export default createStore({
  state: {
    toasts: [],
  },
  mutations: {
    addToast(state, payload) {
      state.toasts.push({text: payload.text, options: payload.options})
    },
    cleanToasts(state) {
      state.toasts = []
    }
  },
  actions: {
    addToast(context, payload) {
      context.commit('addToast', {text: payload.text, options: payload.options})
    },
    cleanToasts(context) {
      context.commit('cleanToasts')
    }
  },
  modules: {
  }
})
```

## Дополнительные инструменты
Папка `utils` хранит простые, но частные JS-функций. К примеру, необходимо было конвертировать timestamp в читаемую дату. Для этого был создан файл `convertDate.js`:
```
export default function (timestamp) {
    let dateFormat= new Date(timestamp);
    let day = dateFormat.getDate() < 10 ? "0".concat(dateFormat.getDate()) : dateFormat.getDate()
    let month = dateFormat.getMonth() < 10 ? "0".concat(dateFormat.getMonth()) : dateFormat.getMonth()
    return day + "." + month + "." + dateFormat.getFullYear()
};
```

А вот функция `getMaxIdFromArray` позволяет получить максимальный ID в массиве объектов:
```
export default function (array, key = "ID") {
    if (array.length === 0)
        return 0

    let max = array[0][key]
    array.forEach(e => {
        if (e.ID > max) {
            max = e.ID
        }
    })
    return max
}
```

## Страницы
Папка `views` используется для хранений страницы, которые, в свою очередь, используют компоненты. Всего страниц 4:
Страница `Home.vue` — стратовая точка страницы.

Страница 
