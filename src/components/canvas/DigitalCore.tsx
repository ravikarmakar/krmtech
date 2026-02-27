"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Pre-compute colours once outside the component
const COLOR_CYAN = new THREE.Color("#00f0ff");
const COLOR_VIOLET = new THREE.Color("#8a2be2");
const COLOR_WHITE = new THREE.Color("#ffffff");

export function DigitalCore() {
    const pointsRef = useRef<THREE.Points>(null);
    const clockRef = useRef(0); // manual time accumulator — avoids creating a THREE.Clock

    // Adaptive count: fewer particles on weaker hardware
    const count = useMemo(() => {
        if (typeof navigator === "undefined") return 4000;
        const cores = navigator.hardwareConcurrency ?? 4;
        if (cores <= 2) return 2000;
        if (cores <= 4) return 3500;
        return 5000;
    }, []);

    const [positions, colors] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const col = new Float32Array(count * 3);

        const p = 3, q = 4, radius = 3, tube = 1.2;

        const tmp = new THREE.Color();

        for (let i = 0; i < count; i++) {
            const u = (i / count) * Math.PI * 2; // deterministic, no Math.random in loop for pos
            const v = Math.random() * Math.PI * 2; // only colour jitter

            const quOverP = (q / p) * u;
            const cs = Math.cos(quOverP);
            const cu = Math.cos(u), su = Math.sin(u);

            // Torus knot position (tight noise)
            const nx = (Math.random() - 0.5) * 0.25;
            const ny = (Math.random() - 0.5) * 0.25;
            const nz = (Math.random() - 0.5) * 0.25;

            const x = radius * (2 + cs) * 0.5 * Math.cos(p * u)
                + (tube * cu * Math.cos(p * u) - tube * su * Math.sin(p * u) * Math.sin(quOverP)) + nx;
            const y = radius * (2 + cs) * 0.5 * Math.sin(p * u)
                + (tube * cu * Math.sin(p * u) + tube * su * Math.cos(p * u) * Math.sin(quOverP)) + ny;
            const z = radius * Math.sin(quOverP) * 0.5 + tube * su * Math.cos(quOverP) + nz;

            pos[i * 3] = x;
            pos[i * 3 + 1] = y;
            pos[i * 3 + 2] = z;

            const dist = Math.sqrt(x * x + y * y + z * z) / 4;
            const t = Math.min(Math.max(dist, 0), 1);

            if (t > 0.6) {
                tmp.copy(COLOR_CYAN).lerp(COLOR_VIOLET, Math.random());
            } else if (t > 0.3) {
                tmp.copy(COLOR_WHITE).lerp(COLOR_CYAN, Math.random());
            } else {
                tmp.copy(COLOR_WHITE);
            }
            tmp.multiplyScalar(0.8 + Math.random() * 0.4);

            col[i * 3] = tmp.r;
            col[i * 3 + 1] = tmp.g;
            col[i * 3 + 2] = tmp.b;
        }

        return [pos, col];
    }, [count]);

    useFrame((state, delta) => {
        if (!pointsRef.current) return;
        // Use delta for frame-rate-independent animation, cap at 60ms to avoid jumps
        clockRef.current += Math.min(delta, 0.06);
        const t = clockRef.current;

        const mesh = pointsRef.current;
        mesh.rotation.y = t * 0.1;
        mesh.rotation.x = Math.sin(t * 0.2) * 0.18;
        mesh.rotation.z = Math.cos(t * 0.1) * 0.08;

        // Pulse
        const s = 1 + Math.sin(t * 1.5) * 0.04;
        mesh.scale.setScalar(s);

        // Gentle pointer parallax (low lerp = smooth)
        mesh.rotation.y += (state.pointer.x * 0.35 - mesh.rotation.y) * 0.02;
        mesh.rotation.x += (-state.pointer.y * 0.35 - mesh.rotation.x) * 0.02;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
                <bufferAttribute attach="attributes-color" args={[colors, 3]} />
            </bufferGeometry>
            <pointsMaterial
                size={0.022}
                vertexColors
                transparent
                opacity={0.8}
                sizeAttenuation
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}
