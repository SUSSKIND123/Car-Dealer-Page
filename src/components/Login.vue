<template>
  <div class="overlay">
    <div class="avonale"><h1>Avonale</h1></div>
    <div class="servicos">
      <h2 class="big" style="color: white">Já é nosso cliente?</h2>
      <h2 style="color: white">Faça seu login e aproveite as ofertas!</h2>
    </div>
    <base-card style="border: 5px inset white">
      <form @submit.prevent="submitForm">
        <div v-if="mode == 'signup'">
          <label for="gender" style="color: white">Gênero</label>
          <select
            name="gender"
            id="gender"
            v-model="gender"
            @click="dados = true"
          >
            <option value="" disabled selected hidden>Selecione</option>
            <option value="male" selected>Masculino</option>
            <option value="female">Feminino</option>
          </select>
        </div>
        <div class="form-control" v-if="mode == 'signup'">
          <label for="name" style="color: white">Nome </label>
          <input
            type="name"
            id="name"
            v-model.trim="name"
            @click="(formIsValid = true), (dados = true)"
          />
        </div>
        <div class="form-control">
          <label for="email" style="color: white">E-Mail </label>
          <input
            type="email"
            id="email"
            v-model.trim="email"
            @click="(formIsValid = true), (change = true), (dados = true)"
            ref="email"
          />
        </div>
        <div class="form-control">
          <label for="password" style="color: white">Senha</label>
          <input
            type="password"
            id="password"
            v-model.trim="password"
            @click="(formIsValid = true), (change = true), (dados = true)"
            ref="password"
          />
        </div>
        <p v-if="!formIsValid" style="color: red">
          Por favor, insira um e-mail e senha válidos (a senha deve conter no
          mínimos 6 caracteres)
        </p>
        <p v-if="!dados" style="color: red">
          Por favor, preencha todos os campos acima (nenhum campo pode ser
          deixado em branco)
        </p>

        <p
          v-if="errorOnLogin && formIsValid && mode !== 'signup'"
          style="color: red"
        >
          Houve um erro na autenticação. Por favor, confira seus dados e tente
          novamente.
        </p>
        <p
          v-if="errorOnLogin && formIsValid && mode === 'signup'"
          style="color: red"
        >
          Essa conta já existe. <a @click="mode = 'signup'">Fazer login</a>
        </p>
        <!-- v-bind:style= "[condition_1 ? condition_2 ? {styleA} : {styleB} : {styleC}]" -->
        <div :style="formIsValid ? 'margin-top:2rem' : 'margin-top:0'">
          <base-button class="submitButton">{{
            submitButtonCaption
          }}</base-button>
          <base-button type="button" class="pointer" @click="switchAuthMode">
            {{ switchModeButtonCaption }}
          </base-button>
        </div>
      </form>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gender: "",
      name: "",
      email: "",
      password: "",
      formIsValid: true,
      mode: "login",
      dados: true,
      isLoading: false,
      change: false,
    };
  },

  computed: {
    submitButtonCaption() {
      if (this.mode === "login") {
        return "Login";
      } else {
        return "Criar conta";
      }
    },
    switchModeButtonCaption() {
      if (this.mode === "login") {
        return "Ainda não se cadastrou?";
      } else {
        return "Já possui uma conta?";
      }
    },
    errorOnLogin() {
      if (this.change) {
        return false;
      }
      return this.$store.getters.error;
    },
  },
  methods: {
    async submitForm() {
      this.change = false;
      this.formIsValid = true;
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        this.email = "";
        this.password = "";
        return;
      }
      if ((this.name === "" || this.gender === "") && this.mode === "signup") {
        this.dados = false;
        return;
      }

      this.isLoading = true;
      const actionPayload = {
        gender: this.gender,
        email: this.email,
        password: this.password,
        name: this.name,
      };

      try {
        if (this.mode === "login") {
          await this.$store.dispatch("login", {
            ...actionPayload,
          });
        } else {
          await this.$store.dispatch("signup", {
            ...actionPayload,
          });
        }
        const redirectUrl = "/Atendente";
        this.$router.replace(redirectUrl);
      } catch (err) {
        this.error = err.message || "Failed to authenticate, try later.";
      }

      this.isLoading = false;
    },
    switchAuthMode() {
      if (this.mode === "login") {
        this.mode = "signup";
      } else {
        this.mode = "login";
      }
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
.submitButton {
  background: #71797e;
  border: 1px solid greenyellow;
}
.submitButton:hover {
  background: grey;
  border-color: #270041;
}
.pointer {
  cursor: pointer;
  background: black;
  border: 1px solid lightblue;
}

.white {
  color: white;
}
.big {
  font-size: 2.5rem;
  margin-bottom: -2px;
}
.list {
  list-style-type: none;
}
.servicos {
  margin: auto;
  position: relative;
  text-align: center;
}
.overlay {
  top: 0;
  right: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  background: darkblue;
}
.avonale {
  background: white;
  width: 10%;
  display: block;
  border: 9px outset lightblue;
  color: silver;
  margin: auto;

  text-align: center;

  position: relative;
}
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
@media screen and (max-width: 1108px) {
  .avonale {
    width: 15%;
    display: block;
    border: 9px outset lightblue;
    color: silver;
    margin: auto;
    background: white;
    text-align: center;

    position: relative;
  }
}
@media screen and (max-width: 794px) {
  .avonale {
    width: 20%;
    display: block;
    border: 9px outset lightblue;
    color: silver;
    margin: auto;
    background: white;
    text-align: center;

    position: relative;
  }
}
@media screen and (max-width: 568px) {
  .pointer {
    margin-top: 1rem;
    cursor: pointer;
    background: darkblue;
  }
  .avonale {
    width: 38%;
    display: block;
    border: 9px outset lightblue;
    color: silver;
    margin: auto;
    background: white;
    text-align: center;

    position: relative;
  }
}
</style>
