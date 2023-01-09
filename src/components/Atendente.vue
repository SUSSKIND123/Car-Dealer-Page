<template>
  <div class="container">
    <h1 class="avonale">Avonale</h1>
    <div class="dropdown">
      <select
        name="dropdown"
        id="dropdown"
        v-model="seminovo"
        class="select"
        style="width: 100%; color: #36454f"
      >
        <option disabled hidden value="null">
          Com o que nós podemos ajudar hoje?
        </option>

        <option value="seminovo" class="hidden3">
          Quero comprar um seminovo
        </option>
        <option value="seminovo" class="hidden4">Comprar um seminovo</option>

        <option value="seguroCarro" class="hidden1">
          Gostaria de comprar um seguro para o meu carro
        </option>
        <option value="seguroCarro" class="hidden2">
          Comprar seguro para o meu carro
        </option>
        <option value="seguroVida" class="hidden5">
          Quero comprar outro tipo de seguro
        </option>
        <option value="seguroVida" class="hidden6">
          Comprar outro tipo de seguro
        </option>
        <option value="duvida">Tenho uma dúvida sobre o produto</option>
        <option value="errado">Algo deu errado com a minha solicitação</option>
        <option value="reclamacao">Gostaria de fazer uma reclamação</option>
        <option value="outro">Outro</option>
      </select>
    </div>
    <div class="flex">
      <div class="suit">
        <img src="./../assets/suit4.png" alt="" />
      </div>
      <div class="rect">&nbsp;<span class="circle"></span></div>
      <div class="bemvindo">
        <h1 v-if="gender === 'male' && first">
          Bem vindo <br />
          {{ name }}
        </h1>
        <!--se for mulher-->
        <h1 v-if="gender === 'male' && !first">
          Bem vindo de volta <br />
          {{ name }}
        </h1>
        <h1 v-if="gender === 'female' && first">
          Bem vinda <br />
          {{ name }}
        </h1>
        <h1 v-if="gender === 'female' && !first">
          Bem vinda de volta <br />
          {{ name }}
        </h1>
      </div>
    </div>
    <!--se for homem -->

    <div class="logout">
      <button class="button-17" role="button" @click="logout">Logout</button>
    </div>

    <!-- a dialog should be shown on the screen and options of router links should be available
     <router-link style="text-decoration: none; color: inherit;" to="/hello"> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      seminovo: null,
      seguro: false,
      token: this.$store.getters.token,
      userId: this.$store.getters.userId,
      gender: this.$store.getters.gender,
      name: this.$store.getters.name,
      first: this.$store.getters.first,
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      console.log("Click");
      this.$router.replace("/login");
    },
    async getUser() {
      if (localStorage.getItem("gender") && localStorage.getItem("name")) {
        this.name = localStorage.getItem("name");
        this.gender = localStorage.getItem("gender");
      } else {
        const userId = this.$store.getters.userId;
        console.log(userId);
        const token = this.$store.getters.token;
        ("?auth= + token");

        const response = await fetch(
          `https://avonale-x-default-rtdb.firebaseio.com/users/${userId}.json?auth=` +
            token
        );
        if (!response.ok) {
          console.log("not ok");
          throw Error();
        }
        const user = await response.json();
        this.gender = user.gender;
        this.name = user.name;
        localStorage.setItem("gender", user.gender);
        localStorage.setItem("name", user.name);
      }
    },
  },
  watch: {
    seminovo(seminovo) {
      if (seminovo == "seminovo") {
        this.$router.push("/carros");
      }
      if (seminovo == "seguroCarro") {
        this.$router.push("/seguroAuto");
      }
      if (seminovo == "seguroVida") {
        this.$router.push("/seguroVida");
      }
      if (seminovo == "duvida") {
        this.$router.push("/duvida");
      }
      if (seminovo == "errado") {
        this.$router.push("/errado");
      }
      if (seminovo == "reclamacao") {
        this.$router.push("/reclamacao");
      }
      if (seminovo == "outro") {
        this.$router.push("/outro");
      }
    },
  },
  created() {
    this.getUser();
  },
  // computed: {
  //   first() {
  //     console.log(this.name);
  //     return "";
  //   },
  // },
};
</script>

<style scoped>
.avonale {
  position: absolute;
  left: 37.8645%;
  top: -2%;
  z-index: 10000;
  color: whitesmoke;
  font-size: 30px;
  padding: 0 150px;
  padding-bottom: 5.6px;
}
.avonale::after {
  content: "";
  position: absolute;
  left: 100px;
  bottom: 0;
  background: white;
  top: 40px;
  width: 100%;
  height: 3px;
}
.dropdown {
  margin-left: 45%;
  margin-top: 3.9%;
  position: absolute;
  z-index: 1000;
  background: repeating-linear-gradient(grey, grey 22%, white 26%, gold 28%);
  border: 10px inset white;
  height: 45%;
}

.hidden2,
.hidden4,
.hidden6 {
  display: none;
}
/* CSS */
.button-17 {
  align-items: center;
  appearance: none;
  background-color: silver;
  border-radius: 24px;
  border-style: none;
  box-shadow: rgba(0, 0, 0, 0.2) 0 3px 5px -1px,
    rgba(0, 0, 0, 0.14) 0 6px 10px 0, rgba(0, 0, 0, 0.12) 0 1px 18px 0;
  box-sizing: border-box;
  color: #174ea6;
  cursor: pointer;
  display: inline-flex;
  fill: currentcolor;
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  font-size: 14px;
  font-weight: 500;
  height: 48px;
  justify-content: center;
  letter-spacing: 0.25px;
  line-height: normal;
  max-width: 100%;
  overflow: visible;
  padding: 2px 24px;
  position: relative;
  text-align: center;
  text-transform: none;
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1),
    opacity 15ms linear 30ms, transform 270ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: auto;
  will-change: transform, opacity;
  z-index: 0;
}

.button-17:hover {
  background: #a8a9ad;
}

.button-17:active {
  box-shadow: 0 4px 4px 0 rgb(60 64 67 / 30%),
    0 8px 12px 6px rgb(60 64 67 / 15%);
  outline: none;
}

.button-17:focus {
  outline: none;
  border: 2px solid #4285f4;
}

.button-17:not(:disabled) {
  box-shadow: rgba(60, 64, 67, 0.3) 0 1px 3px 0,
    rgba(60, 64, 67, 0.15) 0 4px 8px 3px;
}

.button-17:not(:disabled):hover {
  box-shadow: rgba(60, 64, 67, 0.3) 0 2px 3px 0,
    rgba(60, 64, 67, 0.15) 0 6px 10px 4px;
}

.button-17:not(:disabled):focus {
  box-shadow: rgba(60, 64, 67, 0.3) 0 1px 3px 0,
    rgba(60, 64, 67, 0.15) 0 4px 8px 3px;
}

.button-17:not(:disabled):active {
  box-shadow: rgba(60, 64, 67, 0.3) 0 4px 4px 0,
    rgba(60, 64, 67, 0.15) 0 8px 12px 6px;
}

.button-17:disabled {
  box-shadow: rgba(60, 64, 67, 0.3) 0 1px 3px 0,
    rgba(60, 64, 67, 0.15) 0 4px 8px 3px;
}
.logout {
  text-align: center;
  right: 0;
  top: 0;
  position: absolute;
}

.container {
  top: 0;
  right: 0;
  position: absolute;
  width: 100%;
  height: 100%;

  background: #36454f;
}
.select {
  height: 30px;
  font-size: 20px;
  border-radius: 8px;
}
.flex {
  position: relative;
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
}
.suit img {
  width: 200px;
}

.suit {
  position: relative;
  width: 6%;
  text-align: center;
  justify-content: center;
  position: relative;

  margin-top: -24px;
  background-size: contain;
}
.bemvindo {
  margin: auto;
  margin-left: -87px;
  margin-top: 3.4%;
  text-align: center;
  justify-content: center;
  border: 9px solid white;
  color: black;
  width: 28%;
  background: white;
  border-radius: 1.15rem;
}
.bemvindo h1 {
  font-size: 1.6rem;
}

.rect {
  position: relative;
  height: 0px;
  width: 100px;
  background: rgba(0, 0, 0, 0.5);

  margin-top: 16px;
  margin-left: 14%;
  transform: rotate(-12deg);
}

.circle {
  display: block;
  width: 40px;
  height: 100px;
  top: 0px;
  left: -40px;
  position: relative;
  overflow: hidden;
}
.circle:after {
  content: "";
  width: 100px;
  height: 100px;
  -moz-border-radius: 100px;
  -webkit-border-radius: 100px;
  border-radius: 100px;
  background: rgba(255, 255, 255, 0);
  position: absolute;
  top: -35px;
  left: -100px;
  border: 40px solid transparent;
  transform: rotate(45deg);
  border-right: 40px solid rgba(255, 255, 255, 1);
}

@media screen and (min-width: 1135px) {
  .rect {
    position: relative;
    height: 0px;
    width: 100px;
    background: rgba(0, 0, 0, 0.5);
    margin-top: 21px;
    margin-left: 12%;
    transform: rotate(-12deg);
  }
  .bemvindo {
    margin: auto;
    margin-left: -86px;
    margin-top: 3.2%;
    text-align: center;
    justify-content: center;
    border: 9px solid white;
    color: black;
    width: 28%;
    background: white;
    border-radius: 1.15rem;
  }
  .bemvindo h1 {
    font-size: 1.6rem;
  }
}
@media screen and (min-width: 1285.6px) {
  .rect {
    position: relative;
    height: 0px;
    width: 100px;
    background: rgba(0, 0, 0, 0.5);

    margin-top: 10px;
    margin-left: 9%;
    transform: rotate(-12deg);
  }
  .bemvindo {
    margin: auto;
    margin-left: -88px;
    margin-top: 1%;
    text-align: center;
    justify-content: center;
    border: 9px solid white;
    color: black;
    width: 20%;
    background: white;
    border-radius: 1.15rem;
  }
  .bemvindo h1 {
    font-size: 1.8rem;
  }
}
@media screen and (min-width: 1400px) {
  .rect {
    position: relative;
    height: 0px;
    width: 100px;
    background: rgba(0, 0, 0, 0.5);

    margin-top: 10px;
    margin-left: 7%;
    transform: rotate(-12deg);
  }
  .bemvindo {
    margin: auto;
    margin-left: -88px;
    margin-top: 1%;
    text-align: center;
    justify-content: center;
    border: 9px solid white;
    color: black;
    width: 17%;
    background: white;
    border-radius: 1.15rem;
  }
  .bemvindo h1 {
    font-size: 1.8rem;
  }
}
@media screen and (max-width: 955.2px) {
  .rect {
    position: relative;
    height: 0px;
    width: 100px;
    background: rgba(0, 0, 0, 0.5);
    margin-top: 21px;
    margin-left: 19%;
    transform: rotate(-12deg);
  }
  .bemvindo {
    margin: auto;
    margin-left: -89px;
    margin-top: 4.2%;
    text-align: center;
    justify-content: center;
    border: 9px solid white;
    color: black;
    width: 28%;
    background: white;
    border-radius: 1.15rem;
  }
  .bemvindo h1 {
    font-size: 1.6rem;
  }
}
@media screen and (max-width: 858.4px) {
  .rect {
    position: relative;
    height: 0px;
    width: 100px;
    background: rgba(0, 0, 0, 0.5);
    margin-top: 17px;
    margin-left: 19%;
    transform: rotate(-12deg);
  }
  .bemvindo {
    margin: auto;
    margin-left: -89px;
    margin-top: 4.2%;
    text-align: center;
    justify-content: center;
    border: 9px solid white;
    color: black;
    width: 28%;
    background: white;
    border-radius: 1.15rem;
  }
  .bemvindo h1 {
    font-size: 1.6rem;
  }
}
@media screen and (max-width: 765.6px) {
  .rect {
    position: relative;
    height: 0px;
    width: 100px;
    background: rgba(0, 0, 0, 0.5);

    margin-top: 13px;
    margin-left: 22%;
    transform: rotate(-12deg);
  }
  .bemvindo {
    margin: auto;
    margin-left: -89px;
    margin-top: 6%;
    text-align: center;
    justify-content: center;
    border: 9px solid white;
    color: black;
    width: 28%;
    background: white;
    border-radius: 1.15rem;
  }
  .bemvindo h1 {
    font-size: 1.4rem;
  }
}
@media screen and (max-width: 698.4px) {
  .rect {
    position: relative;
    height: 0px;
    width: 100px;
    background: rgba(0, 0, 0, 0.5);

    margin-top: 14px;
    margin-left: 26%;
    transform: rotate(-12deg);
  }
  .bemvindo {
    margin: auto;
    margin-left: -91px;
    margin-top: 8.8%;
    text-align: center;
    justify-content: center;
    border: 9px solid white;
    color: black;
    width: 28%;
    background: white;
    border-radius: 1.15rem;
  }
  .bemvindo h1 {
    font-size: 1.2rem;
  }
}
@media screen and (max-width: 633.6px) {
  .rect {
    position: relative;
    height: 0px;
    width: 100px;
    background: rgba(0, 0, 0, 0.5);
    margin-top: 6px;
    margin-left: 28%;
    transform: rotate(-12deg);
  }
  .bemvindo {
    margin: auto;
    margin-left: -91px;
    margin-top: 8.6%;
    text-align: center;
    justify-content: center;
    border: 9px solid white;
    color: black;
    width: 28%;
    background: white;
    border-radius: 1.15rem;
  }
  .bemvindo h1 {
    font-size: 1.1rem;
  }
}
@media screen and (max-width: 579.2px) {
  .rect {
    position: relative;
    height: 0px;
    width: 100px;
    background: rgba(0, 0, 0, 0.5);
    margin-top: 4px;
    margin-left: 29%;
    transform: rotate(-12deg);
  }
  .bemvindo {
    margin: auto;
    margin-left: -90px;
    margin-top: 8.5%;
    text-align: center;
    justify-content: center;
    border: 9px solid white;
    color: black;
    width: 28%;
    background: white;
    border-radius: 1.15rem;
  }
  .bemvindo h1 {
    font-size: 1.1rem;
  }
}
@media screen and (max-width: 566.4px) {
  .bemvindo {
    margin: auto;
    margin-left: -87px;
    margin-top: 8.35%;
    text-align: center;
    justify-content: center;
    border: 9px solid white;
    color: black;
    width: 28%;
    background: white;
    border-radius: 1.15rem;
  }
  .rect {
    position: relative;
    height: 0px;
    width: 100px;
    background: rgba(0, 0, 0, 0.5);
    margin-top: 1.1px;
    margin-left: 29%;
    transform: rotate(-12deg);
  }
}
@media screen and (max-width: 548px) {
  .rect {
    position: relative;
    height: 0px;
    width: 100px;
    background: rgba(0, 0, 0, 0.5);

    margin-top: 0px;
    margin-left: 31.8%;
    transform: rotate(-12deg);
  }
  .bemvindo {
    margin: auto;
    margin-left: -91px;
    margin-top: 11%;
    text-align: center;
    justify-content: center;
    border: 9px solid white;
    color: black;
    width: 28%;
    background: white;
    border-radius: 1.15rem;
  }
  .bemvindo h1 {
    font-size: 0.9rem;
  }
}
@media screen and (max-width: 426.4px) {
  .rect {
    position: relative;
    height: 0px;
    width: 100px;
    background: rgba(0, 0, 0, 0.5);

    margin-top: 2px;
    margin-left: 33%;
    transform: rotate(-12deg);
  }
  .bemvindo {
    margin: auto;
    margin-left: -91px;
    margin-top: 11.6%;
    text-align: center;
    justify-content: center;
    border: 9px solid white;
    color: black;
    width: 28%;
    background: white;
    border-radius: 1.15rem;
  }
  .bemvindo h1 {
    font-size: 0.9rem;
  }
}
@media screen and (max-width: 426.4px) {
  .rect {
    position: relative;
    height: 0px;
    width: 100px;
    background: rgba(0, 0, 0, 0.5);

    margin-top: 2px;
    margin-left: 33%;
    transform: rotate(-12deg);
  }
  .bemvindo {
    margin: auto;
    margin-left: -91px;
    margin-top: 11.6%;
    text-align: center;
    justify-content: center;
    border: 9px solid white;
    color: black;
    width: 28%;
    background: white;
    border-radius: 1.15rem;
  }
  .bemvindo h1 {
    font-size: 0.9rem;
  }
}
@media screen and (max-width: 515.2px) {
  .rect {
    position: relative;
    height: 0px;
    width: 100px;
    background: rgba(0, 0, 0, 0.5);

    margin-top: -3px;
    margin-left: 36%;
    transform: rotate(-12deg);
  }
  .bemvindo {
    margin: auto;
    margin-left: -91px;
    margin-top: 11%;
    text-align: center;
    justify-content: center;
    border: 9px solid white;
    color: black;
    width: 28%;
    background: white;
    border-radius: 1.15rem;
  }
  .bemvindo h1 {
    font-size: 0.9rem;
  }
}
@media screen and (max-width: 492.2px) {
  .rect {
    position: relative;
    height: 0px;
    width: 100px;
    background: rgba(0, 0, 0, 0.5);

    margin-top: -3px;
    margin-left: 40%;
    transform: rotate(-12deg);
  }
  .bemvindo {
    margin: auto;
    margin-left: -91px;
    margin-top: 12.5%;
    text-align: center;
    justify-content: center;
    border: 9px solid white;
    color: black;
    width: 28%;
    background: white;
    border-radius: 1.15rem;
  }
  .bemvindo h1 {
    font-size: 0.9rem;
  }
}
@media screen and (max-width: 437.6px) {
  .rect {
    position: relative;
    height: 0px;
    width: 100px;
    background: rgba(0, 0, 0, 0.5);

    margin-top: -2px;
    margin-left: 42%;
    transform: rotate(-12deg);
  }
  .bemvindo {
    margin: auto;
    margin-left: -91px;
    margin-top: 14%;
    text-align: center;
    justify-content: center;
    border: 9px solid white;
    color: black;
    width: 28%;
    background: white;
    border-radius: 1.15rem;
  }
  .bemvindo h1 {
    font-size: 0.86rem;
  }
}
@media screen and (max-width: 419px) {
  .rect {
    position: relative;
    height: 0px;
    width: 100px;
    background: rgba(0, 0, 0, 0.5);

    margin-top: 12px;
    margin-left: 45%;
    transform: rotate(-12deg);
  }
  .bemvindo {
    margin: auto;
    margin-left: -89px;
    margin-top: 14.4%;
    text-align: center;
    justify-content: center;
    border: 9px solid white;
    color: black;
    width: 28%;
    background: white;
    border-radius: 1.15rem;
  }
  .bemvindo h1 {
    font-size: 0.86rem;
  }
}
@media screen and (max-width: 391.2px) {
  .rect {
    position: relative;
    height: 0px;
    width: 100px;
    background: rgba(0, 0, 0, 0.5);

    margin-top: 12px;
    margin-left: 48%;
    transform: rotate(-12deg);
  }
  .bemvindo {
    margin: auto;
    margin-left: -89px;
    margin-top: 15%;
    text-align: center;
    justify-content: center;
    border: 9px solid white;
    color: black;
    width: 28%;
    background: white;
    border-radius: 1.15rem;
  }
  .bemvindo h1 {
    font-size: 0.86rem;
  }
}
@media screen and (max-width: 417.6px) {
  .flex {
    visibility: hidden;
  }
  .hidden2,
  .hidden4,
  .hidden6 {
    display: block;
  }
  .hidden1,
  .hidden3,
  .hidden5 {
    display: none;
  }
  .dropdown {
    margin-left: 2%;
    top: -120px;
    width: 100px;
    height: 20%;
    position: absolute;
  }
  .select {
    height: 30px;
    font-size: 16px;
    border-radius: 8px;
  }
}
@media screen and (max-width: 1284px) {
  .dropdown {
    margin-left: 2%;
    margin-top: 28%;
    position: absolute;
    z-index: 1000;
    background: repeating-linear-gradient(grey, grey 22%, white 26%, gold 28%);
    border: 10px inset white;
    width: 34%;
    height: 42%;
  }
  .select {
    font-size: 18px;
  }
}
@media screen and (max-width: 1225.6px) {
  .dropdown {
    margin-left: 2%;
    margin-top: 29%;
    position: absolute;
    z-index: 1000;
    background: repeating-linear-gradient(grey, grey 22%, white 26%, gold 28%);
    border: 10px inset white;
    width: 36%;
    height: 42%;
  }
  .select {
    font-size: 18px;
  }
}

@media screen and (max-width: 1164px) {
  .dropdown {
    margin-left: 2%;
    margin-top: 32%;
    position: absolute;
    z-index: 1000;
    background: repeating-linear-gradient(grey, grey 22%, white 26%, gold 28%);
    border: 10px inset white;
    width: 415px;
    height: 42%;
  }
  .select {
    height: 30px;
    font-size: 18px;
    border-radius: 8px;
  }
}
@media screen and (max-width: 1075.2px) {
  .dropdown {
    margin-left: 2%;
    margin-top: 36%;
    position: absolute;
    z-index: 1000;
    background: repeating-linear-gradient(grey, grey 22%, white 26%, gold 28%);
    border: 10px inset white;
    width: 415px;
    height: 42%;
  }
  .select {
    height: 30px;
    font-size: 18px;
    border-radius: 8px;
  }
}
@media screen and (max-width: 949.2px) {
  .dropdown {
    margin-left: 2%;
    margin-top: 41.6%;
    position: absolute;
    z-index: 1000;
    background: repeating-linear-gradient(grey, grey 22%, white 26%, gold 28%);
    border: 10px inset white;
    width: 415px;
    height: 42%;
  }
  .select {
    height: 30px;
    font-size: 18px;
    border-radius: 8px;
  }
}
@media screen and (max-width: 819.2px) {
  .dropdown {
    margin-left: 2%;
    margin-top: 47%;
    position: absolute;
    z-index: 1000;
    background: repeating-linear-gradient(grey, grey 22%, white 26%, gold 28%);
    border: 10px inset white;
    width: 415px;
    height: 42%;
  }
  .select {
    height: 30px;
    font-size: 18px;
    border-radius: 8px;
  }
}
@media screen and (max-width: 819.2px) {
  .dropdown {
    margin-left: 2%;
    margin-top: 50%;
    position: absolute;
    z-index: 1000;
    background: repeating-linear-gradient(grey, grey 22%, white 26%, gold 28%);
    border: 10px inset white;
    width: 415px;
    height: 44%;
  }
  .select {
    height: 30px;
    font-size: 18px;
    border-radius: 8px;
  }
}
@media screen and (max-width: 700px) {
  .dropdown {
    margin-left: 2%;
    margin-top: 61%;
    width: 415px;
    height: 40%;
  }
  .select {
    height: 30px;
    font-size: 18px;
    border-radius: 8px;
  }
}
@media screen and (max-width: 568px) {
  .dropdown {
    margin-left: 2%;
    margin-top: 75%;
    width: 415px;
    height: 40%;
  }
  .select {
    height: 30px;
    font-size: 18px;
    border-radius: 8px;
  }
}
@media screen and (max-width: 466px) {
  .dropdown {
    margin-left: 2%;
    margin-top: 92%;
    width: 365px;
    height: 40%;
    position: absolute;
  }
  .select {
    height: 30px;
    font-size: 16px;
    border-radius: 8px;
  }
}
@media screen and (max-width: 413.6px) {
  .dropdown {
    margin-left: 2%;
    margin-top: 92%;
    width: 90%;
    height: 40%;
  }
  .select {
    height: 30px;
    font-size: 16px;
    border-radius: 8px;
  }
}
@media screen and (max-width: 366px) {
  .select {
    font-size: 14px;
  }
}
@media screen and (max-width: 308px) {
  .select {
    font-size: 12px;
  }
}
</style>
