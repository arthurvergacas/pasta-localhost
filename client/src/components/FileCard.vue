<template>
  <div>
    <div class="card mx-n2 px-n1 mb-2">
      <div class="card-body ml-n1">
        <div class="card-head mb-2 mt-n2">
          <div class="main-header">
            <h5 :title="name" class="card-title">{{ name }}</h5>
            <span class="size text-muted">{{size}}</span>
          </div>
          <h6 class="card-subtitle text-muted">{{ user }}</h6>
          <small class="text-muted">{{ up_date }}</small>
        </div>

        <div class="but">
          <button
            type="button"
            class="btn btn-secondary mt-2 mb-n4"
            @click="downloadFile(url, name)"
          >Download</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
function toDataURL(url) {
  return fetch(url)
    .then(response => {
      return response.blob();
    })
    .then(blob => {
      return URL.createObjectURL(blob);
    });
}

export default {
  props: {
    name: String,
    url: String,
    user: String,
    up_date: String,
    size: String
  },

  methods: {
    async downloadFile(url, name) {
      const a = document.createElement("a");
      a.href = await toDataURL(url);
      a.download = name;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(a.href);
      document.body.removeChild(a);
    }
  }
};
</script>

<style scoped>
.card {
  margin-top: 0.5rem;
  min-height: 11rem;
}

.card-head {
  min-height: 5rem;
}

.card-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1.3rem;

  line-height: normal;
}

.card-body {
  padding: 1.2rem 1rem;
}

.but {
  text-align: right;
}

.main-header {
  display: flex;
  justify-content: space-between;
}

.size {
  font-size: 0.9rem;
  white-space: nowrap;

  margin-right: -0.7rem;
  margin-top: 0.25rem;
  padding-left: 0.3rem;
}
</style>
