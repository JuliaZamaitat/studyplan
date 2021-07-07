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
    await this.$store.dispatch("program/fetchProgram", {
      code: this.user.studyPlan.program.code.toLowerCase(),
      version: this.user.studyPlan.program.version,
    });

    await this.$store.dispatch("semester/fetchSemesters");
    console.log(this.user._id);
    await this.$store.dispatch("studyplan/fetchStudyPlan", `${this.user._id}`);
  },
  mounted() {
    console.log("store", this.user);
    if (!this.$store.state.user.user.startOfStudy) {
      this.$router.push("/select-program");
    }
  },

  computed: {
    ...mapState("program", ["program"]),
    ...mapState("studyplan", ["studyPlan"]),
    ...mapState("user", ["user"]),
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
