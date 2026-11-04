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

export const guidelineData = [
  {
    id: 1,

    title: "Prepare the Water Bath",

    description:
      "Prepare a warm water bath at approximately 50°C. The water bath keeps the reaction mixtures at a consistent temperature so that the rates of hydrolysis of the different halogenoalkanes can be compared fairly.",

    implementationSteps: [
      "Pick up the normal beaker.",
      "Pick up the warm-water container or kettle with the other hand.",
      "Pour warm water into the beaker.",
      "Fill the beaker to approximately three-quarters full.",
      "Keep the prepared water bath on the table.",
    ],

    image: "./water-bath.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
      setLessonStep(3)
      setShowNormalBeakerArrow(true)
    },
  },

  {
    id: 2,

    title: "Label the Halogenoalkane Test Tubes",

    description:
      "Prepare three test tubes and label them according to the halogenoalkane that will be placed in each tube. Correct labelling is important so that the reaction times can later be matched to the correct halogenoalkane.",

    implementationSteps: [
      "Select the first test tube and label it Iodobutane.",
      "Select the second test tube and label it Bromobutane.",
      "Select the third test tube and label it Chlorobutane.",
      "Place the labelled test tubes back in the rack.",
      "Make sure each test tube can be clearly identified.",
    ],

    image: "./labelHalogenoalkaneTestTubes.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 3,

    title: "Add Ethanol to the Test Tubes",

    description:
      "Measure 5 cm³ of ethanol and transfer it into each labelled test tube. Ethanol allows the halogenoalkanes to mix sufficiently with the aqueous silver nitrate used later in the experiment.",

    implementationSteps: [
      "Pick up the measuring cylinder and Measure 5 cm³ of ethanol.",
      "Pour the ethanol into the Iodobutane test tube.",
      "Measure 5 cm³ of ethanol and add it to the Bromobutane test tube.",
      "Measure 5 cm³ of ethanol and add it to the Chlorobutane test tube.",
      "Return the measuring cylinder to the table.",
    ],

    image: "./addEthanolToTestTubes.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 4,

    title: "Add the Halogenoalkanes",

    description:
      "Use a dropping pipette to add the appropriate halogenoalkane to each labelled test tube. The same amount should be used for each sample so that the comparison between reaction rates is fair.",

    implementationSteps: [
      "Use the pipette to take up Iodobutane.",
      "Add four drops of Iodobutane to the Iodobutane test tube.",
      "Add four drops of Bromobutane to the Bromobutane test tube.",
      "Add four drops of Chlorobutane to the Chlorobutane test tube.",
      "Return the pipette and chemical bottles to the table.",
    ],

    image: "./addHalogenoalkanes.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 5,

    title: "Seal the Test Tubes",

    description:
      "Fit a bung securely into each test tube after the ethanol and halogenoalkane have been added. This keeps the mixtures contained while they are warmed in the water bath.",

    implementationSteps: [
      "Pick up the Iodobutane test tube.",
      "Fit a bung securely into the test tube.",
      "Repeat for the Bromobutane test tube.",
      "Repeat for the Chlorobutane test tube.",
      "Check that all three test tubes are properly sealed.",
    ],

    image: "./bungTestTubes.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 6,

    title: "Warm the Halogenoalkane Mixtures",

    description:
      "Place the three sealed test tubes into the warm water bath. Warming the mixtures to approximately the same temperature ensures that temperature does not affect the comparison between the different halogenoalkanes.",

    implementationSteps: [
      "Pick up the beaker containing the warm water bath.",
      "Place the Iodobutane test tube into the water bath.",
      "Place the Bromobutane test tube into the water bath.",
      "Place the Chlorobutane test tube into the water bath.",
      "Make sure all three test tubes are standing securely in the water bath.",
      "Allow the mixtures to warm.",
    ],

    image: "./testTubesInWaterBath.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 7,

    title: "Prepare the Silver Nitrate",

    description:
      "Prepare three separate portions of silver nitrate solution. Each halogenoalkane mixture must receive the same volume of silver nitrate so that their hydrolysis rates can be compared accurately.",

    implementationSteps: [
      "Select an empty test tube.",
      "Add 5 cm³ of silver nitrate solution.",
      "Prepare a second test tube containing 5 cm³ of silver nitrate.",
      "Prepare a third test tube containing 5 cm³ of silver nitrate.",
      "Keep the three silver nitrate portions ready for the reactions.",
    ],

    image: "./prepareSilverNitrate.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 8,

    title: "Start the Hydrolysis Reactions",

    description:
      "Add the silver nitrate solution to each warmed halogenoalkane mixture and begin timing immediately. Hydrolysis releases halide ions, which react with silver ions to form a cloudy silver halide precipitate.",

    implementationSteps: [
      "Remove a warmed halogenoalkane test tube from the water bath.",
      "Add 5 cm³ of silver nitrate solution.",
      "Start the timer immediately.",
      "Mix the contents of the test tube.",
      "Watch for the first appearance of cloudiness or precipitate.",
      "Record the time taken.",
      "Repeat the same procedure for the remaining halogenoalkanes.",
    ],

    image: "./startHydrolysisReaction.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: "9",

    title: "Measure the Iodobutane Reaction",

    description:
      "Observe the Iodobutane reaction and measure the time taken for cloudiness or precipitate to appear.",

    implementationSteps: [
      "Start timing the Iodobutane reaction.",
      "Observe the mixture carefully.",
      "Watch for cloudiness or precipitate.",
      "Record the reaction time.",
    ],

    image: "./compareHydrolysisResults.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 10,

    title: "Measure the Bromobutane Reaction",

    description:
      "Observe the Bromobutane reaction and measure the time taken for cloudiness or precipitate to appear.",

    implementationSteps: [
      "Start timing the Bromobutane reaction.",
      "Observe the mixture carefully.",
      "Watch for cloudiness or precipitate.",
      "Record the reaction time.",
    ],

    image: "./compareHydrolysisResults.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 11,

    title: "Measure the Chlorobutane Reaction",

    description:
      "Observe the Chlorobutane reaction and measure the time taken for cloudiness or precipitate to appear.",

    implementationSteps: [
      "Start timing the Chlorobutane reaction.",
      "Observe the mixture carefully.",
      "Watch for cloudiness or precipitate.",
      "Record the reaction time.",
    ],

    image: "./compareHydrolysisResults.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },
]