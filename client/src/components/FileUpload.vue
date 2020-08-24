<template>
  <vueDropzone
    ref="dropzone"
    id="dropzone"
    :useCustomSlot="true"
    :options="dropzoneOptions"
    @vdropzone-file-added="handleFileAdded"
    @vdropzone-total-upload-progress="handleProgress"
    @vdropzone-complete-multiple="handleComplete"
    :class="{ 'dropzone-inactive': sendingFile }"
    class="row"
  >
    <!-- if there are no files being sent -->
    <div class="dropzone-content" v-if="!sendingFile">
      <h3 class="dropzone-title">Solte seus arquivos aqui para fazer o upload!</h3>
      <small class="subtitle">... ou clique para selecionar um arquivo do seu computador</small>
    </div>

    <!-- if there are files being sent -->
    <!-- progress bar -->
    <div class="progress" v-if="sendingFile">
      <div
        class="progress-bar progress-bar-striped progress-bar-animated bg-success"
        role="progressbar"
        :style="{ width: progress + '%' }"
        :aria-valuenow="progress"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>

    <div v-if="sendingFile" class="files-sending row">
      <UploadCard
        v-for="file in filesBeingSent"
        :key="file.name"
        :name="file.name"
        :size="file.size"
        class="upload-card"
      />
    </div>
  </vueDropzone>
</template>

<script>
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";

import prettyBytes from "pretty-bytes";
import UploadCard from "@/components/UploadCard.vue";
import config from "@/config.js";

const API_URL = config.url;

export default {
  components: {
    vueDropzone: vue2Dropzone,
    UploadCard
  },

  data() {
    return {
      dropzoneOptions: {
        url: `${API_URL}/upload`,
        maxFilesize: 1024,
        headers: {
          "x-access-token": sessionStorage.token
        },
        paramName: function() {
          return "file";
        },
        dictDefaultMessage: "Faça o upload aqui",
        includeStyling: false,
        previewsContainer: false,
        uploadMultiple: true,
        parallelUploads: 20
      },

      sendingFile: false,
      filesBeingSent: [],
      progress: 0
    };
  },

  methods: {
    handleFileAdded(file) {
      this.sendingFile = true;

      // create file object with data needed
      const fileData = {
        name: file.name,
        size: prettyBytes(file.size)
      };
      this.filesBeingSent.push(fileData);

      // emit to parent that file is being uploaded
      this.$emit("file-uploading");
    },
    handleProgress(progress) {
      // handle single progress bar
      this.progress = progress;
    },
    handleComplete() {
      this.sendingFile = false;
      this.progress = 0;
      this.filesBeingSent = [];

      // emit to parent that upload is completed
      this.$emit("file-uploaded");
    }
  }
};
</script>

<style scoped>
.container #dropzone {
  margin-top: 2rem;
  margin-bottom: 2rem;

  border: none;
  border-radius: 4px;
  background: #cfcdcd;

  cursor: default;

  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
}

.dropzone-content {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;

  cursor: default;
}

.dropzone-inactive {
  pointer-events: none;
  cursor: default;
}

.dropzone-content .dropzone-title {
  margin-top: 0rem;
  color: #546464;

  cursor: default;
}

.subtitle {
  margin-top: 5rem;

  color: #7a9090;
  font-size: 1.2rem;

  transition: ease 0.25s;
}

.subtitle:hover {
  color: #4e5858;
}

#dropzone .files-sending {
  display: flex;
  flex-direction: row;

  justify-content: center;
  align-items: center;

  margin-left: 0rem;

  width: 100%;
}

.upload-card {
  margin: 0.5rem;
}

.progress {
  margin-bottom: 1rem;
  margin-top: -1rem;
}
</style>
