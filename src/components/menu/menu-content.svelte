<script lang="ts">
  import {
    MenuStore,
    setCursorToDefault,
    setCursorToHamburger,
  } from "$lib/store";
  import Cat from "./cat.svelte";
  import MenuIcons from "./menu-icons.svelte";

  const internalLinks = [
    {
      component: "HOME",
      url: "/home",
      img: "https://cdn-icons-png.flaticon.com/512/2065/2065213.png",
    },
    {
      component: "PROJECTS",
      url: "/projects",
      img: "https://cdn-icons-png.flaticon.com/512/2065/2065213.png",
    },
    {
      component: "BLOG",
      url: "/blog",
      img: "https://cdn-icons-png.flaticon.com/512/2065/2065213.png",
    },
  ];
</script>

<nav class="menu-holder">
  <div class={"menu-inside" + ($MenuStore ? " open" : "")}>
    <div class="menu-nav-container">
      <ul class="menu-nav-links">
        {#each internalLinks as link}
          <li
            id={link.component}
            on:mouseenter={setCursorToHamburger}
            on:mouseleave={setCursorToDefault}
          >
            <a href={link.url}>{link.component}</a>
          </li>
        {/each}
        <!-- icons  -->
        <MenuIcons />
        <!-- icons  -->
      </ul>

      <div class="cat-container">
        <Cat />
      </div>
    </div>
  </div>
</nav>

<style lang="scss">
  @import "src/styles/custom-variable.scss";
  .menu-holder {
    & .menu-inside {
      position: fixed;
      width: 100vw;
      height: 100vh;
      background: #111;
      z-index: 10;

      will-change: transform;
      transition: transform 1s cubic-bezier(1, 0, 0, 1);
      color: #000;
      transform: translateX(-100%);

      & .menu-nav-container {
        position: relative;
        left: 220px;
        top: 100px;
        overflow: hidden;
        width: calc(100vw - 220px); // edit later

        // for cat
        display: flex;
        // for phone
        @include mq("tablet", max) {
          left: 100px;
          top: 200px;
        }
        & .menu-nav-links {
          min-width: 350px;
          height: calc(100vh - 100px);
          @include mq("tablet", max) {
            height: calc(100vh - 200px);
          }
          display: flex;
          flex-direction: column;
          align-items: start;
          & li {
            margin-bottom: 0px;
            padding-top: 0;
            padding-bottom: 0;
            & a {
              font-size: clamp(16px, 4vw, 48px);
              transform: translate(-300%);
              transition: transform 0.8s cubic-bezier(0.55, 0.055, 0.675, 0.19);
              padding-top: 0;
              padding-bottom: 0;
            }
            &:hover a {
              font-weight: 700;
            }
          }
          @for $i from 0 through 4 {
            & li:nth-child(#{$i + 1}n) {
              & a {
                transition-delay: #{calc($i / 10) + 0.5}s;
              }
            }
          }
        }
        & .cat-container {
          width: 100%;
          margin: 1rem;
          display: flex;
          align-items: start;
          justify-content: center;
          margin-top: 100px;
          @include mq("tablet", max) {
            display: none;
          }
        }
      }
      &.open {
        transform: translateX(0);
        .menu-nav-links li a {
          transform: translate(0);
        }
      }
    }
  }
</style>
