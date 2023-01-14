<template>
  <h3>
    Processo finalizado. Enviamos um email para
    <span class="email">{{ email }}</span> com mais algumas informações a serem
    inseridas. <br />
    O time Avonale agradece pela sua confiança. Já estamos preparando a sua
    cotação.
  </h3>
</template>
<script>
import emailjs from "emailjs-com";
export default {
  data() {
    return {
      name: "",
      email: "",
    };
  },
  created() {
    this.fetchUserInfo();
  },
  methods: {
    async fetchUserInfo() {
      const userId = this.$store.getters.userId;
      const token = this.$store.getters.token;
      const response = await fetch(
        process.env.VUE_APP_USERS +
          userId +
          process.env.VUE_APP_EXTENSION +
          token
      );
      if (!response.ok) {
        console.log("not ok");
        throw Error();
      }

      const user = await response.json();
      this.name = user.name;
      this.email = user.email;
    },
    async sendEmail(e) {
      const userId = this.$store.getters.userId;
      const token = this.$store.getters.token;
      const response = await fetch(
        process.env.VUE_APP_USERS +
          userId +
          process.env.VUE_APP_EXTENSION +
          token
      );
      if (!response.ok) {
        console.log("not ok");
        throw Error();
      }

      const user = await response.json();
      this.name = user.name;
      this.email = user.email;
      try {
        emailjs.sendForm(
          process.env.VUE_APP_SERVICEID,
          process.env.VUE_APP_TEMPLATEID,
          e.target,
          process.env.VUE_APP_USERID,
          {
            name: this.name,
            email: this.email,
          }
        );
      } catch (err) {
        console.log(err);
      }
      this.name = "";
      this.message = "";
    },
  },
};
</script>
<style scoped>
h3 {
  text-align: center;
  opacity: 1;
  font-weight: 500;
}
.email {
  font-weight: 600;
}
</style>
