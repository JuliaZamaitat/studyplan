<template>
  <div>
    <div class="container">
      <div class="shadowBox">
        <BaseSemesterRow
          v-for="(semester, $semesterIndex) in coursesInSemester"
          class="semester"
          :key="semester.id"
          :semester="semester"
          :semesterIndex="$semesterIndex"
          :coursesInSemester="coursesInSemester"
        />
      </div>
    </div>
    <button @click="createSemester">Add Semester</button>
  </div>
</template>

<script>
export default {
  props: {
    coursesInSemester: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    createSemester() {
      this.$store.dispatch("studyplan/createSemester", {
        semesterCount: this.coursesInSemester.length + 1,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
$htwGruen: #76b900;
button {
  margin: 30px;
}
.container {
  display: grid;
  margin: 0 auto;
  max-width: 80%;
  border-radius: 20px;

  .shadowBox {
    box-shadow: 0px 7px 4px rgba(0, 0, 0, 0.23);
    border-radius: 20px;
  }
  .semester {
    background: white;
    &:nth-child(odd) {
      background: rgba(118, 185, 0, 0.1) !important;
    }
    &:first-of-type {
      border-radius: 20px 20px 0 0;
    }
    &:last-of-type {
      border-radius: 0 0 20px 20px;
    }
  }
}
</style>
