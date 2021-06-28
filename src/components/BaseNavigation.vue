<template>
  <div>
    <div v-if="!mobileView" class="navigation">
      <div class="navigation-container">
        <router-link class="link" to="/my-studyplan"
          >Mein StudyPlan</router-link
        >

        <router-link class="link" to="/example-studyplan"
          >Exemplarischer Studienplan</router-link
        >
        <router-link class="link" to="/hilfe">Hilfe</router-link>

        <router-link class="link icon" to="/profile">
          <font-awesome-icon :icon="['fas', 'user']" size="1x" />
        </router-link>
      </div>
    </div>

    <div v-if="mobileView" class="mobile-navigation">
      <button @click="toggleMobileNavMenu">
        <font-awesome-icon class="icon" :icon="['fas', 'bars']" size="2x" />
      </button>
      <div class="mobile-navigation-container" v-if="showMobileNavMenu">
        <button class="close-btn" @click="toggleMobileNavMenu">x</button>

        <div class="links">
          <router-link
            class="link"
            to="/my-studyplan"
            @click.native="toggleMobileNavMenu"
            >Mein StudyPlan</router-link
          >

          <router-link
            class="link"
            to="/example-studyplan"
            @click.native="toggleMobileNavMenu"
            >Exemplarischer Studienplan</router-link
          >
          <router-link
            class="link"
            to="/hilfe"
            @click.native="toggleMobileNavMenu"
            >Hilfe</router-link
          >

          <router-link
            class="link"
            to="/profile"
            @click.native="toggleMobileNavMenu"
          >
            Profil
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mobileView: false,
      showMobileNavMenu: false,
    };
  },
  created() {
    this.mobileView = window.innerWidth <= 600;
    window.addEventListener("resize", this.isMobileView);
  },

  methods: {
    isMobileView() {
      this.mobileView = window.innerWidth <= 600;
    },
    toggleMobileNavMenu() {
      this.showMobileNavMenu = !this.showMobileNavMenu;
    },
  },
};
</script>

<style lang="scss" scoped>
$htwGruen: #76b900;

.navigation {
  &-container {
    width: 100%;
    display: flex;
    align-items: baseline;

    .link {
      margin-left: 15px;
      text-decoration: none;
      font-size: 18px;
    }

    .icon {
      font-size: 25px;
      margin-left: auto !important;
    }
  }

  .router-link-active {
    color: $htwGruen !important;
    text-decoration: underline !important;
  }

  a {
    color: #3d3d3d !important;
  }
}

.mobile-navigation {
  position: absolute;
  right: 20px;
  top: 20px;

  button {
    background: transparent;
    border: none;
    cursor: pointer;
  }

  &-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: $htwGruen;

    .close-btn {
      font-size: 40px;
      color: white;
      position: fixed;
      right: 20px;
      margin-top: 10px;
    }

    .links {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;

      .link {
        color: white !important;
        text-decoration: none;
        margin: 30px;
        font-size: 25px;
      }
    }
  }
}
</style>
