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
  </div>
</template>

<script>
import { onMounted, reactive, computed, ref } from "vue";
import { useStore } from "vuex";
import RipplesButton from "./RipplesButton.vue";

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
    function submitted() {
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
      store.commit("setMarca", marca);
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
    onBeforeRouteLeave((to) => {
      if (to.path == "/seguro2" && !marcaSelected.value) {
        error.value = "true";
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
    };
  },
  watch: {
    error(error) {
      if (error != "false") {
        this.$refs.input.focus();
      }
    },
  },
  components: { RipplesButton },
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

li {
  padding: 16px 16px 16px 16px;
  cursor: pointer;

  border-right: 1px solid rgb(0, 0, 0, 0.2);
  border-left: 0.5px solid rgb(0, 0, 0, 0.2);
  border-bottom: 0.1px solid rgb(0, 0, 0, 0.1);
}
li:hover {
  background-color: rgba(0, 0, 0, 0.14);
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
