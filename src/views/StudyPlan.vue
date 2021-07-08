<template>
  <div>
    <BaseHeading><h1>Mein StudyPlan</h1></BaseHeading>
    <pulse-loader :loading="pending" :color="color"></pulse-loader>

    <BaseStudyPlan :coursesInSemester="this.studyPlan.semesterPlans" />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      pending: {
        type: Boolean,
        default: false,
      },
      color: "#76b900",
    };
  },

  async mounted() {
    this.pending = true;
    if (!this.$store.state.user.user.startOfStudy) {
      this.$router.push("/select-program");
    } else {
      await this.$store.dispatch("semester/fetchSemesters");
      await this.$store.dispatch("studyplan/fetchStudyPlan", {
        userId: this.user.id || this.user._id,
      });
      await this.$store.dispatch("program/fetchProgram", {
        code: this.user.studyPlan.program.code.toLowerCase(),
        version: this.user.studyPlan.program.version,
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
  font-weight: bold;
}
</style>
