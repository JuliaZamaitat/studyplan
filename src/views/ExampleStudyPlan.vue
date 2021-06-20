<template>
  <div>
    <h1>Exemplarischer Studienverlauf</h1>
    <div v-for="course in program.program.courses" :key="course.id">
      {{ course.code }}
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      courses: {
        type: [String],
        required: true,
      },
    };
  },
  created() {
    this.$store.dispatch("program/fetchProgram", "imi-b/1");
  },
  computed: {
    ...mapState(["program"]),
  },
};
</script>

<style lang="scss" scoped></style>
