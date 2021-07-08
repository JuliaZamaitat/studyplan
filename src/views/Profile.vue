<template>
  <div>
    <BaseHeading>
      <h1>Profil</h1>
    </BaseHeading>
    <div class="fields fields-personal">
      <div class="fieldgroup">
        <label for="username">Benutzername </label>
        <input
          :value="username"
          type="text"
          name="username"
          @blur="
            $v.username.$touch();
            handleUpdate($event, 'username');
          "
          :class="{ error: $v.username.$error }"
        />
      </div>
      <div class="fieldgroup">
        <label for="email">Email </label>
        <input
          :value="email"
          type="text"
          name="email"
          @blur="
            $v.email.$touch();
            handleUpdate($event, 'email');
          "
          :class="{ error: $v.email.$error }"
        />
      </div>
    </div>
    <div class="changePassword">
      <router-link
        :to="{
          name: 'baseChangePasswordModal',
        }"
      >
        Passwort ändern
      </router-link>
    </div>
    <div v-if="$v.username.$error || $v.email.$error">
      <p v-if="!$v.email.email" class="error-message">
        Bitte gib eine gülitge Emailadresse an
      </p>
      <p
        v-if="!$v.username.required || !$v.email.required"
        class="error-message"
      >
        Felder dürfen nicht leer sein.
      </p>
    </div>
    <div v-if="message" role="alert" class="error-message">
      {{ message }}
    </div>
    <div class="fields fields-program">
      <div class="fieldgroup">
        <label for="program">Studiengang </label>
        <input v-model="program" type="text" name="program" :disabled="true" />
      </div>
      <div class="fieldgroup">
        <label for="startOfStudy">Studienbeginn</label>
        <input
          v-model="startOfStudy"
          type="text"
          name="startOfStudy"
          :disabled="true"
        />
      </div>

      <router-link
        class="danger"
        :to="{
          name: 'baseDeleteStudyplanModal',
        }"
      >
        Angaben zum Studium ändern
      </router-link>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { required, email } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      username: "",
      email: "",
      message: "",
      startOfStudy: "",
      program: "",
      version: "",
    };
  },
  validations: {
    username: {
      required,
    },
    email: {
      required,
      email,
    },
  },
  created() {
    if (!this.user.startOfStudy) {
      this.$router.push("/select-program");
    } else {
      this.username = this.user.username;
      this.email = this.user.email;
      this.startOfStudy = this.user.startOfStudy.name;
      this.program = this.user.studyPlan.program.name;
      this.version = this.user.studyPlan.program.version;
    }
  },
  computed: {
    ...mapState("user", ["user"]),
  },
  methods: {
    ...mapMutations("user", ["SET_USER"]),

    async handleUpdate(e, attribute) {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        if (attribute == "username") {
          const newName = e.target.value;
          this.user.username = newName;
          this.SET_USER(this.user);
          const response = await this.$store.dispatch(
            "user/updateUser",
            {},
            { root: true }
          );
          if (response) {
            //not updated
            this.message = response.message;
            this.user.username = this.username;
            e.target.value = this.username;
            this.SET_USER(this.user);
          } else {
            //everything went ok
            this.username = newName;
          }
        } else if (attribute == "email") {
          const newEmail = e.target.value;
          this.user.email = newEmail;
          this.SET_USER(this.user);
          const response = await this.$store.dispatch(
            "user/updateUser",
            {},
            { root: true }
          );
          if (response) {
            //not updated
            this.message = response.message;
            this.user.email = this.email;
            e.target.value = this.email;
            this.SET_USER(this.user);
          } else {
            //everything went ok
            this.email = newEmail;
          }
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$htwGruen: #76b900;

.changePassword {
  margin-bottom: 40px;
  a {
    color: inherit;
  }
}

.error-message {
  color: #f8153d;
  margin-bottom: 30px;
  margin-top: 0;
}

.error {
  border-color: #f8153d !important;
}

.fields {
  display: flex;
  margin: 0 auto;
  justify-content: center;
  align-items: center;

  label {
    display: block;
    font-weight: bold;
    font-size: 18px;
  }

  input {
    max-width: 35vw;
    font-size: 20px;
    text-align: center;

    border-radius: 12px;
    height: 50px;
    margin-top: 20px;
    margin-bottom: 30px;
  }

  &-personal {
    .fieldgroup {
      margin: 20px;

      input {
        border: 3px solid $htwGruen;
        width: 250px;
      }

      input:focus {
        outline: none;
      }
    }
  }

  &-program {
    flex-direction: column;

    .fieldgroup {
      input {
        max-width: 80vw;
        width: 550px;
        background: rgba(204, 204, 204, 0.3);
        border: 3px solid #c1c1c1;
      }
    }

    .danger {
      color: #f8153d;
      padding-top: 20px;
    }
  }
}
</style>
