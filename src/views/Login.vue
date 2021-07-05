<template>
  <div>
    <h2>Login</h2>
    <form name="form" @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">Username</label>
        <input v-model="username" type="text" name="username" />
        <!-- <div v-if="errors.has('username')" role="alert">
          Username is required!
        </div> -->
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input v-model="password" type="password" name="password" />
      </div>
      <div>
        <button :disabled="loading">
          <span v-show="loading"></span>
          <span>Login</span>
        </button>
      </div>
      <div>
        <div v-if="message" role="alert">{{ message }}</div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      message: "",
      loading: false,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.user.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/my-studyplan");
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      // this.$validator.validateAll().then((isValid) => {
      //   if (!isValid) {
      //     this.loading = false;
      //     return;
      //   }
      if (this.username && this.password) {
        this.$store
          .dispatch("user/login", {
            username: this.username,
            password: this.password,
          })
          .then(
            () => {
              this.$router.push("/my-studyplan");
            },
            (error) => {
              this.loading = false;
              this.message =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
            }
          );
      }
      // });
    },
  },
};
</script>

<style scoped lang="scss"></style>
