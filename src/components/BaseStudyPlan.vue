<template>
  <div>
    <div class="container">
      <div class="shadowBox">
        <div
          class="semesterRow"
          v-for="(semester, $semesterIndex) in coursesInSemester"
          :key="semester.id"
          @drop="moveCourse($event, semester.plannedCourses)"
          @dragover.prevent
          @dragenter.prevent
        >
          <div class="sidebar">
            <p class="semesterCount">
              {{ semester.currentSemesterCount }}. Semester
              <!-- {{ semester }} -->
            </p>
            <p>{{ ects(semester) }} ECTS</p>
          </div>
          <div class="secondContainer">
            <div
              class="course"
              :style="{ width: courseWidth(course) }"
              v-for="(course, $courseIndex) in semester.plannedCourses"
              :key="course.id"
              draggable
              @dragstart="pickupCourse($event, $courseIndex, $semesterIndex)"
            >
              <div class="text">
                <p>{{ course.code }}</p>
                <p>{{ course.name }}</p>
              </div>
            </div>
          </div>
        </div>
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
    ects(semester) {
      var ects = 0;
      for (let i in semester.plannedCourses) {
        if (semester.plannedCourses[i].ects)
          ects += semester.plannedCourses[i].ects;
      }
      return ects;
    },
    courseWidth(course) {
      const width = course.ects * 25 + (course.ects / 5 - 1) * 25;
      return `${width}px`;
    },
    pickupCourse(e, courseIndex, fromSemesterIndex) {
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.dropEffect = "move";

      e.dataTransfer.setData("course-index", courseIndex);
      e.dataTransfer.setData("from-semester-index", fromSemesterIndex);
    },
    // eslint-disable-next-line no-unused-vars
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

  p {
    font-weight: 700;
  }
  .shadowBox {
    box-shadow: 0px 7px 4px rgba(0, 0, 0, 0.23);
    border-radius: 20px;
  }

  .semesterRow {
    max-width: 100%;
    display: grid;
    grid-template-columns: 0.2fr 0.8fr;
    background: white;
    row-gap: 0px;

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
        font-weight: bold;
        color: $htwGruen;
      }
      p {
        margin: 0;
        font-weight: bold;
      }
    }

    .secondContainer {
      min-width: 0;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      .course {
        margin: 20px 25px 20px 0;
        min-height: 87px;
        background: rgba(193, 193, 193, 0.55);
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
}
</style>
