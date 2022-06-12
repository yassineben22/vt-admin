<template>
  <div
    v-for="(cards, index) in cardss"
    class="group d-flex justify-content-between"
    :key="index"
  >
    <div
      class="card col-3 ps-3 pe-3 d-flex flex-column justify-content-center"
      v-for="(card, i) in cards"
      :key="i"
    >
      <div class="d-flex justify-content-between ps-3 pe-3">
        <div class="text d-flex flex-column">
          <h3>{{ card.nbr }}</h3>
          <p>{{ card.label }}</p>
        </div>
        <div>
          <img
            :src="require(`@/assets/images/${card.img}.png`)"
            alt="logo"
            width="47px"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "cards",
  data() {
    return {
      cardss: [
        [
          {
            nbr: "",
            label: "Nombre d'utilisateurs",
            img: "person",
          },
          {
            nbr: "",
            label: "Nombre d'infectés",
            img: "virus",
          },
        ],
        [
          {
            nbr: "--/--/----",
            label: "Date d'aujourd'hui",
            img: "calen",
          },
          {
            nbr: "--:--:--",
            label: "Heure",
            img: "clock",
          },
        ],
      ],
    };
  },
  methods: {
    setTime() {
      setInterval(() => {
        const date = new Date();
        this.cardss[1][0].nbr =
          date.getDate() +
          "/" +
          (date.getMonth() + 1) +
          "/" +
          date.getFullYear();
        this.cardss[1][1].nbr =
          date.getHours() +
          ":" +
          this.checkSingleDigit(date.getMinutes()) +
          ":" +
          this.checkSingleDigit(date.getSeconds());
      }, 1000);
    },
    checkSingleDigit(digit) {
      return ("0" + digit).slice(-2);
    },
  },
  beforeMount() {
    this.setTime();
  },
  mounted() {
    this.loader = this.$loading.show({
      blur: "10px",
      loader: "dots",
      color: "#5a58c3",
      opacity: 1,
    });
    this.$store
      .dispatch("GET_STATS")
      .then((data) => {
        console.log(data);
        this.cardss[0][0].nbr = data.usersCount;
        this.cardss[0][1].nbr = data.infectedCount;
        this.loader.hide();
      })
      .catch((data) => {
        if (data.response.status === 401) {
          this.loader.hide();
          this.$swal.
              mixin().fire({
            icon: "error",
            title: data.response.data.msg,
          });
          this.$store.dispatch("LOGOUT");
        }
      });
  },
};
</script>
