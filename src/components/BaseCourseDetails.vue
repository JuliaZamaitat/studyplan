<template>
  <div>
    <div>
      <h3>Empfohlenes Semester</h3>
      <p>{{ course.semester }}</p>
    </div>

    <div>
      <h3>Unterrichtsform</h3>
      <p>{{ course.methods }}</p>
    </div>

    <div v-if="course.responsible_person">
      <h3>Zuständige Person</h3>
      <p>{{ course.responsible_person }}</p>
    </div>

    <div>
      <h3>Häufigkeit</h3>
      <p v-if="course.frequency == 'WiSe'">im Wintersemester</p>
      <p v-if="course.frequency == 'SoSe'">im Sommersemester</p>
      <p else>jedes Semester</p>
    </div>

    <div v-if="course.lectureHrs">
      <h3>Vorlesungsstunden pro Woche</h3>
      <p>{{ course.lectureHrs }}</p>
    </div>

    <div v-if="course.labHrs">
      <h3>Übungsstunden pro Woche</h3>
      <p>{{ course.labHrs }}</p>
    </div>

    <div v-if="course.tutorialhrs">
      <h3>Tutorienstunden pro Woche</h3>
      <p>{{ course.tutorialhrs }}</p>
    </div>

    <div v-if="course.room">
      <h3>Raum</h3>
      <p>{{ course.room }}</p>
    </div>

    <div v-if="course.equipment">
      <h3>Benötigte Ausstattung</h3>
      <p>{{ course.equipment }}</p>
    </div>

    <div v-if="course.contents">
      <h3>Inhalte</h3>
      <p>{{ course.contents }}</p>
    </div>

    <div v-if="course.mission">
      <h3>Gewünschte Ergebnisse</h3>
      <p>{{ course.mission }}</p>
    </div>

    <div v-if="course.examination">
      <h3>Prüfungsform</h3>
      <p>{{ course.examination }}</p>
    </div>

    <div v-if="course.objective">
      <h3>Zielsetzung</h3>
      <p>{{ course.objective }}</p>
    </div>

    <div v-if="course.prerequisites">
      <h3>Voraussetzungen</h3>
      <p>{{ course.prerequisites }}</p>
    </div>

    <div v-if="course.literature">
      <h3>Literatur</h3>
      <p>{{ course.literature }}</p>
    </div>

    <div v-if="course.skills_knowledge_understanding">
      <h3>Fähigkeiten – Wissen</h3>
      <p>{{ course.skills_knowledge_understanding }}</p>
    </div>

    <div v-if="course.skills_intellectual">
      <h3>Fähigkeiten – Intellektuell</h3>
      <p>{{ course.skills_intellectual }}</p>
    </div>

    <div v-if="course.skills_practical">
      <h3>Fähigkeiten – Praktisch</h3>
      <p>{{ course.skills_practical }}</p>
    </div>

    <div v-if="course.skills_general">
      <h3>Fähigkeiten – Allgemein</h3>
      <p>{{ course.skills_general }}</p>
    </div>

    <div v-if="course.updated_at">
      <h4>Zulettzt geupdated</h4>
      <p>{{ new Date(course.updated_at).toLocaleDateString("de-DE") }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    course: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
$htwGruen: #76b900;
h3 {
  font-size: 18px;
}

h4 {
  color: $htwGruen;
}
</style>
