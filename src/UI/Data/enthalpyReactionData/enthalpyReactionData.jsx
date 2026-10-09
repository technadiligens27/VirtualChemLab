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
      "The solid potassium carbonate gradually disappears as it reacts.",
    ],

    informationTitle: "What Happens",

    information: [
      <>
        In the first reaction, we react{" "}
        <strong>potassium carbonate</strong> with{" "}
        <strong>hydrochloric acid</strong> in the{" "}
        <strong>polystyrene cup</strong>.
      </>,

      <>
        Measure the <strong>starting temperature</strong>, add the{" "}
        <strong>potassium carbonate</strong> while{" "}
        <strong>stirring</strong>, then record the{" "}
        <strong>highest temperature reached</strong>.
      </>,

      <>
        We should see <strong>carbon dioxide bubbles</strong> and the{" "}
        <strong>temperature rise</strong>, showing the reaction is{" "}
        <strong>exothermic</strong>.
      </>,
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
      "This shows that the reaction is endothermic.",
    ],

    informationTitle: "What Happens",

information: [
  <>
    In the second reaction, we react{" "}
    <strong>potassium hydrogencarbonate</strong> with{" "}
    <strong>hydrochloric acid</strong> in a fresh{" "}
    <strong>polystyrene cup</strong>.
  </>,

  <>
    Measure the <strong>starting temperature</strong>, add the{" "}
    <strong>potassium hydrogencarbonate</strong> while{" "}
    <strong>stirring</strong>, then record the{" "}
    <strong>lowest temperature reached</strong>.
  </>,

  <>
    We should see <strong>carbon dioxide bubbles</strong> and the{" "}
    <strong>temperature fall</strong>, showing the reaction is{" "}
    <strong>endothermic</strong>.
  </>,
],
    importantTitle: "Important:",

    importantText:
      "Reaction 2 must produce a negative temperature change.",

    buttonText: "Next",
  },
]