<template>
  <div v-if="!mobileView" class="navigation">
    <div class="nav-left">
      <router-link class="link" to="/my-studyplan">Mein StudyPlan</router-link>

      <router-link class="link" to="/example-studyplan"
        >Exemplarischer Studienplan</router-link
      >
      <router-link class="link" to="/hilfe">Hilfe</router-link>
    </div>
    <div class="nav-right">
      <router-link class="link" to="/profile">
        <font-awesome-icon class="icon" :icon="['fas', 'user']" size="1x" />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mobileView: false,
    };
  },
  created() {
    window.addEventListener("resize", this.isMobileView);
  },
  methods: {
    isMobileView() {
      this.mobileView = window.innerWidth <= 400;
    },
  },
};
</script>

<style lang="scss" scoped>
$htwGruen: #76b900;

.nav-left {
  position: absolute;
  top: 20px;
  left: 20px;

  .link {
    margin-left: 15px;
    text-decoration: none;
  }
}

.nav-right {
  position: absolute;
  top: 20px;
  right: 20px;

  .link {
    margin-left: 15px;
    text-decoration: none;
  }

  .icon {
    font-size: 25px;
    margin-right: 15px;
  }
}

.router-link-active {
  color: $htwGruen !important;
  text-decoration: underline !important;
}

a {
  color: #3d3d3d !important;
}
</style>
