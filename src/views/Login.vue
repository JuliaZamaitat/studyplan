<template>
  <div>
    <h1>Willkommen zu deinem Studyplan!</h1>
    <h2>Plane dein Studium und behalte den Überblick!</h2>
    <h3>Logge dich ein</h3>
    <div class="line"></div>
    <form name="form" @submit.prevent="handleLogin">
      <div>
        <label for="username">Benutzername</label>
        <input
          v-model="username"
          type="text"
          name="username"
          @blur="$v.username.$touch()"
          :class="{ error: $v.username.$error }"
        />
        <div v-if="$v.username.$error">
          <p v-if="!$v.username.required" class="error-message">
            Gib deinen Nutzernamen ein
          </p>
        </div>
      </div>
      <div>
        <label for="password">Passwort</label>
        <input
          v-model="password"
          type="password"
          name="password"
          :class="{ error: $v.password.$error }"
          @blur="$v.password.$touch()"
        />
        <div v-if="$v.password.$error">
          <p v-if="!$v.password.required" class="error-message">
            Gib dein Passwort ein
          </p>
        </div>
      </div>
      <div>
        <button :disabled="$v.$invalid" :class="{ disabled: $v.$invalid }">
          <span>Login</span>
        </button>
        <p v-if="$v.$anyError" class="error-message">
          Bitte fülle alle Felder aus.
        </p>
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
import { required } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      username: "",
      password: "",
      message: "",
      // loading: false,
    };
  },
  validations: {
    username: {
      required,
    },
    password: {
      required,
    },
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
      this.$v.$touch();
      if (!this.$v.$invalid) {
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
      }
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

.disabled {
  color: grey;
  text-decoration: none;
  cursor: auto;
}

.error-message {
  color: red;
  margin-bottom: 30px;
  margin-top: 0;
}

.error {
  border-color: red;
}
.register-link {
  display: block;
  color: inherit;
  font-size: 15px;
}
</style>
