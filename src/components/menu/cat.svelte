<script lang="ts">
  import { onMount } from "svelte";
  import { MenuStore } from "$lib/store";
  let achorRektCenter = {
    x: 0,
    y: 0,
  };
  let rCos = 0;
  let rSin = 0;
  let catFaceIsCenter: HTMLDivElement | null = null;

  const handleMouseMove = (event: MouseEvent) => {
    if (!catFaceIsCenter) return;
    const angle = getAngle(
      event.clientX,
      event.clientY,
      achorRektCenter.x,
      achorRektCenter.y
    );
    rCos = -1 * (100 * Math.cos(angle));
    rSin = -1 * (51 * Math.sin(angle));
  };

  const initCatVariables = () => {
    if (!catFaceIsCenter) return;
    const rekt = catFaceIsCenter.getBoundingClientRect();
    achorRektCenter.x = rekt.left + rekt.width / 2;
    achorRektCenter.y = rekt.top + rekt.height / 2;
  };

  $: if ($MenuStore) setTimeout(initCatVariables, 1000);
  const getAngle = (
    mx: number,
    my: number,
    anchorX: number,
    anchorY: number
  ) => {
    let dx = anchorX - mx;
    const dy = anchorY - my;
    if (dx == 0) dx = 1;
    const angleInRadian = Math.atan2(dy, dx);
    return angleInRadian;
  };
  onMount(initCatVariables);
</script>

<svelte:window on:mousemove={handleMouseMove} on:resize={initCatVariables} />

<div class="cat">
  <div class="ear ear--left" />
  <div class="ear ear--right" />
  <div class="face" bind:this={catFaceIsCenter}>
    <div class="eye eye--left">
      <div
        class="eye-pupil"
        style:transform={`translate(${rCos}%, ${rSin}%)`}
      />
    </div>
    <div class="eye eye--right">
      <div
        class="eye-pupil"
        style:transform={`translate(${rCos}%, ${rSin}%)`}
      />
    </div>
    <div class="muzzle" />
  </div>
  <div class="paw paw--left"><div class="paw --paw-slits" /></div>
  <div class="paw paw--right"><div class="paw --paw-slits" /></div>
</div>

<style lang="scss">
  // mine ends
  $color-black: #111;
  $color-white: #fff;
  $size: 170px; // (Fully responsive) // 170
  // border-top-left-radius: 60% 70%;
  // border-top-right-radius: 40% 50%;
  // border-bottom-right-radius: 40% 30%;
  // border-bottom-left-radius: 20% 25%;
  $paw-slit: 19px;
  .paw.paw--left,
  .paw.paw--right {
    position: absolute;
    top: 400px;
    left: 0;
    height: 35px;
    width: 70px;
    border-radius: 60% 40% 40% 20% / 70% 50% 30% 25%;
    background-color: $color-white;
    & .--paw-slits {
      position: relative;
      margin-top: 17px;
      margin-left: auto;
      margin-right: auto;
      height: 17px;
      width: 3px;
      border-left: 3px solid transparent;
      border-right: 3px solid transparent;
      border-bottom: $paw-slit solid $color-black;
      &::before,
      &::after {
        content: "";
        position: absolute;
        left: -$paw-slit;
        bottom: -$paw-slit;
        height: 13px;
        width: 3px;
        border-left: 3px solid transparent;
        border-right: 3px solid transparent;
        border-bottom: 15px solid $color-black;
      }
      &::after {
        left: 17px;
      }
    }
  }
  .paw.paw--right {
    border-radius: 40% 60% 40% 20% / 50% 70% 30% 25%;
    left: initial;
    right: 0;
  }
  // Cat
  .cat {
    position: relative;
    height: $size;
    width: $size * 1.13;
  }

  // Ears
  .ear {
    position: absolute;
    top: -30%;
    height: 60%;
    width: 25%;
    background: $color-white;

    // Ear hair
    &::before,
    &::after {
      content: "";
      position: absolute;
      bottom: 24%;
      height: 10%;
      width: 5%;
      border-radius: 50%;
      background: $color-black;
    }

    &::after {
      transform-origin: 50% 100%;
    }
  }

  .ear--left {
    left: -7%;
    border-radius: 70% 30% 0% 0% / 100% 100% 0% 0%;
    transform: rotate(-15deg);

    &::before,
    &::after {
      right: 10%;
    }

    &::after {
      transform: rotate(-45deg);
    }
  }

  .ear--right {
    right: -7%;
    border-radius: 30% 70% 0% 0% / 100% 100% 0% 0%;
    transform: rotate(15deg);

    &::before,
    &::after {
      left: 10%;
    }

    &::after {
      transform: rotate(45deg);
    }
  }

  // Face
  .face {
    position: absolute;
    height: 100%;
    width: 100%;
    background: $color-black;
    border-radius: 50%;
  }

  // Eyes
  .eye {
    position: absolute;
    top: 35%;
    height: 30%;
    width: 31%;
    background: $color-white;
    border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;

    // Eyelids
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      height: 0;
      width: 100%;
      border-radius: 0 0 50% 50% / 0 0 40% 40%;
      background: $color-black;
      animation: blink 4s infinite ease-in;
    }

    @keyframes blink {
      0% {
        height: 0;
      }
      90% {
        height: 0;
      }
      92.5% {
        height: 100%;
      }
      95% {
        height: 0;
      }
      97.5% {
        height: 100%;
      }
      100% {
        height: 0;
      }
    }

    // Tips of the eyes
    &::before {
      content: "";
      position: absolute;
      top: 60%;
      height: 10%;
      width: 15%;
      background: $color-white;
      border-radius: 50%;
    }
  }

  .eye--left {
    left: 0;

    &::before {
      right: -5%;
    }
  }

  .eye--right {
    right: 0;

    &::before {
      left: -5%;
    }
  }

  // Pupils
  .eye-pupil {
    position: absolute;
    top: 25%;
    height: 50%;
    width: 20%;
    background: $color-black;
    border-radius: 50%;

    .eye--left & {
      right: 30%;
    }

    .eye--right & {
      left: 30%;
    }

    // Glare on the pupil
    &::after {
      content: "";
      position: absolute;
      top: 30%;
      right: -5%;
      height: 20%;
      width: 35%;
      border-radius: 50%;
      background: $color-white;
    }
  }

  // Muzzle
  .muzzle {
    position: absolute;
    top: 60%;
    left: 50%;
    height: 6%;
    width: 10%;
    background: $color-white;
    transform: translateX(-50%);
    border-radius: 50% 50% 50% 50% / 30% 30% 70% 70%;
  }
</style>
