<template>
  <div class="sidebar">
    <p class="semesterCount">{{ semester.currentSemesterCount }}. Semester</p>
    <p>{{ ects(semester) }} ECTS</p>
  </div>
</template>

<script>
export default {
  props: {
    semester: {
      type: Object,
      required: true,
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
  },
};
</script>

<style lang="scss" scoped>
$htwGruen: #76b900;

.semesterCount {
  font-size: 18px;
  padding: 10px;
  font-weight: bold;
  color: $htwGruen;
}
p {
  margin: 0;
  font-weight: 700;
}

.sidebar {
  min-height: 87px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 14px;
}
</style>
