<template>
  <div>
    <h1 class="marcaTitulo">Qual o ano de fabricação do carro?</h1>
    <div class="dropdown">
      <select
        name="dropdown"
        id="dropdown"
        class="select"
        style="color: #36454f"
        :style="{
          border: error ? 'solid 1px red' : '',
        }"
        v-model="year"
      >
        <option value="" disabled hidden>Ano..</option>
        <option value="2016">2016</option>
        <option value="2017">2017</option>
        <option value="2018">2018</option>
        <option value="2019">2019</option>
        <option value="2020">2020</option>
        <option value="2021">2021</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
      </select>
    </div>
    <p v-if="error == true" class="error">Por favor, preencha este campo.</p>
    <ripples-button
      class="move"
      :timeout="450"
      content="CONTINUAR"
      @click="submitted"
    >
    </ripples-button>
    <confirm-box
      v-if="askForConfirmation"
      @leave="leave"
      @cancel="cancel"
    ></confirm-box>
  </div>
  <GoBackButton @click="this.$router.replace('/seguro')"></GoBackButton>
  <LogoutButtonVue color="white" @click="leaveConfirm = true"></LogoutButtonVue>
</template>
<script>
import RipplesButton from "./RipplesButton.vue";
import confirmBox from "./confirmBox.vue";
import LogoutButtonVue from "./LogoutButton.vue";
import GoBackButton from "./GoBackButton.vue";
import { ref } from "vue";
import { onBeforeRouteLeave, useRouter } from "vue-router";

export default {
  components: {
    RipplesButton,
    confirmBox,
    LogoutButtonVue,
    GoBackButton,
  },
  setup() {
    let router = useRouter();
    let error = ref(false);
    let askForConfirmation = ref(false);
    let year = ref("");
    let leaveConfirm = ref(false);
    function submitted() {
      leaveConfirm.value = true;
      if (!year.value) {
        error.value = true;
      } else {
        router.push("/seguro4");
      }
    }
    function leave() {
      leaveConfirm.value = true;
      router.replace("/seguro2");
    }
    function cancel() {
      askForConfirmation.value = false;
      router.replace("/seguro3");
    }
    onBeforeRouteLeave((to) => {
      if (
        (to.path == "/seguro2" && !leaveConfirm.value) ||
        !leaveConfirm.value
      ) {
        console.log("hi");
        askForConfirmation.value = true;
        leaveConfirm.value = false;
        return false;
      }
      return true;
    });
    return {
      submitted,
      year,
      leave,
      cancel,
      askForConfirmation,
      leaveConfirm,
      error,
    };
  },
};
</script>
<style scoped>
.error {
  position: absolute;
  top: 22.5%;
  left: 31%;
  font-weight: 100;
  font-family: "Poppins", sans-serif;
  color: red;
  font-size: 15px;
}
.marcaTitulo {
  font-size: 22px;
  font-weight: 500;
  margin-top: 41px;
  margin-bottom: 32px;
  margin-left: 35%;
  position: relative;
  font-family: "Poppins", sans-serif;
}

.select {
  height: 60px;
  font-size: 22px;
  border-radius: 8px;
  width: 58%;
}
.select:focus {
  outline-color: rgb(144, 238, 144, 0.5);
}

.dropdown {
  margin-left: 30%;
}
.move {
  margin-top: 55px;
}
</style>
