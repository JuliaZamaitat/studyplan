<!--source https://www.digitalocean.com/community/tutorials/vuejs-vue-modal-component -->

<template>
  <div class="overlay" @click.self="close">
    <div class="modal-backdrop">
      <div class="modal">
        <header class="modal-header">
          <slot name="header"> This is the default title! </slot>
          <button type="button" class="btn-close" @click="close">x</button>
        </header>

        <section class="modal-body">
          <slot name="body"> This is the default body! </slot>
        </section>

        <footer class="modal-footer">
          <slot name="footer"> This is the default footer! </slot>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    course: {
      type: Object,
      required: true,
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
$htwGruen: #76b900;
.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-backdrop {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  width: 40vw;
  height: 80vh;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: 4px solid #76b900;
  border-radius: 12px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
@media screen and (max-width: 1400px) {
  .modal {
    width: 60vw;
  }
}

@media screen and (max-width: 1200px) {
  .modal {
    width: 60vw;
  }
}

@media screen and (max-width: 1000px) {
  .modal {
    width: 70vw;
  }
}

@media screen and (max-width: 800px) {
  .modal {
    width: 80vw;
  }
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.modal-header {
  position: relative;
  // justify-content: space-between;
}

.modal-footer {
  flex-direction: column;
  // justify-content: flex-end;
}

.modal-body {
  // position: relative;
  padding: 20px 10px;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: $htwGruen;
  background: transparent;
}
</style>
