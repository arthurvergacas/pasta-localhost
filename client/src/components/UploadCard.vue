<template>
  <div class="card text-center" style="width: 10rem;">
    <div class="card-body">
      <h5 class="card-title" :title="name">{{name}}</h5>
      <p class="card-text">{{size}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    size: String
  }
};
</script>

<style scoped>
.card-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  line-height: normal;
}
.card {
  margin-top: 0.5rem;
  min-height: 5rem;
}

.card-head {
  min-height: 5rem;
}
</style>