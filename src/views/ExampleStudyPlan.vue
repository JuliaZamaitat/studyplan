<template>
  <div>
    <h1>Exemplarischer Studienplan</h1>
    <div class="container">
      <div
        class="semesterRow"
        v-for="semester in coursesInSemester"
        :key="semester.id"
      >
        <div class="sidebar">
          <p class="semesterCount">{{ semester[0].semester }}. Semester</p>
          <p>{{ ects(semester) }} ECTS</p>
        </div>
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
  methods: {
    ects(semester) {
      var ects = 0;
      for (let i in semester) {
        ects += semester[i].ects;
      }
      return ects;
    },
  },
};
</script>

<style lang="scss" scoped>
p,
h1 {
  font-weight: bold;
}
h1 {
  margin-bottom: 40px;
}

.container {
  display: grid;
  grid-template-rows: repeat(auto-fill, auto);
  background: rgba(118, 185, 0, 0.1);
  border-radius: 20px;
  margin: 0 auto;
  max-width: 90%;
  border-radius: 20px;
  box-shadow: 0px 7px 4px rgba(0, 0, 0, 0.23);

  .semesterRow {
    display: grid;
    grid-template-columns: repeat(auto-fill, 150px);
    column-gap: 25px;
    background: white;

    & div:first-child {
      grid-column: 1 -1;
      grid-row: 1 / 10;
    }

    &:nth-child(odd) {
      background: rgba(118, 185, 0, 0.1);
    }
    &:first-of-type {
      border-radius: 20px 20px 0 0;
    }
    &:last-of-type {
      border-radius: 0 0 20px 20px;
    }

    .sidebar {
      min-height: 87px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      margin: 14px;

      .semesterCount {
        font-size: 18px;
        padding: 10px;
      }

      p {
        margin: 0;
      }
    }

    .course {
      margin: 14px;
      width: 150px;
      min-height: 87px;
      background: #8acc74;
      border-radius: 14px;
      display: inline-block;

      .text {
        max-width: 100%;
        height: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 5px;
        p {
          font-size: 12px;
          padding: 3px;
          margin: 0;
          max-width: 95%;
          word-wrap: break-word;
        }
      }
    }
  }
}
</style>
