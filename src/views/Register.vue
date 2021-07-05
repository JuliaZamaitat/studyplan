<template>
  <div>
    <h1>Willkommen zu deinem Studyplan!</h1>
    <h2>Plane dein Studium und behalte den Überblick!</h2>
    <h3>Registriere dich</h3>
    <div class="line"></div>
    <form name="form" @submit.prevent="handleRegister">
      <div v-if="!successful">
        <div>
          <label for="username">Benutzername</label>
          <input v-model="username" type="text" name="username" />
        </div>
        <div>
          <label for="email">Email</label>
          <input v-model="email" type="email" name="email" />
        </div>
        <div>
          <label for="password">Passwort</label>
          <input v-model="password" type="password" name="password" />
        </div>
        <div>
          <button>Registrieren</button>
          <a class="login-link" href="/login">zum Login</a>
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

<style lang="scss" scoped>
$htwGruen: #76b900;
label {
  display: block;
  font-weight: bold;
}

.line {
  border-top: 3px solid;
  margin: 0 auto;
  padding: 0;
  width: 30px;
  height: 39px;
  margin-bottom: 30px;
}

h1,
h2 {
  color: $htwGruen;
}

h2 {
  font-weight: normal;
  font-size: 20px;
}

h3 {
  margin-top: 70px;

  font-size: 23px;
}

input {
  font-size: 20px;
  text-align: center;
  border: 3px solid $htwGruen;
  border-radius: 12px;
  max-width: 350px;
  width: 80%;
  height: 60px;
  margin-top: 10px;
  margin-bottom: 30px;
}

input:focus {
  outline: none;
}

button,
input[type="submit"] {
  background: none;
  color: $htwGruen;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  text-decoration: underline;
  font-weight: bold;
  font-size: 18px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.error-message {
  color: red;
}

.login-link {
  display: block;
  color: inherit;
  font-size: 15px;
}
</style>
