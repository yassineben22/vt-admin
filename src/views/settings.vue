<template>
  <div class="row">
    <Sidebar />
    <div class="col-12 col-xl-10">
      <Topbar v-model="menuOpen" />
      <div class="row p-5 pb-0">
        <div class="settings p-3">
          <div class="settings-content row">
            <div class="settings-side col-2 pt-5 ps-0">
              <div class="links d-flex flex-column">
                <router-link to="/settings/profil">Profil</router-link>
              </div>
            </div>
            <div class="col">
              <router-view></router-view>
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
import Sidebar from "@/components/sidebar.vue";
import Topbar from "@/components/topbar.vue";
import Moradhji from "@/components/foot.vue";
export default {
  components: { Sidebar, Topbar, Moradhji },
  props: ['loadingModel'],
  data() {
    return {
      menuOpen: false,
    };
  },
  mounted() {
    this.loader = this.$loading.show({
      blur: "10px",
      loader: "dots",
      color: "#5a58c3",
      opacity: 1,
    });
    setTimeout(() => {
      this.loader.hide();
    }, 1000);
  },
};
</script>
<style>
.settings-content {
  width: 100%;
  height: 500px;
  border-radius: 20px;
  background-color: white;
  box-shadow: 0px 0px 44.1165px 10.1807px rgba(140, 140, 140, 0.12);
}
.settings-side {
  height: 100%;
  border-radius: 20px;
  box-shadow: 0px 0px 14.1875px -1.01339px rgba(140, 140, 140, 0.12);
}
.settings-side a{
  transition: all .2s ease;
  padding-left: 20px;
  margin-bottom: 15px;
  font-size: 18px;
  font-family: main-medium;
  color: black;
  text-decoration: none;
}
.settings-side a.router-link-exact-active{
  padding-left: 20px;
  color: #5a58c3;
  border-left: 3px solid #5a58c3;
}
.settings-side a.router-link-exact-active:hover{
  color: #5a58c3;
}
.settings-side a:hover{
  padding-left: 20px;
  color: #19191b;
  border-left: 3px solid #5a58c3;
}
</style>