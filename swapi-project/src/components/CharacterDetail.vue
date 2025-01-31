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
  <div v-if="!isDataLoaded" class="loading">Loading...</div>
  <div v-if="isDataLoaded" class="character_info">
    <h4 class="character_info__item character_info__homeworld">
      from {{ characterHomeworld }}
    </h4>
    <div class="info__general">
      <p class="character_info__item">
        Birth year:
        {{ character.birth_year }}
      </p>
      <p class="character_info__item">Gender: {{ character.gender }}</p>
      <p class="character_info__item">Mass: {{ character.mass }} kg</p>
      <p class="character_info__item">Height: {{ character.height }} cm</p>
    </div>
  </div>
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
const errorMessage = ref<string>("");
const isDataLoaded = ref(false);

async function getHomeworld() {
  try {
    const response = await axios.get(character.value.homeworld);
    characterHomeworld.value = response.data.name;
  } catch (error: any) {
    console.log(error.message);
    errorMessage.value = "Homeworld loading failed";
  }
  if (characterHomeworld.value) {
    isDataLoaded.value = true;
  }
}

onMounted(() => {
  getHomeworld();
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
@media only screen and (min-width: 775px) {
  .info__general {
    margin: 0 auto;
    width: 80%;
  }
}
@media only screen and (min-width: 1320px) {
  .info__general {
    margin: 0 auto;
    width: 70%;
  }
}
</style>
