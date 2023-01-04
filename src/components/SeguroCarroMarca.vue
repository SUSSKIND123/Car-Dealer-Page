<template>
  <div class="overlay">
    <form autocomplete="off">
      <div>
        <input
          type="text"
          placeholder="Qual é a marca do seu carro?"
          v-model="search.search"
          @input="selectingAgain"
        />
      </div>
      <ul class="list" v-if="selectingMarca">
        <li
          v-for="marca in filteredMarcas"
          :key="marca"
          @click="selectMarca(marca)"
        >
          {{ marca }}
        </li>
      </ul>
    </form>
  </div>
</template>

<script>
import { onMounted, reactive, computed, ref } from "vue";
export default {
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
    const selectingMarca = ref(true);
    function selectMarca(marca) {
      search.search = marca;
      selectingMarca.value = false;
    }
    function selectingAgain() {
      selectingMarca.value = true;
    }
    let search = reactive({ search: "" });
    const uniqueMarcas = computed({
      get: () => {
        return [...new Set(data.data.results.map((item) => item.Make))];
      },
    });
    const filteredMarcas = computed({
      get: () => {
        return uniqueMarcas.value.filter((marca) => {
          if (search.search) {
            return marca.toLowerCase().startsWith(search.search.toLowerCase());
          } else {
            return false;
          }
        });
      },
    });
    return {
      data: data,
      filteredMarcas,
      search,
      selectMarca,
      selectingMarca,
      selectingAgain,
    };
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
  border: 0.0001px solid blue;
}
input[type="text"]:focus {
  border: 1.48px solid lightblue;
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
