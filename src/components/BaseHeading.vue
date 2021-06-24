<template>
  <div>
    <slot></slot>
    <div class="line"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
$htwGruen: #76b900;
h1 {
  font-weight: bold;
  margin-bottom: 20px;
  color: $htwGruen;
}
.line {
  border-top: 3px solid $htwGruen;
  margin: 0 auto;
  padding: 0;
  width: 30px;
  height: 39px;
}
</style>
