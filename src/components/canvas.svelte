<script lang="ts">
	import * as THREE from 'three';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
	import { onDestroy, onMount } from 'svelte';
	import vertexShader from './vertex.glsl';
	import fragmentShader from './fragment.glsl';
	import { setCursorToDefault, setCursorToSlider } from '$lib/store';
	let width = 1;
	let height = 1;

	let canvas: HTMLCanvasElement | undefined;
	let renderer: THREE.WebGLRenderer;
	let windowListeners: { x: string; y: any }[] = [];
	let canvasListeners: { x: string; y: any }[] = [];

	let timeout: number | undefined;
	let animationFrame: number | undefined;
	onMount(() => {
		const IS_PHONE = window.matchMedia('(max-width: 768px)').matches;

		if (!canvas) return;

		renderer = new THREE.WebGLRenderer({
			canvas: canvas,
			antialias: true,
			alpha: true,
			powerPreference: 'high-performance'
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
		camera.castShadow = false;
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
		const geometry = new THREE.IcosahedronGeometry(IS_PHONE ? 0.92 : 0.8, 128);

		// Materials
		const material = new THREE.ShaderMaterial({
			vertexShader,
			fragmentShader
		});
		material.uniforms.uTime = { value: 0.0 };

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

		//helpers
		camera.lookAt(scene.position);
		const framerate = 1000 / 30;
		const tick = () => {
			/**
			 * Animate
			 */
			const elapsedTime = clock.getElapsedTime();

			// Update objects
			material.uniforms.uTime.value = elapsedTime;
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

<div class="canvas-wrapper">
	<div class="square" bind:clientWidth={width} bind:clientHeight={height}>
		<canvas bind:this={canvas} on:mousedown={setCursorToSlider} on:mouseup={setCursorToDefault} />
	</div>
</div>

<style lang="scss">
	.canvas-wrapper {
		height: 100%;
		width: 100%;
		position: relative;
	}
	.square {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		aspect-ratio: 1 / 1;
		max-height: 100%;
		width: 100%;
	}
</style>
