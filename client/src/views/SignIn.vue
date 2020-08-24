<template>
  <div class="sign-in">
    <div class="spinner-border text-secondary" role="status" v-if="isLoading">
      <span class="sr-only">Loading...</span>
    </div>

    <div class="text-left">
      <a href="/" class="back-link">Voltar</a>
    </div>
    <form @submit.prevent="signIn">
      <input
        type="text"
        spellcheck="false"
        v-model="name"
        v-on:change="notValid = false"
        placeholder="Digite seu nome"
        id="input"
      />
      <button type="submit" id="button">Cadastrar</button>
    </form>

    <div class="container message-wrapper d-flex flex-column">
      <div class>
        <span id="invalid-wrapper" :class="{ invalid: notValid }">Usuário já existente</span>
      </div>
    </div>
  </div>
</template>

<script>
import config from "@/config.js";

const API_URL = config.url;

export default {
  data() {
    return {
      name: "",
      notValid: false,
      isLoading: false
    };
  },

  methods: {
    async signIn() {
      this.isLoading = true;
      let response = await fetch(`${API_URL}/sign-in`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: this.name })
      });

      response = await response.json();

      this.isLoading = false;

      if (response.message == "Nome de usuário já existe.") {
        this.notValid = true;
      } else {
        window.location.replace("/");
      }
    }
  }
};
</script>

<style scoped>
.sign-in {
  text-align: center;
  position: absolute;
  top: 53%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#input {
  font-size: 20px;

  box-sizing: border-box;
  padding: 6px 15px;
  border-radius: 15px;
  transition: 0.25s;

  border: none;
}

#input:focus {
  outline: none;
  color: #f8e4dd;
  background-color: #7a9090;
}

#input:focus::placeholder {
  color: #f8e4ddb0;

  transition: 0.25s;
}

#button {
  margin-left: 10px;
  margin-top: 10px;
  padding: 8px;
  border: none;
  border-radius: 20px;

  font-size: 20px;

  transition: 0.25s;
}

#button:hover {
  transition: 0.25s;

  color: #f8e4dd;
  background-color: #7a9090;
}

#button:focus {
  outline: none;
  color: #f8e4dd;
  background-color: #546464;
}

#invalid-wrapper {
  font-size: 20px;
  color: #c83f3f;

  display: none;
}

.invalid {
  display: contents !important;
}

.message-wrapper {
  position: fixed;
  margin-top: 1rem;
}

.back-link {
  color: #473e3e;
  font-size: 1.3rem;
}

.back-link:link {
  text-decoration: none;
}

.back-link:hover {
  color: #756d6d;
}
</style>