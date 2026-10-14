
import { useContext, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { ModelContext } from "../../../Contexts/ModelContext/ModelContext";

const BunsenFlame = ({
  innerColour = "#65DFFF",
  OuterColur = "#1677FF",
  duration = 1.5,
  swaySpeed = 2,
  swayRange = 0.08,
}) => {
  const { bunsenBurnerRef } = useContext(ModelContext);

  const flamesRef = useRef([]);
  const elapsedRef = useRef(0);

  useEffect(() => {
    const burner = bunsenBurnerRef?.current;
    if (!burner) return;

    const flames = [];

    burner.traverse((child) => {
      if (!child.isMesh) return;

      const name = child.name.toLowerCase();

      const isInner = name.includes("inner");
      const isOuter = name.includes("outer");

      if (!isInner && !isOuter) return;

      const originalMaterial = child.material;
      const originalVisible = child.visible;
      const originalRotation = child.rotation.clone();
      const originalScale = child.scale.clone();

      // Clone to avoid affecting other objects
      const materials = (
        Array.isArray(originalMaterial)
          ? originalMaterial
          : [originalMaterial]
      ).map((material) => {
        const cloned = material.clone();

        cloned.transparent = true;
        cloned.opacity = 0;
        cloned.depthWrite = false;
        cloned.side = THREE.DoubleSide;

        const colour = isInner
          ? innerColour
          : OuterColur;

        if (cloned.color) {
          cloned.color.set(colour);
        }

        if (cloned.emissive) {
          cloned.emissive.set(colour);
          cloned.emissiveIntensity = 0.6;
        }

        cloned.needsUpdate = true;

        return cloned;
      });

      child.material = Array.isArray(originalMaterial)
        ? materials
        : materials[0];

      child.visible = true;

      flames.push({
        mesh: child,
        materials,
        originalMaterial,
        originalVisible,
        originalRotation,
        originalScale,
        baseOpacity: 1,
        isInner,
        phase: isInner ? 0.8 : 0,
      });
    });

    flamesRef.current = flames;
    elapsedRef.current = 0;

    return () => {
      flames.forEach((flame) => {
        const {
          mesh,
          materials,
          originalMaterial,
          originalVisible,
          originalRotation,
          originalScale,
        } = flame;

        mesh.material = originalMaterial;
        mesh.visible = originalVisible;

        mesh.rotation.copy(originalRotation);
        mesh.scale.copy(originalScale);

        materials.forEach((material) => {
          material.dispose();
        });
      });

      flamesRef.current = [];
    };
  }, [bunsenBurnerRef, innerColour, OuterColur]);

  useFrame((_, delta) => {
    if (!flamesRef.current.length) return;

    elapsedRef.current += delta;

    const elapsed = elapsedRef.current;

    // Fade-in progress: 0 -> 1
    const progress =
      duration <= 0
        ? 1
        : THREE.MathUtils.clamp(
            elapsed / duration,
            0,
            1
          );

    // Smooth easing
    const fade =
      progress * progress * (3 - 2 * progress);

    flamesRef.current.forEach((flame) => {
      const {
        mesh,
        materials,
        originalRotation,
        originalScale,
        phase,
        isInner,
      } = flame;

      // ===================================
      // FADE IN
      // ===================================

      materials.forEach((material) => {
        material.opacity = fade;
      });

      // ===================================
      // NATURAL SWAY
      // ===================================

      const t = elapsed * swaySpeed;

      const mainSway =
        Math.sin(t + phase) * swayRange;

      const secondarySway =
        Math.sin(t * 1.7 + phase) *
        swayRange *
        0.25;

      const microSway =
        Math.sin(t * 3.2 + phase) *
        swayRange *
        0.08;

      const totalSway =
        mainSway +
        secondarySway +
        microSway;

      // Inner flame sways less than outer
      const swayMultiplier = isInner ? 0.45 : 1;

      mesh.rotation.z =
        originalRotation.z +
        totalSway * swayMultiplier * fade;

      mesh.rotation.x =
        originalRotation.x +
        Math.sin(t * 0.8 + phase) *
          swayRange *
          0.35 *
          swayMultiplier *
          fade;

      // ===================================
      // SUBTLE FLAME STRETCH
      // ===================================

      const stretch =
        1 +
        Math.sin(t * 2.1 + phase) * 0.035 +
        Math.sin(t * 3.4 + phase) * 0.015;

      mesh.scale.y =
        originalScale.y * stretch;

      // ===================================
      // SUBTLE WIDTH FLICKER
      // ===================================

      const widthFlicker =
        1 + Math.sin(t * 2.5 + phase) * 0.025;

      mesh.scale.x =
        originalScale.x * widthFlicker;

      mesh.scale.z =
        originalScale.z * widthFlicker;
    });
  });

  return null;
};

export default BunsenFlame;
