import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"

import { gsap } from "gsap"


const ChlorinationLiveDataPanel = ({
  // =========================================================
  // REACTION
  // =========================================================

  alcoholAmount = null,
  hydrochloricAcidAmount = null,
  mixingTime = null,
  layerStatus = null,

  // =========================================================
  // PURIFICATION
  // =========================================================

  calciumChlorideMass = null,
  sodiumHydrogencarbonateAmount = null,
  funnelPressure = null,
  organicLiquidStatus = null,

  // =========================================================
  // DISTILLATION
  // =========================================================

  currentTemperature = null,
  collectionRange = "50–52°C",
  fractionStatus = null,

  // =========================================================
  // PRODUCT TEST
  // =========================================================

  observation = null,
  testConclusion = null,

  // =========================================================
  // LESSON CONTROL
  // =========================================================

  selectedLesson,
  lessonStep,

  autoShowConditions = [],
  autoHideDelay = 3000,
}) => {
  // =========================================================
  // REFS
  // =========================================================

  const panelRef =
    useRef(null)

  const arrowRef =
    useRef(null)

  const isPanelOpenRef =
    useRef(false)

  const autoHideTimeoutRef =
    useRef(null)

  // =========================================================
  // STATE
  // =========================================================

  const [
    isPanelOpen,
    setIsPanelOpen,
  ] = useState(false)

  // =========================================================
  // FORMAT VALUE
  // =========================================================

  const isEmpty = (
    value
  ) => {
    return (
      value === null ||
      value === undefined ||
      value === ""
    )
  }

  const formatVolume = (
    value,
    decimals = 1
  ) => {
    if (isEmpty(value)) {
      return "TBD"
    }

    const numericValue =
      Number(value)

    if (
      Number.isNaN(
        numericValue
      )
    ) {
      return value
    }

    return `${numericValue.toFixed(
      decimals
    )} cm³`
  }

  const formatMass = (
    value,
    decimals = 1
  ) => {
    if (isEmpty(value)) {
      return "TBD"
    }

    const numericValue =
      Number(value)

    if (
      Number.isNaN(
        numericValue
      )
    ) {
      return value
    }

    return `${numericValue.toFixed(
      decimals
    )} g`
  }

  const formatTemperature = (
    value
  ) => {
    if (isEmpty(value)) {
      return "TBD"
    }

    const numericValue =
      Number(value)

    if (
      Number.isNaN(
        numericValue
      )
    ) {
      return value
    }

    return `${numericValue.toFixed(
      1
    )}°C`
  }

  const formatTime = (
    value
  ) => {
    if (isEmpty(value)) {
      return "TBD"
    }

    if (
      typeof value === "string"
    ) {
      return value
    }

    const numericValue =
      Number(value)

    if (
      Number.isNaN(
        numericValue
      )
    ) {
      return "TBD"
    }

    const totalSeconds =
      Math.max(
        0,
        Math.floor(
          numericValue
        )
      )

    const minutes =
      Math.floor(
        totalSeconds / 60
      )

    const seconds =
      totalSeconds % 60

    return `${String(
      minutes
    ).padStart(
      2,
      "0"
    )}:${String(
      seconds
    ).padStart(
      2,
      "0"
    )}`
  }

  const formatStatus = (
    value
  ) => {
    if (isEmpty(value)) {
      return "TBD"
    }

    return value
  }

  // =========================================================
  // VALUE CLASS
  // =========================================================

  const getValueClass = (
    value,
    type = "complete"
  ) => {
    if (isEmpty(value)) {
      return [
        "sulfamic-live-data-value",
        "sulfamic-live-data-value-pending",
      ].join(" ")
    }

    return [
      "sulfamic-live-data-value",
      `sulfamic-live-data-value-${type}`,
    ].join(" ")
  }

  // =========================================================
  // PANEL DATA
  // =========================================================

  const reactionRows = [
    {
      label:
        "Alcohol",

      description:
        "2-methylpropan-2-ol",

      value:
        alcoholAmount,

      displayValue:
        formatVolume(
          alcoholAmount
        ),

      type:
        "complete",
    },

    {
      label:
        "Hydrochloric acid",

      description:
        "Concentrated HCl",

      value:
        hydrochloricAcidAmount,

      displayValue:
        formatVolume(
          hydrochloricAcidAmount
        ),

      type:
        "complete",
    },

    {
      label:
        "Mixing time",

      description:
        "Swirl and vent",

      value:
        mixingTime,

      displayValue:
        formatTime(
          mixingTime
        ),

      type:
        "live",
    },

    {
      label:
        "Layers",

      description:
        "Organic and aqueous",

      value:
        layerStatus,

      displayValue:
        formatStatus(
          layerStatus
        ),

      type:
        "status",
    },
  ]

  const purificationRows = [
    {
      label:
        "Calcium chloride",

      description:
        "Anhydrous CaCl₂",

      value:
        calciumChlorideMass,

      displayValue:
        formatMass(
          calciumChlorideMass
        ),

      type:
        "complete",
    },

    {
      label:
        "NaHCO₃ wash",

      description:
        "Wash solution",

      value:
        sodiumHydrogencarbonateAmount,

      displayValue:
        formatVolume(
          sodiumHydrogencarbonateAmount
        ),

      type:
        "complete",
    },

    {
      label:
        "Funnel pressure",

      description:
        "Carbon dioxide",

      value:
        funnelPressure,

      displayValue:
        formatStatus(
          funnelPressure
        ),

      type:
        "live",
    },

    {
      label:
        "Organic liquid",

      description:
        "Drying progress",

      value:
        organicLiquidStatus,

      displayValue:
        formatStatus(
          organicLiquidStatus
        ),

      type:
        "status",
    },
  ]

  const distillationRows = [
    {
      label:
        "Temperature",

      description:
        "Current reading",

      value:
        currentTemperature,

      displayValue:
        formatTemperature(
          currentTemperature
        ),

      type:
        "live",
    },

    {
      label:
        "Collection range",

      description:
        "Pure product",

      value:
        collectionRange,

      displayValue:
        collectionRange,

      type:
        "complete",
    },

    {
      label:
        "Fraction",

      description:
        "Distillation progress",

      value:
        fractionStatus,

      displayValue:
        formatStatus(
          fractionStatus
        ),

      type:
        "status",
    },
  ]

  const productTestRows = [
    {
      label:
        "Observation",

      description:
        "Silver nitrate test",

      value:
        observation,

      displayValue:
        formatStatus(
          observation
        ),

      type:
        "status",
    },

    {
      label:
        "Conclusion",

      description:
        "Product confirmation",

      value:
        testConclusion,

      displayValue:
        formatStatus(
          testConclusion
        ),

      type:
        "complete",
    },
  ]

  // =========================================================
  // CLOSED POSITION
  // =========================================================

  const getClosedPosition =
    () => {
      const panel =
        panelRef.current

      if (!panel) {
        return 0
      }

      return (
        panel.offsetWidth -
        34
      )
    }

  // =========================================================
  // CLEAR TIMER
  // =========================================================

  const clearAutoHideTimer =
    () => {
      if (
        !autoHideTimeoutRef.current
      ) {
        return
      }

      clearTimeout(
        autoHideTimeoutRef.current
      )

      autoHideTimeoutRef.current =
        null
    }

  // =========================================================
  // CLOSE PANEL
  // =========================================================

  const closePanel =
    () => {
      const panel =
        panelRef.current

      const arrow =
        arrowRef.current

      if (
        !panel ||
        !arrow
      ) {
        return
      }

      clearAutoHideTimer()

      isPanelOpenRef.current =
        false

      setIsPanelOpen(false)

      gsap.to(panel, {
        x:
          getClosedPosition(),

        duration:
          0.65,

        ease:
          "power3.inOut",
      })

      gsap.to(arrow, {
        rotation:
          180,

        duration:
          0.65,

        ease:
          "power3.inOut",
      })
    }

  // =========================================================
  // OPEN PANEL
  // =========================================================

  const openPanel = (
    closeAfterDelay = true
  ) => {
    const panel =
      panelRef.current

    const arrow =
      arrowRef.current

    if (
      !panel ||
      !arrow
    ) {
      return
    }

    clearAutoHideTimer()

    isPanelOpenRef.current =
      true

    setIsPanelOpen(true)

    gsap.to(panel, {
      x:
        -60,

      duration:
        0.65,

      ease:
        "power3.inOut",
    })

    gsap.to(arrow, {
      rotation:
        0,

      duration:
        0.65,

      ease:
        "power3.inOut",
    })

    if (
      closeAfterDelay
    ) {
      autoHideTimeoutRef.current =
        setTimeout(
          () => {
            closePanel()
          },
          autoHideDelay
        )
    }
  }

  // =========================================================
  // INITIAL PANEL POSITION
  // =========================================================

  useLayoutEffect(() => {
    const panel =
      panelRef.current

    const arrow =
      arrowRef.current

    if (
      !panel ||
      !arrow
    ) {
      return
    }

    gsap.set(panel, {
      x:
        getClosedPosition(),
    })

    gsap.set(arrow, {
      rotation:
        180,
    })

    isPanelOpenRef.current =
      false

    setIsPanelOpen(false)

    const handleResize =
      () => {
        if (
          !isPanelOpenRef.current
        ) {
          gsap.set(panel, {
            x:
              getClosedPosition(),
          })
        }
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
        panel
      )

      gsap.killTweensOf(
        arrow
      )
    }
  }, [])

  // =========================================================
  // AUTO-SHOW CONDITION
  // =========================================================

  const shouldAutoShow =
    autoShowConditions.some(
      (condition) =>
        condition.selectedLesson ===
          selectedLesson &&
        condition.lessonStep ===
          lessonStep
    )

  // =========================================================
  // AUTO-SHOW PANEL
  // =========================================================

  useEffect(() => {
    if (!shouldAutoShow) {
      return
    }

    openPanel(true)
  }, [
    selectedLesson,
    lessonStep,
    shouldAutoShow,
    autoHideDelay,
  ])

  // =========================================================
  // CLEANUP TIMER
  // =========================================================

  useEffect(() => {
    return () => {
      clearAutoHideTimer()
    }
  }, [])

  // =========================================================
  // MANUAL TOGGLE
  // =========================================================

  const handlePanelToggle =
    () => {
      if (
        isPanelOpenRef.current
      ) {
        closePanel()
        return
      }

      // Manually opened panel stays open.
      openPanel(false)
    }

  // =========================================================
  // RENDER ROW
  // =========================================================

  const renderRow = (
    row
  ) => {
    return (
      <div
        className="sulfamic-live-data-row"
        key={row.label}
      >
        <div className="sulfamic-live-data-label">
          <p>
            {row.label}
          </p>

          <span>
            {row.description}
          </span>
        </div>

        <div
          className={
            getValueClass(
              row.value,
              row.type
            )
          }
        >
          <p>
            {row.displayValue}
          </p>
        </div>
      </div>
    )
  }

  // =========================================================
  // RENDER SECTION
  // =========================================================

  const renderSection = ({
    title,
    rows,
    secondary = false,
  }) => {
    const sectionClassName = [
      "sulfamic-live-data-section",

      secondary
        ? "sulfamic-live-data-secondary-section"
        : "",
    ]
      .filter(Boolean)
      .join(" ")

    return (
      <div
        className={
          sectionClassName
        }
      >
        <div className="sulfamic-live-data-section-title">
          <span className="sulfamic-live-data-dot" />

          <h2>
            {title}
          </h2>
        </div>

        <div className="sulfamic-live-data-divider" />

        {rows.map(
          renderRow
        )}
      </div>
    )
  }

  // =========================================================
  // JSX
  // =========================================================

  return (
    <div
      ref={panelRef}
      className="sulfamic-live-data-panel"
    >
      <button
        type="button"
        className="sulfamic-live-data-toggle"
        onClick={
          handlePanelToggle
        }
        aria-label={
          isPanelOpen
            ? "Close chlorination live data panel"
            : "Open chlorination live data panel"
        }
      >
        <span
          ref={arrowRef}
          className="sulfamic-live-data-toggle-arrow"
        >
          ❯
        </span>
      </button>

      <div className="sulfamic-live-data-inner">
        <div className="sulfamic-live-data-header">
          <h1>
            Chlorination Reaction
          </h1>

          <p>
            Live Data
          </p>
        </div>

        <div className="sulfamic-live-data-content">
          {renderSection({
            title:
              "Reaction",

            rows:
              reactionRows,
          })}

          {renderSection({
            title:
              "Purification",

            rows:
              purificationRows,

            secondary:
              true,
          })}

          {renderSection({
            title:
              "Distillation",

            rows:
              distillationRows,
          })}

          {renderSection({
            title:
              "Product Test",

            rows:
              productTestRows,

            secondary:
              true,
          })}
        </div>

        <div className="sulfamic-live-data-footer">
          <div className="sulfamic-live-data-info-icon">
            i
          </div>

          <p>
            Values update automatically throughout the practical.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ChlorinationLiveDataPanel