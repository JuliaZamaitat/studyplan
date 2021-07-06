<template>
  <div>
    <h1>Profil</h1>
  </div>
</template>

<script>
export default {
  mounted() {
    if (!this.$store.state.user.user.startOfStudy) {
      this.$router.push("/select-program");
    }
  },
};
</script>

<style lang="scss" scoped></style>
