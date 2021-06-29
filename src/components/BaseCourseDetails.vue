<template>
  <div>
    <h1 class="course-details-code">{{ course.course.code }}</h1>
    <h2 class="course-details-name">{{ course.course.name }}</h2>
    <h2 class="course-details-semestername">{{ semester.name }}</h2>

    <p class="course-details-ects">{{ course.course.ects }} ECTS</p>

    <div>
      <h3>Empfohlenes Semester</h3>
      <p>{{ course.course_program.semester }}</p>
    </div>

    <div v-if="course.child_courses && course.child_courses.length > 0">
      <h3>Muss belegt werden durch einer dieser Kurse</h3>
      <p class="hint">
        (Kurse mit -Kurscode-.1, -Kurscode-.2 müssen zusammen belegt werden, um
        -Kurscode- zu bestehen)
      </p>
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
                code: childCourse.code,
                semester: semester.name,
              },
            }"
          >
            <div class="childCourses-course-content-text">
              <p class="childCourses-course-content-text--code">
                {{ childCourse.code }}
              </p>
              <p>{{ childCourse.name }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>

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
export default {
  props: {
    course: {
      type: Object,
      required: true,
    },
    semester: {
      type: Object,
      required: true,
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

.course-details-code {
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
}
h3 {
  font-size: 18px;
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
