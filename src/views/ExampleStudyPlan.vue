<template>
  <div>
    <h1>Exemplarischer Studienplan</h1>
    <div class="container">
      <div
        class="semester"
        v-for="semester in coursesInSemester"
        :key="semester.id"
      >
        <div class="course" v-for="course in semester" :key="course.id">
          <div class="text">
            <p>{{ course.code }}</p>
            <p>{{ course.name }}</p>
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
.sidebar {
  display: grid;
  // grid-template-columns: repeat(auto-fill, auto);
}
.container {
  display: grid;
  grid-template-rows: repeat(auto-fill, auto);
  background: rgba(118, 185, 0, 0.1);
  border-radius: 20px;
  margin: 0 auto;
  max-width: 80%;

  .semester {
    display: grid;
    height: auto;
    grid-template-columns: repeat(auto-fill, 150px);
    grid-gap: 25px;
    margin: 10px;

    background: grey;
  }

  .course {
    width: 150px;
    height: 87px;
    margin: 5px auto;
    background: #8acc74;
    border-radius: 14px;
    display: inline-block;

    .text {
      width: 100%;
      height: 100%;
      overflow: hidden;

      p {
        font-size: 12px;
        display: block;
      }
    }
  }
}
</style>
