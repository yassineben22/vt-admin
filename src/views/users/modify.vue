<template>
  <div class="Modal">
    <div class="Modal-content p-4">
      <h6 class="clpurple" style="font-family: main-bold">
        Modification de l'utilisateur
      </h6>
      <hr style="width: 40%; margin-bottom: 0" />
      <div class="inputs p-4" v-if="userExists">
        <form @submit.prevent="modifyForm">
          <div class="row d-flex justify-content-between">
            <div class="col-5">
              <inputField
                @focusout="handleFocusOut(0, 'text', nomComplet)"
                label="Nom complet"
                type="text"
                v-model="nomComplet"
                :readOnly="false"
              ></inputField>
              <span class="err-msg text-danger">{{ errors[0] }}</span>
            </div>
            <div class="col-5">
              <inputField
                @focusout="handleFocusOut(1, 'date', dateNaissance)"
                label="Date de naissance"
                type="date"
                v-model="dateNaissance"
                :readOnly="false"
              ></inputField>
              <span class="err-msg text-danger">{{ errors[1] }}</span>
            </div>
          </div>
          <div class="row mt-4 d-flex justify-content-between">
            <div class="col-5">
              <inputField
                @focusout="handleFocusOut(3, 'text', cin)"
                label="CIN"
                type="cin"
                v-model="cin"
                :readOnly="false"
              ></inputField>
              <span class="err-msg text-danger">{{ errors[3] }}</span>
            </div>
            <div class="col-5">
              <inputField
                @focusout="handleFocusOut(4, 'email', email)"
                label="Email"
                type="email"
                v-model="email"
                :readOnly="false"
              ></inputField>
              <span class="err-msg text-danger">{{ errors[4] }}</span>
            </div>
          </div>
          <div class="d-flex justify-content-center mt-4">
            <hr style="align-items: center; width: 90%" />
          </div>
          <div class="action-buttons d-flex justify-content-center mt-3">
            <router-link to="/users" class="me-5"
              ><actionButton
                backgroundColor="#73BEE0"
                content="Annuler"
                type="button"
              ></actionButton
            ></router-link>
            <actionButton
              v-if="userExists"
              backgroundColor="#5A58C3"
              content="Confirmer"
              type="submit"
            ></actionButton>
          </div>
        </form>
      </div>
      <div v-else>
        <h5 class="fw-bold mt-4 text-center">utilisateur introuvable!</h5>
        <div class="d-flex justify-content-center mt-4">
          <hr style="align-items: center; width: 90%" />
        </div>
        <div class="action-buttons d-flex justify-content-center mt-3">
          <router-link to="/users"
            ><actionButton
              backgroundColor="#73BEE0"
              content="retour"
              type="button"
            ></actionButton
          ></router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import router from "../../router";
import inputField from "@/components/users/inputField.vue";
import selectField from "@/components/users/selectField.vue";
import actionButton from "@/components/users/actionButton.vue";

export default {
  props: ["modelValue"],
  components: {
    inputField,
    actionButton,
    selectField,
  },
  created() {
    this.loader = this.$loading.show({
      blur: "10px",
      loader: "dots",
      color: "#5a58c3",
      opacity: 1,
    });
    this.$store
      .dispatch("GET_USER", { uid: this.uid })
      .then((data) => {
        if (data) {
          this.userExists = true;
          this.nomComplet = data.fullName;
          this.dateNaissance = this.formatDate(data.birthDate);
          this.cin = data.cin;
          this.username = data.username;
          this.email = data.email;
        }
        this.loader.hide();
      })
      .catch((data) => {
        if (data.response.status === 401) {
          this.loader.hide();
          this.$swal.fire({
            icon: "error",
            title: data.response.data.msg,
          });
          this.$store.dispatch("LOGOUT");
        }
      });
  },
  methods: {
    formatDate(date) {
      let exp = date.split("-");
      let month = exp[1];
      let day = exp[2];
      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;
      return exp[0] + "-" + month + "-" + day;
    },
    redirectToUsers() {
      router.push("/users");
    },
    modifyForm() {
      this.submitErrors();
      if (this.checkErrors()) {
        this.loader = this.$loading.show({
          blur: "10px",
          loader: "dots",
          color: "#5a58c3",
          opacity: 1,
        });
        this.$store
          .dispatch("MODIFY_USER", {
            uid: this.uid,
            fullName: this.nomComplet,
            birthDate: this.dateNaissance,
            cin: this.cin,
            email: this.email,
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
      }
    },
    handleFocusOut(pos, type, content) {
      if (type == "email") {
        if (content == "") {
          this.errors[pos] = "veuillez remplir ce champs";
          return false;
        } else if (content.length < 8) {
          this.errors[pos] = "ce champs doit contenir au moins 8 caracteres";
          return false;
        } else if (
          !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(
            content
          )
        ) {
          this.errors[pos] = "email invalide!";
          return false;
        } else {
          this.errors[pos] = "";
          return true;
        }
      } else if (type == "password") {
        if (content == "") {
          this.errors[pos] = "veuillez remplir ce champs";
          return false;
        } else if (content.length < 8 || content.length > 50) {
          this.errors[pos] = "ce champ doit contenir entre 8 et 50 caracteres";
          return false;
        } else if (
          !/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,50}$/.test(
            content
          )
        ) {
          this.errors[pos] =
            "ce champ doit contenir au moins une majuscule, un nombre et un caractere special";
          return false;
        } else {
          this.errors[pos] = "";
          return true;
        }
      } else if (type == "date") {
        if (
          !/^(\d{1,2}\/\d{1,2}\/\d{4,}|\d{4,}-\d{1,2}-\d{1,2})$/.test(content)
        ) {
          this.errors[pos] = "date invalide";
          return false;
        } else {
          this.errors[pos] = "";
          return true;
        }
      } else if (type == "text") {
        if (content == "") {
          this.errors[pos] = "veuillez remplir ce champs";
          return false;
        } else if (content.length < 5) {
          this.errors[pos] = "ce champs doit contenir au moins 5 caracteres";
          return false;
        } else {
          this.errors[pos] = "";
          return true;
        }
      } else {
        this.errors[pos] = "";
        return true;
      }
    },
    submitErrors() {
      this.handleFocusOut(0, "text", this.nomComplet);
      this.handleFocusOut(1, "date", this.dateNaissance);
      this.handleFocusOut(2, "text", this.cin);
      this.handleFocusOut(3, "text", this.email);
    },
    checkErrors() {
      for (let i = 0; i < this.errors.length; i++) {
        if (this.errors[i] != "") return false;
      }
      return true;
    },
    getAge(dateString) {
      var today = new Date();
      var birthDate = new Date(dateString);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    },
  },
  data() {
    return {
      userExists: null,
      uid: this.$route.params.uid,
      nomComplet: "",
      dateNaissance: "",
      cin: "",
      username: "",
      email: "",
      errors: ["", "", "", "", "", ""],
    };
  },
};
</script>
<style scoped>
.Modal-content {
  width: 60%;
}
hr {
  background-color: #cccccc;
}
.err-msg {
  font-size: 12px;
  font-family: main-bold;
}
</style>
