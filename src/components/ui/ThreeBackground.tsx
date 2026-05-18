"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function ParticleField({ count = 2000 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, [count]);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.02;
      ref.current.rotation.y += delta * 0.03;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#a3e635"
        size={0.015}
        sizeAttenuation
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
}

function FloatingOrbs() {
  const orb1Ref = useRef<THREE.Mesh>(null);
  const orb2Ref = useRef<THREE.Mesh>(null);
  const orb3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (orb1Ref.current) {
      orb1Ref.current.position.x = Math.sin(t * 0.3) * 3;
      orb1Ref.current.position.y = Math.cos(t * 0.2) * 2;
      orb1Ref.current.position.z = Math.sin(t * 0.4) * 1.5;
    }

    if (orb2Ref.current) {
      orb2Ref.current.position.x = Math.cos(t * 0.25) * 4;
      orb2Ref.current.position.y = Math.sin(t * 0.35) * 3;
      orb2Ref.current.position.z = Math.cos(t * 0.2) * 2;
    }

    if (orb3Ref.current) {
      orb3Ref.current.position.x = Math.sin(t * 0.4) * 2.5;
      orb3Ref.current.position.y = Math.cos(t * 0.3) * 3.5;
      orb3Ref.current.position.z = Math.sin(t * 0.25) * 2;
    }
  });

  return (
    <>
      <mesh ref={orb1Ref}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color="#a3e635"
          transparent
          opacity={0.15}
          emissive="#a3e635"
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh ref={orb2Ref}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial
          color="#84cc16"
          transparent
          opacity={0.1}
          emissive="#84cc16"
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh ref={orb3Ref}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color="#a3e635"
          transparent
          opacity={0.12}
          emissive="#a3e635"
          emissiveIntensity={0.4}
        />
      </mesh>
    </>
  );
}

function ConnectionLines() {
  const ref = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions: number[] = [];

    for (let i = 0; i < 100; i++) {
      const x1 = (Math.random() - 0.5) * 8;
      const y1 = (Math.random() - 0.5) * 8;
      const z1 = (Math.random() - 0.5) * 4;
      const x2 = x1 + (Math.random() - 0.5) * 2;
      const y2 = y1 + (Math.random() - 0.5) * 2;
      const z2 = z1 + (Math.random() - 0.5) * 2;

      positions.push(x1, y1, z1, x2, y2, z2);
    }

    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <lineSegments ref={ref} geometry={geometry}>
      <lineBasicMaterial color="#a3e635" transparent opacity={0.08} />
    </lineSegments>
  );
}

interface ThreeBackgroundProps {
  className?: string;
}

export default function ThreeBackground({ className }: ThreeBackgroundProps) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ position: "absolute", inset: 0 }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <ParticleField count={3000} />
        <FloatingOrbs />
        <ConnectionLines />
      </Canvas>
    </div>
  );
}
