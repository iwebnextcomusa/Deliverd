import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeDCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Dimensions
    const width = containerRef.current.clientWidth || 500;
    const height = containerRef.current.clientHeight || 500;

    // Scene
    const scene = new THREE.Scene();
    scene.background = null; // Transparent background for glassmorphism layout

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(5, 4, 8);
    camera.lookAt(0, 0.5, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);

    // Group to hold our interactive objects (allows easy tilting)
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Grid / Road Plane
    const gridHelper = new THREE.GridHelper(20, 20, 0x155EEF, 0x374151);
    gridHelper.position.y = -0.5;
    mainGroup.add(gridHelper);

    // --- PROCEDURAL 3D MOVING TRUCK ---
    const truckGroup = new THREE.Group();
    truckGroup.position.set(0, 0, 0);
    mainGroup.add(truckGroup);

    // Materials
    const blueMaterial = new THREE.MeshStandardMaterial({
      color: 0x155EEF, // Deliverd Primary
      roughness: 0.2,
      metalness: 0.5,
    });

    const orangeMaterial = new THREE.MeshStandardMaterial({
      color: 0xF79009, // Deliverd Accent
      roughness: 0.3,
      metalness: 0.2,
    });

    const whiteMaterial = new THREE.MeshStandardMaterial({
      color: 0xF8FAFC, // Deliverd White
      roughness: 0.5,
      metalness: 0.1,
    });

    const charcoalMaterial = new THREE.MeshStandardMaterial({
      color: 0x1F2937, // Deliverd Charcoal
      roughness: 0.8,
      metalness: 0.3,
    });

    const wheelMaterial = new THREE.MeshStandardMaterial({
      color: 0x111827, // Matte dark grey
      roughness: 0.9,
    });

    const glassMaterial = new THREE.MeshStandardMaterial({
      color: 0x38BDF8,
      roughness: 0.1,
      metalness: 0.9,
      transparent: true,
      opacity: 0.6,
    });

    const yellowMaterial = new THREE.MeshBasicMaterial({
      color: 0xFBBF24, // Glowing lights
    });

    // 1. Truck Cab (Blue)
    const cabGeom = new THREE.BoxGeometry(1.2, 1.0, 1.2);
    const cab = new THREE.Mesh(cabGeom, blueMaterial);
    cab.position.set(1.1, 0.4, 0);
    cab.castShadow = true;
    cab.receiveShadow = true;
    truckGroup.add(cab);

    // Cab Windshield/Glass
    const windGeom = new THREE.BoxGeometry(0.5, 0.5, 1.1);
    const windshield = new THREE.Mesh(windGeom, glassMaterial);
    windshield.position.set(1.5, 0.5, 0);
    truckGroup.add(windshield);

    // Nose of Cab
    const noseGeom = new THREE.BoxGeometry(0.4, 0.5, 1.2);
    const nose = new THREE.Mesh(noseGeom, blueMaterial);
    nose.position.set(1.8, 0.15, 0);
    nose.castShadow = true;
    truckGroup.add(nose);

    // 2. Cargo Container (White, representing "Deliverd" Cargo Box)
    const cargoGeom = new THREE.BoxGeometry(2.4, 1.5, 1.4);
    const cargo = new THREE.Mesh(cargoGeom, whiteMaterial);
    cargo.position.set(-0.6, 0.75, 0);
    cargo.castShadow = true;
    cargo.receiveShadow = true;
    truckGroup.add(cargo);

    // Decorative side stripe on cargo (Emerald Green / Orange)
    const stripeGeom = new THREE.BoxGeometry(2.2, 0.1, 1.42);
    const stripe = new THREE.Mesh(stripeGeom, orangeMaterial);
    stripe.position.set(-0.6, 0.5, 0);
    truckGroup.add(stripe);

    // 3. Truck Chassis (Charcoal)
    const chassisGeom = new THREE.BoxGeometry(3.6, 0.2, 1.1);
    const chassis = new THREE.Mesh(chassisGeom, charcoalMaterial);
    chassis.position.set(0.3, -0.15, 0);
    chassis.castShadow = true;
    truckGroup.add(chassis);

    // 4. Wheels
    const wheelGeom = new THREE.CylinderGeometry(0.35, 0.35, 0.3, 16);
    const hubGeom = new THREE.CylinderGeometry(0.15, 0.15, 0.32, 16);
    
    const wheels: THREE.Mesh[] = [];
    const wheelPositions = [
      { x: 1.0, z: 0.65 },
      { x: 1.0, z: -0.65 },
      { x: -0.8, z: 0.65 },
      { x: -0.8, z: -0.65 },
      { x: -1.5, z: 0.65 },
      { x: -1.5, z: -0.65 }
    ];

    wheelPositions.forEach((pos) => {
      const wGroup = new THREE.Group();
      
      const wheelMesh = new THREE.Mesh(wheelGeom, wheelMaterial);
      wheelMesh.rotation.x = Math.PI / 2;
      wheelMesh.castShadow = true;
      wGroup.add(wheelMesh);

      const hubMesh = new THREE.Mesh(hubGeom, orangeMaterial);
      hubMesh.rotation.x = Math.PI / 2;
      wGroup.add(hubMesh);

      wGroup.position.set(pos.x, -0.25, pos.z);
      truckGroup.add(wGroup);
      
      // Store reference to rotate wheels in animation loop
      wheels.push(wheelMesh);
    });

    // Headlights
    const lightGeom = new THREE.BoxGeometry(0.1, 0.15, 0.15);
    const leftLight = new THREE.Mesh(lightGeom, yellowMaterial);
    leftLight.position.set(2.0, 0.15, 0.45);
    const rightLight = new THREE.Mesh(lightGeom, yellowMaterial);
    rightLight.position.set(2.0, 0.15, -0.45);
    truckGroup.add(leftLight);
    truckGroup.add(rightLight);

    // --- CARDBOARD DELIVERD BOXES ---
    const boxesGroup = new THREE.Group();
    boxesGroup.position.set(-2, 1.2, 1.5);
    mainGroup.add(boxesGroup);

    const cardboardMaterial = new THREE.MeshStandardMaterial({
      color: 0xCE9F6F, // Cardboard color
      roughness: 0.9,
      metalness: 0.0,
    });

    const tapeMaterial = new THREE.MeshStandardMaterial({
      color: 0x92663A, // Packing tape dark brown
      roughness: 0.7,
    });

    // Large Box
    const bigBoxGeom = new THREE.BoxGeometry(0.7, 0.7, 0.7);
    const bigBox = new THREE.Mesh(bigBoxGeom, cardboardMaterial);
    bigBox.castShadow = true;
    bigBox.receiveShadow = true;
    boxesGroup.add(bigBox);

    const tape1Geom = new THREE.BoxGeometry(0.72, 0.1, 0.72);
    const tape1 = new THREE.Mesh(tape1Geom, tapeMaterial);
    bigBox.add(tape1);

    // Small Box Stacked
    const smallBoxGeom = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const smallBox = new THREE.Mesh(smallBoxGeom, cardboardMaterial);
    smallBox.position.set(0.1, 0.58, -0.1);
    smallBox.rotation.y = 0.4;
    smallBox.castShadow = true;
    smallBox.receiveShadow = true;
    boxesGroup.add(smallBox);

    const tape2Geom = new THREE.BoxGeometry(0.1, 0.52, 0.52);
    const tape2 = new THREE.Mesh(tape2Geom, tapeMaterial);
    smallBox.add(tape2);

    // --- LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 8, 5);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 25;
    dirLight.shadow.bias = -0.001;
    scene.add(dirLight);

    // Accent Point Lights (Emerald Green & Warm Orange glow)
    const greenLight = new THREE.PointLight(0x12B76A, 2, 8);
    greenLight.position.set(-2, 2, -2);
    scene.add(greenLight);

    const orangeLight = new THREE.PointLight(0xF79009, 2, 8);
    orangeLight.position.set(2, 2, 2);
    scene.add(orangeLight);

    // --- INTERACTIVE TRACKERS ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    let scrollY = 0;
    let targetScrollY = 0;

    const onMouseMove = (event: MouseEvent) => {
      // Normalize between -0.5 and 0.5
      mouseX = (event.clientX / window.innerWidth) - 0.5;
      mouseY = (event.clientY / window.innerHeight) - 0.5;
    };

    const onScroll = () => {
      targetScrollY = window.scrollY;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll);

    // --- ANIMATION LOOP ---
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth Mouse Rotation (Lerp)
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Smooth Scroll acceleration (Lerp)
      scrollY += (targetScrollY - scrollY) * 0.1;

      // Apply subtle camera/group rotation based on mouse
      mainGroup.rotation.y = targetX * 1.5;
      mainGroup.rotation.x = targetY * 0.8;

      // Moving truck floating/vibrating engine effect
      truckGroup.position.y = Math.sin(elapsedTime * 4) * 0.03;
      
      // Rotate wheels based on time + scroll speed
      const speedMultiplier = 1 + (scrollY * 0.005);
      wheels.forEach((wheel) => {
        wheel.rotation.y -= 0.08 * speedMultiplier;
      });

      // Crates floating/bobbing gently
      boxesGroup.position.y = 1.2 + Math.sin(elapsedTime * 2) * 0.1;
      boxesGroup.rotation.y = elapsedTime * 0.2 + (scrollY * 0.001);

      // Light rotation for beautiful dynamic shadows
      orangeLight.position.x = Math.sin(elapsedTime * 0.5) * 3;
      orangeLight.position.z = Math.cos(elapsedTime * 0.5) * 3;

      renderer.render(scene, camera);
    };

    animate();

    // --- RESIZE HANDLER ---
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // --- CLEANUP ---
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }

      // Dispose of ThreeJS assets
      scene.clear();
      renderer.dispose();
      blueMaterial.dispose();
      orangeMaterial.dispose();
      whiteMaterial.dispose();
      charcoalMaterial.dispose();
      wheelMaterial.dispose();
      glassMaterial.dispose();
      yellowMaterial.dispose();
      cardboardMaterial.dispose();
      tapeMaterial.dispose();
      gridHelper.dispose();
      cabGeom.dispose();
      windGeom.dispose();
      noseGeom.dispose();
      cargoGeom.dispose();
      stripeGeom.dispose();
      chassisGeom.dispose();
      wheelGeom.dispose();
      hubGeom.dispose();
      lightGeom.dispose();
      bigBoxGeom.dispose();
      tape1Geom.dispose();
      smallBoxGeom.dispose();
      tape2Geom.dispose();
    };
  }, []);

  return (
    <div 
      id="3d-truck-canvas" 
      ref={containerRef} 
      className="w-full h-[350px] md:h-[450px] lg:h-[500px] relative cursor-grab active:cursor-grabbing"
    >
      {/* Dynamic backdrop glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[350px] md:h-[350px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-4 right-4 pointer-events-none select-none hidden md:block">
        <span className="text-[10px] uppercase tracking-widest text-slate-600 font-mono bg-white/90 backdrop-blur-md border border-slate-200 px-2.5 py-1 rounded-full shadow-sm">
          Interactive 3D Stage (Move Mouse & Scroll)
        </span>
      </div>
    </div>
  );
}
