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
        <div
          class="course"
          v-for="(course, $courseIndex) in semester.plannedCourses"
          :key="$courseIndex"
          draggable
          @dragstart="pickupCourse($event, $courseIndex, semesterIndex)"
          @drop.stop="moveCourse($event, semester.plannedCourses, $courseIndex)"
        >
          <div class="innerbox" :style="{ width: courseWidth(course) }">
            <div class="text">
              <p>{{ course.code }}</p>
              <p>{{ course.name }}</p>
            </div>
          </div>
        </div>
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
    courseWidth(course) {
      const width = course.ects * 25 + (course.ects / 5 - 1) * 25;
      return `${width}px`;
    },
    pickupCourse(e, fromCourseIndex, fromSemesterIndex) {
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.dropEffect = "move";

      e.dataTransfer.setData("from-course-index", fromCourseIndex);
      e.dataTransfer.setData("from-semester-index", fromSemesterIndex);
    },
    moveCourse(e, toCourses, toCourseIndex) {
      const fromSemesterIndex = e.dataTransfer.getData("from-semester-index");

      const fromCourses =
        this.coursesInSemester[fromSemesterIndex].plannedCourses;
      const fromCourseIndex = e.dataTransfer.getData("from-course-index");
      console.log("toCourseIndex", toCourseIndex);
      this.$store.dispatch("studyplan/moveCourse", {
        fromCourses,
        fromCourseIndex,
        toCourses,
        toCourseIndex,
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
    align-items: center;

    .course {
      padding: 20px 25px 20px 0;
      display: flex;
      align-items: center;

      .innerbox {
        background: rgba(193, 193, 193, 0.55);
        min-height: 87px;
        border-radius: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
      }

      .text {
        max-width: 100%;
        height: 100%;
        overflow: hidden;
        p {
          padding: 0px;
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
