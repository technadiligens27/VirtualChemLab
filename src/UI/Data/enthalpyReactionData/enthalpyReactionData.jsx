export const enthalpyReactionData = [
  {
    id: 1,
    topTitle: "Reaction 1",
    label: "First Experimental Reaction",

    title: (
      <>
        Potassium Carbonate with
        <br />
        Hydrochloric Acid
      </>
    ),

    reactionType: "Exothermic Reaction",
    reactionIcon: "♨",

    equation: [
      {
        id: "reactant-1",
        content: (
          <>
            K<sub>2</sub>CO<sub>3</sub>(s)
          </>
        ),
      },
      {
        id: "plus-1",
        content: "+",
      },
      {
        id: "reactant-2",
        content: "2HCl(aq)",
      },
      {
        id: "arrow",
        content: "→",
        className: "reaction-one-arrow",
      },
      {
        id: "product-1",
        content: "2KCl(aq)",
      },
      {
        id: "plus-2",
        content: "+",
      },
      {
        id: "product-2",
        content: (
          <>
            CO<sub>2</sub>(g)
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
            H<sub>2</sub>O(l)
          </>
        ),
      },
    ],

    noticeTitle: "What You Should Notice",

    notices: [
      "The temperature of the reaction mixture rises.",
      "Carbon dioxide gas is produced.",
      "Heat is released to the surroundings.",
    ],

    informationTitle: "What Happens",

    information: [
      "Potassium carbonate reacts with hydrochloric acid.",
      "The reaction releases heat, causing the temperature inside the polystyrene cup to rise.",
    ],

    importantTitle: "Important:",

    importantText:
      "Reaction 1 must produce a positive temperature change.",

    buttonText: "Next",
  },

  {
    id: 2,
    topTitle: "Reaction 2",
    label: "Second Experimental Reaction",

    title: (
      <>
        Potassium Hydrogencarbonate with
        <br />
        Hydrochloric Acid
      </>
    ),

    reactionType: "Endothermic Reaction",
    reactionIcon: "❄",

    equation: [
      {
        id: "reactant-1",
        content: (
          <>
            KHCO<sub>3</sub>(s)
          </>
        ),
      },
      {
        id: "plus-1",
        content: "+",
      },
      {
        id: "reactant-2",
        content: "HCl(aq)",
      },
      {
        id: "arrow",
        content: "→",
        className: "reaction-one-arrow",
      },
      {
        id: "product-1",
        content: "KCl(aq)",
      },
      {
        id: "plus-2",
        content: "+",
      },
      {
        id: "product-2",
        content: (
          <>
            CO<sub>2</sub>(g)
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
            H<sub>2</sub>O(l)
          </>
        ),
      },
    ],

    noticeTitle: "What You Should Notice",

    notices: [
      "The temperature of the reaction mixture falls.",
      "Carbon dioxide gas is produced.",
      "Heat is absorbed from the surroundings.",
    ],

    informationTitle: "What Happens",

    information: [
      "Potassium hydrogencarbonate reacts with hydrochloric acid.",
      "The reaction absorbs heat, causing the temperature inside the polystyrene cup to fall.",
    ],

    importantTitle: "Important:",

    importantText:
      "Reaction 2 must produce a negative temperature change.",

    buttonText: "Next",
  },
]