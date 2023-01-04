<template>Seguro para carros {{ data }}</template>

<script>
import { reactive } from "vue";
export default {
  async setup() {
    let data = reactive(null);

    const response = await fetch(
      "https://parseapi.back4app.com/classes/Car_Model_List?limit=10&keys=Make,Model",
      {
        headers: {
          "X-Parse-Application-Id": "hlhoNKjOvEhqzcVAJ1lxjicJLZNVv36GdbboZj3Z", // This is the fake app's application id
          "X-Parse-Master-Key": "SNMJJF0CZZhTPhLDIqGhTlUNV9r60M2Z5spyWfXW", // This is the fake app's readonly master key
        },
      }
    );
    data = await response.json();
    return {
      data,
    };
  },
};
</script>
