<template>
  <div class="container">
    <header class="header">
      <img src="./img/star-wars-logo-cropped.jpg" alt="" />
    </header>
    <!-- <div class="search_bar">
      <input
        type="search"
        name=""
        id=""
        placeholder="Enter character name..."
      />
    </div> -->
    <div class="content">
      <CharacterList></CharacterList>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CharacterList from "./components/CharacterList.vue";

export default defineComponent({
  name: "App",
  components: {
    CharacterList,
  },
});
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
</style>
