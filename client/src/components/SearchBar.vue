<template>
  <input
    type="text"
    spellcheck="false"
    v-model="search"
    class="search"
    placeholder="Pesquise um usuário ou arquivo"
  />
</template>

<script>
export default {
  data: function() {
    return {
      search: ""
    };
  },

  watch: {
    search: function() {
      this.$emit("searching", this.search);
    }
  }
};
</script>

<style>
.search {
  font-size: 20px;

  box-sizing: border-box;
  padding: 6px 15px;
  border-radius: 15px;
  transition: 0.25s;

  width: 90%;

  border: solid;
  border-color: #7a9090;
}

.search:focus {
  outline: none;
  color: #f8e4dd;
  background-color: #7a9090;
}

.search::placeholder {
  font-size: 1.05rem;
}

.search:focus::placeholder {
  color: #f8e4ddb0;

  transition: 0.25s;
}
</style>