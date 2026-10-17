
import { useContext, useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext";

const DipMode = ({
  DipmodelRef,
  recieveModelRef,

  xOffset = 0,
  yOffset = 0,

  recieveModelYOffset = 0,

  dipDistance = 2,

  dipModelScale = 1,
  recieveModelScale = 1,

  scrollSpeed = 0.1,
  animationSpeed = 8,
}) => {
  const {
    selectedLesson,
    lessonStep,
    setLessonStep,
  } = useContext(MainGuidelineContext);

  const { gl } = useThree();

  // =====================================================
  // SCROLL CONDITIONS
  // =====================================================

  const SCROLL_DOWN_CONDITION =
    selectedLesson === 15 && [16,22].includes(lessonStep);

  const SCROLL_UP_CONDITION =
    selectedLesson === 15 && [17,23].includes(lessonStep);

  // =====================================================
  // REFS
  // =====================================================

  const originalDipRef = useRef(null);
  const originalReceiveRef = useRef(null);

  const mouthRef = useRef(null);

  // 0 = fully raised, 1 = fully dipped
  const dipProgressRef = useRef(0);

  // Prevent repeated step advancement
  const hasFullyDippedRef = useRef(false);
  const hasFullyLiftedRef = useRef(false);

  const mouthWorldPosition = useRef(
    new THREE.Vector3()
  );

  const targetLocalPosition = useRef(
    new THREE.Vector3()
  );

  const downWorldDirection = useRef(
    new THREE.Vector3(0, -1, 0)
  );

  const downLocalDirection = useRef(
    new THREE.Vector3()
  );

  const parentQuaternionRef = useRef(
    new THREE.Quaternion()
  );

  const parentScaleRef = useRef(
    new THREE.Vector3()
  );

  // =====================================================
  // AUTOMATIC STEP 15 -> 16
  // =====================================================

  useEffect(() => {
    if ( selectedLesson === 15 && lessonStep === 15) {
      setLessonStep(16);
    }

    if(selectedLesson == 15 && lessonStep === 21){
      setLessonStep(22)
    }
  }, [
    selectedLesson,
    lessonStep,
    setLessonStep,
  ]);

  // =====================================================
  // SAVE ORIGINAL TRANSFORMS + FIND MOUTH
  // =====================================================

  useEffect(() => {
    const dipModel = DipmodelRef?.current;
    const receiveModel = recieveModelRef?.current;

    if (!dipModel || !receiveModel) return;

    const saveTransform = (model) => ({
      parent: model.parent,
      position: model.position.clone(),
      quaternion: model.quaternion.clone(),
      scale: model.scale.clone(),
    });

    originalDipRef.current =
      saveTransform(dipModel);

    originalReceiveRef.current =
      saveTransform(receiveModel);

    // Find receiving model's mouth
    let mouth = null;

    receiveModel.traverse((child) => {
      if (
        !mouth &&
        child.name
          ?.toLowerCase()
          .includes("mouth")
      ) {
        mouth = child;
      }
    });

    mouthRef.current = mouth;

    if (!mouth) {
      console.warn(
        "DipMode: No child containing 'mouth' found."
      );
    }

    // Apply model scales
    dipModel.scale
      .copy(originalDipRef.current.scale)
      .multiplyScalar(dipModelScale);

    receiveModel.scale
      .copy(originalReceiveRef.current.scale)
      .multiplyScalar(recieveModelScale);

    dipProgressRef.current = 0;

    hasFullyDippedRef.current = false;
    hasFullyLiftedRef.current = false;

    // =====================================================
    // CENTER RECEIVING MODEL + APPLY Y OFFSET
    // =====================================================

    receiveModel.position.x = 0;

    receiveModel.position.y =
      originalReceiveRef.current.position.y +
      recieveModelYOffset;

    receiveModel.updateMatrixWorld(true);

    // =====================================================
    // RESTORE ON UNMOUNT
    // =====================================================

    return () => {
      const restore = (model, original) => {
        if (!model || !original) return;

        if (original.parent) {
          if (model.parent !== original.parent) {
            original.parent.add(model);
          }
        } else {
          model.removeFromParent();
        }

        model.position.copy(original.position);
        model.quaternion.copy(original.quaternion);
        model.scale.copy(original.scale);

        model.updateMatrixWorld(true);
      };

      restore(
        dipModel,
        originalDipRef.current
      );

      restore(
        receiveModel,
        originalReceiveRef.current
      );

      mouthRef.current = null;

      originalDipRef.current = null;
      originalReceiveRef.current = null;

      dipProgressRef.current = 0;

      hasFullyDippedRef.current = false;
      hasFullyLiftedRef.current = false;
    };
  }, [
    DipmodelRef,
    recieveModelRef,
    dipModelScale,
    recieveModelScale,
  ]);

  // =====================================================
  // UPDATE RECEIVING MODEL Y OFFSET
  // =====================================================

  useEffect(() => {
    const receiveModel = recieveModelRef?.current;
    const original = originalReceiveRef.current;

    if (!receiveModel || !original) return;

    receiveModel.position.x = 0;

    receiveModel.position.y =
      original.position.y + recieveModelYOffset;

    receiveModel.updateMatrixWorld(true);
  }, [
    recieveModelRef,
    recieveModelYOffset,
  ]);

  // =====================================================
  // SCROLL HANDLER
  // =====================================================

  useEffect(() => {
    const canvas = gl.domElement;

    const handleWheel = (event) => {
      const delta = event.deltaY;

      const modelReady =
        DipmodelRef?.current &&
        recieveModelRef?.current &&
        mouthRef.current;

      if (!modelReady || delta === 0) return;

      const wheelPixels =
        delta *
        (event.deltaMode === 1
          ? 16
          : event.deltaMode === 2
            ? canvas.clientHeight
            : 1);

      // ===========================================
      // SCROLL DOWN — DIP MODEL
      // ===========================================

      if (
        delta > 0 &&
        SCROLL_DOWN_CONDITION
      ) {
        event.preventDefault();

        dipProgressRef.current =
          THREE.MathUtils.clamp(
            dipProgressRef.current +
              (Math.abs(wheelPixels) / 100) *
                scrollSpeed,
            0,
            1
          );

        // FULLY DIPPED
        if (
          dipProgressRef.current >= 1 &&
          !hasFullyDippedRef.current
        ) {
          hasFullyDippedRef.current = true;

          console.log(
            "Nichrome wire fully dipped!"
          );

          // Lesson 15: Step 16 -> 17
          if (
            selectedLesson === 15 &&
            lessonStep === 16
          ) {
            setLessonStep(17);
          }

          if (
            selectedLesson === 15 &&
            lessonStep === 22
          ) {
            setLessonStep(23);
          }

        }
      }

      // ===========================================
      // SCROLL UP — LIFT MODEL
      // ===========================================

      if (
        delta < 0 &&
        SCROLL_UP_CONDITION
      ) {
        event.preventDefault();

        dipProgressRef.current =
          THREE.MathUtils.clamp(
            dipProgressRef.current -
              (Math.abs(wheelPixels) / 100) *
                scrollSpeed,
            0,
            1
          );

        // FULLY LIFTED
        if (
          dipProgressRef.current <= 0 &&
          !hasFullyLiftedRef.current
        ) {
          hasFullyLiftedRef.current = true;

          console.log(
            "Nichrome wire fully lifted!"
          );

          // Lesson 15: Step 17 -> 18
          if (
            selectedLesson === 15 &&
            lessonStep === 17
          ) {
            setLessonStep(18);
          }
          if (
            selectedLesson === 15 &&
            lessonStep === 23
          ) {
            setLessonStep(24);
          }
          
        }
      }
    };

    canvas.addEventListener(
      "wheel",
      handleWheel,
      {
        passive: false,
      }
    );

    return () => {
      canvas.removeEventListener(
        "wheel",
        handleWheel
      );
    };
  }, [
    gl,
    DipmodelRef,
    recieveModelRef,
    SCROLL_DOWN_CONDITION,
    SCROLL_UP_CONDITION,
    scrollSpeed,
    selectedLesson,
    lessonStep,
    setLessonStep,
  ]);

  // =====================================================
  // ANIMATE DIPPING MODEL
  // =====================================================

  useFrame((state, delta) => {
    const dipModel = DipmodelRef?.current;
    const receiveModel =
      recieveModelRef?.current;

    const mouth = mouthRef.current;

    if (
      !dipModel ||
      !receiveModel ||
      !mouth ||
      !dipModel.parent
    ) {
      return;
    }

    // Update world matrices
    receiveModel.updateWorldMatrix(
      true,
      true
    );

    dipModel.parent.updateWorldMatrix(
      true,
      false
    );

    // Get mouth position in world space
    mouth.getWorldPosition(
      mouthWorldPosition.current
    );

    // Convert to dipping model parent's
    // local coordinate system
    targetLocalPosition.current.copy(
      mouthWorldPosition.current
    );

    dipModel.parent.worldToLocal(
      targetLocalPosition.current
    );

    // Apply offsets
    targetLocalPosition.current.x +=
      xOffset;

    targetLocalPosition.current.y +=
      yOffset;

    // Get parent's world rotation
    dipModel.parent.getWorldQuaternion(
      parentQuaternionRef.current
    );

    // Convert world downward direction
    // to parent's local direction
    downLocalDirection.current
      .copy(downWorldDirection.current)
      .applyQuaternion(
        parentQuaternionRef.current
          .clone()
          .invert()
      );

    // Account for parent's scale
    dipModel.parent.getWorldScale(
      parentScaleRef.current
    );

    downLocalDirection.current.x /=
      parentScaleRef.current.x || 1;

    downLocalDirection.current.y /=
      parentScaleRef.current.y || 1;

    downLocalDirection.current.z /=
      parentScaleRef.current.z || 1;

    // Apply dip distance
    targetLocalPosition.current.addScaledVector(
      downLocalDirection.current,
      Math.max(0, dipDistance) *
        dipProgressRef.current
    );

    // Smooth animation
    const smoothing =
      1 - Math.exp(
        -animationSpeed * delta
      );

    dipModel.position.lerp(
      targetLocalPosition.current,
      smoothing
    );
  });

  return null;
};

export default DipMode;
