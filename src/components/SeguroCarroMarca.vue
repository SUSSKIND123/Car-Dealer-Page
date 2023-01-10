<template>
  <div class="overlay">
    <form autocomplete="off" @submit.prevent="submitted">
      <h1 class="marcaTitulo">Qual a marca do carro?</h1>
      <div class="inputDiv">
        <input
          ref="input"
          type="text"
          placeholder="Marca..."
          v-model="search.search"
          @input="selectingAgain"
          :class="{ invalid: error == 'true' || error == 'invalidInput' }"
        />
      </div>
      <ul class="list" v-if="selectingMarca && error == 'false'">
        <li
          v-for="marca in filteredModels"
          :key="marca"
          @click="selectMarca(marca)"
          class="borderedList"
        >
          {{ marca }}
        </li>
      </ul>
      <p v-if="error == 'true'" style="font-size: 15px">
        Por favor, preencha esse campo
      </p>
      <p v-if="error == 'invalidInput'" style="font-size: 15px">
        Por favor, insira uma marca válida
      </p>
    </form>
    <ripples-button
      class="move"
      :timeout="450"
      content="CONTINUAR"
      @click="submitted"
      v-if="filteredModels.length < 1 || !selectingMarca"
    >
    </ripples-button>
    <confirm-box
      v-if="askForConfirmation"
      @leave="leave"
      @cancel="cancel"
    ></confirm-box>
  </div>
  <GoBackButton @click="this.$router.replace('/atendente')"></GoBackButton>
  <LogoutButtonVue color="white"></LogoutButtonVue>
</template>

<script>
import GoBackButton from "./GoBackButton.vue";
import { onMounted, reactive, computed, ref } from "vue";
import { useStore } from "vuex";
import RipplesButton from "./RipplesButton.vue";
import confirmBox from "./confirmBox.vue";
import LogoutButtonVue from "./LogoutButton.vue";
import { onBeforeRouteLeave, useRouter } from "vue-router";
export default {
  setup() {
    let data = reactive({ data: { results: [{ Model: "" }] } });
    onMounted(async () => {
      const response = await fetch(
        "https://parseapi.back4app.com/classes/Car_Model_List?limit=3510&keys=Make,Model",
        {
          headers: {
            "X-Parse-Application-Id":
              "hlhoNKjOvEhqzcVAJ1lxjicJLZNVv36GdbboZj3Z",
            "X-Parse-Master-Key": "SNMJJF0CZZhTPhLDIqGhTlUNV9r60M2Z5spyWfXW", // This is the fake app's readonly master key
          },
        }
      );
      data.data = await response.json();
    });
    const selectingMarca = ref(true);
    const store = useStore();
    let error = ref("false");
    let router = useRouter();
    let marcaSelected = ref(false);
    let askForConfirmation = ref(false);
    function submitted() {
      leaveConfirm.value = true;
      marcaSelected.value = true;
      if (search.search == "") {
        error.value = "true";
      } else if (uniqueModels.value.indexOf(search.search) == -1) {
        error.value = "invalidInput";
      } else {
        router.push("/seguro2");
      }
    }
    function selectMarca(marca) {
      search.search = marca;

      localStorage.setItem("marca", marca);
      selectingMarca.value = false;
    }
    function selectingAgain() {
      selectingMarca.value = true;
      error.value = "false";
    }
    let search = reactive({ search: "" });

    const uniqueModels = computed({
      get: () => {
        return [...new Set(data.data.results.map((item) => item.Make))];
      },
    });
    const filteredModels = computed({
      get: () => {
        return uniqueModels.value.filter((modelo) => {
          if (search.search) {
            return modelo.toLowerCase().startsWith(search.search.toLowerCase());
          } else {
            return false;
          }
        });
      },
    });
    let leaveConfirm = ref(false);

    function leave() {
      leaveConfirm.value = true;
      router.replace("/seguroauto");
    }
    function cancel() {
      askForConfirmation.value = false;
    }
    onBeforeRouteLeave((to) => {
      askForConfirmation.value = true;
      if (to.path == "/seguro2" && !leaveConfirm.value) {
        return false;
      }
      return true;
    });

    return {
      data: data,
      filteredModels,
      search,
      selectMarca,
      selectingMarca,
      selectingAgain,
      error,
      submitted,
      askForConfirmation,
      leave,
      cancel,
    };
  },
  watch: {
    error(error) {
      if (error != "false") {
        this.$refs.input.focus();
      }
    },
  },
  components: { RipplesButton, confirmBox, GoBackButton, LogoutButtonVue },
};
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
.move {
  margin-top: 215px;
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
li.borderedList {
  padding: 16px 16px 16px 16px;
  cursor: pointer;

  border-right: 1px solid rgb(0, 0, 0, 0.2);
  border-left: 0.5px solid rgb(0, 0, 0, 0.2);
  border-bottom: 0.1px solid rgb(0, 0, 0, 0.1);
}
li.borderedList:hover {
  background-color: rgba(0, 0, 0, 0.14);
}
.marcaTitulo {
  font-size: 22px;
  font-weight: 500;
  margin-bottom: 30px;
  margin-left: 115px;
  position: relative;
}
p {
  padding-top: 10px;
  margin-left: 10px;
  color: #f44336;
  font-size: 11px;
  position: relative;
}

form {
  width: 75vmin;
  height: 100%;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  padding: 40px 0;
}

input[type="text"] {
  width: 100%;
  padding: 15px 10px;
  border: none;
  border: 0.0000001px solid silver;
  outline: none;
  border-radius: 5px;
  background-color: #ffffff;
  font-size: 16px;
  box-shadow: 0px 0.5px 0px 0.4px rgb(0, 0, 0, 0.2);
}
input[type="text"]:hover {
  border: 1.4px solid black;
}
input[type="text"]:focus {
  border: 1.4px solid black;
}
input[type="text"].invalid {
  border: 1.45px solid #f44336;
  box-shadow: none;
}
input[type="text"]::placeholder {
  opacity: 0.3;
}
ul {
  list-style: none;
}
.list {
  width: 100%;
  background-color: #ffffff;
  border-radius: 0 0 5px 5px;
}
.list-items {
  padding: 10px 5px;
}
.list-items:hover {
  background-color: #dddddd;
}
</style>
