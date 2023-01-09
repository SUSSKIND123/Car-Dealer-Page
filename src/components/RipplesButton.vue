<template>
  <div class="button" @click="createRipple">
    <button class="button-17" role="button" ref="container">
      {{ content }}
      <span
        ref="ripple"
        v-for="ripple in ripples"
        :key="ripple.rippleId"
        :style="{
          left: ripple.left,
          top: ripple.top,
        }"
      ></span>
    </button>
  </div>
</template>
<script>
import { ref } from "vue";

export default {
  props: {
    timeout: {
      type: Number,
      default: 450,
    },
    content: {
      type: String,
      default: "Button",
    },
  },
  setup(props) {
    let ripples = ref([]);
    let container = ref(null);

    function createRipple(e) {
      let left = `${e.clientX - e.target.offsetLeft}px`;
      let rippleId = Date.now();
      let top = `${e.clientY - e.target.offsetTop}px`;
      ripples.value.push({
        left: left,
        top: top,
        rippleId: rippleId,
      });

      setTimeout(function () {
        ripples.value = ripples.value.filter(
          (ripple) => ripple.rippleId !== rippleId
        );
      }, props.timeout);
    }

    return {
      createRipple,
      ripples,
      container,
    };
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap");
* {
  margin: 0;
  padding: 0;
  outline: none;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
.button {
  padding-bottom: 10px;
  margin-top: 200px;
  margin-left: 43%;
}
.button-17 {
  align-items: center;
  appearance: none;
  background-color: #4168ff;
  border-radius: 24px;
  border-style: none;
  box-shadow: rgba(0, 0, 0, 0.2) 0 3px 5px -1px,
    rgba(0, 0, 0, 0.14) 0 6px 10px 0, rgba(0, 0, 0, 0.12) 0 1px 18px 0;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-flex;
  fill: currentcolor;
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  font-weight: 500;
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

  will-change: transform, opacity;
  z-index: 0;
  width: 170px;
  color: white;
  font-family: Open Sans, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI,
    Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
  font-weight: 500;
  font-size: 0.788rem;
  letter-spacing: 0.08em;
  word-spacing: -1px;
  height: 2.8rem;
}

.button-17:hover {
  background-color: rgb(40 57 204);
}

.button-17:active {
  box-shadow: 0 4px 4px 0 rgb(60 64 67 / 30%),
    0 8px 12px 6px rgb(60 64 67 / 15%);
  outline: none;
}

.button-17 > span {
  position: absolute;
  background: white;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  pointer-events: none;
  animation: ripples 0.6s linear infinite;
  z-index: 1000;
}

/* Add animation */
@keyframes ripples {
  0% {
    width: 0px;
    height: 0px;
    opacity: 0.2;
  }
  100% {
    width: 500px;
    height: 500px;
    opacity: 0;
  }
}
</style>
