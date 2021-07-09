<template>
  <div>
    <BaseModal :route="'/register'">
      <template v-slot:header>
        <button
          type="button"
          class="btn-close"
          @click="$router.push('/profile')"
        >
          x
        </button>
        <h1>Verifizierungsmail senden</h1>
      </template>
      <template v-slot:body>
        <div class="fieldgroup">
          <label for="email" class="email-label">Email</label>
          <input
            class="email-input"
            v-model="email"
            type="email"
            name="email"
            @blur="$v.email.$touch()"
            :class="{ error: $v.email.$error }"
          />

          <div v-if="$v.email.$error">
            <p v-if="!$v.email.required" class="message--error">
              Darf nicht leer sein
            </p>
          </div>
        </div>

        <div
          v-if="message"
          class="message"
          :class="{
            'message message--error': !successful,
            'message message--success': successful,
          }"
        >
          {{ message }}
        </div>
      </template>

      <template v-slot:footer>
        <button
          :disabled="$v.$invalid"
          class="submit"
          :class="{ disabled: $v.$invalid }"
          @click.prevent="resendConfirmation"
        >
          Neue Verifizierungsmail beantragen
        </button>
      </template>
    </BaseModal>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      email: "",
      message: "",
    };
  },

  validations: {
    email: {
      required,
      email,
    },
  },

  methods: {
    async resendConfirmation() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.message = "";

        const response = await this.$store.dispatch(
          "user/resendVerificationEmail",
          {
            email: this.email,
          }
        );
        if (response) {
          //not resend
          this.message = response.message;
          this.successful = false;
        } else {
          //everything went ok
          this.message = "Verifizierungsmail erneut gesendet!";
          this.successful = true;
          this.email = "";

          this.$v.$reset();
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$htwGruen: #76b900;

.error {
  border-color: #f8153d !important;
}

.message {
  &--error {
    color: #f8153d;
    margin-bottom: 30px;
    margin-top: 0;
  }
  &--success {
    color: $htwGruen;
  }
}

.email-label {
  display: block;
  font-weight: bold;
  font-size: 18px;
}

.email-input {
  width: 50%;
  text-align: center;
  border-radius: 12px;
  height: 50px;
  margin-top: 30px;
  margin-bottom: 20px;
}

.fieldgroup {
  margin-top: 70px;
  margin-bottom: 50px;
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
}

.disabled {
  color: grey;
  text-decoration: none;
  cursor: auto;
}
</style>
