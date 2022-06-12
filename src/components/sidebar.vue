<template>
  <div class="side col-2" style="height: 100vh">
    <div>
      <div class="logo_parent d-flex justify-content-center mt-5">
        <router-link to="/dashboard" class="w-100 ps-2">
          <img
            class="logo_admin"
            src="@/assets/images/admin.svg"
            alt="covid tracker"
          />
        </router-link>
          
      </div>
      <div class="button_malade row d-flex justify-content-center">
        <router-link to="/viruses" class="add_patient btn mt-5">
          <span class="add">Ajouter un Virus</span>
          <span class="plus"><i class="far fa-plus"></i></span>
        </router-link>
      </div>
      <div class="row d-flex justify-content-center">
        <ul class="links mt-5">
          <li class="link">
            <router-link to="/dashboard"
              ><i class="far fa-home-alt"></i>Acceuil</router-link
            >
          </li>
          <li class="link">
            <router-link to="/users"
              ><i class="far fa-users"></i>Utilisateurs</router-link
            >
          </li>
          <li class="link">
            <router-link to="/settings"
              ><i class="far fa-cog"></i>Parametres</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "sidebar",
  data() {
    return {
      height: window.innerHeight,
    };
  },
};
</script>
