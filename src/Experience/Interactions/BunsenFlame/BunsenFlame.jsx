
import { useContext, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { ModelContext } from "../../../Contexts/ModelContext/ModelContext";
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext";

const BunsenFlame = ({
  innerColour = "#65DFFF",
  OuterColur = "#1677FF",

  // Flame opacity (0 - 1)
  innerOpacity = 1,
  outerOpacity = 1,

  duration = 1.5,
  swaySpeed = 2,
  swayRange = 0.05,
}) => {
  const { bunsenBurnerRef } = useContext(ModelContext);

  const {
    selectedLesson,
    lessonStep,
    setLessonStep,
  } = useContext(MainGuidelineContext);

  const flamesRef = useRef([]);
  const elapsedRef = useRef(0);

  // =====================================================
  // LESSON STEP
  // =====================================================

  useEffect(() => {
    if (
      selectedLesson === 15 &&
      lessonStep === 18
    ) {
      setLessonStep(19);
    }
  }, [selectedLesson, lessonStep, setLessonStep]);

  // =====================================================
  // FIND FLAMES + INITIALIZE
  // =====================================================

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
      const originalRenderOrder = child.renderOrder;

      // ===================================
      // CLONE MATERIALS
      // ===================================

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

      // Inner flame renders after outer flame
      child.renderOrder = isInner ? 2 : 1;

      flames.push({
        mesh: child,
        materials,
        originalMaterial,
        originalVisible,
        originalRotation,
        originalScale,
        originalRenderOrder,
        isInner,
        phase: isInner ? 0.8 : 0,
      });
    });

    flamesRef.current = flames;
    elapsedRef.current = 0;

    // =====================================================
    // CLEANUP
    // =====================================================

    return () => {
      flames.forEach((flame) => {
        const {
          mesh,
          materials,
          originalMaterial,
          originalVisible,
          originalRotation,
          originalScale,
          originalRenderOrder,
        } = flame;

        mesh.material = originalMaterial;
        mesh.visible = originalVisible;

        mesh.rotation.copy(originalRotation);
        mesh.scale.copy(originalScale);

        mesh.renderOrder = originalRenderOrder;

        materials.forEach((material) => {
          material.dispose();
        });
      });

      flamesRef.current = [];
    };
  }, [
    bunsenBurnerRef,
    innerColour,
    OuterColur,
  ]);

  // =====================================================
  // ANIMATION
  // =====================================================

  useFrame((_, delta) => {
    if (!flamesRef.current.length) return;

    elapsedRef.current += delta;

    const elapsed = elapsedRef.current;

    // ===================================
    // FADE-IN PROGRESS
    // ===================================

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
      // OPACITY + FADE IN
      // ===================================

      const targetOpacity = THREE.MathUtils.clamp(
        isInner ? innerOpacity : outerOpacity,
        0,
        1
      );

      materials.forEach((material) => {
        material.opacity = targetOpacity * fade;
      });

      const t = elapsed * swaySpeed;

      // ===================================
      // OUTER FLAME SWAY
      // ===================================

      if (!isInner) {
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

        mesh.rotation.z =
          originalRotation.z +
          totalSway * fade;

        mesh.rotation.x =
          originalRotation.x +
          Math.sin(t * 0.8 + phase) *
            swayRange *
            0.35 *
            fade;
      } else {
        // Keep inner flame upright
        mesh.rotation.copy(originalRotation);
      }

      // ===================================
      // SUBTLE HEIGHT FLICKER
      // ===================================

      const stretch =
        1 +
        Math.sin(t * 2.1 + phase) * 0.025 +
        Math.sin(t * 3.4 + phase) * 0.01;

      mesh.scale.y =
        originalScale.y *
        (isInner
          ? 1 + (stretch - 1) * 0.4
          : stretch);

      // ===================================
      // SUBTLE WIDTH FLICKER
      // ===================================

      const widthFlicker =
        1 +
        Math.sin(t * 2.5 + phase) * 0.015;

      mesh.scale.x =
        originalScale.x *
        (isInner
          ? 1 + (widthFlicker - 1) * 0.4
          : widthFlicker);

      mesh.scale.z =
        originalScale.z *
        (isInner
          ? 1 + (widthFlicker - 1) * 0.4
          : widthFlicker);
    });
  });

  return null;
};

export default BunsenFlame;
