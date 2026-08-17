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
      "Hydrochloric acid reacts with sodium hydroxide in a 1:1 mole ratio.",
      "Hydrogen ions from the acid react with hydroxide ions from the alkali to form water.",
      "The volume of sodium hydroxide used can be used to calculate the concentration of the hydrochloric acid.",
    ],

    importantTitle: "Important:",

    importantText:
      "Stop adding sodium hydroxide when a very pale pink colour persists for at least 5 seconds.",

    buttonText: "Begin Lesson",
  },
]