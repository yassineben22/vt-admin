<template>
  <div class="Modal">
    <div class="Modal-content p-4 pb-5">
      <div class="row d-flex justify-content-end pe-5">
          <router-link to="/dashboard" style="width: 25px">
            <i class="fas fa-times fa-2x" style="color: #5a58c3"></i>
          </router-link>
      </div>
      <div class="row">
          <div class="col-6">
              <h5 class="fw-bold clpurple">Lieux des personnes contaminés</h5>
              <heatMap1 />
          </div>
          <div class="col-6">
              <h5 class="fw-bold clpurple">Lieux de contact des personnes contaminés</h5>
              <heatMap2 />
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import inputField from "@/components/users/inputField.vue";
import actionButton from "@/components/users/actionButton.vue";
import heatMap1 from "@/components/dashboard/heatMap1.vue";
import heatMap2 from "@/components/dashboard/heatMap2.vue";

export default {
  components: {
    inputField,
    actionButton,
    heatMap1,
    heatMap2,
  }
};
</script>
<style scoped>
.Modal-content {
  width: 90%;
}
a {
  color: white;
  text-decoration: none;
}
a:hover {
  color: white;
}
</style>
