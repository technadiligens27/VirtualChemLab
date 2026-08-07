export const safetyInstructionData = {
  topTitle: "Safety First",

  title: "Safety Instructions",

  description: [
    "Please read and follow all safety guidelines before",
    "starting the experiment.",
  ],

  illustration: {
    gogglesImage:
      "./images/safety-goggles.png",

    flaskImage:
      "./images/conical-flask.png",
  },

  instructions: [
    {
      id: "eye-protection",
      title: "Wear eye protection",
      description:
        "Wear eye protection throughout the practical.",
      icon: "⌁",
      theme: "purple",
    },
    {
      id: "skin-contact",
      title: "Avoid skin contact",
      description:
        "Avoid skin contact with the reactants.",
      icon: "✋",
      theme: "yellow",
    },
    {
      id: "naked-flames",
      title: "No naked flames",
      description:
        "Ethanol and halogenoalkanes are highly flammable. Do not use a naked flame.",
      icon: "♨",
      theme: "red",
    },
    {
      id: "ventilation",
      title: "Work in a well-ventilated area",
      description:
        "Work in a well-ventilated laboratory to avoid inhaling fumes.",
      icon: "☢",
      theme: "green",
    },
  ],

  importantTitle:
    "Your safety is important.",

  importantText:
    "Follow these instructions carefully at all times.",

  backButtonText: "Back",

  continueButtonText: "Continue",
}