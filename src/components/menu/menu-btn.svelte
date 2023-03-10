<script lang="ts">
  import { setMenuToggler, MenuStore } from "$lib/store";
</script>

<div class={"menu-button-wrapper" + ($MenuStore ? " open" : "")}>
  <button on:click={setMenuToggler} type="button" class="menu-button"
    ><span /></button
  >
</div>

<style lang="scss">
  //mixin
  @import "src/styles/custom-variable.scss";

  @media screen and (min-width: 768px) {
    .menu-button-wrapper {
      & .menu-button {
        box-shadow: none;
      }
    }
  }
  .menu-button-wrapper {
    position: fixed;
    left: 11px;
    top: 100px;
    z-index: 11;

    transition: transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1);
    & .menu-button {
      cursor: pointer;
      width: 48px;
      height: 48px;
      border: none;
      background: 0 0;
      display: block;

      transition: transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1);
      & span {
        &::before,
        &::after {
          content: "";
          width: 2px;
          height: 48px;
          position: absolute;
          background-color: #111;
          will-change: transform;
          transition: all 1s cubic-bezier(0.645, 0.045, 0.355, 1);
        }
        &::before {
          transform: translate(-5px, -50%) scaleY(0.7) rotate(180deg);
        }
        &::after {
          transform: translate(5px, -50%) scaleY(0.7) rotate(180deg);
        }
      }
    }
    &.open {
      transform: translateX(80px);
      transition-delay: 0.4s;
      & .menu-button {
        transform: rotate(90deg);
      }
      & span {
        &::before {
          transform: translate(-50%, -50%) rotate(315deg);
          background-color: white;
        }
        &::after {
          transform: translate(-50%, -50%) rotate(45deg);
          transition-delay: 0.2s;
          background-color: white;
        }
      }
    }
    // @include mq("tablet", max) {
    //   display: none;
    // }
  }
</style>
