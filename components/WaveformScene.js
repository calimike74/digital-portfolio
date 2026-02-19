'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Waveform({ progress = 0 }) {
  const meshRefTop = useRef();
  const meshRefBot = useRef();
  const materialRef = useRef();

  // Two geometries: top surface + bottom surface offset by thickness for shell effect
  const { geoTop, geoBot, origTop, origBot } = useMemo(() => {
    const segX = 200;
    const segZ = 100;
    const top = new THREE.PlaneGeometry(12, 4.5, segX, segZ);
    top.rotateX(-0.99);
    const bot = new THREE.PlaneGeometry(12, 4.5, segX, segZ);
    bot.rotateX(-0.99);
    return {
      geoTop: top,
      geoBot: bot,
      origTop: top.attributes.position.array.slice(),
      origBot: bot.attributes.position.array.slice(),
    };
  }, []);

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uProgress: { value: 0 },
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color('#d95000') },
        uColor2: { value: new THREE.Color('#7b2ff7') },
        uColor3: { value: new THREE.Color('#00b4d8') },
        uColor4: { value: new THREE.Color('#ffffff') },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewDir;
        varying vec2 vUv;
        varying float vElevation;
        void main() {
          vUv = uv;
          vElevation = position.y;
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vNormal = normalize(normalMatrix * normal);
          vViewDir = normalize(cameraPosition - worldPos.xyz);
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uProgress;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        uniform vec3 uColor4;

        varying vec3 vNormal;
        varying vec3 vViewDir;
        varying vec2 vUv;
        varying float vElevation;

        vec3 palette(float t) {
          t = fract(t);
          float s = t * 4.0;
          if (s < 1.0) return mix(uColor1, uColor2, s);
          if (s < 2.0) return mix(uColor2, uColor3, s - 1.0);
          if (s < 3.0) return mix(uColor3, uColor4, s - 2.0);
          return mix(uColor4, uColor1, s - 3.0);
        }

        void main() {
          vec3 n = normalize(vNormal);
          vec3 v = normalize(vViewDir);

          float fresnel = pow(1.0 - max(dot(n, v), 0.0), 2.5);

          float ci = dot(n, vec3(0.3, 0.5, 0.2)) * 0.6
                    + vUv.x * 0.4
                    + abs(vElevation) * 0.3;

          vec3 baseColor = palette(ci);
          vec3 edgeColor = palette(ci + 0.25 + fresnel * 0.3);
          vec3 color = mix(baseColor, edgeColor, fresnel);

          // Specular highlights
          vec3 l1 = normalize(vec3(0.5, 0.8, 0.5));
          vec3 h1 = normalize(l1 + v);
          color += vec3(pow(max(dot(n, h1), 0.0), 16.0) * 1.17);

          vec3 l2 = normalize(vec3(-0.3, 0.2, -0.4));
          vec3 h2 = normalize(l2 + v);
          color += vec3(pow(max(dot(n, h2), 0.0), 8.0) * 1.17 * 0.3);

          color *= 0.7 + 0.3 * smoothstep(0.0, 1.0, abs(vElevation));

          gl_FragColor = vec4(color, 0.57);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      wireframe: false,
    });
  }, []);

  // Clone material for bottom surface (flipped normals need same look)
  const botMaterial = useMemo(() => shaderMaterial.clone(), [shaderMaterial]);

  useFrame((state) => {
    if (!meshRefTop.current) return;
    const time = state.clock.elapsedTime + 61;
    const topPositions = geoTop.attributes.position.array;
    const botPositions = geoBot.attributes.position.array;

    const harmonics = Math.floor(4 + progress * 4);
    const amplitude = 1.4 + progress * 0.7;
    const speed = 0.65 + progress * 0.08;
    const bendFactor = 0 + progress * 1.31;
    const thickness = 1.4;

    // Displace top surface
    for (let i = 0; i < topPositions.length; i += 3) {
      const ox = origTop[i];
      const oz = origTop[i + 2];

      let y = 0;
      y += Math.sin(ox * 0.5 + time * speed) * amplitude * 0.7;
      y += Math.sin(ox * 0.8 - time * speed * 0.6) * amplitude * 0.25;

      for (let h = 2; h <= harmonics; h++) {
        const freq = h * 0.45;
        const amp = amplitude / (h * 1.0);
        y += Math.sin(ox * freq + time * speed * (0.7 + h * 0.04)) * amp;
        y += Math.cos(oz * freq * 0.3 + time * speed * 0.4) * amp * bendFactor;
      }

      y += Math.sin(ox * 0.2 + time * 0.1) * 0.13;
      y += Math.cos(oz * 0.3 + time * 0.08) * 0.15 * (0.6 + progress * 0.4);

      topPositions[i + 1] = origTop[i + 1] + y;
    }

    geoTop.attributes.position.needsUpdate = true;
    geoTop.computeVertexNormals();

    // Displace bottom surface — same wave, then offset along normals
    for (let i = 0; i < botPositions.length; i += 3) {
      botPositions[i + 1] = topPositions[i + 1];
    }

    // Offset bottom surface along top normals for thickness
    const topNormals = geoTop.attributes.normal.array;
    for (let i = 0; i < botPositions.length; i += 3) {
      botPositions[i]     = topPositions[i]     - topNormals[i]     * thickness;
      botPositions[i + 1] = topPositions[i + 1] - topNormals[i + 1] * thickness;
      botPositions[i + 2] = topPositions[i + 2] - topNormals[i + 2] * thickness;
    }

    geoBot.attributes.position.needsUpdate = true;
    geoBot.computeVertexNormals();
    // Flip normals on bottom surface
    const botNormals = geoBot.attributes.normal.array;
    for (let i = 0; i < botNormals.length; i++) botNormals[i] *= -1;
    geoBot.attributes.normal.needsUpdate = true;

    // Update uniforms
    if (materialRef.current) {
      materialRef.current.uniforms.uProgress.value = progress;
      materialRef.current.uniforms.uTime.value = time;
    }
    botMaterial.uniforms.uProgress.value = progress;
    botMaterial.uniforms.uTime.value = time;

    // Rotate the parent group
    meshRefTop.current.parent.rotation.z = 0.39 + state.clock.elapsedTime * 0.015 + progress * 0.12;
  });

  return (
    <group>
      <mesh ref={meshRefTop} geometry={geoTop} material={shaderMaterial}>
        <primitive object={shaderMaterial} ref={materialRef} attach="material" />
      </mesh>
      <mesh ref={meshRefBot} geometry={geoBot} material={botMaterial} />
    </group>
  );
}

export default function WaveformScene({ progress = 0 }) {
  return (
    <Canvas
      camera={{ position: [0, 4.8, 9.9], fov: 31 }}
      style={{ position: 'absolute', inset: 0 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={0.8} />
      <directionalLight position={[-3, 2, -4]} intensity={0.3} />
      <Waveform progress={progress} />
    </Canvas>
  );
}
