<template>
  <h2 class="content__header">Star Wars characters</h2>
  <!-- content -->
  <div class="error" v-if="errorMessage">
    {{ errorMessage }}
  </div>
  <!-- отрисовывается только если ошибки нет -->
  <ul class="characters__list" v-if="!errorMessage">
    <li v-for="item in characters" :key="item.name">
      <a class="character__item" :href="item.url" target="_blank">
        {{ item.name }}
      </a>
    </li>
  </ul>
  <!-- пагинация -->
  <div class="navigation" v-if="!errorMessage">
    <button
      v-bind:disabled="!prevPage"
      class="navigation__button"
      @click="toPrevPage()"
    >
      Previous page
    </button>
    <button
      v-bind:disabled="!nextPage"
      class="navigation__button"
      @click="toNextPage()"
    >
      Next page
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

// уточнить по поводу типа
const characters = ref<any[]>([]);
const nextPage = ref<string | null>(null);
const prevPage = ref<string | null>(null);
const errorMessage = ref<string>("");

// запрос и запись данных
// null может быть при передаче ссылки на несуществующую next или prev
async function getCharacters(url: string | null = null) {
  // async function getCharacters(url = "https://swapi.dev/api/people/") {
  // при каждом запуске функции очистить сообщение об ошибке
  errorMessage.value = "";
  try {
    // без await вернёт промис
    const response = await axios.get(url || "https://swapi.dev/api/people/");
    // const response = await axios.get(
    //   url || "https://swapi.dev/api/people/ошибка"
    // );

    nextPage.value = response.data.next;
    prevPage.value = response.data.previous;
    characters.value = response.data.results;
  } catch (error: unknown) {
    console.log(error.message);
    errorMessage.value = "Data loading failed";
  }
}

// запуск функции запроса данных(при монтировании)
onMounted(() => {
  getCharacters();
});

// функции для кнопок навигации
function toNextPage() {
  if (nextPage.value !== null) {
    getCharacters(nextPage.value);
  }
}
function toPrevPage() {
  if (prevPage.value !== null) {
    getCharacters(prevPage.value);
  }
}
</script>
<style scoped>
.content__header {
  padding-top: 48px;
  text-align: center;
  color: rgb(245, 229, 30);
}
.error {
  padding-top: 24px;
  text-align: center;
  color: red;
  font-weight: bold;
}
.characters__list {
  padding-top: 24px;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
.character__item {
  padding: 8px 16px;
  text-decoration: none;
  color: #fff;
  border-radius: 16px;
}
.character__item:hover {
  background-color: rgb(245, 229, 30);
  color: black;
}
.navigation {
  padding-top: 28px;
  display: flex;
  justify-content: space-around;
}
.navigation__button {
  width: 130px;
  height: 45px;
  border: 2px solid black;
  border-radius: 20px;
  background-color: rgb(245, 229, 30);
  color: black;
  text-align: center;
  cursor: pointer;
}
.navigation__button:disabled {
  background-color: rgba(245, 231, 30, 0.8);
  cursor: not-allowed;
}
</style>
