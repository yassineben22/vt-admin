<template>
  <div
    class="top row d-flex justify-content-between"
    style="background-color: white"
  >
    <div class="bienvenue col ms-2 ms-xl-0 pt-4 ps-3">
      <h5>Bienvenue, Admin</h5>
      <p>Voici un apercu global des données de l'application.</p>
    </div>
    <!-- <div class="col-2 pt-2 d-flex justify-content-end">
      <div
        @click="toggleMenu"
        v-bind:class="['menu-button d-flex d-xl-none', menuOpen ? 'open' : '']"
      >
        <div class="menu-button-burger"></div>
      </div>
    </div> -->
    <div
      class="col-3 d-flex justify-content-center"
      style="align-items: center"
    >
      <img src="@/assets/images/userAuth.svg" width="30" />
      <p class="fwb mt-3 ms-2">{{ nomComplet }}</p>
      <i
        :class="['far', dropdown ?'fa-arrow-up' : 'fa-arrow-down' ,'ms-3 fw-bold']"
        style="cursor: pointer"
        @click="toggleDropdown"
      ></i>
    </div>
    <Transition name="slide-fade">
      <div class="dropdown" v-show="dropdown">
        <p class="logout button" @click="logout">
          <i class="far fa-arrow-from-left cl-yb"></i> Se deconnecter
        </p>
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  name: "topbar",
  props: ["modelValue"],
  mounted() {
    this.$store
      .dispatch("GET_ADMIN")
      .then((data) => {
        this.nomComplet = data.lastName + " " + data.firstName;
      })
      .catch((data) => {
        if (data.response.status === 401) {
          this.loader.hide();
          this.$swal.mixin().fire({
            icon: "error",
            title: data.response.data.msg,
          });
          this.$store.dispatch("LOGOUT");
        }
      });
  },
  data() {
    return {
      nomComplet: "",
      dropdown: false,
    };
  },
  computed: {
    menuOpen: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
  methods: {
    toggleDropdown() {
      this.dropdown = !this.dropdown;
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    logout() {
      this.$store.dispatch("LOGOUT");
    },
  },
};
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
.dropdown {
  position: absolute;
  z-index: 999;
  padding: 15px 15px;
  top: 65px;
  right: 75px;
  width: 230px;
  background-color: white;
  box-shadow: 0px 0px 13px rgba(140, 140, 140, 0.44);
  border-radius: 15px;
  cursor: pointer;
}

.dropdown p {
  margin: 0;
  padding: 0;
  font-size: 18;
  font-weight: bold;
}
.dropdown:hover {
  background-color: #f5f5f5;
}

.dropdown i {
  margin-top: 5px;
  color: #5a58c3;
  font-weight: bold;
  font-size: 19px;
}
</style>
