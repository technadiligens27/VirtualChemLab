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


export const guidelineData = [
  {
    id: 1,

    title: "Weigh the Empty Test Tube",

    description:
      "Begin by weighing an empty test tube. This mass will later be used to determine the exact mass of sulfamic acid added.",

    implementationSteps: [
      "Pick up the test tube with the left hand.",
      "Place the digital balance in the centre.",
      "Place the empty test tube on the balance.",
      "Record the mass of the empty test tube.",
      "Remove the test tube from the balance.",
    ],

    image: "./weighEmptyTestTube.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 2,

    title: "Add and Weigh the Sulfamic Acid",

    description:
      "Add sulfamic acid to the test tube and weigh it again. The difference between the two masses gives the mass of sulfamic acid used.",

    implementationSteps: [
      "Pick up the spatula with the right hand.",
      "Add sulfamic acid using the spatula.",
      "Transfer the sulfamic acid into the test tube.",
      "Place the test tube on the balance again.",
      "Record the new mass.",
      "Return the spatula and test tube to the table.",
    ],

    image: "./weighTestube.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 3,

    title: "Dissolve the Sulfamic Acid",

    description:
      "Dissolve the weighed sulfamic acid in approximately 100 cm³ of distilled water before transferring the solution to the volumetric flask.",

    implementationSteps: [
      "Pick up the beaker with the left hand.",
      "Select Add Liquid.",
      "Add approximately 100 cm³ of distilled water.",
      "Enter Pour Mode with the test tube.",
      "Pour the sulfamic acid into the water.",
      "Return the empty test tube to the table.",
    ],

    image: "./beaker+Spoon.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 4,

    title: "Mix the Sulfamic Acid Solution",

    description:
      "Stir the sulfamic acid and water so that the solid dissolves completely before the solution is transferred.",

    implementationSteps: [
      "Pick up the spatula with the right hand.",
      "Select Stir Mode.",
      "Stir the solution until the sulfamic acid is dissolved.",
      "Exit Stir Mode.",
      "Return the spatula to the table.",
    ],

    image: "./stirSulfamicAcid.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 5,

    title: "Transfer the Solution to the Volumetric Flask",

    description:
      "Transfer the sulfamic acid solution from the beaker into the volumetric flask so that a standard solution can be prepared accurately.",

    implementationSteps: [
      "Pick up the volumetric flask with the right hand.",
      "Enter Pour Mode.",
      "Pour the sulfamic acid solution from the beaker into the volumetric flask.",
      "Exit Pour Mode.",
    ],

    image: "./transferSulfamicToVolumetricFlask.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 6,

    title: "Rinse the Beaker and Transfer the Washings",

    description:
      "Rinse the beaker with distilled water and transfer the washings into the volumetric flask. This ensures that any remaining sulfamic acid is transferred.",

    implementationSteps: [
      "Add approximately 30 cm³ of distilled water to the beaker.",
      "Swirl the beaker to rinse its inside surface.",
      "Transfer the washings into the volumetric flask.",
      "Repeat the rinse with another approximately 30 cm³ of distilled water.",
      "Swirl the beaker again.",
      "Transfer the second set of washings into the volumetric flask.",
    ],

    image: "./rinseSulfamicBeaker.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 7,

    title: "Make the Standard Solution Up to the Mark",

    description:
      "Add distilled water until the bottom of the meniscus reaches the 250 cm³ calibration mark on the volumetric flask.",

    implementationSteps: [
      "Select the volumetric flask.",
      "Choose Fill to Mark.",
      "Add distilled water until the solution reaches the 250 cm³ mark.",
      "Make sure the final liquid level is at the calibration line.",
    ],

    image: "./fillSulfamicToMark.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 8,

    title: "Mix the Standard Sulfamic Acid Solution",

    description:
      "Seal the volumetric flask and invert it several times so that the sulfamic acid solution becomes uniform throughout.",

    implementationSteps: [
      "Place the bung into the volumetric flask.",
      "Invert the volumetric flask.",
      "Return the flask upright.",
      "Repeat the inversion several times.",
      "Make sure the solution is thoroughly mixed.",
    ],

    image: "./mixSulfamicVolumetricFlask.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 9,

    title: "Prepare the Burette with Sulfamic Acid",

    description:
      "Transfer the prepared sulfamic acid solution into the burette and set up the burette securely for the titration.",

    implementationSteps: [
      "Return the beaker and volumetric flask to the table.",
      "Pick up the burette with the left hand.",
      "Pick up the funnel with the right hand.",
      "Pick up the volumetric flask containing sulfamic acid solution.",
      "Pour the sulfamic acid solution into the burette.",
      "Return the volumetric flask to the table.",
      "Clamp the burette securely.",
      "Return the funnel to the table.",
    ],

    image: "./prepareSulfamicBurette.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 10,

    title: "Measure the Sodium Hydroxide",

    description:
      "Use the volumetric pipette and pipette filler to measure an accurate portion of sodium hydroxide solution for the titration.",

    implementationSteps: [
      "Pick up the sodium hydroxide reagent bottle with the right hand.",
      "Pick up the volumetric pipette with the left hand.",
      "Squeeze the pipette filler to remove air.",
      "Release the filler to draw sodium hydroxide into the pipette.",
      "Fill the pipette accurately.",
      "Return the sodium hydroxide bottle to the table.",
    ],

    image: "./measureNaOHWithPipette.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 11,

    title: "Transfer Sodium Hydroxide to the Conical Flask",

    description:
      "Transfer the measured sodium hydroxide solution from the volumetric pipette into a clean conical flask.",

    implementationSteps: [
      "Pick up the conical flask with the right hand.",
      "Position the filled volumetric pipette above the conical flask.",
      "Release the sodium hydroxide into the conical flask.",
      "Exit Pipette Mode.",
      "Return the volumetric pipette to the table.",
    ],

    image: "./transferNaOHToConicalFlask.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 12,

    title: "Add Methyl Orange Indicator",

    description:
      "Add methyl orange indicator to the sodium hydroxide solution. The indicator will show when the titration endpoint has been reached.",

    implementationSteps: [
      "Pick up the methyl orange bottle with the left hand.",
      "Position the dropper above the conical flask.",
      "Add the methyl orange indicator.",
      "Return the methyl orange bottle to the table.",
    ],

    image: "./addMethylOrange.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 13,

    title: "Perform the Rough Titration",

    description:
      "Titrate the sodium hydroxide with sulfamic acid to find an approximate volume required to reach the methyl orange endpoint.",

    implementationSteps: [
      "Place the burette clamp in the centre.",
      "Position the conical flask beneath the burette.",
      "Begin adding sulfamic acid from the burette.",
      "Observe the methyl orange colour during the titration.",
      "Continue until the endpoint is reached.",
      "Remove the conical flask from beneath the burette.",
      "Remove the clamp from the centre.",
    ],

    image: "./sulfamicRoughTitration.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 14,

    title: "Prepare a Fresh Sodium Hydroxide Sample",

    description:
      "After the rough titration, clean the conical flask and prepare another accurately measured sodium hydroxide sample for the next titration.",

    implementationSteps: [
      "Clean the conical flask.",
      "Return the conical flask to the table.",
      "Pick up the sodium hydroxide reagent bottle.",
      "Pick up the volumetric pipette.",
      "Squeeze the pipette filler.",
      "Draw a fresh portion of sodium hydroxide into the pipette.",
    ],

    image: "./prepareFreshNaOH.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 15,

    title: "Transfer the Fresh Sodium Hydroxide Sample",

    description:
      "Transfer the fresh measured sodium hydroxide solution into the cleaned conical flask before performing the next titration.",

    implementationSteps: [
      "Pick up the conical flask.",
      "Enter Pipette Mode.",
      "Transfer the sodium hydroxide into the conical flask.",
      "Exit Pipette Mode.",
      "Return the volumetric pipette to the table.",
    ],

    image: "./freshNaOHConicalFlask.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 16,

    title: "Perform the Accurate Titration",

    description:
      "Carry out the next titration carefully using the rough titre as a guide. Add the sulfamic acid more slowly as the endpoint approaches.",

    implementationSteps: [
      "Position the conical flask beneath the burette.",
      "Begin adding sulfamic acid.",
      "Add the solution carefully as the endpoint approaches.",
      "Observe the colour change.",
      "Stop when the endpoint is reached.",
      "Record the titre.",
    ],

    image: "./sulfamicAccurateTitration.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },
]