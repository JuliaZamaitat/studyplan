<!--source https://www.digitalocean.com/community/tutorials/vuejs-vue-modal-component -->

<template>
  <div
    class="overlay"
    @click.self="
      isExampleStudyPlan
        ? $router.push('/example-studyplan')
        : $router.push('/my-studyplan')
    "
  >
    <div class="modal">
      <header class="modal-header">
        <button
          v-if="!isChildCourse"
          type="button"
          class="btn-close"
          @click="$router.push('/my-studyplan')"
        >
          x
        </button>
        <button v-else type="button" class="btn-back" @click="$router.go(-1)">
          <font-awesome-icon :icon="['fas', 'arrow-left']" size="1x" />
        </button>
      </header>

      <section class="modal-body">
        <pulse-loader :loading="pending" :color="color"></pulse-loader>

        <BaseCourseDetails
          v-if="!pending"
          :course="course"
          :semester="semester"
          :isChildCourse="isChildCourse"
          :parentCourseCode="parentCourseCode"
          :isExampleStudyPlan="isExampleStudyPlan"
        />
      </section>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  props: {
    isChildCourse: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  data() {
    return {
      semester: {
        type: Object,
      },
      parentCourseCode: null,
      pending: {
        type: Boolean,
        default: "false",
      },
      color: "#76b900",
      isExampleStudyPlan: false,
    };
  },
  async created() {
    this.pending = true;
    this.isExampleStudyPlan =
      this.$route.fullPath.includes("example-studyplan");
    document.documentElement.style.overflow = "hidden";
    this.semester = this.getSemesterByName(this.$route.params.semester);
    if (this.$route.params.parentCode) {
      this.parentCourseCode = this.$route.params.parentCode;
    }

    await this.$store.dispatch("course/fetchCourse", {
      program: this.$route.params.program.toLowerCase(),
      version: this.$route.params.version,
      code: this.$route.params.code,
      semester: this.semester ? this.semester.name : undefined,
    });
    this.pending = false;
  },
  async destroyed() {
    await this.$store.dispatch("course/clearCourse");
    document.documentElement.style.overflow = "auto";
  },
  computed: {
    ...mapState("course", ["course"]),
    ...mapState("studyplan", ["studyPlan"]),
    ...mapGetters("semester", ["getSemesterByName"]),
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
$htwGruen: #76b900;

.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(2px);
}

.modal {
  z-index: 500;
  background: #ffffff;
  width: 40vw;
  height: 80vh;
  // box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: 4px solid #76b900;
  border-radius: 12px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
@media screen and (max-width: 1400px) {
  .modal {
    width: 60vw;
  }
}

@media screen and (max-width: 1200px) {
  .modal {
    width: 60vw;
  }
}

@media screen and (max-width: 1000px) {
  .modal {
    width: 70vw;
  }
}

@media screen and (max-width: 800px) {
  .modal {
    width: 80vw;
  }
}

.modal-header {
  padding: 15px;
  display: flex;
  position: relative;

  flex-direction: column;
}

.modal-body {
  padding: 20px 10px;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 5px;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: $htwGruen;
  background: transparent;
}

.btn-back {
  position: absolute;
  top: 0;
  left: 0;
  margin-left: 30px;
  margin-top: 30px;
  border: none;
  font-size: 30px;
  padding: 10px;
  cursor: pointer;
  color: $htwGruen;
  background: transparent;
}
</style>
