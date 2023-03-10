<script lang="ts">
  import MenuManager from "./menu/menu-manager.svelte";
</script>

<div class="header-wrap">
  <p class="brand-description">Digital design experience studio</p>
  <MenuManager />
</div>

<style lang="scss">
  .brand-description {
    position: fixed;
    top: 100px;
    right: 10vw;
    max-width: 120px;
    font: {
      size: 12px;
      weight: 300;
    }
    text-align: right;
    z-index: 11;
  }
</style>
