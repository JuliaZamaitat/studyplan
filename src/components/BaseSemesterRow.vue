<template>
  <div>
    <div
      class="semesterRow"
      @drop="moveCourse($event, semester.plannedCourses)"
      @dragover.prevent
      @dragenter.prevent
    >
      <BaseSemesterRowSidebar :semester="semester" />

      <div class="secondContainer">
        <BaseSemesterRowCourse
          v-for="(course, $courseIndex) in semester.plannedCourses"
          :key="course.id"
          :course="course"
          :courseIndex="$courseIndex"
          :semesterIndex="semesterIndex"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    semester: {
      type: Object,
      required: true,
    },
    semesterIndex: {
      type: Number,
      required: true,
    },
    coursesInSemester: {
      type: Array,
      required: true,
    },
  },
  methods: {
    moveCourse(e, toCourses) {
      const fromSemesterIndex = e.dataTransfer.getData("from-semester-index");
      const fromCourses =
        this.coursesInSemester[fromSemesterIndex].plannedCourses;

      const courseIndex = e.dataTransfer.getData("course-index");
      this.$store.dispatch("studyplan/moveCourse", {
        fromCourses,
        toCourses,
        courseIndex,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
$htwGruen: #76b900;

p {
  font-weight: 700;
}
.semesterRow {
  max-width: 100%;
  display: grid;
  grid-template-columns: 0.2fr 0.8fr;
  row-gap: 0px;

  .secondContainer {
    min-width: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
}
</style>
