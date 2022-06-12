<template>
  <div class="row">
    <Sidebar />
    <div class="col-12 col-xl-10">
      <Topbar v-model="menuOpen" />
      <div class="row p-5 pt-5 pb-0">
        <div class="row">
          <div class="col">
            <router-link to="/viruses/add">
              <actionButton
                backgroundColor="#5A58C3"
                content="Ajouter"
                type="submit"
              ></actionButton>
            </router-link>
          </div>
        </div>
        <div class="users pb-3 mt-4">
          <div
            class="search-field row d-flex justify-content-between p-3"
            style="height: 60px"
          >
            <div class="search-bar col">
              <p class="clpurple fwb">Tout les virus</p>
            </div>
            <div class="refresh col d-flex justify-content-end pt-2">
              <i
                class="fas fa-sync-alt clpurple"
                @click="refresh"
                style="cursor: pointer"
              ></i>
            </div>
          </div>
          <div class="users-field p-2 pb-0 pt-3">
            <router-view />
            <div class="body">
              <virusField
                v-for="(virus, i) in viruses[selectedPage - 1]"
                :virus="virus"
                :key="i"
              />
            </div>
            <div class="bottom">
              <pagination v-model="selectedPage" :itemsCount="viruses.length" />
            </div>
          </div>
        </div>
      </div>
      <Menu v-model="menuOpen" />
    </div>
  </div>
</template>
<script>
import Sidebar from "@/components/sidebar.vue";
import Topbar from "@/components/topbar.vue";
import Moradhji from "@/components/foot.vue";
import inputField from "@/components/users/inputField.vue";
import actionButton from "@/components/users/actionButton.vue";
import virusField from "@/components/virusField.vue";
import pagination from "@/components/users/pagination.vue";

export default {
  name: "dashboard",
  components: {
    inputField,
    actionButton,
    Sidebar,
    Topbar,
    Moradhji,
    virusField,
    pagination,
  },
  data() {
    return {
      menuOpen: false,
      viruses: [],
      nom: "",
      selectedPage: 1,
    };
  },
  mounted() {
    this.loader = this.$loading.show({
      blur: "10px",
      loader: "dots",
      color: "#5a58c3",
      opacity: 1,
    });
    this.$store
      .dispatch("GET_VIRUSES")
      .then((data) => {
        console.log(data);
        this.viruses = data;
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
    refresh() {
      this.loader = this.$loading.show({
        blur: "10px",
        loader: "dots",
        color: "#5a58c3",
        opacity: 1,
      });
      this.$store
        .dispatch("GET_VIRUSES")
        .then((data) => {
          console.log(data);
          this.viruses = data;
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
    addVirus() {
      this.loader = this.$loading.show({
        blur: "10px",
        loader: "dots",
        color: "#5a58c3",
        opacity: 1,
      });
      this.$store
        .dispatch("ADD_VIRUS", { name: this.nom })
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
  },
};
</script>
<style scoped>
.legend {
  margin: 0 !important;
  font-size: 12px;
  font-family: main-bold;
  color: #b6b6b6;
}
.users .body {
  height: 370px;
}
.users .bottom {
  margin-top: 20px;
  height: 50px;
  border-top: 1px solid #e6e6e6;
  display: flex;
  justify-content: center;
}
</style>
