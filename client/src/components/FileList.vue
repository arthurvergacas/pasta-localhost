<template>
  <div class="container file-container">
    <div class="row">
      <FileCard
        v-for="file in shownFiles"
        :key="file.id"
        class="col-lg-3"
        :name="file.name"
        :url="file.fileUrl"
        :user="file.userName"
        :up_date="file.uploaded_at"
        :size="file.size"
      />
    </div>
  </div>
</template>

<script>
import FileCard from "./FileCard.vue";
import prettyBytes from "pretty-bytes";
import config from "@/config.js";

const API_URL = config.url;

export default {
  components: {
    FileCard
  },

  props: {
    searchParam: String
  },

  data() {
    return {
      files: [],
      shownFiles: []
    };
  },

  watch: {
    searchParam: function(val) {
      if (val) {
        // reset shownFiles
        this.shownFiles = [...this.files];

        // filter showFiles to only show that ones which name contains the search value
        this.shownFiles = this.shownFiles.filter(
          file =>
            file.name.toLowerCase().includes(val.toLowerCase()) ||
            file.userName.toLowerCase().includes(val.toLowerCase())
        );
      } else {
        this.shownFiles = [...this.files];
      }
    }
  },

  methods: {
    async getFiles() {
      const results = await fetch(`${API_URL}/file`, {
        headers: {
          "x-access-token": sessionStorage.token
        }
      });

      if (results.status == 403) {
        sessionStorage.token = "";
        window.location.replace("/");
      }

      this.files = await results.json();

      this.files = this.files.map(file => {
        const date = new Date(`${file.uploaded_at} UTC`);

        const dateString = `${date.getDate()}/${date.getMonth() +
          1}/${date.getFullYear()} às ${(date.getHours() < 10 ? "0" : "") +
          date.getHours()}:${(date.getMinutes() < 10 ? "0" : "") +
          date.getMinutes()}`;

        file.size = prettyBytes(file.size);

        return {
          ...file,
          uploaded_at: dateString
        };
      });

      this.files.reverse();
      this.shownFiles = [...this.files];
    }
  },

  mounted: function() {
    this.getFiles();
  }
};
</script>

<style scoped>
.file-container {
  max-width: 1000px;
  height: 400px;
  max-height: 500px;

  border-radius: 10px;

  overflow-y: auto;

  background: #cfcdcd;
}
</style>
