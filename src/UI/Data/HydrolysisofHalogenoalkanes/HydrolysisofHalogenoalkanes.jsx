export const hydrolysisReactionData = [
  {
    id: 1,

    topTitle: "Reaction Overview",

    label: "Hydrolysis of Halogenoalkanes",

    title: (
      <>
        Halogenoalkane Hydrolysis
        <br />
        and Silver Halide Formation
      </>
    ),

    reactionType: "Nucleophilic Substitution",

    reactionIcon: "⚗",

    equation: [
      {
        id: "reactant-1",
        content: (
          <>
            R–X
          </>
        ),
      },
      {
        id: "plus-1",
        content: "+",
      },
      {
        id: "reactant-2",
        content: (
          <>
            H<sub>2</sub>O
          </>
        ),
      },
      {
        id: "arrow-1",
        content: "→",
        className: "hydrolysis-reaction-arrow",
      },
      {
        id: "product-1",
        content: (
          <>
            R–OH
          </>
        ),
      },
      {
        id: "plus-2",
        content: "+",
      },
      {
        id: "product-2",
        content: (
          <>
            H<sup>+</sup>
          </>
        ),
      },
      {
        id: "plus-3",
        content: "+",
      },
      {
        id: "product-3",
        content: (
          <>
            X<sup>−</sup>
          </>
        ),
      },
    ],

    secondaryEquation: [
      {
        id: "secondary-reactant-1",
        content: (
          <>
            Ag<sup>+</sup>(aq)
          </>
        ),
      },
      {
        id: "secondary-plus-1",
        content: "+",
      },
      {
        id: "secondary-reactant-2",
        content: (
          <>
            X<sup>−</sup>(aq)
          </>
        ),
      },
      {
        id: "secondary-arrow",
        content: "→",
        className: "hydrolysis-reaction-arrow",
      },
      {
        id: "secondary-product-1",
        content: (
          <>
            AgX(s)
          </>
        ),
      },
    ],

    noticeTitle: "What You Should Notice",

    notices: [
      "The mixture gradually becomes cloudy.",
      "A silver halide precipitate forms.",
      "A shorter cloudiness time means a faster hydrolysis reaction.",
    ],

    informationTitle: "What Happens",

    information: [
      "Water hydrolyses the halogenoalkane and releases halide ions.",
      "The halide ions react with silver ions to produce an insoluble silver halide precipitate.",
    ],

    importantTitle: "Important:",

    importantText:
      "Stop the timer as soon as cloudiness first becomes visible.",

    buttonText: "Begin Lesson",
  },
]