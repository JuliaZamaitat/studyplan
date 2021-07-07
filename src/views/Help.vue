<template>
  <div>
    <BaseHeading>
      <h1>Hilfe</h1>
    </BaseHeading>
    <div class="questions">
      <div class="questions questions-question">
        <p class="questions questions-question--text">
          Hast du Fragen zur Belegung?
        </p>
        <a
          href="https://www.htw-berlin.de/studium/studienorganisation/kursbelegung/"
          target="blank"
          class="questions questions-question--answer"
          >Informationen zur Kursbelegung</a
        >
      </div>
      <div class="questions questions-question">
        <p class="questions questions-question--text">
          Bist du dir unsicher und möchtest nochmal selbst in der Studienordnung
          nachlesen?
        </p>
        <a
          href="https://www.htw-berlin.de/studium/studiengaenge/?no_cache=1"
          target="blank"
          class="questions questions-question--answer"
          >Zu den Studiengängen</a
        >
      </div>
      <div class="questions questions-question">
        <p class="questions questions-question--text">
          Möchtest du dich lieber persönlich beraten lassen?
        </p>
        <a
          href="https://www.htw-berlin.de/einrichtungen/zentrale-hochschulverwaltung/zentrum-fuer-studien-karriere-und-gruendungsberatung/allgemeine-studienberatung/"
          target="blank"
          class="questions questions-question--answer"
          >Zur Studienberatung der HTW</a
        >
      </div>
      <div class="questions questions-question">
        <p class="questions questions-question--text">
          Brauchst du Hilfe mit dem Tool selbst?
        </p>
        <a
          href="mailto:s0565922@htw.berlin.de"
          target="blank"
          class="questions questions-question--answer"
          >Schreib uns eine Mail</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import BaseHeading from "../components/BaseHeading.vue";
export default {
  components: { BaseHeading },
};
</script>

<style lang="scss" scoped>
$htwGruen: #76b900;

.questions {
  &-question {
    margin-bottom: 60px;

    &--text {
      font-weight: 700;
      font-size: 20px;
      margin-bottom: 30px;
    }
    &--answer {
      text-decoration: underline;
      color: $htwGruen;
      font-size: 18px;
    }
  }
}
</style>
