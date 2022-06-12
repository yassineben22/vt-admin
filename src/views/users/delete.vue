<template>
  <div class="Modal">
    <div class="Modal-content p-3">
      <div class="warning d-flex">
        <img src="@/assets/images/warning.png" width="65" height="65" />
        <div class="col text-center p-1">
          <p class="bold-warning">
            Voulez vous vraiment supprimer l'utilisateur?
          </p>
          <p class="light-warning">
            en cliquant sur Confirmer, l'utilisateur va étre suppprimé
            définitivement de la base de données.
          </p>
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <hr style="margin: 0; background-color: #8c8c8c; width: 90%" />
      </div>
      <div class="action-buttons d-flex justify-content-center mt-3">
        <router-link to="/users" class="me-5"
          ><actionButton
            backgroundColor="#5a58c3"
            content="Annuler"
            type="button"
          ></actionButton
        ></router-link>
        <actionButton
          @click="confirmButton"
          backgroundColor="#EC3737"
          content="Confirmer"
          type="button"
        ></actionButton>
      </div>
    </div>
  </div>
</template>
<script>
import actionButton from "@/components/users/actionButton.vue";
import router from "../../router";
export default {
  components: {
    actionButton,
  },
  methods: {
    redirectToUsers() {
      router.push("/users");
    },
    confirmButton() {
      this.loader = this.$loading.show({
        blur: "10px",
        loader: "dots",
        color: "#5a58c3",
        opacity: 1,
      });
      this.$store
        .dispatch("DELETE_USER", {
          uid: this.uid,
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
          this.redirectToUsers();
          this.loader.hide();
          this.$swal.fire({
            position: "top-end",
            icon: "error",
            title: data.response.msg,
            showConfirmButton: false,
            timer: 2500,
            iconColor: "#5a58c3",
            timerProgressBar: true,
          });
          if (data.response.status === 401) {
            this.$store.dispatch("LOGOUT");
          }
        });
    },
  },
  data() {
    return {
      uid: this.$route.params.uid,
    };
  },
};
</script>
<style scoped>
.Modal-content {
  width: 25%;
}
.bold-warning {
  font-size: 15px;
  font-family: main-bold;
  margin: 0;
}
.light-warning {
  font-size: 10px;
  color: #8c8c8c;
  font-family: main-bold;
}
.action-buttons button {
  font-size: 13px;
}
</style>
