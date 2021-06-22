<template>
  <div>
    <h1>Exemplarischer Studienplan</h1>
    <div class="container">
      <div v-for="semester in coursesInSemester" :key="semester.id">
        <div v-for="course in semester" :key="course.id">
          <div v-if="course.semester != 0">
            {{ course.code }}
          </div>
        </div>
      </div>
    </div>
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
.container {
  background: red;
  display: grid;
  grid-template-columns: 50px;
  grid-template-rows: 25% 100px auto;
}
</style>
