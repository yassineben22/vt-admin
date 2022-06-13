<template>
  <router-view></router-view>
  <div class="row">
    <div class="col-9 ps-5">
      <div class="personnal-infos pt-4">
        <h6 class="fwb clpurple">Informations Personnels</h6>
        <hr />
        <div class="inputs pe-5 mt-3 row d-flex justify-content-between">
          <inputField
            class="col-5"
            label="Nom"
            type="text"
            v-model="nomValue"
            :readOnly="false"
          >
          </inputField>
          <inputField
            class="col-5"
            label="Prenom"
            type="text"
            v-model="prenomValue"
            :readOnly="false"
          >
          </inputField>
        </div>
      </div>
      <div class="security-infos mt-5">
        <h6 class="fwb clpurple">Informations et securité</h6>
        <hr />
        <p class="fwb mt-3">Email</p>
        <p>
          Votre adresse email actuel est:
          <span class="clpurple fwb">{{ email }}</span>
        </p>
        <div class="d-flex mt-2">
          <input type="email" v-model="newEmail" />
        </div>
      </div>
    </div>
  </div>
  <div class="d-flex justify-content-end pt-4 mt-5">
    <button class="confirm-button" @click="modifyAdmin">Confirmer</button>
  </div>
</template>
<script>
import inputField from "@/components/users/inputField.vue";
export default {
  components: {
    inputField,
  },
  data() {
    return {
      email: "",
      newEmail: "",
      nomValue: "",
      prenomValue: "",
    };
  },
  methods: {
    modifyAdmin(){
      this.loader = this.$loading.show({
          blur: "10px",
          loader: "dots",
          color: "#5a58c3",
          opacity: 1,
        });
        this.$store
          .dispatch("MODIFY_ADMIN", {
            email: this.newEmail == "" ? this.email : this.newEmail,
            nom: this.nomValue,
            prenom: this.prenomValue,
          })
          .then((data) => {
            this.loader.hide();
            this.$router.go();
          })
          .catch((data) => {
            console.log(data);
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
  mounted() {
    this.loader = this.$loading.show({
      blur: "10px",
      loader: "dots",
      color: "#5a58c3",
      opacity: 1,
    });
    this.$store
      .dispatch("GET_ADMIN")
      .then((data) => {
        this.prenomValue = data.firstName;
        this.nomValue = data.lastName;
        this.email = data.email;
        this.loader.hide();
      })
      .catch((err) => {
        this.loader.hide();
          this.$swal.fire({
            icon: "error",
            title: err.response.data.msg,
          });
        if (data.response.status === 401) {
          this.$store.dispatch("LOGOUT");
        }
      });
  },
};
</script>
<style scoped>
.image-circle {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0px 0px 13px 7px rgba(94, 94, 94, 0.12);
}
.infos-button {
  cursor: pointer;
  font-size: 13px;
}
.delete-photo {
  font-size: 12px;
  font-family: main-bold;
}
hr {
  margin: 0;
  width: 45%;
}
.security-infos input {
  width: 40%;
  padding: 5px 10px 5px 10px;
  height: 35px;
  border: 2px solid #5a58c3;
  border-radius: 17px;
  text-align: center;
  outline: none;
  font-size: 15px;
  background: none;
}
button {
  border: none;
  outline: none;
}
.modify-button {
  border: none;
  background-color: #5a58c3;
  height: 30px;
  border-radius: 17px;
  font-size: 14px;
  color: white;
}
.confirm-button {
  background-color: #5a58c3;
  border-radius: 17px;
  padding: 5px 10px 5px 10px;
  color: white;
  font-family: main-bold;
  font-size: 14px;
}
.fwb {
  font-family: main-bold;
}
p {
  margin: 0;
}
a {
  text-decoration: none;
}
</style>
