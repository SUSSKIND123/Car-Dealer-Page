<template>
  <div
    ref="container"
    @mousedown="addRipple"
    class="ripple-outer"
    :style="{ width: width }"
  >
    <transition-group class="ripples" name="grow" tag="div">
      <div
        class="ripple"
        v-for="ripple in ripples"
        :key="ripple.id"
        :style="{
          top: ripple.top,
          left: ripple.left,
          width: ripple.width,
          height: ripple.height,
          background: color,
          opacity: opacity,
        }"
      ></div>
    </transition-group>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    width: {
      type: String,
      default: "100%",
    },
    color: {
      type: String,
      default: "#fff",
    },
    opacity: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      ripples: [],
    };
  },
  mounted() {
    const width = this.$refs.container.offsetWidth;
    const height = this.$refs.container.offsetHeight;
    this.rippleWidth = width > height ? width : height;
    this.halfRippleWidth = this.rippleWidth / 2;
    document.addEventListener.call(window, "mouseup", this.purgeRipples);
  },
  beforeUnmount() {
    document.removeEventListener.call(window, "mouseup", this.purgeRipples);
  },

  methods: {
    addRipple(e) {
      const { left, top } = this.$refs.container.getBoundingClientRect();
      const rippleId = Date.now();
      this.ripples.push({
        width: `${this.rippleWidth}px`,
        height: `300px`,
        left: `${e.clientX - left - this.halfRippleWidth}px`,
        top: `${e.clientY - top - this.halfRippleWidth}px`,
        id: rippleId,
      });
    },
    purgeRipples() {
      setTimeout(() => {
        this.ripples.shift();
      }, 450);
    },
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto");

* {
  box-sizing: border-box;
}

html,
body,
main {
  margin: 0;
  height: 100%;
  font-family: Roboto, sans-serif;
}
body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: blue;
}
main {
  display: flex;
  margin-top: 50px;
  flex-wrap: wrap;
}
main > div {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 200px;
  margin: 20px;
}
h1 {
  color: #666;
}
.box {
  width: 200px;
  height: 200px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
  background: #fff;
}
svg {
  width: 30px;
  height: 30px;
}
h3 a,
h3 a:active,
h3 a:visited {
  text-decoration: none;
  color: rgb(123, 35, 206);
}
h3 > span {
  color: #444;
  font-weight: 300;
  font-size: 13px;
}
.fab {
  height: 56px;
  width: 56px;
  border-radius: 50%;
  background: #f44336;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s ease-out;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
}

.fab.fab-cyan {
  background: rgb(35, 206, 206);
}

.fab:hover {
  box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.14), 0 1px 7px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -1px rgba(0, 0, 0, 0.2);
}

.btn {
  text-align: center;
  border-radius: 2px;
  user-select: none;
  font-family: Roboto;
  cursor: pointer;
  background: #26a69a;
  color: #fff;
  transition: 0.3s ease-out;
  text-transform: uppercase;
  font-weight: bold;
  height: 40px;
  line-height: 40px;
  padding: 0 40px;
  border: none;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
}
.btn.btn-flat,
.btn.btn-flat:hover {
  box-shadow: none;
  color: #333;
  background: transparent;
}
.btn.btn-white,
.btn.btn-white:hover {
  background: #fff;
  color: #333;
}
.btn:hover {
  background: #2bbbad;
  box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.14), 0 1px 7px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -1px rgba(0, 0, 0, 0.2);
}

.fab.fab-purple {
  background: rgb(123, 35, 206);
}

/*************************************/
/**
/**         RIPPLE CLASSES
/**
/*************************************/

.ripple-outer {
  position: relative;
  z-index: 1;
  overflow: hidden;
  cursor: pointer;
  margin-left: 560px;
}
.ripples {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
}
.ripple {
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
  background: blue;
}

.grow-leave-to {
  transition: all 50ms ease-out;
}
.grow-leave-from {
  transition: all 50ms ease-out;
}
.grow-enter-to {
  transition: all 800ms ease-out;
}
.grow-enter-from {
  transition: all 800ms ease-out;
}

.grow-enter-from {
  transform: scale(0);
}

.grow-enter-to {
  transform: scale(2.4);
}

.grow-leave-from {
  transform: scale(2.4);
}
.grow-leave-to {
  transform: scale(2.4);
}
</style>
