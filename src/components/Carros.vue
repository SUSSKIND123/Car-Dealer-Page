<template>
  <div class="overlay">
    <div class="header">
      <h1 style="margin: 2px">
        Compre seu próximo carro com uma das nossas concessionárias parceiras
        mais próximas de você
      </h1>
    </div>
    <div class="input">
      <input type="text" v-model="search" placeholder="Buscar Modelo.." />

      <select
        name=""
        id=""
        v-model="marca"
        class="marca"
        @click="changeCarrosMarca"
      >
        <option value="null" selected disabled hidden>Marca..</option>
        <option value="todas">Todas</option>
        <option value="Chevrolet">Chevrolet</option>
        <option value="Volkswagen">Volkswagen</option>
        <option value="Volvo">Volvo</option>
        <option value="Gol">Gol</option>
        <option value="Fiat">Fiat</option>
        <option value="Ford">Ford</option>
      </select>
      <select
        name=""
        id=""
        v-model="ordem"
        class="ordenar"
        @change="orderCarros"
      >
        <option value="null" selected disabled hidden>
          Ordenar por preço..
        </option>
        <option value="baratos">Mais baratos</option>
        <option value="caros">Mais caros</option>
        <option value="50">Até 50 mil</option>
        <option value="100">Até 100 mil</option>
        <option value="150">Até 150 mil</option>
        <option value="200">Até 200 mil</option>
        <option value="250">Até 250 mil</option>
        <option value="300">Até 300 mil</option>
      </select>
    </div>
    <table v-if="filteredCarros.length > 0">
      <thead>
        <tr>
          <th colspan="2" style="letter-spacing: 0.1275rem">Modelo</th>
          <th style="letter-spacing: 0.1275rem">Preço</th>
          <th style="letter-spacing: 0.1275rem">Concessionária</th>
          <th style="letter-spacing: 0.1275rem">Telefone</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredCarros" :key="item.Modelo">
          <td class="image">
            <img :src="require(`../assets/${item.img}`)" />
          </td>
          <td>
            <div class="height">{{ toTitleCase(item.Modelo) }}</div>
          </td>
          <td style="width: 10%">
            <div
              class="height preco"
              style="letter-spacing: 0.01875rem; word-spacing: -3px"
            >
              R$ {{ item.Preço }}
            </div>
          </td>
          <td>
            <div class="height">{{ item.Concessionária }}</div>
          </td>
          <td style="text-align: left" class="num">
            <div class="height" style="letter-spacing: 0.00075rem">
              {{ item.Telefone }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <table v-if="filteredCarros.length < 1 && !(marca || search)">
      <thead>
        <tr>
          <th colspan="2" style="letter-spacing: 0.1275rem">Modelo</th>
          <th style="letter-spacing: 0.1275rem">Preço</th>
          <th style="letter-spacing: 0.1275rem">Concessionária</th>
          <th style="letter-spacing: 0.1275rem">Telefone</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in initialCarros" :key="item.Modelo">
          <td class="image">
            <img :src="require(`../assets/${item.img}`)" />
          </td>
          <td>
            <div class="height">{{ toTitleCase(item.Modelo) }}</div>
          </td>
          <td style="width: 10%">
            <div
              class="height preco"
              style="letter-spacing: 0.01875rem; word-spacing: -3px"
            >
              R$ {{ item.Preço }}
            </div>
          </td>
          <td>
            <div class="height">{{ item.Concessionária }}</div>
          </td>
          <td style="text-align: left" class="num">
            <div class="height" style="letter-spacing: 0.00075rem">
              {{ item.Telefone }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="filteredCarros.length < 1 && (marca || search)" class="noResult">
      <h1>Nenhum resultado encontrado..</h1>
    </div>
    <div
      v-if="filteredCarros.length < 1 && !(marca || search)"
      class="noResult"
    >
      <h1>
        Ainda não achou o que está procurando?
        <br />
        Busque por um modelo acima.
      </h1>
    </div>
    <div v-if="!(filteredCarros.length < 1 && !(marca || search))">
      <ul class="navegar2">
        <li>
          <router-link to="/carros">
            <i class="arrow left"></i>
          </router-link>
        </li>
        <li>Navegar</li>
        <li>
          <router-link to="/carros/p2">
            <i class="arrow right"></i>
          </router-link>
        </li>
      </ul>
      <ul class="navegarNumeros2">
        <li class="rounded active">
          <router-link to="#">1</router-link>
        </li>
        <li><router-link to="/carros/p2">2</router-link></li>
        <li><router-link to="/carros/p3">3</router-link></li>
        <li class="lag"><router-link to="/carros/p4">4</router-link></li>
      </ul>
    </div>
  </div>
  <div v-if="filteredCarros.length < 1 && !(marca || search)">
    <ul class="navegar">
      <li>
        <router-link to="/carros">
          <i class="arrow left"></i>
        </router-link>
      </li>
      <li>Navegar</li>
      <li>
        <router-link to="/carros/p2">
          <i class="arrow right"></i>
        </router-link>
      </li>
    </ul>
    <ul class="navegarNumeros">
      <li class="rounded active"><router-link to="#">1</router-link></li>
      <li><router-link to="/carros/p2">2</router-link></li>
      <li><router-link to="/carros/p3">3</router-link></li>
      <li class="lag"><router-link to="/carros/p4">4</router-link></li>
    </ul>
  </div>
  <div class="logout">
    <button class="button-17" role="button" @click="logout">Logout</button>
  </div>
  <ul>
    <li><i class="arrow left two"></i></li>
    <div class="voltar">
      <button class="button-17" role="button" @click="voltar">
        <span style="margin-left: 8px"> Voltar</span>
      </button>
    </div>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      ordem: null,
      marca: null,
      search: "",
      placeholderCarros: null,
      carrosMarca: "nothing",
      carros: this.$store.getters.carros,
    };
  },
  methods: {
    changeCarrosMarca() {
      this.carrosMarca = this.carros.filter((carro) => {
        return carro.Marca == this.marca;
      });
    },
    toTitleCase(str) {
      return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    },
    orderCarros() {
      this.carros = this.placeholderCarros;

      if (this.ordem === "baratos") {
        this.carros.sort((a, b) => a.price - b.price);
      } else if (this.ordem === "caros") {
        this.carros.sort((a, b) => b.price - a.price);
      } else {
        this.carros = this.carros.filter(
          (carro) => carro.price < this.ordem * 1000
        );
      }
    },
    voltar() {
      this.$router.push("/atendente");
    },
    logout() {
      this.$store.dispatch("logout");
      console.log("Click");
      this.$router.replace("/login");
    },
  },
  computed: {
    filteredCarros() {
      if (!(this.marca !== "todas") || !this.marca) {
        return this.carros.filter((carro) => {
          if (this.search) {
            return carro.Modelo.toLowerCase().match(this.search.toLowerCase());
          } else if (this.marca === "todas") {
            return true;
          }
        });
      } else if (!this.search) {
        return this.carrosMarca;
      } else {
        return this.carrosMarca.filter((carro) => {
          return carro.Modelo.toLowerCase().match(this.search.toLowerCase());
        });
      }
    },
    initialCarros() {
      if (this.ordem) {
        return this.carros.slice(0, 4);
      }
      return this.carros.slice(0, 4);
    },
  },
  created() {
    this.placeholderCarros = this.carros;
  },
  watch: {
    carros: {
      handler() {
        this.changeCarrosMarca();
      },
      deep: true,
    },
  },
};
</script>
<style scoped>
.button-17 {
  align-items: center;
  appearance: none;
  background-color: white;
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
.voltar {
  left: 0;
  top: 0;
  position: absolute;
}
.two {
  position: absolute;
  top: 19.9px;
  left: 14px;
  z-index: 1000;
  padding: 2.5px;
}

.header {
  text-align: center;
  background: silver;
  font-size: 14px;
  padding: 0;
  margin: 0 13.75% 0 13.75%;
  border: 6px outset grey;
  box-shadow: 2px 2px 0px 1px rgb(0, 0, 0, 0.2);
}
.rounded {
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
}
.arrow {
  border: solid #71797e;
  border-width: 0 2.5px 2.5px 0;
  display: inline-block;
  padding: 3px;
}
.left {
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
}
.right {
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
}

a {
  text-decoration: none;
}
.active {
  background-color: #a1a1a2;
  color: white;
}

.navegar > li {
  background: white;
  border: none;
}
.navegar2 > li {
  background: white;
  border: none;
}

.navegar {
  bottom: 62px;
  left: 141px;
  position: absolute;
}
.navegarNumeros {
  bottom: 30px;
  left: 144px;
  position: absolute;
}
.navegar2 {
  bottom: 7px;
  left: 141px;
  position: relative;
  width: 50%;
}
.navegarNumeros2 {
  bottom: 10px;
  left: 144px;
  position: relative;
  width: 50%;
}
.lag {
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
}

li {
  display: inline;
  border: 1px solid #ddd;
  background-color: #e8e8e8;

  padding: 6px 12px;
}

.noResult {
  text-align: center;
  color: rgb(0, 0, 0, 0.6);
}
.num {
  font-size: 17.45px;
}
.preco {
  font-size: 20px;
}
.overlay {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: white;
}
.input {
  text-align: center;
}
.marca {
  width: 15.3%;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: white;
  padding: 12px 20px 12px 0px;
  color: grey;
}
.ordenar {
  width: 18%;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: white;
  padding: 12px 20px 12px 0px;
  color: grey;
  border-right: none;
  box-shadow: 2px 0px 0px 1px rgb(0, 0, 0, 0.2);
}

input {
  width: 39.2%;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: rgb(255, 255, 255);
  padding: 12px 20px 12px 18px;
}
table {
  text-align: center;
  width: 72.5%;
  margin: auto;

  border: 1px solid black;

  font-family: "Helvetica Narrow", "Arial Narrow", Tahoma, Arial, Helvetica,
    sans-serif;
  font-family: FordAntennaCondensedExtraLight, -apple-system, BlinkMacSystemFont,
    segoe ui, Roboto, Oxygen, Ubuntu, Cantarell, helvetica neue, sans-serif;
  font-weight: 10;
  font-weight: 200;
  letter-spacing: 0.00175rem;
  letter-spacing: 0.2575rem;
  font-size: 1.5rem;
  box-shadow: 2px 2px 0px 1px rgb(0, 0, 0, 0.2);
}
body {
  background: white;
}
th,
td {
  border: 1px solid black;
}
img {
  height: 98px;
  background-size: cover;
}
@media screen and (max-width: 1390px) {
  img {
    height: 90px;
  }
  .navegar {
    bottom: 35px;
    left: 0;
    position: absolute;
  }
  .navegarNumeros {
    bottom: 0;
    left: 3px;
    position: absolute;
  }

  .noResult {
    font-size: 16px;
  }
}
@media screen and (max-width: 1285.6px) {
  .header {
    font-size: 13px;
    margin: 0 1% 0 1%;
  }
  input {
    width: 51%;
  }
  .marca {
    width: 22%;
  }
  .ordenar {
    width: 25%;
  }

  table {
    width: 98%;
  }
}
@media screen and (max-width: 1144.6px) {
  .header {
    font-size: 12px;
  }
  table {
    font-size: 1.5rem;
  }

  .num {
    font-size: 17.46px;
  }
}

@media screen and (max-width: 1038.4px) {
  .header {
    font-size: 11px;
  }
  table {
    font-size: 22px;
  }
  img {
    height: 90px;
  }
  .preco {
    font-size: 18px;
  }
  .num {
    font-size: 16.2px;
  }
}
@media screen and (max-width: 982.4px) {
  .header {
    font-size: 10px;
  }
  input {
    font-size: 14px;
  }
  select {
    font-size: 14px;
  }

  input {
    width: 51%;
  }

  table {
    width: 98%;
  }
  .marca {
    width: 22%;
  }
  .ordenar {
    width: 25%;
  }

  table {
    width: 98%;
  }
  .num {
    font-size: 15px;
  }
  .preco {
    font-size: 17px;
  }
  .navegar {
    left: -20px;
    bottom: 35px;
  }
  .navegarNumeros {
    left: -17px;
  }
}
@media screen and (max-width: 914.4px) {
  table {
    font-size: 21px;
  }
  img {
    height: 85px;
  }
  .preco {
    font-size: 17px;
  }
  input {
    font-size: 13px;
  }
  .marca {
    font-size: 13px;
  }
  .ordenar {
    font-size: 13px;
  }
  .num {
    font-size: 14px;
  }
}

@media screen and (max-width: 883.2px) {
  .header {
    font-size: 9.5px;
  }
  .noResult {
    font-size: 14px;
  }
  table {
    font-size: 19px;
  }
  img {
    height: 65px;
  }
  .preco {
    font-size: 15.5px;
  }
  .num {
    font-size: 13.5px;
  }
}
@media screen and (max-width: 825.6px) {
  .header {
    font-size: 9px;
  }
  .noResult {
    font-size: 12px;
  }
  table {
    font-size: 16px;
  }
  img {
    height: 45px;
  }
  .preco {
    font-size: 15px;
  }
  .num {
    font-size: 12px;
  }
  table {
    letter-spacing: 0.00175rem;
  }
}
@media screen and (max-width: 780.3px) {
  .header {
    font-size: 8.5px;
  }
  .preco {
    font-size: 13px;
  }
}
@media screen and (max-width: 733.6px) {
  .header {
    font-size: 8px;
  }
}

@media screen and (max-width: 687.6px) {
  .header {
    font-size: 7.7px;
  }
  .preco {
    font-size: 11px;
  }
  input {
    width: 44%;
  }

  table {
    width: 98%;
  }
  .marca {
    width: 22%;
  }
  .ordenar {
    width: 32%;
  }
  .num {
    font-size: 11px;
  }
}
@media screen and (max-width: 563.2px) {
  table {
    font-size: 14px;
  }
  img {
    height: 40px;
  }
  .preco {
    font-size: 10px;
  }
}
@media screen and (max-width: 501.6px) {
  table {
    font-size: 12px;
  }
  img {
    height: 30px;
  }
  input,
  select {
    font-size: 12px;
  }
  .preco {
    font-size: 9px;
  }
  input {
    width: 40%;
  }

  table {
    width: 98%;
  }
  .marca {
    width: 22%;
  }
  .ordenar {
    width: 36%;
  }
  .num {
    font-size: 9.5px;
  }
}
@media screen and (max-width: 432px) {
  table {
    font-size: 10px;
  }
  img {
    height: 15px;
  }

  .preco {
    font-size: 7px;
  }

  input {
    width: 34%;
  }

  table {
    width: 98%;
    letter-spacing: 0.00175rem;
  }
  .marca {
    width: 22%;
  }
  .ordenar {
    width: 42%;
  }
  .num {
    font-size: 8.5px;
  }
}
@media screen and (max-width: 358.55px) {
  table {
    font-size: 8.6px;
  }
  img {
    height: 15px;
  }
  .num {
    font-size: 7.5px;
  }
  input,
  select {
    font-size: 10px;
  }
  .preco {
    font-size: 7px;
  }
}
</style>
