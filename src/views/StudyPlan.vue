<template>
  <div>
    <BaseHeading><h1>Mein Studienplan</h1></BaseHeading>
    <pulse-loader :loading="pending" :color="color"></pulse-loader>

    <BaseStudyPlan
      v-show="!pending"
      :coursesInSemester="this.studyPlan.semesterPlans"
    />

    <div class="explanation">
      <button
        class="explanation explanation-button"
        @click="showingExplanations = !showingExplanations"
      >
        <p v-if="showingExplanations">Hinweise verbergen</p>
        <p v-else>Hinweise anzeigen</p>
      </button>
      <transition name="fade">
        <div
          v-if="showingExplanations"
          class="explanation explanation-container"
        >
          <div class="explanatin explanation-questions">
            <div class="explanation explanation-question">
              <h4 class="explanation explanation-question--question">
                Wie benutze ich den StudyPlan?
              </h4>
              <div class="explanation explanation-question--answers">
                <p>
                  Du kannst ganz einfach per Drag & Drop die Kurse zwischen den
                  Semestern hin- und herziehen. Mit Klick auf einen Kurs kommst
                  du zur Detailansicht. Du kannst einen Kurse als "belegt" und
                  "bestanden" makieren. Manche Kurse müssen durch andere Kurse
                  bestanden werden – du kannst dann nur dort "belegt" oder
                  "bestanden" angeben.
                </p>
              </div>
            </div>

            <div class="explanation explanation-question">
              <h4 class="explanation explanation-question--question">
                Was bedeuten die Farben?
              </h4>
              <div class="explanation explanation-question--answers">
                <p class="notBooked">noch nicht belegt</p>
                <p class="booked">belegt</p>
                <p class="passed">bestanden</p>
              </div>
            </div>
            <div class="explanation explanation-question">
              <h4 class="explanation explanation-question--question">
                Disclaimer
              </h4>
              <div class="explanation explanation-question--answers">
                <p>
                  Das Tool dient deiner persönlichen Planung. Es überprüft
                  (noch) nicht die Sinnhaftigkeit und Richtigkeit deiner
                  Belegungspläne. Alle Angaben sind mit bestem Gewissen erstellt
                  worden, was jedoch keine 100% Garantie für die Richtigkeit der
                  Infos darstellt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      pending: false,
      color: "#76b900",
      showingExplanations: false,
    };
  },

  async mounted() {
    if (!this.$store.state.user.user.startOfStudy) {
      this.$router.push("/select-program");
    } else {
      this.pending = true;
      await this.$store.dispatch("semester/fetchSemesters");
      await this.$store.dispatch("studyplan/fetchStudyPlan", {
        userId: this.user.id || this.user._id,
      });
    }
    this.pending = false;
  },

  computed: {
    ...mapState("program", ["program"]),
    ...mapState("studyplan", ["studyPlan"]),
    ...mapState("user", ["user"]),
  },
};
</script>

<style lang="scss" scoped>
$htwGruen: #76b900;

p {
  font-weight: 700;
}

.explanation {
  margin-top: 30px;

  .fade-enter-active {
    transition: all 0.6s;
  }
  .fade-enter {
    opacity: 0;
  }

  &-button {
    background: none;
    color: rgb(127, 127, 127);
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
    text-decoration: underline;
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 20px;
  }
  &-container {
    max-width: 1550px;
    margin: 0 auto;
    background: rgba(118, 185, 0, 0.12);
    border: 1px solid rgba(118, 185, 0, 0.36);
    border-radius: 12px;

    @media screen and (max-width: 1600px) {
      max-width: 90% !important;
    }
    @media screen and (max-width: 1600px) {
      max-width: 90% !important;
    }
  }

  &-questions {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: auto;

    @media screen and (max-width: 650px) {
      flex-direction: column;
    }
  }
  &-question {
    margin: 40px auto 40px;
    width: 25%;

    @media screen and (max-width: 650px) {
      width: 90%;
    }

    &--question {
      margin: auto;
    }
    &--answers {
      p {
        display: inline;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
      }

      .passed {
        color: $htwGruen;
        display: block;
      }
      .booked {
        color: rgba(253, 177, 62, 1);
        display: block;
      }
      .notBooked {
        color: rgb(127, 127, 127);
        display: block;
      }
    }
  }
}
</style>
