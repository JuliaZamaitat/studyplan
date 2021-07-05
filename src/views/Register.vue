<template>
  <div>
    <form name="form" @submit.prevent="handleRegister">
      <div v-if="!successful">
        <div>
          <label for="username">Username</label>
          <input v-model="username" type="text" name="username" />
        </div>
        <div>
          <label for="email">Email</label>
          <input v-model="email" type="email" name="email" />
        </div>
        <div>
          <label for="password">Password</label>
          <input v-model="password" type="password" name="password" />
        </div>
        <div>
          <button>Sign Up</button>
        </div>
      </div>
    </form>
    <div v-if="message">
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      email: "",
      submitted: false,
      successful: false,
      message: "",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.user.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleRegister() {
      this.message = "";
      this.submitted = true;
      // this.$validator.validate().then((isValid) => {
      // if (isValid) {
      this.$store
        .dispatch("user/register", {
          username: this.username,
          password: this.password,
          email: this.email,
        })
        .then(
          (data) => {
            this.message = data.message;
            this.successful = true;
          },
          (error) => {
            this.message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            this.successful = false;
          }
        );
    },
    // });
    // },
  },
};
</script>

<style lang="scss" scoped></style>
