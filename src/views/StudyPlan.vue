<template>
  <div>
    <BaseHeading><h1>Mein StudyPlan</h1></BaseHeading>
    <BaseStudyPlan :coursesInSemester="getSemesterPlans" />
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  async created() {
    await this.$store.dispatch("program/fetchProgram", "imi-b/1");
    //change to dynamic call
    await this.$store.dispatch("semester/fetchSemesters");

    await this.$store.dispatch(
      "studyplan/fetchStudyPlan",
      "60dcd209d707b572e05e2c54"
    );

    // this.$store.dispatch("course/getCourses");
  },
  computed: {
    ...mapState("program", ["program"]),
    ...mapState("studyplan", ["studyPlan"]),

    ...mapGetters("studyplan", ["getSemesterPlans"]),
  },
};
</script>

<style lang="scss" scoped>
$htwGruen: #76b900;

p {
  font-weight: bold;
}
</style>
