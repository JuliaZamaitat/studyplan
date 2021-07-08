<template>
  <div>
    <BaseModal :route="'/profile'">
      <template v-slot:header>
        <button
          type="button"
          class="btn-close"
          @click="$router.push('/profile')"
        >
          x
        </button>
        <h1>Passwort ändern</h1>
      </template>

      <template v-slot:body>
        <form name="form" @submit.prevent="handleUpdate">
          <div class="fields">
            <div class="fieldgroup">
              <label for="oldPassword" class="password-label"
                >Altes Passwort</label
              >
              <input
                class="password-input"
                v-model="oldPassword"
                type="password"
                name="oldPassword"
                id="oldPassword"
                @blur="$v.oldPassword.$touch()"
                :class="{ error: $v.oldPassword.$error }"
              />
              <div>
                <input
                  type="checkbox"
                  name="checkbox"
                  @click="showPassword('oldPassword')"
                />
                <label for="checkbox">Passwort zeigen</label>
              </div>
            </div>

            <div v-if="$v.oldPassword.$error">
              <p v-if="!$v.oldPassword.required" class="error-message">
                Darf nicht leer sein
              </p>
            </div>

            <div class="fieldgroup">
              <label for="newPassword" class="password-label"
                >Neues Passwort</label
              >
              <input
                class="password-input"
                v-model="newPassword"
                type="password"
                name="newPassword"
                id="newPassword"
                @blur="$v.newPassword.$touch()"
                :class="{ error: $v.newPassword.$error }"
              />
              <div>
                <input
                  type="checkbox"
                  name="checkbox"
                  @click="showPassword('newPassword')"
                />
                <label for="checkbox">Passwort zeigen</label>
              </div>
            </div>
            <button
              :disabled="$v.$invalid"
              class="submit"
              :class="{ disabled: $v.$invalid }"
            >
              <span>Passwort ändern</span>
            </button>
          </div>
        </form>
      </template>
    </BaseModal>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      oldPassword: "",
      newPassword: "",
    };
  },
  validations: {
    oldPassword: {
      required,
    },
    newPassword: {
      required,
    },
  },
  methods: {
    showPassword(type) {
      var x = document.getElementById(type);
      if (x.type === "password") {
        x.type = "text";
      } else {
        x.type = "password";
      }
    },
    handleUpdate() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        console.log("good");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$htwGruen: #76b900;
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
  flex-direction: column;
  margin: 0 auto;

  .password-label {
    display: block;
    font-weight: bold;
    font-size: 18px;
  }

  .password-input {
    max-width: 35vw;
    font-size: 20px;
    text-align: center;
    border-radius: 12px;
    height: 50px;
    margin-top: 20px;
    margin-bottom: 30px;
  }

  .fieldgroup {
    margin-bottom: 40px;
    input {
      border: 3px solid $htwGruen;
      display: inline;
    }

    .checkbox {
      display: inline;
    }

    input:focus {
      outline: none;
    }
  }
  .submit,
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
}
</style>
