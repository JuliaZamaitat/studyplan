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
      />

      <div class="courses">
        <div
          class="course"
          v-for="(course, $courseIndex) in semester.plannedCourses"
          :key="$courseIndex"
          @click="showDetails(course)"
          @drop.stop="moveCourse($event, semester.plannedCourses, $courseIndex)"
          :style="{ width: courseWidth(course) }"
        >
          <div
            class="course-content"
            draggable
            @dragstart="pickupCourse($event, $courseIndex, semesterIndex)"
          >
            <div class="course-content-text">
              <p>{{ course.code }}</p>
              <p>{{ course.name }}</p>
            </div>
          </div>
        </div>
      </div>
      <BaseModal v-show="isModalVisible" @close="closeDetails">
        <template v-slot:header>
          <h1 class="course-details-code">{{ course.code }}</h1>
          <!--coming from vuex -->
          <h2 class="course-details-name">{{ course.name }}</h2>
          <p class="course-details-ects">{{ course.ects }} ECTS</p>
        </template>
        <template v-slot:body>
          <BaseCourseDetails :course="course" />
        </template>
      </BaseModal>
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
    coursesInSemester: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isModalVisible: false,
    };
  },
  computed: {
    ...mapState("course", ["course"]),
  },

  methods: {
    async showDetails(course) {
      this.isModalVisible = true;

      await this.$store.dispatch(
        "course/fetchCourse",
        { program: "imi-b/1", code: course.code } //change to dynamic version
      );
      document.documentElement.style.overflow = "hidden";
    },
    closeDetails() {
      this.isModalVisible = false;
      this.$store.dispatch("course/clearCourse");

      document.documentElement.style.overflow = "auto";
    },
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
      &-content {
        background: rgba(193, 193, 193, 0.55);
        min-height: 87px;
        border-radius: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
        width: 100%;
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

.course-details-code {
  margin-bottom: 15px;
  font-size: 25px;
  color: $htwGruen;
}

.course-details-name {
  margin: 0;

  font-size: 20px;
  color: $htwGruen;
}

.course-details-ects {
  margin-top: 15px;
  font-size: 18px;
}
</style>
