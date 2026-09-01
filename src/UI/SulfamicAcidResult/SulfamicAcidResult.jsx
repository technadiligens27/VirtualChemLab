import {
  useLayoutEffect,
  useRef,
  useState,
} from "react"

import { gsap } from "gsap"

import "./SulfamicAcidResult.css"

const SulfamicAcidResult = ({
  // ==========================================
  // DATA
  // ==========================================

  sulfamicAcidMass = 2.5,

  volumetricFlaskVolume = 250,
  aliquotVolume = 25,

  roughTitre = 24.8,
  trialOne = 24.7,
  trialTwo = 24.75,

  imageSrc = "./buretteTitre.png",

  onButtonContinue,

  // ==========================================
  // TEXT PROPS
  // ==========================================

  topLabelText =
    "Titration Results",

  mainTitleText =
    "Sulfamic Acid – Sodium Hydroxide",

  subtitleText =
    "Final experimental results",

  titreValuesTitleText =
    "Titre Values",

  roughTitreLabelText =
    "Rough titre",

  trialOneLabelText =
    "Trial 1",

  trialTwoLabelText =
    "Trial 2",

  meanTitreLabelText =
    "Mean titre",

  experimentalDataTitleText =
    "Experimental Data",

  sulfamicAcidLabelText =
    "Sulfamic acid",

  standardSolutionLabelText =
    "Standard solution",

  aliquotUsedLabelText =
    "Aliquot used",

  experimentalMeanTitreLabelText =
    "Mean titre",

  continueButtonText =
    "Continue",

  imageAltText =
    "Burette showing titration result",

  concentrationLabelText =
    "Concentration of NaOH",

  concentrationUnitText =
    "mol dm⁻³",

  calculationTitleText =
    "Calculation",

  molesSulfamicAcidLabelText =
    "Moles of sulfamic acid",

  sulfamicAcidConcentrationLabelText =
    "Sulfamic acid concentration",

  molesInAliquotLabelText =
    "Moles in aliquot",
}) => {
  const resultRef =
    useRef(null)

  const arrowRef =
    useRef(null)

  const isResultOpenRef =
    useRef(true)

  const [
    isResultOpen,
    setIsResultOpen,
  ] = useState(true)

  // ==========================================
  // CALCULATIONS
  // ==========================================

  const sulfamicAcidMolarMass =
    97.09

  const meanTitre =
    (Number(trialOne) +
      Number(trialTwo)) /
    2

  const molesSulfamicAcid =
    Number(sulfamicAcidMass) /
    sulfamicAcidMolarMass

  const sulfamicAcidConcentration =
    molesSulfamicAcid /
    (
      Number(
        volumetricFlaskVolume
      ) / 1000
    )

  const molesInAliquot =
    sulfamicAcidConcentration *
    (
      Number(
        aliquotVolume
      ) / 1000
    )

  // Sulfamic acid reacts 1 : 1 with NaOH
  const naohConcentration =
    molesInAliquot /
    (
      meanTitre / 1000
    )

  // ==========================================
  // OPEN ANIMATION
  // ==========================================

  useLayoutEffect(() => {
    const result =
      resultRef.current

    const arrow =
      arrowRef.current

    if (
      !result ||
      !arrow
    ) {
      return
    }

    const getClosedPosition =
      () => {
        return -(
          window.innerWidth / 2 +
          result.offsetWidth / 2
        )
      }

    // Start outside screen
    gsap.set(result, {
      x: getClosedPosition(),
    })

    gsap.set(arrow, {
      rotation: 0,
    })

    // Slide in
    gsap.to(result, {
      x: 0,

      duration: 0.8,

      delay: 0.2,

      ease: "power3.inOut",
    })

    // Rotate arrow
    gsap.to(arrow, {
      rotation: 180,

      duration: 0.8,

      delay: 0.2,

      ease: "power3.inOut",
    })

    // ========================================
    // RESIZE
    // ========================================

    const handleResize =
      () => {
        if (
          isResultOpenRef.current
        ) {
          return
        }

        gsap.set(result, {
          x: getClosedPosition(),
        })
      }

    window.addEventListener(
      "resize",
      handleResize
    )

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      )

      gsap.killTweensOf(
        result
      )

      gsap.killTweensOf(
        arrow
      )
    }
  }, [])

  // ==========================================
  // CLOSED POSITION
  // ==========================================

  const getClosedPosition =
    () => {
      const result =
        resultRef.current

      if (!result) {
        return 0
      }

      return -(
        window.innerWidth / 2 +
        result.offsetWidth / 2
      )
    }

  // ==========================================
  // ANIMATE RESULT
  // ==========================================

  const animateResult = (
    shouldOpen,
    onAnimationComplete
  ) => {
    const result =
      resultRef.current

    const arrow =
      arrowRef.current

    if (
      !result ||
      !arrow
    ) {
      return
    }

    isResultOpenRef.current =
      shouldOpen

    setIsResultOpen(
      shouldOpen
    )

    gsap.killTweensOf(
      result
    )

    gsap.killTweensOf(
      arrow
    )

    gsap.to(result, {
      x: shouldOpen
        ? 0
        : getClosedPosition(),

      duration: 0.8,

      ease: "power3.inOut",

      onComplete:
        onAnimationComplete,
    })

    gsap.to(arrow, {
      rotation:
        shouldOpen
          ? 180
          : 0,

      duration: 0.8,

      ease: "power3.inOut",
    })
  }

  // ==========================================
  // TOGGLE
  // ==========================================

  const handleResultToggle =
    () => {
      const nextOpenState =
        !isResultOpenRef.current

      animateResult(
        nextOpenState
      )
    }

  // ==========================================
  // CONTINUE
  // ==========================================

  const handleContinue =
    () => {
      animateResult(
        false,
        () => {
          if (
            onButtonContinue
          ) {
            onButtonContinue()
          }
        }
      )
    }

  // ==========================================
  // JSX
  // ==========================================

  return (
    <div
      className={`sulfamic-result-overlay ${
        isResultOpen
          ? "sulfamic-result-overlay-open"
          : "sulfamic-result-overlay-closed"
      }`}
    >
      <div
        className="sulfamic-result-wrapper"
        ref={resultRef}
      >
        {/* ======================================
            TITLE
        ====================================== */}

        <div className="sulfamic-result-label">
          <h1>
            {topLabelText}
          </h1>
        </div>

        {/* ======================================
            SIDE TOGGLE
        ====================================== */}

        <button
          className="sulfamic-result-side-container"
          onClick={
            handleResultToggle
          }
          aria-label={
            isResultOpen
              ? "Close titration results"
              : "Open titration results"
          }
        >
          <img
            ref={arrowRef}
            src="./side-arrow.png"
            alt=""
          />
        </button>

        {/* ======================================
            CONTENT
        ====================================== */}

        <div className="sulfamic-result-inner">
          {/* ====================================
              LEFT SIDE
          ==================================== */}

          <div className="sulfamic-result-left">
            {/* ==================================
                MAIN HEADING
            ================================== */}

            <div className="sulfamic-result-heading">
              <h1>
                {mainTitleText}
              </h1>

              <p>
                {subtitleText}
              </p>
            </div>

            {/* ==================================
                TITRE TABLE
            ================================== */}

            <div className="sulfamic-result-titre-card">
              <div className="sulfamic-result-card-title">
                <div className="sulfamic-result-icon">
                  ⚗
                </div>

                <h2>
                  {
                    titreValuesTitleText
                  }
                </h2>
              </div>

              {/* ROUGH TITRE */}

              <div className="sulfamic-result-titre-row">
                <span>
                  {
                    roughTitreLabelText
                  }
                </span>

                <strong>
                  {Number(
                    roughTitre
                  ).toFixed(2)}{" "}
                  cm³
                </strong>
              </div>

              {/* TRIAL 1 */}

              <div className="sulfamic-result-titre-row">
                <span>
                  {
                    trialOneLabelText
                  }
                </span>

                <strong>
                  {Number(
                    trialOne
                  ).toFixed(2)}{" "}
                  cm³
                </strong>
              </div>

              {/* TRIAL 2 */}

              <div className="sulfamic-result-titre-row">
                <span>
                  {
                    trialTwoLabelText
                  }
                </span>

                <strong>
                  {Number(
                    trialTwo
                  ).toFixed(2)}{" "}
                  cm³
                </strong>
              </div>

              <div className="sulfamic-result-divider" />

              {/* MEAN */}

              <div className="sulfamic-result-titre-row sulfamic-result-mean-row">
                <span>
                  {
                    meanTitreLabelText
                  }
                </span>

                <strong>
                  {meanTitre.toFixed(
                    2
                  )}{" "}
                  cm³
                </strong>
              </div>
            </div>

            {/* ==================================
                EXPERIMENT DATA
            ================================== */}

            <div className="sulfamic-result-data-card">
              <div className="sulfamic-result-card-title">
                <div className="sulfamic-result-info-icon">
                  i
                </div>

                <h2>
                  {
                    experimentalDataTitleText
                  }
                </h2>
              </div>

              <div className="sulfamic-result-data-grid">
                {/* SULFAMIC ACID */}

                <div className="sulfamic-result-data-item">
                  <p>
                    {
                      sulfamicAcidLabelText
                    }
                  </p>

                  <strong>
                    {Number(
                      sulfamicAcidMass
                    ).toFixed(2)}{" "}
                    g
                  </strong>
                </div>

                {/* STANDARD SOLUTION */}

                <div className="sulfamic-result-data-item">
                  <p>
                    {
                      standardSolutionLabelText
                    }
                  </p>

                  <strong>
                    {
                      volumetricFlaskVolume
                    }{" "}
                    cm³
                  </strong>
                </div>

                {/* ALIQUOT */}

                <div className="sulfamic-result-data-item">
                  <p>
                    {
                      aliquotUsedLabelText
                    }
                  </p>

                  <strong>
                    {Number(
                      aliquotVolume
                    ).toFixed(1)}{" "}
                    cm³
                  </strong>
                </div>

                {/* MEAN TITRE */}

                <div className="sulfamic-result-data-item">
                  <p>
                    {
                      experimentalMeanTitreLabelText
                    }
                  </p>

                  <strong>
                    {meanTitre.toFixed(
                      2
                    )}{" "}
                    cm³
                  </strong>
                </div>
              </div>
            </div>

            {/* ==================================
                CONTINUE
            ================================== */}

            <button
              className="sulfamic-result-button"
              onClick={
                handleContinue
              }
            >
              {
                continueButtonText
              }
            </button>
          </div>

          {/* ====================================
              RIGHT SIDE
          ==================================== */}

          <div className="sulfamic-result-right">
            {/* IMAGE */}

            <img
              className="sulfamic-result-image"
              src={imageSrc}
              alt={
                imageAltText
              }
            />

            {/* ==================================
                FINAL RESULT
            ================================== */}

            <div className="sulfamic-result-final-card">
              <p>
                {
                  concentrationLabelText
                }
              </p>

              <h2>
                {naohConcentration.toFixed(
                  3
                )}
              </h2>

              <span>
                {
                  concentrationUnitText
                }
              </span>
            </div>

            {/* ==================================
                CALCULATION
            ================================== */}

            <div className="sulfamic-result-calculation">
              <h3>
                {
                  calculationTitleText
                }
              </h3>

              {/* MOLES OF SULFAMIC ACID */}

              <div className="sulfamic-result-calculation-row">
                <span>
                  {
                    molesSulfamicAcidLabelText
                  }
                </span>

                <strong>
                  {molesSulfamicAcid.toFixed(
                    5
                  )}{" "}
                  mol
                </strong>
              </div>

              {/* SULFAMIC ACID CONCENTRATION */}

              <div className="sulfamic-result-calculation-row">
                <span>
                  {
                    sulfamicAcidConcentrationLabelText
                  }
                </span>

                <strong>
                  {sulfamicAcidConcentration.toFixed(
                    3
                  )}{" "}
                  mol dm⁻³
                </strong>
              </div>

              {/* MOLES IN ALIQUOT */}

              <div className="sulfamic-result-calculation-row">
                <span>
                  {
                    molesInAliquotLabelText
                  }
                </span>

                <strong>
                  {molesInAliquot.toFixed(
                    5
                  )}{" "}
                  mol
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SulfamicAcidResult