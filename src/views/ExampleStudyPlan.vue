<template>
  <div>
    <BaseHeading><h1>Exemplarischer Studienplan*</h1></BaseHeading>
    <BaseExampleSemesterAndCoursesTable
      :coursesInSemester="officialCoursesInSemester"
    />
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  created() {
    this.$store.dispatch("program/fetchProgram", "imi-b/1"); //change to dynamic call
  },
  computed: {
    ...mapState("program", ["program"]),
    ...mapGetters("program", [
      "semester",
      "courses",
      "officialCoursesInSemester",
    ]),
  },
};
</script>

<style lang="scss" scoped>
$htwGruen: #76b900;

p {
  font-weight: bold;
}

.line {
  border-top: 3px solid $htwGruen;
  margin: 0 auto;
  padding: 0;
  width: 30px;
  height: 39px;
}
</style>
