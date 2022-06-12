<template>
  <div class="Modal">
    <div class="Modal-content p-4">
      <h6 class="clpurple" style="font-family: main-bold">
        Les informations de l'utilisateur
      </h6>
      <hr style="width: 40%; margin-bottom: 0" />
      <div class="infos p-4" v-if="user != null">
        <div class="row">
          <div class="col-6 p-5">
            <table>
              <tr>
                <th>Nom complet</th>
                <td class="ps-3">{{ user.fullName }}</td>
              </tr>
              <tr>
                <th>Cin</th>
                <td class="ps-3">{{ user.cin }}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td class="ps-3">{{ user.email }}</td>
              </tr>
              <tr>
                <th>Infecté</th>
                <td class="ps-3">{{ user.infected ? "Oui" : "Non" }}</td>
              </tr>
            </table>
          </div>
          <div class="col-6">
            <p v-if="user == null">CHargement</p>
            <mapUser v-else :data="user.heat" />
          </div>
        </div>
        <div>
          <div class="row">
            <h5 class="clpurple fwb">Liste des contacts</h5>
          </div>
          <div class="contacts p-3 pt-4 mt-3">
            <div
              class="contact d-flex justify-content-between p-3"
              v-for="(contact, i) in user.contacts[selectedPage - 1]"
              :key="i"
            >
              <div>
                <span class="fw-bold">
                  {{ contact.fullName }}
                  <span
                    v-bind:class="[
                      'infected-card ms-2',
                      contact.infected ? 'bgred' : 'bgblue',
                    ]"
                  >
                    {{ contact.infected ? "infecté" : "non infecté" }}
                  </span>
                </span>
              </div>
              <div class="text-muted">
                <i class="fas fa-clock me-3"></i>
                <span>
                  {{ contact.contactTime.split(".")[0] }}
                </span>
              </div>
            </div>
            <div class="row d-flex-justify-content-center">
              <pagination
                v-model="selectedPage"
                :itemsCount="user.contacts.length"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- <div v-else class="text-center mt-4">
        <h5 class="fw-bold">utilisateur introuvable!</h5>
      </div> -->
      <div class="d-flex justify-content-center mt-4">
        <hr style="align-items: center; width: 90%" />
      </div>
      <div class="action-buttons d-flex justify-content-center mt-3">
        <router-link to="/users" :class="userExists ? 'me-5' : ''"
          ><actionButton
            backgroundColor="#73BEE0"
            :content="userExists ? 'Annuler' : 'retour'"
            type="button"
          ></actionButton
        ></router-link>
        <router-link
          :to="{ name: 'modify', params: { uid: uid } }"
          v-if="userExists"
        >
          <actionButton
            backgroundColor="#5A58C3"
            content="Modifier"
            type="button"
          ></actionButton>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import inputField from "@/components/users/inputField.vue";
import actionButton from "@/components/users/actionButton.vue";
import mapUser from "@/components/users/mapUser.vue";
import pagination from "@/components/users/pagination.vue";

export default {
  components: {
    inputField,
    actionButton,
    mapUser,
    pagination,
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
        this.user = data;
        console.log(this.user);
        this.loader.hide();
      })
      .catch((data) => {
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
  },
  data() {
    return {
      userExists: null,
      uid: this.$route.params.uid,
      user: null,
      selectedPage: 1,
    };
  },
};
</script>
<style scoped>
.Modal-content {
  width: 60%;
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
.contacts {
  background-color: white;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}
.contact {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
}
.contacts .contact {
  margin-bottom: 20px;
}
.contacts .contact:last-child {
  margin-bottom: 10px;
}
</style>
