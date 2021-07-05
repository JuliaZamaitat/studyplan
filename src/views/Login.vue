<template>
  <div>
    <h1>Willkommen zu deinem Studyplan!</h1>
    <h2>Plane dein Studium und behalte den Überblick!</h2>
    <h3>Logge dich ein</h3>
    <div class="line"></div>
    <form name="form" @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">Benutzername</label>
        <input v-model="username" type="text" name="username" />
        <!-- <div v-if="errors.has('username')" role="alert">
          Username is required!
        </div> -->
      </div>
      <div class="form-group">
        <label for="password">Passwort</label>
        <input v-model="password" type="password" name="password" />
      </div>
      <div>
        <button>
          <!-- <span v-show="loading"></span> -->
          <span>Login</span>
        </button>
        <a class="register-link" href="/register">zur Registrierung</a>
      </div>
      <div>
        <div v-if="message" role="alert" class="error-message">
          {{ message }}
        </div>
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
      // loading: false,
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
      // this.loading = true;
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
              // this.loading = false;
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

<style scoped lang="scss">
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
.register-link {
  display: block;
  color: inherit;
  font-size: 15px;
}
</style>
