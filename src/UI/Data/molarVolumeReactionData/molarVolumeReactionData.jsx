export const molarVolumeReactionData = [
{
  id: 1,

  topTitle: "Molar Volume of a Gas",

  label: "Calcium Carbonate with Ethanoic Acid",

  title: (
    <>
      Calcium Carbonate with
      <br />
      Ethanoic Acid
    </>
  ),

  reactionType: "Gas-Producing Reaction",

  reactionIcon: "🫧",

  equation: [
    {
      id: "reactant-1",
      content: (
        <>
          CaCO<sub>3</sub>(s)
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
          2CH<sub>3</sub>COOH(aq)
        </>
      ),
    },
    {
      id: "arrow",
      content: "→",
      className: "reaction-one-arrow",
    },
    {
      id: "product-1",
      content: (
        <>
          Ca(CH<sub>3</sub>COO)<sub>2</sub>(aq)
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
    {
      id: "plus-3",
      content: "+",
    },
    {
      id: "product-3",
      content: (
        <>
          CO<sub>2</sub>(g)
        </>
      ),
    },
  ],

  noticeTitle: "What You Should Notice",

  notices: [
    "Carbon dioxide bubbles are produced.",
    "The calcium carbonate gradually reacts.",
    "The gas collects in the inverted measuring cylinder.",
    "The water level falls as the gas volume increases.",
  ],

  informationTitle: "What Happens",

  information: [
    "Calcium carbonate reacts with ethanoic acid to form calcium ethanoate, water and carbon dioxide.",
    "Carbon dioxide travels through the delivery tube and collects over water.",
    "The measured gas volume is used to determine its molar volume.",
  ],

  importantTitle: "Important:",

  importantText:
    "Replace the bung quickly to prevent carbon dioxide from escaping.",

  buttonText: "Start Experiment",
},
]

export const molarVolumeGuidelineData = [
    {
    id: 1,

    title: "Measure the Ethanoic Acid",

    description:
      "Measure 30 cm³ of 1 mol dm⁻³ ethanoic acid using the 50 cm³ measuring cylinder before transferring it into the boiling tube.",

    implementationSteps: [
      "Pick up the 50 cm³ measuring cylinder.",
      "Add ethanoic acid to the measuring cylinder.",
      "Stop when the volume reaches 30 cm³.",
      "Position the measuring cylinder above the boiling tube.",
      "Pour the complete 30 cm³ of ethanoic acid into the boiling tube.",
      "Return the measuring cylinder to the table.",
    ],

    image: "./measureEthanoicAcid.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },
  {
    id: 2,

    title: "Set Up the Gas Collection Apparatus",

    description:
      "Set up the boiling tube, delivery tube, water bath and inverted measuring cylinder so that carbon dioxide can be collected and measured.",

    implementationSteps: [
      "Position the boiling tube beside the stand.",
      "Clamp the boiling tube upright.",
      "Place and fill the water bath.",
      "Fill the 100 cm³ measuring cylinder with water.",
      "Invert the cylinder into the water bath.",
      "Keep the cylinder opening underwater.",
      "Place the delivery tube under the cylinder.",
    ],

    image: "./molarVolumeSetup.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },



  {
    id: 3,

    title: "Prepare the Calcium Carbonate Sample",

    description:
      "Add approximately 0.05 g of powdered calcium carbonate to an empty test tube before measuring its mass.",

    implementationSteps: [
      "Pick up an empty test tube.",
      "Pick up the calcium carbonate container.",
      "Add approximately 0.05 g of powdered calcium carbonate into the test tube.",
      "Return the calcium carbonate container to the table.",
    ],

    image: "./TestubePottasiumAdd.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 4,

    title: "Weigh the Calcium Carbonate Sample",

    description:
      "Measure the combined mass of the test tube and calcium carbonate before transferring the solid into the reaction mixture.",

    implementationSteps: [
      "Place the digital balance in the centre.",
      "Place the test tube containing calcium carbonate on the balance.",
      "Wait for the balance reading to become stable.",
      "Record the mass of the test tube and calcium carbonate.",
      "Remove the test tube from the balance.",
    ],

    image: "./weighTestube.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 5,

    title: "Add Calcium Carbonate and Seal the Apparatus",

    description:
      "Transfer the calcium carbonate into the ethanoic acid and quickly replace the bung so that the carbon dioxide produced is collected.",

    implementationSteps: [
      "Remove the bung from the boiling tube.",
      "Pick up the test tube containing calcium carbonate.",
      "Position the test tube above the boiling tube.",
      "Pour the calcium carbonate into the ethanoic acid.",
      "Quickly replace the bung fitted with the delivery tube.",
      "Make sure the apparatus is sealed securely.",
    ],

    image: "./addCalciumCarbonate.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 6,

    title: "Collect the Carbon Dioxide",

    description:
      "Allow the reaction to proceed while the carbon dioxide produced travels through the delivery tube and collects in the inverted measuring cylinder.",

    implementationSteps: [
      "Observe the bubbling inside the boiling tube.",
      "Watch the carbon dioxide move through the delivery tube.",
      "Observe gas bubbles entering the inverted measuring cylinder.",
      "Watch the water level inside the measuring cylinder decrease.",
      "Allow the gas volume to continue increasing.",
      "Wait until the bubbling stops.",
    ],

    image: "./collectCarbonDioxide.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 7,

    title: "Record the Carbon Dioxide Volume",

    description:
      "Read and record the final volume of carbon dioxide collected after the reaction has completely stopped.",

    implementationSteps: [
      "Wait until no more gas bubbles are produced.",
      "Read the volume shown on the inverted measuring cylinder.",
      "Record the volume of carbon dioxide collected.",
      "Save the value to the results table.",
    ],

    image: "./recordCO2Volume.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 8,

    title: "Reweigh the Test Tube",

    description:
      "Reweigh the test tube after transferring the calcium carbonate so that the exact mass of calcium carbonate used can be calculated by difference.",

    implementationSteps: [
      "Pick up the test tube that previously contained the calcium carbonate.",
      "Place the test tube on the digital balance.",
      "Wait for the reading to become stable.",
      "Record the new mass of the test tube.",
      "Calculate the mass of calcium carbonate actually transferred.",
    ],

    image: "./reweighTestTube.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 9,

    title: "Repeat the Experiment",

    description:
      "Repeat the experiment using larger amounts of calcium carbonate while keeping the volume and concentration of ethanoic acid the same.",

    implementationSteps: [
      "Prepare a fresh 30 cm³ sample of ethanoic acid.",
      "Prepare the next calcium carbonate sample.",
      "Increase the calcium carbonate mass by approximately 0.05 g.",
      "Weigh the test tube and calcium carbonate.",
      "Transfer the calcium carbonate into the boiling tube.",
      "Quickly replace the bung.",
      "Allow the carbon dioxide to collect.",
      "Record the final gas volume.",
      "Reweigh the test tube.",
      "Calculate the actual mass of calcium carbonate used.",
      "Repeat until all required trials have been completed.",
    ],

    image: "./repeatMolarVolumeTrial.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 10,

    title: "Plot and Analyse the Results",

    description:
      "Use the measured calcium carbonate masses and carbon dioxide volumes to determine the molar volume of carbon dioxide.",

    implementationSteps: [
      "Plot mass of calcium carbonate on the x-axis.",
      "Plot volume of carbon dioxide on the y-axis.",
      "Draw a straight line of best fit through the origin.",
      "Use the graph to find the volume of carbon dioxide produced by 0.25 g of calcium carbonate.",
      "Calculate the number of moles in 0.25 g of calcium carbonate.",
      "Use the 1 : 1 mole ratio between calcium carbonate and carbon dioxide.",
      "Calculate the volume of one mole of carbon dioxide in dm³.",
    ],

    image: "./molarVolumeGraph.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },
]