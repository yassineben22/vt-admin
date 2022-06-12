<template>
  <button
    v-bind:type="type"
    v-bind:style="{ backgroundColor: backgroundColor }"
  >
    {{ content }}
  </button>
</template>

<script>
export default {
  props: ["type", "backgroundColor", "content"],
};
</script>

<style scoped>
button {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: none;
  border-radius: 20px;
  padding: 5px 20px 5px 20px;
  font-size: 16px;
  font-family: main-bold;
  color: white
}
</style>
