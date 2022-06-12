<template>
  <div class="Modal">
    <div class="Modal-content p-4">
      <h6 class="clpurple" style="font-family: main-bold">Informations virus</h6>
      <hr style="width: 40%; margin-bottom: 0" />
      <div class="containr row p-5 pb-0">
        <div class="row m-0 p-0">
          <div class="col-4">
            <div class="input-field">
              <label class="fwb"
                >Nom du virus <span class="text-danger">*</span></label
              >
              <input type="text" v-model="virus.name" readonly />
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
                readonly
                v-for="(symptome, i) in virus.symptomes"
                :key="i"
                v-model="symptome.name"
              />
            </div>
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
            content="Retour"
            type="button"
          ></actionButton
        ></router-link>
      </div>
    </div>
  </div>
</template>
<script>
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
  data() {
    return {
      uid: this.$route.params.uid,
      virus: {},
    };
  },
  mounted(){
    this.loader = this.$loading.show({
      blur: "10px",
      loader: "dots",
      color: "#5a58c3",
      opacity: 1,
    });
    this.$store
      .dispatch("GET_VIRUS", { uid: this.uid })
      .then((data) => {
        this.virus = data;
        this.loader.hide();
      })
      .catch((data) => {
        this.$router.push("/viruses");
        this.loader.hide();
        this.$swal.fire({
          position: "top-end",
          icon: "error",
          title: data.response.data.msg,
          showConfirmButton: false,
          timer: 2500,
          iconColor: "#5a58c3",
          timerProgressBar: true,
        });
        if (data.response.status === 401) {
          this.$store.dispatch("LOGOUT");
        }
      });
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
