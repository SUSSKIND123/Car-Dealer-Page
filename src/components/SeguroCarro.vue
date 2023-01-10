<template>
  <div class="overlay">
    <form autocomplete="off" @submit.prevent="submitted">
      <h1 class="marcaTitulo">Qual o modelo e versão do seu {{ marca }}?</h1>
      <div class="inputDiv">
        <input
          type="text"
          placeholder="Modelo..."
          ref="input"
          v-model="search.search"
          @input="selectingAgain"
          :class="{ invalid: error == 'true' || error == 'invalidInput' }"
        />
      </div>
      <ul class="list" v-if="selectingModel">
        <li
          v-for="model in filteredModels"
          :key="model"
          @click="selectModel(model)"
        >
          {{ model }}
        </li>
      </ul>
      <p v-if="error == 'true'" style="font-size: 15px">
        Por favor, preencha este campo
      </p>
      <p v-if="error == 'invalidInput'" style="font-size: 15px">
        Ooops! Modelo não encontrado. Que tal revisar os dados informados?
      </p>
    </form>
    <ripples-button
      class="move"
      :timeout="450"
      content="CONTINUAR"
      @click="submitted"
      v-if="filteredModels.length < 1 || !selectingModel"
    >
    </ripples-button>
    <confirm-box
      v-if="askForConfirmation"
      @leave="leave"
      @cancel="cancel"
    ></confirm-box>
  </div>
  <GoBackButton @click="this.$router.replace('/seguro')"></GoBackButton>
  <LogoutButtonVue color="white"></LogoutButtonVue>
</template>

<script>
import LogoutButtonVue from "./LogoutButton.vue";
import GoBackButton from "./GoBackButton.vue";
import RipplesButton from "./RipplesButton.vue";
import confirmBox from "./confirmBox.vue";
import { onMounted, reactive, computed, ref, onUnmounted } from "vue";
import { onBeforeRouteLeave, useRouter } from "vue-router";
export default {
  components: {
    RipplesButton,
    confirmBox,
    GoBackButton,
    LogoutButtonVue,
  },

  setup() {
    let data = reactive({ data: { results: [{ Model: "" }] } });
    onMounted(async () => {
      const response = await fetch(
        "https://parseapi.back4app.com/classes/Car_Model_List?limit=3510&keys=Make,Model",
        {
          headers: {
            "X-Parse-Application-Id":
              "hlhoNKjOvEhqzcVAJ1lxjicJLZNVv36GdbboZj3Z", // This is the fake app's application id
            "X-Parse-Master-Key": "SNMJJF0CZZhTPhLDIqGhTlUNV9r60M2Z5spyWfXW", // This is the fake app's readonly master key
          },
        }
      );
      data.data = await response.json();
    });
    const selectingModel = ref(true);
    let error = ref("false");
    let router = useRouter();
    let askForConfirmation = ref(false);
    function selectModel(model) {
      search.search = model;
      selectingModel.value = false;
    }
    function submitted() {
      console.log("hi");
      if (search.search == "") {
        error.value = "true";
      } else if (uniqueModels.value.indexOf(search.search) == -1) {
        error.value = "invalidInput";
      } else {
        router.push("/seguro2");
      }
    }
    function selectingAgain() {
      selectingModel.value = true;
      error.value = "false";
    }
    let search = reactive({ search: "" });
    const marca = computed({
      get() {
        const marca = localStorage.getItem("marca");

        return marca;
      },
    });
    const uniqueModels = computed({
      get: () => {
        return [
          ...new Set(filteredNonUniqueModels.value.map((item) => item.Model)),
        ];
      },
    });
    const filteredNonUniqueModels = computed({
      get: () => {
        return data.data.results.filter((modelo) => {
          return modelo.Make === marca.value;
        });
      },
      //I want to make it so that after the selection of marca in SeguroCarroMarca,
      //I filter models so only models of that marca appear
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
      router.replace("/seguro");
    }
    function cancel() {
      askForConfirmation.value = false;
    }
    onUnmounted(() => {
      localStorage.removeItem("marca");
    });
    onBeforeRouteLeave((to) => {
      askForConfirmation.value = true;
      if (to.path == "/seguro" && !leaveConfirm.value) {
        return false;
      }
      return true;
    });

    return {
      data: data,
      filteredModels,
      search,
      selectModel,
      selectingModel,
      selectingAgain,
      marca,
      submitted,
      error,
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
  margin-left: 60px;
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
