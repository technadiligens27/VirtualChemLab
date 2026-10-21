
import { useContext, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { ModelContext } from "../../../Contexts/ModelContext/ModelContext";

const ChangeBunsenFlameColor = ({
  innerColor = "#FF4569",
  outerColor = "#DC143C",
  duration = 1.5,
}) => {
  const { bunsenBurnerRef } = useContext(ModelContext);

  const transitionRef = useRef(null);
  const originalColorsRef = useRef([]);

  // =====================================================
  // INITIALIZE COLOR TRANSITION
  // =====================================================

  useEffect(() => {
    const burner = bunsenBurnerRef?.current;
    if (!burner) return;

    const transitions = [];
    const originalColors = [];

    burner.traverse((child) => {
      if (!child.isMesh) return;

      const name = child.name.toLowerCase();

      const isInner = name.includes("inner");
      const isOuter = name.includes("outer");

      if (!isInner && !isOuter) return;

      const targetColor = new THREE.Color(
        isInner ? innerColor : outerColor
      );

      const materials = Array.isArray(child.material)
        ? child.material
        : [child.material];

      materials.forEach((material) => {
        // ===================================
        // SAVE ORIGINAL COLORS
        // ===================================

        const originalColor = material.color
          ? material.color.clone()
          : null;

        const originalEmissive = material.emissive
          ? material.emissive.clone()
          : null;

        originalColors.push({
          material,
          originalColor,
          originalEmissive,
        });

        transitions.push({
          material,
          startColor: originalColor?.clone() || null,
          startEmissive: originalEmissive?.clone() || null,
          targetColor,
        });
      });
    });

    originalColorsRef.current = originalColors;

    transitionRef.current = {
      transitions,
      elapsed: 0,
    };

    // =====================================================
    // CLEANUP - RESTORE ORIGINAL COLORS
    // =====================================================

    return () => {
      // Stop current transition
      transitionRef.current = null;

      // Restore colors before component unmounted
      originalColors.forEach(
        ({
          material,
          originalColor,
          originalEmissive,
        }) => {
          if (material.color && originalColor) {
            material.color.copy(originalColor);
          }

          if (material.emissive && originalEmissive) {
            material.emissive.copy(originalEmissive);
          }
        }
      );

      originalColorsRef.current = [];
    };
  }, [
    bunsenBurnerRef,
    innerColor,
    outerColor,
  ]);

  // =====================================================
  // ANIMATE COLOR TRANSITION
  // =====================================================

  useFrame((_, delta) => {
    const transition = transitionRef.current;

    if (!transition) return;

    transition.elapsed += delta;

    const progress =
      duration <= 0
        ? 1
        : THREE.MathUtils.clamp(
            transition.elapsed / duration,
            0,
            1
          );

    // Smooth easing
    const eased =
      progress * progress * (3 - 2 * progress);

    transition.transitions.forEach(
      ({
        material,
        startColor,
        startEmissive,
        targetColor,
      }) => {
        // ===================================
        // UPDATE MATERIAL COLOR
        // ===================================

        if (material.color && startColor) {
          material.color
            .copy(startColor)
            .lerp(targetColor, eased);
        }

        // ===================================
        // UPDATE EMISSIVE COLOR
        // ===================================

        if (material.emissive && startEmissive) {
          material.emissive
            .copy(startEmissive)
            .lerp(targetColor, eased);
        }
      }
    );

    // ===================================
    // FINISH TRANSITION
    // ===================================

    if (progress >= 1) {
      transitionRef.current = null;
    }
  });

  return null;
};

export default ChangeBunsenFlameColor;
