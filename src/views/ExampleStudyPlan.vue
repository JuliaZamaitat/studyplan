<template>
  <div>
    <BaseHeading><h1>Exemplarischer Studienplan*</h1></BaseHeading>
    <BaseExampleSemesterAndCoursesTable
      :coursesInSemester="officialCoursesInSemester"
      v-show="!pending"
    />
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
      color: "#76b900",
    };
  },
  async created() {
    this.pending = true;
    await this.$store.dispatch("program/fetchProgram", {
      code: this.user.studyPlan.program.code.toLowerCase(),
      version: this.user.studyPlan.program.version,
    });
    this.pending = false;
  },
  computed: {
    ...mapState("program", ["program"]),
    ...mapState("user", ["user"]),
    ...mapGetters("program", ["officialCoursesInSemester"]),
  },
  mounted() {
    if (!this.$store.state.user.user.startOfStudy) {
      this.$router.push("/select-program");
    }
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
