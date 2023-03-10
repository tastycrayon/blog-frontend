<script lang="ts">
  export let name: keyof typeof icons = "github";
  export let width: string = "32px";
  export let height: string = "32px";

  const icons = {
    github: {
      box: 32,
      svg: `<path d="M10.5 29C11.2956 29 12.0587 28.6839 12.6213 28.1213C13.1839 27.5587 13.5 26.7956 13.5 26V20" stroke="inherit" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M21.5 29C20.7044 29 19.9413 28.6839 19.3787 28.1213C18.8161 27.5587 18.5 26.7956 18.5 26V20" stroke="inherit" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19 20H21C21.7956 20 22.5587 20.3161 23.1213 20.8787C23.6839 21.4413 24 22.2044 24 23V24C24 24.7956 24.3161 25.5587 24.8787 26.1213C25.4413 26.6839 26.2044 27 27 27" stroke="inherit" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13 20H11C10.2044 20 9.44129 20.3161 8.87868 20.8787C8.31607 21.4413 8 22.2044 8 23V24C8 24.7956 7.68393 25.5587 7.12132 26.1213C6.55871 26.6839 5.79565 27 5 27" stroke="inherit" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.06396 9.58797C7.71427 8.6832 7.57192 7.71153 7.64738 6.74447C7.72284 5.77741 8.0142 4.83958 8.5 4C9.59164 3.99938 10.6658 4.27391 11.6233 4.79823C12.5808 5.32256 13.3906 6.07975 13.9781 6.99985V7H18.0219V6.99985C18.6094 6.07975 19.4192 5.32256 20.3767 4.79823C21.3342 4.27391 22.4084 3.99938 23.5 4C23.9858 4.83958 24.2772 5.77741 24.3526 6.74447C24.4281 7.71153 24.2857 8.6832 23.936 9.58797V9.58797C24.6307 10.59 25.002 11.7807 25 13V14C25 15.5913 24.3679 17.1174 23.2426 18.2426C22.1174 19.3679 20.5913 20 19 20H13C11.4087 20 9.88258 19.3679 8.75736 18.2426C7.63214 17.1174 7 15.5913 7 14V13C6.99804 11.7807 7.36932 10.59 8.06395 9.58797L8.06396 9.58797Z" stroke="inherit" stroke-linecap="round" stroke-linejoin="round"/>`,
    },
    linkedin: {
      box: 32,
      svg: `<path d="M26 5H6C5.44772 5 5 5.44772 5 6V26C5 26.5523 5.44772 27 6 27H26C26.5523 27 27 26.5523 27 26V6C27 5.44772 26.5523 5 26 5Z" stroke="inherit" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15 14V22" stroke="inherit" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11 14V22" stroke="inherit" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15 17.5C15 16.5717 15.3687 15.6815 16.0251 15.0251C16.6815 14.3687 17.5717 14 18.5 14C19.4283 14 20.3185 14.3687 20.9749 15.0251C21.6313 15.6815 22 16.5717 22 17.5V22" stroke="inherit" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11 11C11.5523 11 12 10.5523 12 10C12 9.44772 11.5523 9 11 9C10.4477 9 10 9.44772 10 10C10 10.5523 10.4477 11 11 11Z" fill="inherit"/>`,
    },
  };

  $: icon = icons[name];
</script>

<svg
  class={$$props.class}
  {width}
  {height}
  viewBox="0 0 {icon.box} {icon.box}"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  {@html icon.svg}
</svg>
