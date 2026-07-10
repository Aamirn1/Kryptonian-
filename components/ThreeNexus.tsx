"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const MOBILE_BREAKPOINT = 1024; // Match the lg: breakpoint where hero images show

export default function ThreeNexus() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(true); // Default true to prevent flash

    // Check screen size before mounting WebGL — no point running on mobile
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    useEffect(() => {
        if (!containerRef.current || isMobile) return;

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) return;

        // Scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        containerRef.current.appendChild(renderer.domElement);

        // Points & Lines
        const nodesCount = 80;
        const positions = new Float32Array(nodesCount * 3);
        const colors = new Float32Array(nodesCount * 3);
        const primaryColor = new THREE.Color("#ca6de5"); // electric blue — visible on white

        for (let i = 0; i < nodesCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 15;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 15;

            colors[i * 3] = primaryColor.r;
            colors[i * 3 + 1] = primaryColor.g;
            colors[i * 3 + 2] = primaryColor.b;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.1,
            vertexColors: true,
            transparent: true,
            opacity: 0.55,
            blending: THREE.NormalBlending,
        });

        const nodes = new THREE.Points(geometry, material);
        scene.add(nodes);

        // Pre-build lines once instead of recreating every frame
        const lineMaterial = new THREE.LineBasicMaterial({
            color: primaryColor,
            transparent: true,
            opacity: 0.15,
            blending: THREE.NormalBlending,
        });

        const linesGroup = new THREE.Group();
        scene.add(linesGroup);

        const buildLines = () => {
            // Dispose old
            linesGroup.children.forEach(child => {
                if (child instanceof THREE.Line) {
                    child.geometry.dispose();
                }
            });
            linesGroup.clear();

            const pos = geometry.attributes.position.array;
            const threshold = 3.5;

            for (let i = 0; i < nodesCount; i++) {
                for (let j = i + 1; j < nodesCount; j++) {
                    const dx = pos[i * 3] - pos[j * 3];
                    const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
                    const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
                    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                    if (dist < threshold) {
                        const lineGeom = new THREE.BufferGeometry().setFromPoints([
                            new THREE.Vector3(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]),
                            new THREE.Vector3(pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]),
                        ]);
                        const mat = lineMaterial.clone();
                        mat.opacity = (1 - dist / threshold) * 0.2;
                        const line = new THREE.Line(lineGeom, mat);
                        linesGroup.add(line);
                    }
                }
            }
        };

        // Build lines once — they rotate with the group so no need to rebuild
        buildLines();

        camera.position.z = 8;

        const mouse = new THREE.Vector2();
        let mouseTargetX = 0;
        let mouseTargetY = 0;

        const onMouseMove = (event: MouseEvent) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            mouseTargetX = mouse.x * 2;
            mouseTargetY = mouse.y * 2;
        };

        window.addEventListener("mousemove", onMouseMove);

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener("resize", handleResize);

        // Animation loop — lightweight, no geometry allocation
        let frame = 0;
        let animationId: number;
        const animate = () => {
            animationId = requestAnimationFrame(animate);
            frame += 0.002;

            nodes.rotation.y = frame;
            nodes.rotation.x = frame * 0.5;
            linesGroup.rotation.y = frame;
            linesGroup.rotation.x = frame * 0.5;

            camera.position.x += (mouseTargetX - camera.position.x) * 0.05;
            camera.position.y += (-mouseTargetY - camera.position.y) * 0.05;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        };

        animate();

        const container = containerRef.current;
        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("resize", handleResize);

            linesGroup.children.forEach(child => {
                if (child instanceof THREE.Line) {
                    child.geometry.dispose();
                    (child.material as THREE.Material).dispose();
                }
            });
            linesGroup.clear();

            geometry.dispose();
            material.dispose();
            lineMaterial.dispose();
            scene.clear();
            renderer.dispose();

            if (container && container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, [isMobile]);

    // Don't even mount the container on mobile
    if (isMobile) return null;

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 z-0 pointer-events-none"
            aria-hidden="true"
        />
    );
}
