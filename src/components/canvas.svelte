<script lang="ts">
  import * as THREE from "three";
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
  import { onMount } from "svelte";
  import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
  import type { Object3D } from "three";

  const getRandomArbitrary = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

  let width = 600;
  let height = 400;
  let mouse = { x: 1, y: 1 };

  // Canvas
  let canvas: HTMLCanvasElement | undefined;

  //   /**
  //    * Cursor
  //    */
  const cursor = { x: 0, y: 0 };
  onMount(() => {
    if (!canvas) return;
    const mouseHandler = (e: MouseEvent) => {
      if (!canvas) return;
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      mouse = {
        x: ((e.clientX - rect.left) / canvas.clientWidth) * 2 - 1,
        y: -((e.clientY - rect.top) / canvas.clientWidth) * 2 + 1,
      };
    };
    canvas.addEventListener("mousemove", mouseHandler, false);
    const handleResize = () => {
      if (!canvas) return;
      // Update sizes
      sizes.width = width;
      sizes.height = height;
      canvas.width = width;
      canvas.height = height;
      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window ? window.devicePixelRatio : 1, 2));
    };
    window.addEventListener("resize", handleResize);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    // Scene
    const scene = new THREE.Scene();

    // Objects
    const geometry = new THREE.TorusGeometry(0.7, 0.2, 16, 100);
    const particleCount = 5000;
    const positionArr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++)
      positionArr[i] = getRandomArbitrary(-1, 1) * 2;
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positionArr, 3)
    );

    // Materials
    const material = new THREE.PointsMaterial({ size: 0.001 });
    material.color = new THREE.Color(0xfff000);

    // Mesh
    const sphere = new THREE.Points(geometry, material);
    const particles = new THREE.Points(particleGeometry, material);
    scene.add(sphere, particles);

    // Lights
    const pointLight = new THREE.PointLight(0xffffff, 0.1);
    pointLight.position.x = 2;
    pointLight.position.y = 3;
    pointLight.position.z = 4;
    scene.add(pointLight);

    /**
     * Sizes
     */
    // display size
    const sizes = {
      width: width,
      height: height,
      aspectRatio: width / height,
    };
    /**
     * Camera
     */
    // Base camera
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      100
    );
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 2;
    scene.add(camera);

    // Controls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    const clock = new THREE.Clock();

    //test
    const light = new THREE.AmbientLight(0x444040); // soft white light
    scene.add(light);
    const loader = new GLTFLoader();

    loader.load(
      "/Jet.glb",
      function (gltf) {
        console.log(sizes.aspectRatio);
        gltf.scene.scale.set(0.0005, 0.0005, 0.0005);
        scene.add(gltf.scene);
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );
    //test
    const tick = () => {
      /**
       * Animate
       */
      const elapsedTime = clock.getElapsedTime();

      // Update objects
      sphere.rotation.y = 0.5 * elapsedTime;
      particles.rotation.y = mouse.y * elapsedTime * 0.05;
      // Update Orbital Controls
      controls.update();

      // Render
      renderer.render(scene, camera);

      // Call tick again on the next frame
      requestAnimationFrame(tick);
    };
    tick();
  });
</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />
<!-- on:dblclick={handleDblClick} -->

<canvas bind:this={canvas} />
