<template>
  <div>
    <div
      class="course"
      :style="{ width: courseWidth(course) }"
      draggable
      @dragstart="pickupCourse($event, courseIndex, semesterIndex)"
    >
      <div class="text">
        <p>{{ course.code }}</p>
        <p>{{ course.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    course: {
      type: Object,
      required: true,
    },
    courseIndex: {
      type: Number,
      required: true,
    },
    semesterIndex: {
      type: Number,
      required: true,
    },
  },
  methods: {
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
  },
};
</script>

<style lang="scss" scoped>
p {
  font-weight: 700;
}
.course {
  margin: 20px 25px 20px 0;
  min-height: 87px;
  background: rgba(193, 193, 193, 0.55);
  border-radius: 14px;
  display: flex;
  justify-content: center;
  align-items: center;

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
</style>
