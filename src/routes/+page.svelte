<script>
  import ContactBtn from "$components/contact-btn.svelte";
  import Header from "$components/header.svelte";
  import { fly } from "svelte/transition";
</script>

<Header />
<main
  class="main-container"
  in:fly={{ x: -100, duration: 250, delay: 300 }}
  out:fly={{ x: -100, duration: 250 }}
>
  <section class="hero">
    <h1>
      Hi, I'm<br />Mosiur <br />Rahman
    </h1>
    <ContactBtn />
  </section>
</main>

<style lang="scss">
  //mixin
  @import "src/styles/custom-variable.scss";

  .main-container {
    position: relative;
    height: 100vh;
    width: calc(100vw - 50px);
    display: flex;
    align-items: flex-end;
    margin: 0 auto;
    h1 {
      font-size: clamp(64px, 8vw, 15vw);
      max-width: 70vw;
      margin-bottom: 10vh;
      color: #111;
    }
    @include mq("tablet", min) {
      margin-left: 75px;
      padding-left: 50px;
      border-left: 1px solid #111;
      width: calc(100vw - 126px);
    }
  }
</style>
