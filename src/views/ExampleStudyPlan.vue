<template>
  <div>
    <h1>Exemplarischer Studienplan*</h1>
    <div class="line"></div>
    <BaseSemesterAndCoursesTable :coursesInSemester="coursesInSemester" />
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("program/fetchProgram", "imi-b/1"); //change to dynamic call
  },
  computed: {
    ...mapState("program", ["program"]),
    ...mapGetters("program", ["semester", "courses", "coursesInSemester"]),
  },
};
</script>

<style lang="scss" scoped>
$htwGruen: #76b900;

p,
h1 {
  font-weight: bold;
}
h1 {
  margin-bottom: 20px;
  color: $htwGruen;
}
.line {
  border-top: 3px solid $htwGruen;
  margin: 0 auto;
  padding: 0;
  width: 30px;
  height: 39px;
}
</style>
