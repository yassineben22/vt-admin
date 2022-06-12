<template>
  <div class="user-field row p-2 m-4 ms-2 me-2">
    <div class="col-6">
      <div class="infos">
        <span class="fw-bold">
          {{ user.fullName }}
          <span
            v-bind:class="[
              'infected-card ms-2',
              user.infected ? 'bgred' : 'bgblue',
            ]"
          >
            {{ user.infected ? "infecté" : "non infecté" }}
          </span>
        </span>
      </div>
    </div>
    <div class="actions m-0 col-6 d-flex justify-content-end">
      <div class="actions-icons d-flex pt-1">
        <router-link :to="{ name: 'modify', params: { uid: user.uid } }"
          ><i class="far fa-pencil-alt clblue me-3"></i
        ></router-link>
        <router-link :to="{ name: 'delete', params: { uid: user.uid } }"
          ><i class="far fa-trash-alt clred me-3"></i
        ></router-link>
        <router-link 
          :to="{ name: 'fullinfos', params: { uid: user.uid } }"
          >
          <!-- infos icon -->
          <i class="fas fa-info-circle clpurple"></i>
          </router-link
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "userField",
  props: {
    user: Object,
  },
  data() {
    return {};
  },
};
</script>
<style>
.user-name {
  font-size: 15px;
}
.user-field {
  border-radius: 11px;
  background-color: white;
  box-shadow: 0px 0px 13px 3px rgba(140, 140, 140, 0.12);
}
.infected-card {
  border-radius: 10px;
  padding: 5px;
  font-size: 10px;
  font-family: main-bold;
  color: white;
}
.user-infos {
  align-items: center;
}
.date-joined {
  font-size: 12px;
}
.actions-icons i {
  cursor: pointer;
}
.infos-button {
  background-color: #5a58c3 !important;
  color: white !important;
  padding: 8px;
  border: none;
  border-radius: 20px;
  font-size: 11px;
  font-weight: bold;
}
</style>
<style scoped>
a {
  text-decoration: none;
}
</style>
