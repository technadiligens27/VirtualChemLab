export const sulfamicAcidNaOHTitrationReactionData = [
  {
    id: 1,

    topTitle: "Reaction Overview",

    label: "Standard Solution Titration",

    title: (
      <>
        Sulfamic Acid
        <br />
        and Sodium Hydroxide
      </>
    ),

    reactionType: "Acid–Base Neutralisation",

    reactionIcon: "⚗",

    equation: [
      {
        id: "reactant-1",
        content: (
          <>
            NH<sub>2</sub>SO<sub>3</sub>H(aq)
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
        className: "sulfamic-naoh-reaction-arrow",
      },
      {
        id: "product-1",
        content: (
          <>
            NH<sub>2</sub>SO<sub>3</sub>Na(aq)
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
        className: "sulfamic-naoh-reaction-arrow",
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
      "The prepared sulfamic acid standard solution is clear and colourless.",
      "After methyl orange is added to the sodium hydroxide solution, the solution appears yellow.",
      "As sulfamic acid is added, temporary orange regions may appear where the acid enters the flask.",
      "At the endpoint, a permanent pale orange colour remains after swirling.",
    ],

    informationTitle: "What Happens",

    information: [
      "A known mass of sulfamic acid is dissolved and made up to a fixed volume to prepare a standard solution.",
      "Sulfamic acid reacts with sodium hydroxide in a 1:1 mole ratio.",
      "The measured volume of standard sulfamic acid required to neutralise 25.0 cm³ of sodium hydroxide can be used to calculate the sodium hydroxide concentration.",
    ],

    importantTitle: "Important:",

    importantText:
      "Near the endpoint, add the sulfamic acid dropwise and stop when the methyl orange changes from yellow to a permanent pale orange colour.",

    buttonText: "Begin Lesson",
  },
]