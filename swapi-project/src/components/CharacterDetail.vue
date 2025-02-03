<template>
  <div class="character_header">
    <button class="header__button" @click="props.selectCharacter(null)">
      <svg
        class="button__icon"
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 12.5H19M5 12.5L12 5.5M5 12.5L12 19.5"
          stroke="white"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <p class="button__text">Back</p>
    </button>
    <h3 class="header__character_name">{{ character.name }}</h3>
  </div>

  <div v-if="errorMessageHomeworld || errorMessageMovies" class="error">
    {{ errorMessageHomeworld }} {{ errorMessageMovies }}
  </div>
  <div
    v-if="
      (!isHomeworldLoaded || !isMoviesLoaded) &&
      !errorMessageHomeworld &&
      !errorMessageMovies
    "
    class="loading"
  >
    Loading...
  </div>
  <Transition>
    <div
      v-if="
        isHomeworldLoaded &&
        isMoviesLoaded &&
        !errorMessageHomeworld &&
        !errorMessageMovies
      "
      class="character_info"
    >
      <h4
        v-if="characterHomeworld !== 'unknown'"
        class="character_info__homeworld"
      >
        from {{ characterHomeworld }}
      </h4>
      <h4 v-else class="character_info__homeworld">homeworld is unknown</h4>

      <div class="info__general">
        <p class="character_info__item">
          Birth year:
          {{ character.birth_year }}
        </p>
        <p class="character_info__item">Gender: {{ character.gender }}</p>

        <p v-if="character.mass !== 'unknown'" class="character_info__item">
          Mass: {{ character.mass }} kg
        </p>
        <p v-else class="character_info__item">Mass: {{ character.mass }}</p>

        <p v-if="character.height !== 'unknown'" class="character_info__item">
          Height: {{ character.height }} cm
        </p>
        <p v-else class="character_info__item">
          Height: {{ character.height }}
        </p>
      </div>
      <div class="info__movies">
        <h4 class="movies__header">Movies:</h4>
        <!-- <p>{{ characterMoviesString }}</p> -->
        <ul class="movies__list">
          <li v-for="(movie, index) in moviesInfo" :key="movie.title">
            <a class="movies__item" :href="movie.url" target="_blank"
              >"{{ movie.title }}"</a
            >
            <span v-if="index !== moviesInfo.length - 1">,&nbsp;</span>
          </li>
        </ul>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { defineProps } from "vue";
import axios from "axios";

const props = defineProps<{
  selectCharacter: (character: any) => void;
  selectedCharacter: any;
}>();

const character = ref<any>(props.selectedCharacter);
const characterHomeworld = ref<string>("");
const errorMessageHomeworld = ref<string>("");
const isHomeworldLoaded = ref<boolean>(false);

async function getHomeworld() {
  try {
    console.log(character.value.homeworld);
    const response = await axios.get(character.value.homeworld);
    characterHomeworld.value = response.data.name;
    isHomeworldLoaded.value = true;
    if (characterHomeworld.value) {
      console.log("Homeworld is loaded.");
    }
  } catch (error: any) {
    isHomeworldLoaded.value = false;
    console.log(error.message);
    errorMessageHomeworld.value = "Homeworld loading failed.";
  }
  // test
  // errorMessageHomeworld.value = "Homeworld loading failed.";
}

const moviesInfo = ref<any[]>([]);
const isMoviesLoaded = ref<boolean>(false);
const errorMessageMovies = ref<string>("");

async function getMovies() {
  let movieUrls = character.value.films;
  try {
    // возвращает массив результатов промисов
    const responses = await Promise.all(
      movieUrls.map((url: string) => axios.get(url))
    );
    // for a
    moviesInfo.value = responses.map((response) => response.data);
    isMoviesLoaded.value = true;
    if (moviesInfo.value) {
      console.log("Movies info is loaded.");
    }
  } catch (error: any) {
    isMoviesLoaded.value = false;
    console.log(error.message);
    errorMessageMovies.value = "Films loading failed";
  }
  // test
  // errorMessageMovies.value = "Movies loading failed.";
}
onMounted(() => {
  getHomeworld();
  getMovies();
});
</script>

<style scoped>
.character_header {
}
.header__button {
  all: unset;
  display: flex;
  gap: 8px;
  align-items: center;
  cursor: pointer;
}
.button__icon {
}
.button__text {
  padding-top: 2px;
}
.header__character_name {
  text-align: center;
  padding-top: 12px;
}
.character_info {
}
@media only screen and (min-width: 775px) {
  .character_info {
    margin: 0 auto;
    width: 80%;
  }
}
@media only screen and (min-width: 1320px) {
  .character_info {
    margin: 0 auto;
    width: 70%;
  }
}
.character_info__item {
}
.character_info__homeworld {
  text-align: center;
  font-weight: 300;
  color: var(--color-light-gray);
  margin-bottom: 12px;
}
@media only screen and (min-width: 775px) {
  .character_info__homeworld {
    margin-bottom: 16px;
  }
}
.info__general {
  background-color: rgba(0, 0, 0, 0.3); /* --color-black */
  padding: 12px;
  border: 1px solid var(--color-white);
  border-radius: 12px;
}
.info__movies {
  padding: 12px;
}
@media only screen and (min-width: 775px) {
  .info__movies {
    padding-top: 16px;
  }
}
.movies__header {
  margin-bottom: 8px;
}
.movies__list {
  list-style: none;
}
.movies__list li {
  display: inline;
}
.movies__item {
}
.movies__item:hover {
  text-decoration: underline;
}
</style>
