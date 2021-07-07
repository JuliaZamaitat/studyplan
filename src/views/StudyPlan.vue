<template>
  <div>
    <BaseHeading><h1>Mein StudyPlan</h1></BaseHeading>
    <pulse-loader :loading="pending" :color="color"></pulse-loader>

    <BaseStudyPlan :coursesInSemester="getSemesterPlans" />
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      pending: {
        type: Boolean,
        default: "false",
      },
      color: "rgb(143, 44,27)",
    };
  },
  async created() {
    this.pending = true;

    await this.$store.dispatch("semester/fetchSemesters");
    console.log("id", this.user.id);
    await this.$store.dispatch("studyplan/fetchStudyPlan", {
      userId: this.user.id || this.user._id,
    });
    await this.$store.dispatch("program/fetchProgram", {
      code: this.user.studyPlan.program.code.toLowerCase(),
      version: this.user.studyPlan.program.version,
    });
    console.log("hier");
    this.pending = false;
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
