<template>
  <div>
    <h1 class="course-details-code">{{ course.course.code }}</h1>
    <h2 class="course-details-name">{{ course.course.name }}</h2>
    <h2 class="course-details-semestername">{{ semester.name }}</h2>
    <p class="course-details-ects">{{ course.course.ects }} ECTS</p>

    <!-- Bestanden/Belegt wenn keine Child Courses -->
    <div v-if="course.child_courses.length == 0" class="checkbox">
      <input
        type="checkbox"
        class="checkbox-input checkbox-input--booked"
        v-model="booked"
        @change="toggleBooked($event, course.course.code, semester)"
      />
      <label for="checkbox" class="checkbox-label checkbox-label--booked"
        >Belegt</label
      >
      <input
        type="checkbox"
        class="checkbox-input checkbox-input--passed"
        v-model="passed"
        @change="togglePassed($event)"
      />
      <label for="checkbox" class="checkbox-label checkbox-label--passed"
        >Bestanden</label
      >
    </div>

    <div>
      <h3>Empfohlenes Semester</h3>
      <p>{{ course.course_program.semester }}</p>
    </div>

    <!-- Child Courses -->

    <div v-if="course.child_courses.length > 0 && !isChildCourse">
      <!-- wenn nicht belegt -->
      <div v-if="!booked">
        <h3 v-if="requiredCourses.length == 0">
          Muss belegt werden durch einer dieser Kurse
        </h3>
        <h3 v-else>Muss durch folgende Kurse belegt werden</h3>

        <div class="childCourses">
          <div
            class="childCourses-course"
            v-for="childCourse in course.child_courses"
            :key="childCourse.id"
          >
            <router-link
              class="course-content-container"
              :to="{
                name: 'baseModalChildCourse',
                params: {
                  parentCode: course.course.code,
                  code: childCourse.course.code,
                  semester: semester.name,
                  requiredParentCourses: requiredCourses,
                },
              }"
            >
              <div class="childCourses-course-content-text">
                <p class="childCourses-course-content-text--code">
                  {{ childCourse.course.code }}
                </p>
                <p>{{ childCourse.course.name }}</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- wenn belegt ohne required Kurse-->
    <div
      v-if="
        course.child_courses.length != 0 &&
        booked &&
        !isChildCourse &&
        (!requiredCourses || requiredCourses.length == 0)
      "
    >
      <h3 class="bookedThrough">Belegt durch</h3>
      <div class="childCourses">
        <div
          class="childCourses-course"
          v-for="childCourse in bookedThroughCourses"
          :key="childCourse.id"
        >
          <router-link
            class="course-content-container"
            :to="{
              name: 'baseModalChildCourse',
              params: {
                parentCode: course.course.code,
                code: childCourse,
                semester: semester.name,
                requiredParentCourses: requiredCourses,
              },
            }"
          >
            <div class="childCourses-course-content-text">
              <p class="childCourses-course-content-text--code">
                {{ childCourse }}
              </p>
              <p>{{ getNameOfChildCourse(childCourse) }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <!-- wenn belegt und required Kurse -->
    <!-- check ob getBoookedThroughCourses alle requiredCourse enthält -->
    <div
      v-if="
        course.child_courses.length != 0 &&
        booked &&
        requiredCourses.length != 0 &&
        !isChildCourse
      "
    >
      <h3
        v-if="bookedThroughCourses.length == requiredCourses.length"
        class="bookedThrough"
      >
        Belegt durch
      </h3>
      <h3 v-if="bookedThroughCourses.length != requiredCourses.length">
        Noch nicht vollständig belegt, belege noch nicht belegte Kurse
      </h3>
      <div class="childCourses">
        <div
          class="childCourses-course"
          v-for="childCourse in course.child_courses"
          :key="childCourse.id"
        >
          <router-link
            class="course-content-container"
            :to="{
              name: 'baseModalChildCourse',
              params: {
                parentCode: course.course.code,
                code: childCourse.course.code,
                semester: semester.name,
                requiredParentCourses: requiredCourses,
              },
            }"
          >
            <div class="childCourses-course-content-text">
              <p class="childCourses-course-content-text--code">
                {{ childCourse.course.code }}
              </p>
              <p>{{ childCourse.course.name }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Allgemeine Informationen -->

    <div>
      <h3>Unterrichtsform</h3>
      <p>{{ course.course.methods }}</p>
    </div>

    <div v-if="course.course.cresponsible_person">
      <h3>Zuständige Person</h3>
      <p>{{ course.course.responsible_person }}</p>
    </div>

    <div>
      <h3>Häufigkeit</h3>
      <p v-if="course.course.frequency == 'WiSe'">im Wintersemester</p>
      <p v-if="course.course.frequency == 'SoSe'">im Sommersemester</p>
      <p else>jedes Semester</p>
    </div>

    <div v-if="course.course.lectureHrs">
      <h3>Vorlesungsstunden pro Woche</h3>
      <p>{{ course.course.lectureHrs }}</p>
    </div>

    <div v-if="course.course.labHrs">
      <h3>Übungsstunden pro Woche</h3>
      <p>{{ course.course.labHrs }}</p>
    </div>

    <div v-if="course.course.tutorialhrs">
      <h3>Tutorienstunden pro Woche</h3>
      <p>{{ course.course.tutorialhrs }}</p>
    </div>

    <div v-if="course.course.room">
      <h3>Raum</h3>
      <p>{{ course.course.room }}</p>
    </div>

    <div v-if="course.course.equipment">
      <h3>Benötigte Ausstattung</h3>
      <p>{{ course.course.equipment }}</p>
    </div>

    <div v-if="course.course.contents">
      <h3>Inhalte</h3>
      <p>{{ course.course.contents }}</p>
    </div>

    <div v-if="course.course.mission">
      <h3>Gewünschte Ergebnisse</h3>
      <p>{{ course.course.mission }}</p>
    </div>

    <div v-if="course.course.examination">
      <h3>Prüfungsform</h3>
      <p>{{ course.course.examination }}</p>
    </div>

    <div v-if="course.course.objective">
      <h3>Zielsetzung</h3>
      <p>{{ course.course.objective }}</p>
    </div>

    <div v-if="course.course.prerequisites">
      <h3>Voraussetzungen</h3>
      <p>{{ course.course.prerequisites }}</p>
    </div>

    <div v-if="course.course.literature">
      <h3>Literatur</h3>
      <p>{{ course.course.literature }}</p>
    </div>

    <div v-if="course.course.skills_knowledge_understanding">
      <h3>Fähigkeiten – Wissen</h3>
      <p>{{ course.course.skills_knowledge_understanding }}</p>
    </div>

    <div v-if="course.course.skills_intellectual">
      <h3>Fähigkeiten – Intellektuell</h3>
      <p>{{ course.course.skills_intellectual }}</p>
    </div>

    <div v-if="course.course.skills_practical">
      <h3>Fähigkeiten – Praktisch</h3>
      <p>{{ course.course.skills_practical }}</p>
    </div>

    <div v-if="course.course.skills_general">
      <h3>Fähigkeiten – Allgemein</h3>
      <p>{{ course.course.skills_general }}</p>
    </div>

    <div v-if="course.course.updated_at">
      <h4>Zulettzt geupdated</h4>
      <p>
        {{ new Date(course.course.updated_at).toLocaleDateString("de-DE") }}
      </p>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      booked: false,
      passed: false,
      requiredCourses: [],
      requiredParentCourses: [],
    };
  },
  props: {
    course: {
      type: Object,
      required: true,
    },
    semester: {
      type: Object,
      required: true,
    },
    isChildCourse: {
      type: Boolean,
      required: true,
    },
    parentCourseCode: {
      type: String,
      required: false,
      default: "",
    },
  },
  created() {
    this.booked = this.$store.getters["studyplan/getBookedStateOfCourse"](
      this.course.course.code,
      this.parentCourseCode,
      this.semester
    );
    this.getRequiredCourses();
    console.log("requiredCourses", this.requiredCourses);
  },
  computed: {
    ...mapGetters("studyplan", ["getBookedThroughCourses"]),
    bookedThroughCourses() {
      if (this.course.child_courses || this.course.child_courses.length != 0) {
        return this.getBookedThroughCourses(
          this.course.course.code,
          this.semester
        );
      }
      return [];
    },
  },

  methods: {
    toggleBooked(e, courseCode, semester) {
      console.log("toggle", this.requiredCourses);
      console.log("toggle2", this.requiredParentCourses);

      this.$store.dispatch("studyplan/toggleBookedStateOfCourseInSemester", {
        courseCode: courseCode,
        parentCourseCode: this.parentCourseCode,
        semester: semester,
        requiredCourses: this.requiredParentCourses,
      });
    },
    togglePassed(e) {
      //emit to studyplan that this course was passed
      //BUT check first if it was a child course, because then you have to save it to the parent course
      console.log(e);
    },
    getRequiredCourses() {
      //TODO: required kurse vom parent weitergeben an child
      if (this.isChildCourse) {
        this.requiredParentCourses = this.$route.params.requiredParentCourses;
      }
      if (!this.course.child_courses || this.course.child_courses.length == 0)
        return [];
      for (let i in this.course.child_courses) {
        if (
          this.course.child_courses[i].course_connection.required == "required"
        ) {
          this.requiredCourses.push(this.course.child_courses[i]);
        }
      }
    },

    getNameOfChildCourse(childCourseCode) {
      for (let i in this.course.child_courses) {
        if (this.course.child_courses[i].course.code == childCourseCode)
          return this.course.child_courses[i].course.name;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$htwGruen: #76b900;
$belegtFont: rgba(253, 177, 62, 1);
$belegtBackground: rgba(253, 177, 62, 0.55);
a {
  text-decoration: none;
  color: inherit;
}

.checkbox {
  margin: 20px 0 50px;
  &-input {
    margin-right: 10px;
  }

  &-label {
    margin-right: 10px;

    &--booked {
      color: $belegtFont;
    }
    &--passed {
      color: $htwGruen;
    }
  }
}

.course-details-code {
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 25px;
  color: $htwGruen;
}

.course-details-name {
  margin: 0;
  font-size: 25px;
  color: $htwGruen;
}

.course-details-semestername {
  font-size: 20px;
  color: $htwGruen;
}

.course-details-ects {
  margin-top: 15px;
  font-size: 16px;
  font-weight: 700;
}
h3 {
  font-size: 18px;
}
.bookedThrough {
  color: $belegtFont;
}
h4 {
  color: $htwGruen;
}

.hint {
  font-size: 12px;
  font-style: italic;
}

.childCourses {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  &-course {
    background: rgba(193, 193, 193, 0.55);
    border: 1px solid #c1c1c1;

    min-height: 87px;
    width: 10vw;
    border-radius: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 9px;
    &-content {
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

        &--code {
          font-weight: 700;
        }

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
</style>
