<template>
  <div>
    <div
      class="semesterRow"
      @drop="moveCourse($event, semester.plannedCourses)"
      @dragover.prevent
      @dragenter.prevent
    >
      <BaseSemesterRowSidebar
        :semester="semester"
        :semesterIndex="semesterIndex"
        :semesterName="semesterName"
      />

      <div class="courses">
        <div
          class="course"
          v-for="(course, $courseIndex) in semester.plannedCourses"
          :key="$courseIndex"
          @drop.stop="moveCourse($event, semester.plannedCourses, $courseIndex)"
          :style="{ width: courseWidth(course) }"
        >
          <router-link
            class="course-content-container"
            :to="{
              name: 'baseModal',
              params: { code: course.code, semester: semesterName.name },
            }"
          >
            <div
              class="course-content-container-content"
              draggable
              @dragstart="pickupCourse($event, $courseIndex, semesterIndex)"
            >
              <div class="course-content-container-content-text">
                <p class="course-content-container-content-text--code">
                  {{ course.code }}
                </p>
                <p>{{ course.name }}</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

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
    semesterName: {
      type: Object,
      required: true,
    },
    coursesInSemester: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapState("course", ["course"]),
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
a {
  text-decoration: none;
  color: inherit;
}

p {
  font-weight: 700;
}
.semesterRow {
  max-width: 100%;
  display: grid;
  grid-template-columns: 0.2fr 0.8fr;
  row-gap: 0px;

  .courses {
    min-width: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;

    .course {
      padding: 20px 25px 20px 0;
      display: flex;
      align-items: center;

      &-content-container {
        position: relative;
        background: rgba(193, 193, 193, 0.55);
        min-height: 87px;
        border-radius: 14px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        &-content {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 auto;
          width: 100%;
          min-height: 87px;

          &-text {
            max-width: 100%;
            height: 100%;
            overflow: hidden;
            border-radius: 14px;

            p {
              padding: 0px;
              font-size: 12px;
              padding: 3px;
              margin: 0;
              max-width: 95%;
              word-wrap: break-word;
              border-radius: 14px;
            }
          }
        }
      }
    }
  }
}
</style>
