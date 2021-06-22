<template>
  <div>
    <h2>Login</h2>
    <input
      class="form-control mt-3 mb-2"
      type="email"
      v-model="email"
      placeholder="Email"
      required
    />
    <input
      class="form-control"
      type="password"
      v-model="password"
      placeholder="Password"
      required
    />
    <div class="d-flex justify-content-end">
      <button class="btn btn-primary mt-2" type="submit" @click="login">
        Login
      </button>
    </div>
  </div>
</template>

<script>
import AuthService from "@/services/AuthService.js";
export default {
  data() {
    return {
      email: "",
      password: "",
      msg: "",
    };
  },
  methods: {
    async login() {
      try {
        let credentials = {
          email: this.email,
          password: this.password,
        };
        const response = await AuthService.login(credentials);
        const token = response.data.token;
        this.$store.dispatch("login", { token });
        this.$router.push("/");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped lang="scss"></style>
