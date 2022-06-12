<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-box-content">
        <div class="cont">
          <img id="logo" src="@/assets/images/LOGOadmin.png" />
          <img id="doc" src="@/assets/images/doc.png" />
        </div>

        <div class="cont" id="cont-2">
          <img id="logo2" src="@/assets/images/LOGOadmin.png" />
          <span class="welcome-text">
            <h2>Bienvenue.</h2>
            <p>Connectez-vous pour continuer</p>
          </span>
          <span class="login-info">
            <input
              class="id"
              type="text"
              placeholder="Entrer votre email"
              v-model="email"
            />
            <input
              class="mdp"
              type="password"
              placeholder="Entrer votre mot de passe"
              v-model="password"
            />
          </span>
          <span class="login-end">
            <input type="button" value="Se connecter" @click="signIn" />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../router";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    signIn() {
      this.loader = this.$loading.show({
        blur: "10px",
        loader: "dots",
        color: "#5a58c3",
        opacity: 1,
      });
      this.$store
        .dispatch("LOGIN", {
          email: this.email,
          password: this.password,
        })
        .then((data) => {
          this.loader.hide();
          this.$swal.fire({
            icon: "success",
            title: "vous etes connecté avec succes!",
          });
          router.push("/dashboard");
        })
        .catch((data) => {
          this.loader.hide();
          this.$swal.fire({
            icon: "error",
            title: data.response.data.msg,
          });
        });
    },
  },
};
</script>

<style scoped>
p {
  font-weight: 500;
  word-wrap: break-word;
}
.login-container {
  width: 210vh;
  height: 100vh;
  background: linear-gradient(
    250.14deg,
    #684bd8 21.61%,
    #6243dc 37.46%,
    #5b3bdc 48.38%,
    #4c29d8 71.51%
  );
  font-family: "Montserrat", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-box {
  width: 70%;
  height: 80%;
  background: #ffffff;
  box-shadow: 0px 0px 21px 1px rgba(0, 0, 0, 0.25);
  border-radius: 23px;
  display: flex;
  align-items: center;
  padding: 20px;
}
.login-box-content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer {
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  margin: 0 auto;
  text-align: center;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  color: rgba(0, 0, 0, 0.541);
  font-size: 13px;
}

.cont {
  flex: 1;
  margin-left: 30px;
}

#cont-2 {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.welcome-text {
  line-height: 0;
  text-align: left;
  width: auto;
}

.welcome-text p {
  word-wrap: break-word;
}

#doc {
  max-width: 100%;
  width: auto;
  margin-top: 30px;
}

#logo {
  width: 240px;
  height: 50px;
}

.id {
  font-family: "Montserrat", sans-serif;
  border: 1.8px solid #5a58c3;
  border-radius: 29px;
  width: 70%;
  height: 2.9em;
  margin-top: 8px;
  background: url(../assets/images/id.png) no-repeat scroll 16px 5.5px;
  background-size: 28px;
  background-color: transparent;
  padding-left: 60px;
}

.mdp {
  font-family: "Montserrat", sans-serif; /* cprght aymn bri*/
  border: 1.8px solid #5a58c3;
  border-radius: 29px;
  width: 70%;
  height: 2.9em;
  margin-top: 8px;
  background: url(../assets/images/mdp.png) no-repeat scroll 17px 8.5px;
  background-size: 23px;
  background-color: transparent;
  padding-left: 60px;
}

.login-end {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 100%;
  margin-top: 40px;
}

.login-end input {
  font-family: "Montserrat", sans-serif;
  width: 10em;
  font-size: 12px;
  height: 3em;
  background: #5a58c3;
  border-radius: 29px;
  text-align: center;
  border: 0;
  color: white;
}

#logo2 {
  display: none;
}

.login-end a {
  margin-right: 16%;
  font-size: 12px;
  text-decoration: none;
  color: black;
}

.login-end input:hover {
  background: #38378a;
  box-shadow: 0 0 4px #5a58c396;
}
.login-info {
  margin-top: 20px;
}
.login-info input:hover {
  box-shadow: 0 0 4px #5a58c396;
}

@media only screen and (max-width: 960px) {
  .login-end a {
    margin-left: 10px;
  }
}
@media only screen and (max-width: 900px) {
  .login-box {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .cont {
    display: none;
  }
  #cont-2 {
    font-size: 15px;
  }

  #logo2 {
    display: flex;
    width: 240px;
    height: 50px;
    margin-bottom: 40px;
  }
}

@media only screen and (max-width: 500px) {
  .cont {
    margin: 0 auto;
  }
  .login-end {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .login-end a {
    margin-right: 0;
    margin-top: 10px;
  }

  #cont-2 {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .login-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
