export const hclTitrationReactionData = [
  {
    id: 1,

    topTitle: "Reaction Overview",

    label: "Acid–Base Titration",

    title: (
      <>
        Hydrochloric Acid
        <br />
        and Sodium Hydroxide
      </>
    ),

    reactionType: "Neutralisation Reaction",

    reactionIcon: "⚗",

    equation: [
      {
        id: "reactant-1",
        content: (
          <>
            HCl(aq)
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
            NaOH(aq)
          </>
        ),
      },
      {
        id: "arrow-1",
        content: "→",
        className: "hcl-titration-reaction-arrow",
      },
      {
        id: "product-1",
        content: (
          <>
            NaCl(aq)
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
            H<sub>2</sub>O(l)
          </>
        ),
      },
    ],

    secondaryEquation: [
      {
        id: "secondary-reactant-1",
        content: (
          <>
            H<sup>+</sup>(aq)
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
            OH<sup>−</sup>(aq)
          </>
        ),
      },
      {
        id: "secondary-arrow",
        content: "→",
        className: "hcl-titration-reaction-arrow",
      },
      {
        id: "secondary-product-1",
        content: (
          <>
            H<sub>2</sub>O(l)
          </>
        ),
      },
    ],

    noticeTitle: "What You Should Notice",

    notices: [
      "The hydrochloric acid and phenolphthalein mixture is initially colourless.",
      "Near the endpoint, drops of sodium hydroxide may produce temporary pale pink swirls.",
      "At the endpoint, a very pale pink colour remains for at least 5 seconds.",
    ],

    informationTitle: "What Happens",
    
    information: [
      <>
        We will find the <strong>concentration of hydrochloric acid</strong> by titrating it with{" "}
        <strong>standardised sodium hydroxide</strong>.
      </>,

      <>
        We will use <strong>25.0 cm³ of diluted HCl</strong>, add{" "}
        <strong>phenolphthalein</strong>, and titrate until a{" "}
        <strong>pale pink endpoint</strong> is reached.
      </>,

      <>
        We will record the <strong>burette readings</strong>, calculate the{" "}
        <strong>titre</strong>, and repeat until we obtain{" "}
        <strong>two concordant titres</strong>.
      </>,
    ],

    importantTitle: "Important:",

    importantText:
      "Stop adding sodium hydroxide when a very pale pink colour persists for at least 5 seconds.",

    buttonText: "Begin Lesson",
  },
]

export const hclTitrationResultsData = {
  headerTitle:
    "HCl Titration Results",

  title:
    "Titration Results",

  subtitle:
    "Hydrochloric acid + sodium hydroxide",

  description:
    "Compare the titres and calculate the mean using the concordant results.",

  table: {
    columns: [
      "Titration",
      "Initial Reading",
      "Final Reading",
      "Titre",
      "Concordant",
    ],

    rows: [
      {
        cells: [
          {
            content: "Rough",
          },
          {
            content: "0.00",
          },
          {
            content: "24.80",
          },
          {
            content: "24.80",
            className:
              "results-sheet-value",
          },
          {
            content: "—",
          },
        ],
      },

      {
        cells: [
          {
            content: "Trial 1",
          },
          {
            content: "0.00",
          },
          {
            content: "24.70",
          },
          {
            content: "24.70",
            className:
              "results-sheet-value",
          },
          {
            content: "✓",
            className:
              "results-sheet-check",
          },
        ],
      },

      {
        cells: [
          {
            content: "Trial 2",
          },
          {
            content: "0.00",
          },
          {
            content: "24.75",
          },
          {
            content: "24.75",
            className:
              "results-sheet-value",
          },
          {
            content: "✓",
            className:
              "results-sheet-check",
          },
        ],
      },
    ],
  },

  calculation: {
    title:
      "Mean titre",

    formula:
      "Mean titre = (Trial 1 + Trial 2) ÷ 2",

    working:
      "(24.70 + 24.75) ÷ 2 = 24.725 cm³",

    result:
      "24.73 cm³",
  },

  observation: {
    title:
      "Concordant Results",

    description:
      "Trial 1 and Trial 2 differ by only 0.05 cm³, so they are concordant and can be used to calculate the mean titre.",
  },

  buttonText:
    "Continue",
}