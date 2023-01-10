<template>
  <div class="dialog-overlay">
    <div class="dialog">
      <header>
        <h3 class="title">Ir para a página anterior?</h3>
      </header>
      <div class="dialog-msg">
        <p class="description">
          É possível que alterações feitas não sejam salvas
        </p>
      </div>
      <footer>
        <div class="controls">
          <button class="button doAction" @click="$emit('cancel')">
            Cancelar
          </button>
          <button
            class="button button-default cancelAction"
            @click="$emit('leave')"
          >
            Voltar
          </button>
        </div>
      </footer>
    </div>
  </div>
</template>

<style scoped>
@font-face {
  font-family: "Product Sans";
  font-style: normal;
  font-weight: 400;
  src: local("Open Sans"), local("OpenSans"),
    url(https://fonts.gstatic.com/s/productsans/v5/HYvgU2fE2nRJvZ5JFAumwegdm0LZdjqr5-oayXSOefg.woff2)
      format("woff2");
}

body {
  font-family: "Product Sans";
}
.cancelAction {
  background: #8ab4f8;
  color: black;
  border: 1px solid black;
  margin-right: 2px;
  padding: 7px 25px;
  outline: 1.4px solid black;
  outline-offset: -3.6px;
  border-radius: 3px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-weight: 500;
}
.doAction {
  background: #343434;
  color: #8ab4f8;
  border-radius: 3px;
  padding: 7px 15px;
  border: 1px solid rgb(256, 256, 256, 0.1);
  font-size: 12.5px;
}
.title {
  font-family: Open Sans, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI,
    Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
  font-weight: 350;
  font-size: 14.9px;
  color: white;
  margin-top: 5px;
  margin-left: 5px;
}
.description {
  font-family: Open Sans, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI,
    Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
  color: white;
  margin-top: -25px;
  margin-left: 5px;
  font-size: 12px;
}
.dialog-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999999;
}
.dialog-overlay .dialog {
  width: 400px;
  margin: 0px auto 0px auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  background: hsl(223deg 8% 22%);
  border-radius: 3px;
  overflow: hidden;
}

.dialog-overlay .dialog header {
  background-color: hsl(223deg 8% 22%);
  padding: 10px 8px;
}

.dialog-overlay .dialog .dialog-msg {
  padding: 12px 10px;
}

.dialog-overlay .dialog footer {
  padding: 8px 10px;
}
.dialog-overlay .dialog footer .controls {
  direction: rtl;
}

.button {
  cursor: pointer;
}

.description {
  color: white;
}
</style>
