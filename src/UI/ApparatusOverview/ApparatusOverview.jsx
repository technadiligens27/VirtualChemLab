import {
  useLayoutEffect,
  useRef,
  useState,
} from "react"

import {
  gsap,
} from "gsap"

import "./ApparatusOverview.css"

const ApparatusOverview = ({
  title = "Apparatus Overview",

  subtitle =
    "Following apparatus will be used in this experiment",

  apparatusItems = [],

  onSelectApparatus,

  onContinue,
}) => {
  const overviewRef =
    useRef(null)

  const [
    page,
    setPage,
  ] = useState(0)

  const [
    animationClass,
    setAnimationClass,
  ] = useState("")

  const [
    isAnimating,
    setIsAnimating,
  ] = useState(false)

  const apparatusPerPage = 4

  const totalPages =
    Math.ceil(
      apparatusItems.length /
      apparatusPerPage
    )

  const visibleApparatus =
    apparatusItems.slice(
      page * apparatusPerPage,
      page * apparatusPerPage +
        apparatusPerPage
    )

  const emptyCardCount =
    apparatusPerPage -
    visibleApparatus.length

  // =========================================================
  // SLIDE IN FROM LEFT WHEN MOUNTED
  // =========================================================

  useLayoutEffect(() => {
    const overview =
      overviewRef.current

    if (!overview) {
      return
    }

    const getClosedPosition =
      () => {
        return -(
          window.innerWidth / 2 +
          overview.offsetWidth / 2
        )
      }

    gsap.set(overview, {
      x: getClosedPosition(),
    })

    gsap.to(overview, {
      x: 0,

      duration: 0.8,

      delay: 0.2,

      ease: "power3.inOut",
    })

    const handleResize = () => {
      gsap.set(overview, {
        x: 0,
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
        overview
      )
    }
  }, [])

  const changePage = (
    nextPage
  ) => {
    if (
      isAnimating ||
      nextPage < 0 ||
      nextPage >= totalPages ||
      nextPage === page
    ) {
      return
    }

    const isGoingForward =
      nextPage > page

    setIsAnimating(true)

    setAnimationClass(
      isGoingForward
        ? "apparatus-slide-out-left"
        : "apparatus-slide-out-right"
    )

    setTimeout(() => {
      setPage(nextPage)

      setAnimationClass(
        isGoingForward
          ? "apparatus-slide-in-right"
          : "apparatus-slide-in-left"
      )

      setTimeout(() => {
        setAnimationClass("")
        setIsAnimating(false)
      }, 350)
    }, 300)
  }

  return (
    <div className="apparatus-overview-overlay">
      <section
        ref={overviewRef}
        className="apparatus-overview-container"
      >
        <div className="apparatus-overview-title-tab">
          <h1>
            {title}
          </h1>
        </div>

        <p className="apparatus-overview-subtitle">
          {subtitle}
        </p>

        <div className="apparatus-overview-content">
          <div
            className={`
              apparatus-overview-grid
              ${animationClass}
            `}
          >
            {visibleApparatus.map(
              (apparatus, index) => (
                <article
                  className="apparatus-overview-card"
                  key={
                    apparatus.id ||
                    apparatus.modelName ||
                    index
                  }
                >
                  <span className="apparatus-overview-number">
                    {page *
                      apparatusPerPage +
                      index +
                      1}
                  </span>

                  <div className="apparatus-overview-image-container">
                    <img
                      src={apparatus.imagePath}
                      alt={
                        apparatus.name ||
                        apparatus.modelName ||
                        "Laboratory apparatus"
                      }
                    />
                  </div>

                  <p className="apparatus-overview-description">
                    {apparatus.description ||
                      apparatus.text ||
                      "This apparatus is used in the experiment."}
                  </p>

                  <button
                    type="button"
                    className="apparatus-overview-button"
                    onClick={() => {
                      onSelectApparatus?.(
                        apparatus
                      )
                    }}
                  >
                    {apparatus.name}
                  </button>
                </article>
              )
            )}

            {Array.from({
              length: emptyCardCount,
            }).map((_, index) => (
              <div
                className="
                  apparatus-overview-card
                  apparatus-overview-card-placeholder
                "
                key={`placeholder-${index}`}
              />
            ))}
          </div>

          {page > 0 && (
            <button
              type="button"
              className="
                apparatus-arrow-button
                apparatus-arrow-left
              "
              onClick={() =>
                changePage(page - 1)
              }
              aria-label="Previous apparatus"
            >
              <img
                src="./left-arrow.png"
                alt=""
              />
            </button>
          )}

          {page < totalPages - 1 && (
            <button
              type="button"
              className="
                apparatus-arrow-button
                apparatus-arrow-right
              "
              onClick={() =>
                changePage(page + 1)
              }
              aria-label="Next apparatus"
            >
              <img
                src="./right-arrow.png"
                alt=""
              />
            </button>
          )}
        </div>

        <div className="apparatus-overview-footer">
          <div className="apparatus-overview-status">
            <strong>
              {apparatusItems.length} apparatus ready
            </strong>

            {totalPages > 1 && (
              <small className="apparatus-overview-page-count">
                Page {page + 1} of {totalPages}
              </small>
            )}
          </div>

          <button
            type="button"
            className="apparatus-overview-continue-button"
            onClick={() => {
              onContinue?.()
            }}
          >
            Continue

          </button>
        </div>
      </section>
    </div>
  )
}

export default ApparatusOverview