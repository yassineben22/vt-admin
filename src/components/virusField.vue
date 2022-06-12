<template>
  <div class="user-field row p-2 m-4 ms-2 me-2">
    <div class="col-6">
      <div class="infos">
        <span class="fw-bold">
          {{ virus.virusName }}
          <span style="color: grey;font-size: 12px;">
              {{ virus.added }}
          </span>
        </span>
      </div>
    </div>
    <div class="actions m-0 col-6 d-flex justify-content-end">
      <div class="actions-icons d-flex pt-1">
        <router-link :to="{ name: 'modifier', params: { uid: virus.uid } }"
          ><i class="far fa-pencil-alt clblue me-3"></i
        ></router-link>
        <i class="far fa-trash-alt clred me-3 mt-1" @click="deleteVirus" style="cursor:pointer;"></i>
        <router-link 
          :to="{ name: 'infos', params: { uid: virus.uid } }"
          >
          <i class="fas fa-info-circle clpurple"></i>
          </router-link
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "virusField",
  props: {
    virus: Object,
  },
  data() {
    return {};
  },
  methods: {
    deleteVirus() {
      this.loader = this.$loading.show({
        blur: "10px",
        loader: "dots",
        color: "#5a58c3",
        opacity: 1,
      });
      this.$store
        .dispatch("DELETE_VIRUS", {
          uid: this.virus.uid,
        })
        .then((data) => {
          this.loader.hide();
          this.$swal.fire({
            icon: "success",
            title: data.msg,
          });
          this.redirectToUsers();
        })
        .catch((data) => {
          this.loader.hide();
          this.$swal.fire({
            icon: "error",
            title: data.response.data.msg,
          });
          if (data.response.status === 401) {
          this.$store.dispatch("LOGOUT");
        }
        });
    },
  }
};
</script>
<style scoped>
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
  background-color: red !important;
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
