<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-center">
      <SearchBar class="mb-3" @searching="handleSearch" />
    </div>
    <FileList :key="shouldUpdate" :searchParam="search" />
    <FileUpload @file-uploaded="handleFileUpload" @file-uploading="handleFileUploading" />
  </div>
</template>

<script>
import FileList from "@/components/FileList.vue";
import FileUpload from "@/components/FileUpload.vue";
import SearchBar from "@/components/SearchBar.vue";

export default {
  data() {
    return {
      shouldUpdate: false,
      isUploading: false,
      search: ""
    };
  },

  components: {
    FileList,
    FileUpload,
    SearchBar
  },

  beforeCreate: function() {
    if (sessionStorage.token == "") {
      window.location.href = "/";
    }
  },

  created: function() {
    window.addEventListener("beforeunload", this.handleRefresh);
  },

  beforeDestroy() {
    window.removeEventListener("beforeunload", this.handleRefresh);
  },

  methods: {
    handleFileUpload() {
      this.shouldUpdate = !this.shouldUpdate;
      this.isUploading = false;
    },
    handleFileUploading() {
      this.isUploading = true;
    },
    handleRefresh(event) {
      if (!this.isUploading) return;
      event.preventDefault();
      event.returnValue = "";
    },

    handleSearch(search) {
      this.search = search;
    }
  },

  beforeRouteLeave(to, from, next) {
    if (this.isUploading) {
      const answer = window.confirm(
        "If you leave now, your files won't be submitted to the Pasta: Localhost!\nAre you sure you want to leave?"
      );
      if (answer) {
        next();
      } else {
        next(false);
      }
    }
  }
};
</script>


