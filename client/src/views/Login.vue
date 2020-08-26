<template>
  <div class="login">
    <div class="spinner-border text-secondary" role="status" v-if="isLoading">
      <span class="sr-only">Loading...</span>
    </div>

    <h1 id="title">
      Pasta:
      <span id="localhost">Localhost</span>
    </h1>

    <form @submit.prevent="login">
      <input
        type="text"
        spellcheck="false"
        v-model="name"
        v-on:change="message = ''"
        placeholder="Digite seu nome"
        id="input"
      />
      <button type="submit" @keypress.enter="login" id="button">Login</button>
    </form>

    <div class="container message-wrapper d-flex flex-column">
      <div class>
        <span id="user-not-found" v-bind:class="{ logged: auth }">{{ message }}</span>
      </div>

      <div class>
        <button id="button" @click="goToSignIn">Sign In</button>
      </div>
    </div>
  </div>
</template>

<script>
import config from "@/config.js";

const API_URL = config.url;

export default {
  data: function() {
    return {
      name: "",
      auth: false,
      message: "",
      isLoading: false
    };
  },

  mounted: function() {
    if (sessionStorage.token) {
      window.location.href = "/#/main";
    }
  },

  methods: {
    login() {
      const name = this.name;
      if (name === "") {
        this.message = "Enter your username";
        return;
      }
      this.isLoading = true;
      // Send the name to the api to validate
      fetch(`${API_URL}/log-in`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name })
      })
        .then(response => {
          this.isLoading = false;

          // throw error
          if (response.status != 200) {
            throw new Error("User not found");
          }

          return response.json();
        })
        .then(result => {
          // set auth to true
          this.auth = true;
          this.message = "Logging complete! Redirecting...";
          // store JWT token in browser session
          sessionStorage.token = result.token;
          window.location.href = "/#/main";
        })
        .catch(() => {
          this.isLoading = false;
          this.message = "User not signed in";
        });
    },

    goToSignIn() {
      window.location.href = "/#/sign-in";
    }
  }
};
</script>

<style scoped>
.login {
  text-align: center;
  position: absolute;
  top: 50%;
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

.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

#user-not-found {
  font-size: 20px;
  color: #c83f3f;
}

.message-wrapper {
  position: fixed;
  margin-top: 1rem;
}

.logged {
  color: #17c258 !important;
}

#title {
  margin-bottom: 30px;
}
</style>
