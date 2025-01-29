<template>
  <h2 class="content__header">Star Wars characters</h2>
  <div class="search_bar">
    <h3 class="search_bar__header">Find character</h3>
    <input
      class="search_bar__input"
      type="search"
      name=""
      id=""
      placeholder="Enter character name..."
      v-model="searchQuery"
      @input="getCharacters()"
    />
  </div>

  <div class="error" v-if="errorMessage">
    {{ errorMessage }}
  </div>

  <div class="search_results" v-if="!errorMessage">
    <ul class="search_results__list">
      <li v-for="item in characters" :key="item.name">
        <a
          class="search_results__item"
          :data-birth-year="item.birth_year"
          :data-gender="item.gender"
          :href="item.url"
          target="_blank"
        >
          {{ item.name }}
        </a>
      </li>
    </ul>
    <div class="search_results__pagination" v-if="characters.length > 0">
      <button
        v-bind:disabled="!prevPage"
        class="pagination__button"
        @click="toPrevPage()"
      >
        Previous page
      </button>
      <button
        v-bind:disabled="!nextPage"
        class="pagination__button"
        @click="toNextPage()"
      >
        Next page
      </button>
    </div>
    <p
      class="search_results__empty"
      v-if="isDataLoaded && characters.length === 0"
    >
      Empty result.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

// уточнить по поводу типа
const characters = ref<any[]>([]);
const searchQuery = ref(""); //поисковой запрос
const nextPage = ref<string | null>(null);
const prevPage = ref<string | null>(null);
const errorMessage = ref<string>("");
const isDataLoaded = ref(false); //проверка загружены ли данные

// null может быть при передаче ссылки на несуществующую next или prev
async function getCharacters(url: string | null = null) {
  errorMessage.value = "";
  try {
    // без await вернёт промис
    const response = await axios.get(
      url || `https://swapi.dev/api/people/?search=${searchQuery.value}`
    );
    nextPage.value = response.data.next;
    prevPage.value = response.data.previous;
    characters.value = response.data.results;
  } catch (error: any) {
    console.log(error.message);
    errorMessage.value = "Data loading failed";
  }
  if (characters.value.length) {
    isDataLoaded.value = true;
    console.log("All characters are loaded.");
  }
}

// при монтировании выводим всех персонажей
onMounted(() => {
  getCharacters();
});

// функции для кнопок навигации
async function toNextPage() {
  if (nextPage.value !== null) {
    getCharacters(nextPage.value);
  }
}
async function toPrevPage() {
  if (prevPage.value !== null) {
    getCharacters(prevPage.value);
  }
}
</script>
<!-- стили -->
<style scoped>
.content__header {
  padding-top: 24px;
  text-align: center;
  color: rgb(245, 229, 30);
}
@media only screen and (min-width: 775px) {
  .content__header {
    padding-top: 48px;
  }
}
.search_bar {
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
.search_bar__header {
  color: rgb(245, 229, 30);
}
.search_bar__input {
  width: 300px;
  height: 32px;
  background-color: inherit;
  padding-left: 15px;
  padding-right: 15px;
  border: 1px solid #fff;
  outline: none;
  border-radius: 20px;
  color: #fff;
}
.search_bar__input:focus {
  border: 1px solid rgb(245, 229, 30);
  outline: 1px solid rgba(245, 231, 30, 0.6);
  color: #fff;
}
.search_bar__input:focus-visible {
  border: 1px solid rgb(245, 229, 30);
  outline: 1px solid rgba(245, 231, 30, 0.6);
}
.error {
  padding-top: 24px;
  text-align: center;
  color: red;
  font-weight: bold;
}
.search_results {
}
.search_results__list {
  padding-top: 24px;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
.search_results__item {
  position: relative;
  padding: 8px 16px;
  text-decoration: none;
  color: #fff;
  border-radius: 16px;
}
.search_results__item:hover {
  background-color: rgb(245, 229, 30);
  color: black;
}
.search_results__item::after {
  white-space: nowrap;
  content: "birth year: " attr(data-birth-year) ", gender: " attr(data-gender);
  position: absolute;
  left: 100%;
  margin-left: 8px;
  opacity: 0;
  transition: opacity 0.3s ease;
  color: gray;
}
.search_results__item:hover::after {
  opacity: 1;
}
.search_results__pagination {
  padding-top: 28px;
  display: flex;
  justify-content: space-around;
}
.pagination__button {
  width: 130px;
  height: 45px;
  border: 2px solid black;
  border-radius: 20px;
  background-color: rgb(245, 229, 30);
  color: black;
  text-align: center;
  cursor: pointer;
}
.pagination__button:disabled {
  background-color: rgba(245, 231, 30, 0.8);
  cursor: not-allowed;
}
.search_results__empty {
  text-align: center;
}
</style>
