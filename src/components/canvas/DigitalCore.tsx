"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function DigitalCore() {
    const pointsRef = useRef<THREE.Points>(null);

    const count = 15000;

    const [positions, colors] = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const colorA = new THREE.Color("#00f0ff"); // Cyan
        const colorB = new THREE.Color("#8a2be2"); // Violet
        const colorC = new THREE.Color("#ffffff"); // White core

        // Create a complex Torus Knot shape made of particles
        const p = 3;
        const q = 4;
        const radius = 3;
        const tube = 1.2;

        for (let i = 0; i < count; i++) {
            // 1D to 2D mapping for torus knot
            const u = Math.random() * Math.PI * 2;
            const v = Math.random() * Math.PI * 2;

            // Calculate Torus Knot position
            const cu = Math.cos(u);
            const su = Math.sin(u);
            const quOverP = q / p * u;
            const cs = Math.cos(quOverP);

            // Adding turbulence/noise
            const noiseX = (Math.random() - 0.5) * 0.5;
            const noiseY = (Math.random() - 0.5) * 0.5;
            const noiseZ = (Math.random() - 0.5) * 0.5;

            const x = radius * (2 + cs) * 0.5 * Math.cos(p * u) + (tube * cu * Math.cos(p * u) - tube * su * Math.sin(p * u) * Math.sin(quOverP)) + noiseX;
            const y = radius * (2 + cs) * 0.5 * Math.sin(p * u) + (tube * cu * Math.sin(p * u) + tube * su * Math.cos(p * u) * Math.sin(quOverP)) + noiseY;
            const z = radius * Math.sin(quOverP) * 0.5 + tube * su * Math.cos(quOverP) + noiseZ;

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            // Color based on depth and distance from center
            const distanceFromCenter = Math.sqrt(x * x + y * y + z * z);
            const normalizedDist = Math.min(Math.max(distanceFromCenter / 4, 0), 1);

            let mixedColor = colorC.clone();

            if (normalizedDist > 0.6) {
                mixedColor = colorA.clone().lerp(colorB, Math.random());
            } else if (normalizedDist > 0.3) {
                mixedColor = colorC.clone().lerp(colorA, Math.random());
            }

            // Add a bit of randomness to brightness
            mixedColor.multiplyScalar(0.8 + Math.random() * 0.5);

            colors[i * 3] = mixedColor.r;
            colors[i * 3 + 1] = mixedColor.g;
            colors[i * 3 + 2] = mixedColor.b;
        }

        return [positions, colors];
    }, [count]);

    useFrame((state) => {
        if (!pointsRef.current) return;
        const time = state.clock.getElapsedTime();

        // Complex rotation
        pointsRef.current.rotation.y = time * 0.1;
        pointsRef.current.rotation.x = Math.sin(time * 0.2) * 0.2;
        pointsRef.current.rotation.z = Math.cos(time * 0.1) * 0.1;

        // Pulse scale
        const scale = 1 + Math.sin(time * 2) * 0.05;
        pointsRef.current.scale.set(scale, scale, scale);

        // Parallax
        const targetX = (state.pointer.x * 0.5);
        const targetY = (state.pointer.y * 0.5);

        pointsRef.current.rotation.y += (targetX - pointsRef.current.rotation.y) * 0.05;
        pointsRef.current.rotation.x += (-targetY - pointsRef.current.rotation.x) * 0.05;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
                <bufferAttribute
                    attach="attributes-color"
                    args={[colors, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.02}
                vertexColors
                transparent
                opacity={0.8}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}
