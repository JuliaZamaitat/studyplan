<template>
  <div id="app">
    <div id="nav">
      <router-link to="/my-studyplan">Mein StudyPlan</router-link>
      |
      <router-link to="/example-studyplan"
        >Exemplarischer Studienplan</router-link
      >
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #3d3d3d;
}
body {
  margin-bottom: 50px;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
