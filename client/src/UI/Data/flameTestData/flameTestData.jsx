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

export const flameTestGuidelineData = [
 {
  id: 2,
  title: "Set Up the Bunsen Burner",

  description:
    "Place the heatproof mat in the centre of the laboratory bench and position the Bunsen burner securely on top.",

  implementationSteps: [
    "Pick up the heatproof mat.",
    "Place it in the centre of the laboratory bench.",
    "Pick up the Bunsen burner.",
    "Place it in the centre of the heatproof mat.",
    "Make sure the burner is upright and the air hole is closed.",
  ],

  image: "./placeBunsenBurner.png",

  onButtonContinue: () => {
    setHessGuidelineNumber(false)
  },
},
  {
    id: 4,
    title: "Connect the Gas Tube",

    description:
      "Connect the rubber gas tube securely between the Bunsen burner and the laboratory gas supply.",

    implementationSteps: [
      "Pick up the rubber gas tube.",
      "Connect one end to the Bunsen burner.",
      "Connect the other end to the gas tap.",
      "Make sure both connections are secure.",
      "Keep the gas supply turned off.",
    ],

    image: "./connectGasTube.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 5,
    title: "Prepare Dilute Hydrochloric Acid",

    description:
      "Add water to hydrochloric acid and gently swirl the beaker to prepare a dilute solution for cleaning the nichrome wire loop.",

    implementationSteps: [
      "Pick up the small beaker.",
      "Place it in the centre of the laboratory bench.",
      "Add a small amount of water using the water bottle.",
      "Carefully add hydrochloric acid to the water.",
      "Return the acid bottle to the table.",
      "Gently swirl the beaker to mix the solution.",
      "Return the beaker to the table.",
    ],

    image: "./prepareHydrochloricAcid.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

    {
    id: 8,
    title: "Clean the Nichrome Wire Loop",

    description:
      "Dip the nichrome wire loop into dilute hydrochloric acid to remove impurities before testing the metal salts.",

    implementationSteps: [
      "Pick up the nichrome wire loop.",
      "Move the wire loop towards the acid beaker.",
      "Dip the loop into dilute hydrochloric acid.",
      "Remove the wire loop from the acid.",
    ],

    image: "./cleanNichromeWire.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 6,
    title: "Light the Bunsen Burner",

    description:
      "Light the Bunsen burner with its air hole closed to produce a yellow safety flame.",

    implementationSteps: [
      "Check that the air hole is closed.",
      "Pick up the spark lighter.",
      "Position the lighter above the burner.",
      "Ignite the burner using the approved lighting procedure.",
      "Observe the yellow safety flame.",
      "Return the lighter to the table.",
    ],

    image: "./lightBunsenBurner.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 7,
    title: "Adjust the Bunsen Flame",

    description:
      "Open the Bunsen burner air hole to produce a non-luminous blue flame suitable for the flame test.",

    implementationSteps: [
      "Locate the Bunsen burner air hole.",
      "Rotate the collar to open the air hole.",
      "Observe the yellow flame changing to blue.",
      "Adjust until a steady blue flame is produced.",
    ],

    image: "./adjustBunsenFlame.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },



  {
    id: 9,
    title: "Heat the Wire Loop",

    description:
      "Heat the nichrome wire loop in the blue Bunsen flame until no unwanted flame colour is visible.",

    implementationSteps: [
      "Move the nichrome wire loop towards the burner.",
      "Place the loop in the blue flame.",
      "Heat until no unwanted flame colour is observed.",
      "Remove the wire loop from the flame.",
      "Allow the wire loop to cool.",
    ],

    image: "./heatNichromeWire.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 10,
    title: "Select a Metal Salt",

    description:
      "Choose a metal salt sample to investigate its characteristic flame colour.",

    implementationSteps: [
      "Open the metal salt selection panel.",
      "Choose the first metal salt.",
      "Observe the selected salt container.",
      "Prepare to collect a small sample using the wire loop.",
    ],

    image: "./selectMetalSalt.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 11,
    title: "Collect the Metal Salt",

    description:
      "Dip the cooled nichrome wire loop into hydrochloric acid and touch it to a small amount of the selected metal salt.",

    implementationSteps: [
      "Pick up the cooled nichrome wire loop.",
      "Dip the loop into dilute hydrochloric acid.",
      "Move the wire loop towards the metal salt container.",
      "Touch the loop to a small amount of the solid salt.",
      "Observe the salt particles sticking to the wire loop.",
    ],

    image: "./collectMetalSalt.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 12,
    title: "Perform the Flame Test",

    description:
      "Place the sample-coated wire loop into the blue Bunsen flame and observe the characteristic flame colour.",

    implementationSteps: [
      "Move the wire loop towards the Bunsen burner.",
      "Place the sample-coated loop into the blue flame.",
      "Observe the flame changing colour.",
      "Identify the colour produced by the metal salt.",
      "Remove the wire loop from the flame.",
    ],

    image: "./performFlameTest.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 13,
    title: "Record the Flame Colour",

    description:
      "Record the observed flame colour and use it to identify the metal ion present in the sample.",

    implementationSteps: [
      "Observe the flame colour carefully.",
      "Open the flame test results panel.",
      "Select the observed flame colour.",
      "Identify the metal ion responsible.",
      "Record the result.",
    ],

    image: "./recordFlameColour.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 14,
    title: "Repeat with Another Metal Salt",

    description:
      "Clean the nichrome wire loop and repeat the flame test using another metal salt to compare the different flame colours.",

    implementationSteps: [
      "Dip the wire loop into hydrochloric acid.",
      "Heat the loop until no unwanted flame colour remains.",
      "Allow the wire loop to cool.",
      "Select another metal salt.",
      "Collect a small amount of the selected salt.",
      "Place the wire loop into the blue flame.",
      "Observe and record the new flame colour.",
      "Repeat for the remaining metal salts.",
    ],

    image: "./repeatFlameTest.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 15,
    title: "Identify an Unknown Metal Ion",

    description:
      "Perform a flame test on an unknown metal salt and identify the metal ion from its characteristic flame colour.",

    implementationSteps: [
      "Clean the nichrome wire loop thoroughly.",
      "Heat the loop and allow it to cool.",
      "Select the unknown metal salt.",
      "Collect a small amount of the sample.",
      "Place the sample-coated loop into the blue flame.",
      "Observe the flame colour.",
      "Choose the metal ion that matches the observation.",
    ],

    image: "./identifyUnknownMetal.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 16,
    title: "Turn Off the Bunsen Burner",

    description:
      "Turn off the gas supply after completing the flame tests and allow the equipment to cool.",

    implementationSteps: [
      "Remove the wire loop from the flame.",
      "Place the wire loop in a safe position.",
      "Turn off the laboratory gas tap.",
      "Observe the Bunsen flame disappearing.",
      "Allow the equipment to cool.",
    ],

    image: "./turnOffBunsenBurner.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 17,
    title: "Review the Flame Test Results",

    description:
      "Compare the recorded flame colours and identify the metal ions present in each sample.",

    implementationSteps: [
      "Open the experiment results panel.",
      "Review the recorded flame colours.",
      "Compare the observations with the expected colours.",
      "Check the identification of the unknown metal ion.",
      "Complete the experiment.",
    ],

    image: "./flameTestResults.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },
]