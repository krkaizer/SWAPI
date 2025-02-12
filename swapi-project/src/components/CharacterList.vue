<template>
  <h2 class="content__header">Star Wars characters</h2>
  <div class="search_bar">
    <h3 class="search_bar__header">Find character</h3>
    <input
      class="search_bar__input"
      type="search"
      placeholder="Enter character name..."
      v-model="searchQuery"
      ref="searchInput"
    />
    <!-- @input="getCharacters()" -->
  </div>

  <div class="error" v-if="errorMessage">
    {{ errorMessage }}
  </div>

  <div class="search_results" v-if="!errorMessage">
    <LoadingDiv v-if="!isDataLoaded"></LoadingDiv>
    <TransitionGroup v-else tag="ul" class="search_results__list" name="list">
      <li v-for="item in characters" :key="item.name">
        <button
          class="search_results__item"
          :data-birth-year="item.birth_year"
          :data-gender="item.gender"
          @click="props.selectCharacter(item)"
        >
          <span v-html="getBoldText(item.name)"></span>
          <!-- {{ item.name }} -->
        </button>
      </li>
    </TransitionGroup>

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
import LoadingDiv from "./LoadingDiv.vue";
import { ref, onMounted } from "vue";
import axios from "axios";
import { useDebounceFn, useEventListener } from "@vueuse/core"; // для debounce в input
import { defineProps } from "vue"; // для получения функции/переменной от родителя
import { Character } from "@/types";

const props = defineProps<{
  selectCharacter: (character: Character | null) => void;
}>();

const characters = ref<Character[]>([]);
const searchQuery = ref<string>(""); //поисковой запрос
const nextPage = ref<string | null>(null);
const prevPage = ref<string | null>(null);
const errorMessage = ref<string>("");
const isDataLoaded = ref<boolean>(false); //проверка загружены ли данные

// null может быть при передаче ссылки на несуществующую next или prev
async function getCharacters(url: string | null = null) {
  errorMessage.value = "";
  // очищаем предыдущий запрос, чтобы загрузка не отображалась над элементами
  characters.value = [];
  isDataLoaded.value = false;
  try {
    // без await вернёт промис
    const response = await axios.get(
      url || `https://swapi.dev/api/people/?search=${searchQuery.value}`
    );
    nextPage.value = response.data.next;
    prevPage.value = response.data.previous;
    characters.value = response.data.results;
    //запрос мб пустым, но данные загружены, поэтому вне цикла
    isDataLoaded.value = true;
    if (characters.value.length) {
      console.log("Characters are loaded.");
    }
  } catch (error: any) {
    isDataLoaded.value = false;
    console.log(error.message);
    errorMessage.value = "Data loading failed";
  }
  // test
  // isDataLoaded.value = false;
  // errorMessage.value = "test";
}

function getBoldText(text: string) {
  if (!searchQuery.value) return text;
  const regex = new RegExp(`(${searchQuery.value})`, "gi");
  return text.replace(regex, `<strong>$1</strong>`);
}

// при монтировании выводим всех персонажей
onMounted(() => {
  getCharacters();
});

// хранит ссылку на элемент
const searchInput = ref<HTMLInputElement | null>(null);
const debouncedGetCharacters = useDebounceFn(() => getCharacters(), 500);
// отслеживание изменений в input (элемент через ref, тип события, функция)
useEventListener(searchInput, "input", debouncedGetCharacters);

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

<style scoped>
.content__header {
  padding-top: 24px;
  text-align: center;
  color: var(--color-yellow);
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
  color: var(--color-yellow);
}
.search_bar__input {
  width: 300px;
  height: 32px;
  background-color: inherit;
  padding-left: 15px;
  padding-right: 15px;
  border: 1px solid var(--color-white);
  outline: none;
  border-radius: 20px;
  color: var(--color-white);
}
.search_bar__input:focus {
  border: 1px solid var(--color-yellow);
  outline: 1px solid rgba(245, 229, 30, 0.6); /* --color-yellow */
  color: var(--color-white);
}
.search_bar__input:focus-visible {
  border: 1px solid var(--color-yellow);
  outline: 1px solid rgba(245, 229, 30, 0.6); /* --color-yellow */
}
.search_results {
}
.search_results__list {
  padding-top: 24px;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}
.search_results__item {
  all: unset;
  /* relative для after */
  position: relative;
  padding: 10px 16px 8px;
  text-decoration: none;
  color: var(--color-white);
  border-radius: 16px;
  cursor: pointer;
  transition: background-color 0.5s ease, color 0.5s ease;
}
.search_results__item:hover {
  background-color: var(--color-yellow);
  color: var(--color-black);
}
@media only screen and (min-width: 775px) {
  .search_results__item::after {
    white-space: nowrap;
    content: "birth year: " attr(data-birth-year) ", gender: " attr(data-gender);
    position: absolute;
    left: 100%;
    margin-left: 12px;
    opacity: 0;
    color: var(--color-light-gray);
    font-size: 14px;
    transition: opacity 0.5s ease;
  }
  .search_results__item:hover::after {
    opacity: 1;
  }
}
.search_results__pagination {
  padding-top: 28px;
  display: flex;
  justify-content: space-around;
}
.pagination__button {
  width: 130px;
  height: 45px;
  border-radius: 20px;
  background-color: var(--color-yellow);
  border: 1px solid var(--color-yellow);
  color: var(--color-black);
  text-align: center;
  cursor: pointer;
}
.pagination__button:disabled {
  background-color: rgba(245, 229, 30, 0.8); /* --color-yellow */
  cursor: not-allowed;
}
.search_results__empty {
  text-align: center;
}
</style>
