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
  background-size: cover;
}
.container {
  border-left: 5px solid rgba(0, 0, 0, 0.9);
  border-right: 5px solid rgba(0, 0, 0, 0.9);
  background-color: rgba(0, 0, 0, 0.8);
  margin: 0 auto;
  width: 68.75%;
}
.header {
}
.header img {
  width: 100%;
}
.content {
  height: 100vh;
}
</style>
