<script lang="ts">
	export let name: keyof typeof icons = 'github';
	export let width: string = '32px';
	export let height: string = '32px';
	export let fill: boolean = false;
	const icons = {
		upwork: {
			box: 56.1,
			svg: `<path d="M42.4,17.7c-5.3,0-9.3,3.5-10.9,9c-2.5-3.9-4.5-8.3-5.6-12.1h-5.6v14.7c0,2.9-2.4,5.3-5.3,5.3c-2.9,0-5.3-2.4-5.3-5.3V14.7  H4.3v14.7c0,6.1,4.9,11,10.9,11c6,0,10.9-4.9,10.9-11v-2.5c1.1,2.2,2.5,4.6,4,6.7l-3.5,16.3h5.7L34.7,38c2.2,1.4,4.7,2.2,7.7,2.2  c6.1,0,11.1-5,11.1-11.4C53.5,22.7,48.5,17.7,42.4,17.7z M42.4,34.6c-2.2,0-4.5-1-6.3-2.5l0.6-2.2v-0.1c0.4-2.4,1.7-6.4,5.8-6.4  c3.1,0,5.6,2.5,5.6,5.6C48,32.1,45.3,34.6,42.4,34.6z"   fill="inherit" stroke-linecap="round" stroke-linejoin="round"/>`
		},
		github: {
			box: 32,
			svg: `<path d="M10.5 29C11.2956 29 12.0587 28.6839 12.6213 28.1213C13.1839 27.5587 13.5 26.7956 13.5 26V20" stroke="inherit" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M21.5 29C20.7044 29 19.9413 28.6839 19.3787 28.1213C18.8161 27.5587 18.5 26.7956 18.5 26V20" stroke="inherit" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19 20H21C21.7956 20 22.5587 20.3161 23.1213 20.8787C23.6839 21.4413 24 22.2044 24 23V24C24 24.7956 24.3161 25.5587 24.8787 26.1213C25.4413 26.6839 26.2044 27 27 27" stroke="inherit" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13 20H11C10.2044 20 9.44129 20.3161 8.87868 20.8787C8.31607 21.4413 8 22.2044 8 23V24C8 24.7956 7.68393 25.5587 7.12132 26.1213C6.55871 26.6839 5.79565 27 5 27" stroke="inherit" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.06396 9.58797C7.71427 8.6832 7.57192 7.71153 7.64738 6.74447C7.72284 5.77741 8.0142 4.83958 8.5 4C9.59164 3.99938 10.6658 4.27391 11.6233 4.79823C12.5808 5.32256 13.3906 6.07975 13.9781 6.99985V7H18.0219V6.99985C18.6094 6.07975 19.4192 5.32256 20.3767 4.79823C21.3342 4.27391 22.4084 3.99938 23.5 4C23.9858 4.83958 24.2772 5.77741 24.3526 6.74447C24.4281 7.71153 24.2857 8.6832 23.936 9.58797V9.58797C24.6307 10.59 25.002 11.7807 25 13V14C25 15.5913 24.3679 17.1174 23.2426 18.2426C22.1174 19.3679 20.5913 20 19 20H13C11.4087 20 9.88258 19.3679 8.75736 18.2426C7.63214 17.1174 7 15.5913 7 14V13C6.99804 11.7807 7.36932 10.59 8.06395 9.58797L8.06396 9.58797Z" stroke="inherit" stroke-linecap="round" stroke-linejoin="round"/>`
		},
		envelope: {
			box: 32,
			svg: `<path d="M4 7H28V24C28 24.2652 27.8946 24.5196 27.7071 24.7071C27.5196 24.8946 27.2652 25 27 25H5C4.73478 25 4.48043 24.8946 4.29289 24.7071C4.10536 24.5196 4 24.2652 4 24V7Z" stroke="inherit" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M28 7L16 18L4 7" stroke="inherit" stroke-linecap="round" stroke-linejoin="round"/>
`
		},
		linkedin: {
			box: 32,
			svg: `<path d="M26 5H6C5.44772 5 5 5.44772 5 6V26C5 26.5523 5.44772 27 6 27H26C26.5523 27 27 26.5523 27 26V6C27 5.44772 26.5523 5 26 5Z" stroke="inherit" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15 14V22" stroke="inherit" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11 14V22" stroke="inherit" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15 17.5C15 16.5717 15.3687 15.6815 16.0251 15.0251C16.6815 14.3687 17.5717 14 18.5 14C19.4283 14 20.3185 14.3687 20.9749 15.0251C21.6313 15.6815 22 16.5717 22 17.5V22" stroke="inherit" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11 11C11.5523 11 12 10.5523 12 10C12 9.44772 11.5523 9 11 9C10.4477 9 10 9.44772 10 10C10 10.5523 10.4477 11 11 11Z" fill="inherit"/>`
		},
		sun: {
			box: 32,
			svg: `<path d="M16 23.5C20.1421 23.5 23.5 20.1421 23.5 16C23.5 11.8579 20.1421 8.5 16 8.5C11.8579 8.5 8.5 11.8579 8.5 16C8.5 20.1421 11.8579 23.5 16 23.5Z" stroke="inherit" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16 4.5V2" stroke="inherit" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.86835 7.86823L6.10059 6.10046" stroke="inherit" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4.5 16H2" stroke="inherit" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.86835 24.1317L6.10059 25.8995" stroke="inherit" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16 27.5V30" stroke="inherit" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M24.1318 24.1317L25.8996 25.8995" stroke="inherit" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M27.5 16H30" stroke="inherit" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M24.1318 7.86823L25.8996 6.10046" stroke="inherit" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<`
		},
		moon: {
			box: 32,
			svg: `<path stroke="inherit" d="M27.0828 19.0812C25.1198 19.6267 23.0471 19.641 21.0767 19.1228C19.1064 18.6046 17.3089 17.5724 15.8683 16.1317C14.4276 14.6911 13.3954 12.8937 12.8772 10.9233C12.359 8.95291 12.3733 6.88025 12.9188 4.91724L12.9191 4.91733C10.983 5.45595 9.22171 6.49249 7.81085 7.92367C6.39998 9.35486 5.38873 11.1307 4.87785 13.0744C4.36696 15.0181 4.37427 17.0617 4.89905 19.0016C5.42382 20.9416 6.44774 22.7102 7.86881 24.1313C9.28988 25.5523 11.0585 26.5762 12.9985 27.101C14.9384 27.6257 16.982 27.633 18.9257 27.1221C20.8694 26.6112 22.6452 25.5999 24.0764 24.1891C25.5076 22.7782 26.5441 21.0169 27.0827 19.0808L27.0828 19.0812Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`
		}
	};

	$: icon = icons[name];
</script>

<svg
	class={$$props.class}
	{width}
	{height}
	viewBox="0 0 {icon.box} {icon.box}"
	fill={fill ? 'currentColor' : 'none'}
	stroke={!fill ? 'currentColor' : 'none'}
	xmlns="http://www.w3.org/2000/svg"
>
	{@html icon.svg}
</svg>
