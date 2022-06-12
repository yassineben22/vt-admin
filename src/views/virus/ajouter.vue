<template>
  <div class="Modal">
    <div class="Modal-content p-4">
      <h6 class="clpurple" style="font-family: main-bold">Ajouter virus</h6>
      <hr style="width: 40%; margin-bottom: 0" />
      <div class="containr row p-5 pb-0">
        <div class="row m-0 p-0">
          <div class="col-4">
            <div class="input-field">
              <label class="fwb"
                >Nom du virus <span class="text-danger">*</span></label
              >
              <input type="text" v-model="nom_virus" />
            </div>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-4">
            <div class="input-field">
              <label class="fwb"
                >Symptomes <span class="text-danger">*</span></label
              >
              <input
                type="text"
                class="mt-3"
                v-for="(symptome, i) in symptomes"
                :key="i"
                v-model="symptome.nom_symptome"
              />
            </div>
          </div>
          <div class="col-1">
            <button
              class="btn bgpurple text-white"
              style="padding: 4px 9px; margin-top: 40px"
              @click="symptomes.push({ nom_symptome: '' })"
            >
              <i class="fas fa-plus"></i>
            </button>
          </div>
        </div>
      </div>

      <div class="d-flex justify-content-center">
        <hr style="align-items: center; width: 90%" />
      </div>
      <div class="action-buttons d-flex justify-content-center mt-3">
        <router-link to="/viruses" class="me-5"
          ><actionButton
            backgroundColor="#73BEE0"
            content="Annuler"
            type="button"
          ></actionButton
        ></router-link>
          <actionButton
            @click="addVirus"
            backgroundColor="#5A58C3"
            content="Ajouter"
            type="button"
          ></actionButton>
      </div>
    </div>
  </div>
</template>
<script>
import inputField from "@/components/users/inputField.vue";
import actionButton from "@/components/users/actionButton.vue";

export default {
  components: {
    inputField,
    actionButton,
  },
  data() {
    return {
      nom_virus: "",
      symptomes: [
        {
          nom_symptome: "",
        },
      ],
    };
  },
  methods: {
      addVirus() {
          console.log(this.nom_virus, this.symptomes[1].nom_symptome);
      this.loader = this.$loading.show({
        blur: "10px",
        loader: "dots",
        color: "#5a58c3",
        opacity: 1,
      });
      this.$store
        .dispatch("ADD_VIRUS", { name: this.nom_virus, symptomes: this.symptomes })
        .then((data) => {
          this.$router.push("/viruses");
          this.loader.hide();
          this.$swal.fire({
            icon: "success",
            title: data.msg,
          });
        })
        .catch((data) => {
            this.$router.push("/viruses");
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
.Modal-content {
  width: 60%;
}
.containr {
  height: 350px;
  overflow: scroll;
}
.side {
  position: initial;
}
hr {
  background-color: #cccccc;
}
.err-msg {
  font-size: 12px;
  font-family: main-bold;
}
</style>
