export const flameTestData = [
  {
    id: 1,

    topTitle: "Flame Test",

    label: "Identification of Metal Ions",

    title: (
      <>
        Flame Test
        <br />
        for Metal Ions
      </>
    ),

    reactionType: "Qualitative Analysis",

    reactionIcon: "🔥",

    equation: [
      {
        id: "reactant-1",
        content: "Metal Ion",
      },
      {
        id: "plus-1",
        content: "+",
      },
      {
        id: "reactant-2",
        content: "Heat",
      },
      {
        id: "arrow",
        content: "→",
        className: "reaction-one-arrow",
      },
      {
        id: "product-1",
        content: "Characteristic Flame Colour",
      },
    ],

    noticeTitle: "What You Should Notice",

    notices: [
      "Sodium ions produce a bright yellow flame.",
      "Potassium ions produce a lilac flame.",
      "Lithium ions produce a crimson red flame.",
      "Calcium ions produce a brick-red flame.",
      "Copper(II) salts produce a blue-green flame.",
    ],

    informationTitle: "What Happens",

information: [
  <>
    We will use a <strong>Bunsen burner</strong> and a{" "}
    <strong>nichrome wire loop</strong> to identify{" "}
    <strong>metal ions</strong> by their flame colours.
  </>,

  <>
    We will clean the <strong>wire loop</strong> with{" "}
    <strong>hydrochloric acid</strong>, collect a{" "}
    <strong>metal salt</strong>, and place it in the flame.
  </>,

  <>
    Different <strong>metal ions</strong> produce{" "}
    <strong>characteristic flame colours</strong>, which help us
    identify the metal present.
  </>,
],

    importantTitle: "Important:",

    importantText:
"Wear goggles, clean the wire loop between tests, and handle acid and hot equipment carefully.",
    buttonText: "Start Experiment",
  },
]