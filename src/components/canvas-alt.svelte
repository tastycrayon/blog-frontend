<script lang="ts">
	import * as THREE from 'three';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
	import { onDestroy, onMount } from 'svelte';
	import vertexShader from './vertex.glsl';
	import fragmentShader from './fragment.glsl';
	let width = 1;
	let height = 1;
	let mouse = { x: 1, y: 1 };
	// Canvas
	let canvas: HTMLCanvasElement | undefined;
	let renderer: THREE.WebGLRenderer;
	let windowListeners: { x: string; y: any }[] = [];
	let canvasListeners: { x: string; y: any }[] = [];

	let timeout: NodeJS.Timeout | undefined;
	let animationFrame: number | undefined;
	onMount(() => {
		const IS_PHONE = window.matchMedia('(max-width: 768px)').matches;

		if (!canvas) return;

		renderer = new THREE.WebGLRenderer({
			canvas: canvas,
			antialias: true,
			alpha: true
			// powerPreference: 'high-performance'
		});
		renderer.setSize(width, height);
		renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
		// Scene
		const scene = new THREE.Scene();
		/**
		 * Camera
		 */
		// Base camera
		const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
		camera.position.x = 0;
		camera.position.y = 0;
		camera.position.z = 2;
		// camera.castShadow = true;
		scene.add(camera);
		/**
		 * Event Listeners
		 */
		const mouseHandler = (e: MouseEvent) => {
			if (!canvas) return;
			// e.preventDefault();
			// const rect = canvas.getBoundingClientRect();
			// mouse = {
			// 	x: ((e.clientX - rect.left) / canvas.clientWidth) * 2 - 1,
			// 	y: -((e.clientY - rect.top) / canvas.clientHeight) * 2 + 1
			// };
		};

		const handleResize = () => {
			if (!canvas) return;
			// Update sizes
			// canvas.width = width;
			// canvas.height = height;
			// Update camera
			camera.aspect = width / height;
			camera.updateProjectionMatrix();

			// Update renderer
			renderer.setSize(width, height);
			renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
		};
		handleResize();
		canvas.addEventListener('mousemove', mouseHandler, false);
		canvasListeners.push({ x: 'mousemove', y: mouseHandler });
		windowListeners.push({ x: 'resize', y: handleResize });
		window.addEventListener('resize', handleResize);
		// Objects
		const geometry = new THREE.IcosahedronGeometry(IS_PHONE ? 0.8 : 0.7, 120);

		// Materials
		const material = new THREE.ShaderMaterial({
			vertexShader,
			fragmentShader
		});
		material.uniforms.uTime = { value: 5 };

		const ico = new THREE.Mesh(geometry, material);
		ico.receiveShadow = false; //perform
		scene.add(ico);

		// Lights

		// // Controls
		const controls = new OrbitControls(camera, canvas);
		controls.enableDamping = true;
		controls.enableRotate = true;
		controls.enableZoom = false;
		controls.enablePan = false;

		const clock = new THREE.Clock();

		// scene.background = new THREE.Color(0x10c17d);
		// renderer.setClearColor()

		//helpers
		camera.lookAt(scene.position);
		const framerate = 1000 / 30;
		const tick = () => {
			/**
			 * Animate
			 */
			const elapsedTime = clock.getElapsedTime();

			// Update objects
			material.uniforms.uTime.value = elapsedTime * 0.1;
			// Update Orbital Controls
			controls.update();

			// Render
			renderer.render(scene, camera);

			// timeout = setTimeout(tick, framerate); //25
			animationFrame = window.requestAnimationFrame(tick);
		};
		tick();
		renderer.shadowMap.autoUpdate = false;
		renderer.shadowMap.needsUpdate = false;
	});
	onDestroy(() => {
		if (timeout) clearTimeout(timeout);
		if (animationFrame) window.cancelAnimationFrame(animationFrame);
		windowListeners.forEach((l) => window.removeEventListener(l.x, l.y));
		canvasListeners.forEach((l) => canvas?.removeEventListener(l.x, l.y));
		if (renderer) renderer.renderLists.dispose();
	});
</script>

<!-- <svelte:window bind:innerWidth={width} bind:innerHeight={height} /> -->
<!-- on:dblclick={handleDblClick} -->
<div class="w-100 h-100" bind:clientWidth={width} bind:clientHeight={height}>
	<canvas bind:this={canvas} />
</div>

<style lang="scss">
	// canvas {
	// }
</style>
