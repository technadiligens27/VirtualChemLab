export const chlorinationGuidelineData = [
 
  {
    id: 2,

    title: "Measure 2-Methylpropan-2-ol",

    description:
      "Measure 10 cm³ of 2-methylpropan-2-ol using the 25 cm³ measuring cylinder before transferring it into the large conical flask.",

    implementationSteps: [
      "Pick up the 25 cm³ measuring cylinder.",
      "Pick up the 2-methylpropan-2-ol bottle.",
      "Pour it into the measuring cylinder.",
      "Stop when the volume reaches 10 cm³.",
      "Return the reagent bottle to the table.",
      "Pour the complete 10 cm³ into the large conical flask.",
      "Return the measuring cylinder to the table.",
    ],

    image: "./measureMethylpropanol.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 3,

    title: "Measure Concentrated Hydrochloric Acid",

    description:
      "Measure 35 cm³ of concentrated hydrochloric acid before adding it to the 2-methylpropan-2-ol.",

    implementationSteps: [
      "Pick up the 100 cm³ measuring cylinder.",
      "Pick up the concentrated hydrochloric acid bottle.",
      "Pour the acid into the measuring cylinder.",
      "Stop when the volume reaches 35 cm³.",
      "Return the acid bottle to the table.",
      "Pour the complete 35 cm³ into the same conical flask.",
      "Return the measuring cylinder to the table.",
    ],

    image: "./measureHydrochloricAcid.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 4,

    title: "Gently Swirl the Flask",

    description:
      "Gently swirl the conical flask to mix the 2-methylpropan-2-ol and concentrated hydrochloric acid.",

    implementationSteps: [
      "Pick up the large conical flask.",
      "Gently swirl the reaction mixture.",
      "Avoid shaking the flask aggressively.",
      "Return the flask to the table.",
    ],

    image: "./swirlReactionMixture.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 5,

    title: "Fit the Bung",

    description:
      "Seal the conical flask with a bung and gently swirl the reaction mixture again.",

    implementationSteps: [
      "Pick up the bung.",
      "Fit the bung into the conical flask.",
      "Pick up the sealed conical flask.",
      "Gently swirl its contents.",
    ],

    image: "./fitConicalFlaskBung.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 6,

    title: "Release the Pressure",

    description:
      "Remove the bung after swirling to release any pressure that has accumulated inside the conical flask.",

    implementationSteps: [
      "Stop swirling the conical flask.",
      "Point the flask away from people.",
      "Carefully remove the bung.",
      "Allow the accumulated pressure to escape.",
    ],

    image: "./releaseFlaskPressure.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 7,

    title: "Continue Mixing the Reaction",

    description:
      "Continue swirling the mixture for approximately 20 minutes while periodically removing the bung to release pressure.",

    implementationSteps: [
      "Replace the bung.",
      "Gently swirl the conical flask.",
      "Remove the bung periodically.",
      "Allow the accumulated pressure to escape.",
      "Repeat the swirling and pressure-release process.",
      "Continue until the reaction timer finishes.",
      "Allow the mixture to form two liquid layers.",
    ],

    image: "./continueReactionMixing.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 8,

    title: "Add Anhydrous Calcium Chloride",

    description:
      "Add approximately 6 g of powdered anhydrous calcium chloride to help remove unreacted alcohol from the organic product.",

    implementationSteps: [
      "Remove the bung from the conical flask.",
      "Pick up the calcium chloride container.",
      "Pick up the spatula.",
      "Add approximately 6 g of calcium chloride.",
      "Return the spatula and container to the table.",
      "Replace the bung.",
      "Swirl until the calcium chloride dissolves.",
    ],

    image: "./addCalciumChloride.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 9,

    title: "Transfer the Reaction Mixture",

    description:
      "Transfer the reaction mixture into the separating funnel using a filter funnel.",

    implementationSteps: [
      "Secure the separating funnel.",
      "Remove the separating-funnel bung.",
      "Place the filter funnel in its opening.",
      "Remove the conical-flask bung.",
      "Pour the reaction mixture into the separating funnel.",
      "Remove the filter funnel.",
      "Replace the separating-funnel bung.",
    ],

    image: "./transferToSeparatingFunnel.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 10,

    title: "Allow the Layers to Settle",

    description:
      "Allow the mixture to settle until the organic and aqueous layers have separated completely.",

    implementationSteps: [
      "Place the separating funnel securely on the stand.",
      "Wait for the disturbed mixture to settle.",
      "Observe the boundary forming between the two layers.",
      "Identify the organic product as the upper layer.",
      "Identify the aqueous liquid as the lower layer.",
    ],

    image: "./settleLiquidLayers.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 11,

    title: "Remove the Lower Aqueous Layer",

    description:
      "Drain the lower aqueous layer into the waste beaker while keeping the upper organic product inside the separating funnel.",

    implementationSteps: [
      "Place the waste beaker beneath the separating funnel.",
      "Remove the separating-funnel bung.",
      "Open the tap.",
      "Drain the lower aqueous layer into the waste beaker.",
      "Close the tap when the layer boundary reaches it.",
      "Keep the upper organic layer in the funnel.",
    ],

    image: "./removeLowerAqueousLayer.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 12,

    title: "Add Sodium Hydrogencarbonate Solution",

    description:
      "Wash the organic product with approximately 20 cm³ of sodium hydrogencarbonate solution.",

    implementationSteps: [
      "Make sure the separating-funnel tap is closed.",
      "Add approximately 20 cm³ of sodium hydrogencarbonate solution.",
      "Replace the separating-funnel bung.",
      "Gently swirl the separating funnel.",
      "Observe carbon dioxide bubbles forming.",
    ],

    image: "./addSodiumHydrogencarbonate.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 13,

    title: "Release Carbon Dioxide Pressure",

    description:
      "Frequently release the carbon dioxide pressure produced during the sodium hydrogencarbonate wash.",

    implementationSteps: [
      "Stop swirling the separating funnel.",
      "Hold the funnel securely.",
      "Point it away from people.",
      "Carefully remove the bung.",
      "Allow the carbon dioxide pressure to escape.",
      "Replace the bung and continue swirling.",
      "Repeat until the bubbling becomes less intense.",
    ],

    image: "./releaseCarbonDioxidePressure.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 14,

    title: "Remove the Washed Aqueous Layer",

    description:
      "Allow the layers to settle and discard the lower aqueous layer produced by the first wash.",

    implementationSteps: [
      "Place the separating funnel on the stand.",
      "Wait for the two layers to separate.",
      "Place the waste beaker beneath the funnel.",
      "Remove the bung.",
      "Open the tap.",
      "Drain the lower aqueous layer into the waste beaker.",
      "Close the tap when the boundary reaches it.",
    ],

    image: "./removeWashedAqueousLayer.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 15,

    title: "Repeat the Wash",

    description:
      "Wash the organic product with a second portion of sodium hydrogencarbonate solution.",

    implementationSteps: [
      "Close the separating-funnel tap.",
      "Add another portion of sodium hydrogencarbonate solution.",
      "Replace the bung.",
      "Gently shake the separating funnel.",
      "Remove the bung frequently to release pressure.",
      "Continue until the bubbling becomes less intense.",
    ],

    image: "./repeatOrganicProductWash.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 16,

    title: "Discard the Second Aqueous Layer",

    description:
      "Drain and discard the lower aqueous layer after completing the second wash.",

    implementationSteps: [
      "Allow the two layers to separate.",
      "Place the waste beaker beneath the funnel.",
      "Remove the bung.",
      "Open the tap.",
      "Drain and discard the lower aqueous layer.",
      "Continue until no aqueous liquid remains in the tap.",
      "Close the tap before the organic layer escapes.",
    ],

    image: "./discardSecondAqueousLayer.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 17,

    title: "Transfer the Organic Product",

    description:
      "Transfer the remaining upper organic layer from the separating funnel into a clean, small conical flask.",

    implementationSteps: [
      "Place the small conical flask beneath the separating funnel.",
      "Open the tap.",
      "Run the organic product into the conical flask.",
      "Close the tap when the transfer is complete.",
    ],

    image: "./transferOrganicProduct.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 18,

    title: "Dry the Organic Product",

    description:
      "Add anhydrous sodium sulfate to remove traces of water from the organic product.",

    implementationSteps: [
      "Pick up the sodium sulfate container.",
      "Pick up the spatula.",
      "Add one full spatula of anhydrous sodium sulfate.",
      "Return the spatula and container to the table.",
      "Insert the bung into the conical flask.",
      "Gently swirl the contents.",
      "Leave the mixture to stand.",
      "Swirl occasionally until the liquid becomes clear.",
    ],

    image: "./dryOrganicProduct.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 19,

    title: "Decant the Dried Liquid",

    description:
      "Transfer only the clear organic liquid into the distillation flask while leaving the solid drying agent behind.",

    implementationSteps: [
      "Remove the bung from the small conical flask.",
      "Pick up the 50 cm³ distillation flask.",
      "Carefully pour the clear organic liquid into it.",
      "Keep the sodium sulfate inside the conical flask.",
      "Return the conical flask to the table.",
    ],

    image: "./decantDriedLiquid.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 20,

    title: "Assemble the Distillation Apparatus",

    description:
      "Set up the distillation apparatus so that the dried product can be purified by its boiling temperature.",

    implementationSteps: [
      "Connect the flask to the distillation apparatus.",
      "Position the thermometer correctly.",
      "Connect the condenser.",
      "Connect the condenser water supply.",
      "Place the receiving container beneath the condenser outlet.",
      "Check that every connection is secure.",
    ],

    image: "./assembleDistillationApparatus.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 21,

    title: "Heat the Mixture",

    description:
      "Heat the distillation flask while monitoring the temperature and observing the product condense.",

    implementationSteps: [
      "Turn on the condenser water supply.",
      "Begin heating the distillation flask.",
      "Monitor the thermometer.",
      "Observe vapour entering the condenser.",
      "Watch the condensed liquid drip into the receiver.",
    ],

    image: "./heatDistillationMixture.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 22,

    title: "Collect the Correct Fraction",

    description:
      "Collect only the fraction that distils between 50°C and 52°C to obtain relatively pure 2-chloro-2-methylpropane.",

    implementationSteps: [
      "Watch the thermometer carefully.",
      "Begin collecting when the temperature reaches 50°C.",
      "Collect the clear liquid while the temperature remains between 50°C and 52°C.",
      "Stop collecting when the temperature moves outside this range.",
      "Turn off the heat.",
    ],

    image: "./collectCorrectFraction.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 23,

    title: "Store the Purified Product",

    description:
      "Transfer the purified 2-chloro-2-methylpropane into a sealed and correctly labelled sample tube.",

    implementationSteps: [
      "Pick up the sample tube.",
      "Transfer the purified product into the tube.",
      "Seal the sample tube.",
      "Label it 2-chloro-2-methylpropane.",
      "Place the sample tube on the table.",
    ],

    image: "./storePurifiedProduct.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 24,

    title: "Prepare the Product Sample",

    description:
      "Place a small sample of the distilled product into a clean test tube for chemical analysis.",

    implementationSteps: [
      "Pick up a clean test tube.",
      "Pick up the purified product.",
      "Add a few drops of the product to the test tube.",
      "Return the product container to the table.",
    ],

    image: "./prepareProductSample.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 25,

    title: "Add Ethanol and Sodium Hydroxide",

    description:
      "Add ethanol and aqueous sodium hydroxide to prepare the product for hydrolysis.",

    implementationSteps: [
      "Measure 5 cm³ of ethanol.",
      "Add the ethanol to the test tube.",
      "Measure 1 cm³ of aqueous sodium hydroxide.",
      "Add the sodium hydroxide to the same test tube.",
      "Gently mix the contents.",
    ],

    image: "./addEthanolAndSodiumHydroxide.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 26,

    title: "Warm the Product Sample",

    description:
      "Warm the reaction mixture in a water bath so that the chloroalkane hydrolyses and produces chloride ions.",

    implementationSteps: [
      "Prepare a warm water bath.",
      "Place the test tube in the water bath.",
      "Allow the mixture to warm.",
      "Wait for the hydrolysis timer to finish.",
      "Remove the test tube from the water bath.",
    ],

    image: "./warmProductSample.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 27,

    title: "Acidify the Mixture",

    description:
      "Add excess nitric acid to neutralise the sodium hydroxide before testing for chloride ions.",

    implementationSteps: [
      "Pick up the nitric acid bottle.",
      "Add excess nitric acid to the test tube.",
      "Return the nitric acid bottle to the table.",
      "Gently mix the solution.",
    ],

    image: "./acidifyProductMixture.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 28,

    title: "Test for Chloride Ions",

    description:
      "Add silver nitrate solution to confirm that chloride ions were produced during hydrolysis of the prepared chloroalkane.",

    implementationSteps: [
      "Pick up the silver nitrate dropper.",
      "Add a few drops of silver nitrate solution.",
      "Return the dropper to the table.",
      "Observe the white silver chloride precipitate.",
      "Confirm the presence of chlorine in the prepared product.",
    ],

    image: "./testForChlorideIons.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },
]