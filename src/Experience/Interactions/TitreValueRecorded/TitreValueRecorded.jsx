import {
  useLayoutEffect,
  useRef,
  useState,
} from "react"

import { gsap } from "gsap"

import "./TitreValueRecorded.css"

const TitreValueRecorded = ({
  titreValue = 24.8,
  titreName = "Rough Titre",
  initialReading = 0.0,
  finalReading = 24.8,
  onButtonContinue,
}) => {
  const titreRef = useRef(null)
  const arrowRef = useRef(null)

  const isTitreOpenRef =
    useRef(true)

  const [
    isTitreOpen,
    setIsTitreOpen,
  ] = useState(true)

  // =====================================================
  // INITIAL ANIMATION
  // =====================================================

  useLayoutEffect(() => {
    const titre =
      titreRef.current

    const arrow =
      arrowRef.current

    if (!titre || !arrow) return

    const getClosedPosition = () => {
      return -(
        window.innerWidth / 2 +
        titre.offsetWidth / 2
      )
    }

    // Start outside screen
    gsap.set(titre, {
      x: getClosedPosition(),
    })

    gsap.set(arrow, {
      rotation: 0,
    })

    // Slide in
    gsap.to(titre, {
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

    // =====================================================
    // RESIZE
    // =====================================================

    const handleResize = () => {
      if (
        isTitreOpenRef.current
      ) {
        return
      }

      gsap.set(titre, {
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

      gsap.killTweensOf(titre)
      gsap.killTweensOf(arrow)
    }
  }, [])

  // =====================================================
  // CLOSED POSITION
  // =====================================================

  const getClosedPosition = () => {
    const titre =
      titreRef.current

    if (!titre) return 0

    return -(
      window.innerWidth / 2 +
      titre.offsetWidth / 2
    )
  }

  // =====================================================
  // OPEN / CLOSE ANIMATION
  // =====================================================

  const animateTitre = (
    shouldOpen,
    onAnimationComplete
  ) => {
    const titre =
      titreRef.current

    const arrow =
      arrowRef.current

    if (!titre || !arrow) return

    isTitreOpenRef.current =
      shouldOpen

    setIsTitreOpen(
      shouldOpen
    )

    gsap.killTweensOf(titre)
    gsap.killTweensOf(arrow)

    gsap.to(titre, {
      x: shouldOpen
        ? 0
        : getClosedPosition(),

      duration: 0.8,

      ease: "power3.inOut",

      onComplete:
        onAnimationComplete,
    })

    gsap.to(arrow, {
      rotation: shouldOpen
        ? 180
        : 0,

      duration: 0.8,

      ease: "power3.inOut",
    })
  }

  // =====================================================
  // TOGGLE
  // =====================================================

  const handleTitreToggle = () => {
    const nextOpenState =
      !isTitreOpenRef.current

    animateTitre(
      nextOpenState
    )
  }

  // =====================================================
  // CONTINUE
  // =====================================================

  const handleContinue = () => {
    animateTitre(
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

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div
      className={`titre-recorded-overlay ${
        isTitreOpen
          ? "titre-recorded-overlay-open"
          : "titre-recorded-overlay-closed"
      }`}
    >
      <div
        className="titre-recorded-wrapper"
        ref={titreRef}
      >
        {/* =================================================
            TOP LABEL
        ================================================= */}

        <div className="titre-recorded-label">
          <h1>
            Titre Value Recorded
          </h1>
        </div>

        {/* =================================================
            SIDE TOGGLE
        ================================================= */}

        <button
          className="titre-recorded-side-container"
          onClick={
            handleTitreToggle
          }
          aria-label={
            isTitreOpen
              ? "Close titre result"
              : "Open titre result"
          }
        >
          <img
            ref={arrowRef}
            src="./side-arrow.png"
            alt=""
          />
        </button>

        {/* =================================================
            CONTENT
        ================================================= */}

        <div className="titre-recorded-inner">
          {/* =================================================
              LEFT
          ================================================= */}

          <div className="titre-recorded-left">
            <div className="titre-recorded-heading">
              <h1>
                Your recorded titre is:
              </h1>
            </div>

            {/* =================================================
                MAIN READING
            ================================================= */}

            <div className="titre-recorded-reading">
              <div className="titre-recorded-icon">
                <span>
                  ✓
                </span>
              </div>

              <div className="titre-recorded-reading-value">
                <p>
                  {titreName}
                </p>

                <h2>
                  {Number(
                    titreValue
                  ).toFixed(2)}
                  <span>
                    {" "}
                    cm³
                  </span>
                </h2>
              </div>
            </div>

            {/* =================================================
                EXPLANATION
            ================================================= */}

            <div className="titre-recorded-explanation">
              <div className="titre-recorded-explanation-title">
                <div className="titre-recorded-info-icon">
                  i
                </div>

                <h2>
                  How was this value
                  obtained?
                </h2>
              </div>

              <p>
                The titre is the
                volume of sodium
                hydroxide delivered
                from the burette
                during the titration.
              </p>

              <div className="titre-recorded-divider" />

              {/* =================================================
                  CALCULATION
              ================================================= */}

              <div className="titre-recorded-calculation">
                <div className="titre-recorded-calculation-icon">
                  −
                </div>

                <div className="titre-recorded-calculation-text">
                  <p>
                    Final burette
                    reading − initial
                    burette reading
                  </p>

                  <h3>
                    {Number(
                      finalReading
                    ).toFixed(2)}
                    {" − "}
                    {Number(
                      initialReading
                    ).toFixed(2)}
                    {" = "}
                    <strong>
                      {Number(
                        titreValue
                      ).toFixed(2)}
                      {" cm³"}
                    </strong>
                  </h3>
                </div>
              </div>
            </div>

            {/* =================================================
                CONTINUE
            ================================================= */}

            <button
              className="titre-recorded-button"
              onClick={
                handleContinue
              }
            >
              Continue
            </button>
          </div>

          {/* =================================================
              RIGHT
          ================================================= */}

          <div className="titre-recorded-right">
            <img
              src="./buretteTitre.png"
              alt="Burette showing recorded titre"
            />

            <div className="titre-recorded-reading-label">
              <p>
                {titreName}
              </p>

              <h2>
                {Number(
                  titreValue
                ).toFixed(2)}
                {" cm³"}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TitreValueRecorded