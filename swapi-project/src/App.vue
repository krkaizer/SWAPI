<template>
  <div class="container">
    <header class="header">
      <img src="./img/star-wars-logo-cropped.jpg" alt="" />
    </header>
    <Transition>
      <section class="content" v-show="!selectedCharacter">
        <CharacterList v-bind:selectCharacter="selectCharacter"></CharacterList>
      </section>
    </Transition>

    <Transition>
      <div class="character" v-if="selectedCharacter">
        <CharacterDetail
          v-bind:selectCharacter="selectCharacter"
          v-bind:selectedCharacter="selectedCharacter"
        ></CharacterDetail></div
    ></Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CharacterList from "./components/CharacterList.vue";
import CharacterDetail from "./components/CharacterDetail.vue";

const selectedCharacter = ref<any>(null);
// эту функцию передаю детям
function selectCharacter(character: any) {
  selectedCharacter.value = character;
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #ffffff;
  /* margin-top: 60px; */
}
body {
  background-image: url(@/img/coruscant-star-wars-skyscraper.jpg);
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
}
.container {
  background-color: rgba(0, 0, 0, 0.8);
  margin: 0 auto;
  min-width: 343px;
  width: 91.5%;
}
@media only screen and (min-width: 775px) {
  .container {
    min-width: 775px;
    width: 92.8%;
  }
}
@media only screen and (min-width: 1320px) {
  .container {
    min-width: 1320px;
    width: 68.75%;
  }
}
.header {
}
.header img {
  max-width: 100%;
  object-fit: cover;
  min-height: 150px;
}
@media only screen and (min-width: 775px) {
  .header img {
    width: 100%;
  }
}
.content {
  min-height: 100vh;
}
.character {
  min-height: 100vh;
  padding: 12px 24px;
}
@media only screen and (min-width: 1320px) {
  .character {
    padding: 24px 24px;
  }
}
.error {
  padding-top: 24px;
  text-align: center;
  color: red;
  font-weight: bold;
}
.loading {
  padding-top: 24px;
  text-align: center;
}
/* transition */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
/* transition group */
/* .list-enter-active,
.list-leave-active {
  transition: opacity 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
} */
</style>
