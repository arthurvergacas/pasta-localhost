<template>
  <div id="app">
    <!-- NAVBAR -->
    <nav id="nav" class="d-flex flex-row">
      <div class="mr-auto p-2">
        <h1 id="header-title">
          Pasta:
          <span id="localhost">Localhost</span>
        </h1>
      </div>
      <div class="p-2 align-self-center">
        <button type="button" @click="logOut" class="btn btn-outline-dark logout">Sair</button>
      </div>
    </nav>

    <!-- this controls which page should be displayed -->
    <div class="container">
      <router-view />
    </div>

    <!-- footer -->
    <footer class="footer">
      <div class="container">
        <span class="text-muted">
          Feito por
          <a class="footer-link" href="https://github.com/arthurvergacas">Arthur Vergaças</a>
        </span>
      </div>
    </footer>
  </div>
</template>

<script>
import config from "@/config.js"

const API_URL = config.url;

export default {
  methods: {
    async logOut() {
      await fetch(`${API_URL}/log-out`, {
        method: "POST"
      });

      sessionStorage.token = "";
      window.location.replace("/");
    }
  }
};
</script>

<style>
* {
  font-family: "Open Sans", Arial, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html {
  height: 100%;
  box-sizing: border-box;
}

body {
  position: relative;
  margin: 0;

  min-height: 100%;
  box-sizing: border-box;

  padding-bottom: 60px;
}

#nav {
  text-align: left;
  padding: 0.2rem;
  background: #b9b6b6;
}

#localhost {
  font-family: "Orbitron", sans-serif;
  font-weight: 100;
}

#header-title {
  font-size: 35px;

  margin: 10px;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.footer {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;

  height: 60px;
  line-height: 60px;
  background-color: #f5f5f5;

  text-align: center;

  font-size: 1.1rem;
}

.footer-link {
  color: #473e3e;
}

.footer-link:link {
  text-decoration: none;
}

.footer-link:hover {
  color: #756d6d;
}

.logout {
  font-size: 1.1rem;
}

.dz-message {
  width: 100%;
}
</style>
