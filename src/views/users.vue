<template>
  <div class="row">
    <Sidebar />
    <div class="col-12 col-xl-10">
      <Topbar v-model="menuOpen" />
      <div class="row p-5 pb-0 pt-4">
        <div class="users pb-1">
          <div class="search-field row p-3 d-flex justify-content-between">
            <div class="search-bar col-6">
              <form @submit.prevent="searchSubmit">
                <input
                  type="text"
                  v-model="searchValue"
                  placeholder="Entrez l'id ou le nom de l'utilisateur"
                />
                <button class="ms-2" type="submit">
                  <i class="far fa-search clblue"></i>
                </button>
              </form>
            </div>
            <div class="refresh d-flex justify-content-end pt-2 col">
              <i class="fas fa-sync-alt clblue clblue" @click="refresh" style="cursor: pointer;"></i>
            </div>
          </div>
          <div class="users-field p-2 pb-0 pt-3">
            <router-view />
            <div class="body">
              <p class="ps-2 legend">Tout les utilisateurs</p>
              <h4 v-if="users.length == 0" class="mt-3 text-center">
                Pas d'utilisateurs trouvés!
              </h4>
              <userField
                v-for="(user, i) in users[selectedPage - 1]"
                :user="user"
                :key="i"
              />
            </div>
            <div class="bottom">
              <pagination v-model="selectedPage" :itemsCount="users.length" />
            </div>
          </div>
        </div>
        <Moradhji />
      </div>
      <Menu v-model="menuOpen" />
    </div>
  </div>
</template>
<script>
import userField from "@/components/users/userField.vue";
import pagination from "@/components/users/pagination.vue";
import Sidebar from "@/components/sidebar.vue";
import Topbar from "@/components/topbar.vue";
import Moradhji from "@/components/foot.vue";

export default {
  name: "users",
  components: { userField, Sidebar, Topbar, Moradhji, pagination },
  mounted() {
    this.loader = this.$loading.show({
      blur: "10px",
      loader: "dots",
      color: "#5a58c3",
      opacity: 1,
    });
    this.$store
      .dispatch("GET_USERS")
      .then((data) => {
        this.users = data;
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
      menuOpen: false,
      searchValue: "",
      users: [],
      selectedPage: 1,
    };
  },
  methods: {
    searchSubmit() {
      this.loader = this.$loading.show({
        blur: "10px",
        loader: "dots",
        color: "#5a58c3",
        opacity: 1,
      });
      this.interval == null;
      if (this.searchValue == "") {
        this.$store
          .dispatch("GET_USERS")
          .then((data) => {
            this.users = data;
            this.loader.hide();
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
      } else {
        this.$store
          .dispatch("SEARCH_USERS", { searchValue: this.searchValue })
          .then((data) => {
            this.users = data;
            this.loader.hide();
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
    refresh() {
      this.loader = this.$loading.show({
        blur: "10px",
        loader: "dots",
        color: "#5a58c3",
        opacity: 1,
      });
      this.$store
        .dispatch("GET_USERS")
        .then((data) => {
          this.users = data;
          this.loader.hide();
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
    logout() {
      this.$store.dispatch("LOGOUT");
    },
  },
};
</script>
<style>
.legend {
  margin: 0 !important;
  font-size: 12px;
  font-family: main-bold;
  color: #b6b6b6;
}
.users {
  width: 100%;
  height: 600px;
  border-radius: 17px;
  background-color: white;
  box-shadow: 0px 0px 28.0969px 6.4839px rgba(140, 140, 140, 0.12);
}
.users .body {
  height: 400px;
}
.users .bottom {
  margin-top: 20px;
  height: 50px;
  border-top: 1px solid #e6e6e6;
  display: flex;
  justify-content: center;
}
.search-field {
  border-radius: 17px;
  background-color: white;
  box-shadow: 0px 0px 28.0969px 6.4839px rgba(140, 140, 140, 0.12);
}
.search-bar input {
  background: rgba(140, 140, 140, 0.12);
  border-radius: 17px;
  border: none;
  outline: none;
  width: 260px;
  height: 30px;
  padding-left: 15px;
  padding-right: 15px;
  font-size: 13px;
}
.search-bar button {
  border: none;
  background: none;
}
.users-field {
  height: 83%;
  overflow-y: scroll;
}
</style>
<style scoped>
.menu {
  height: 700px;
}
</style>
