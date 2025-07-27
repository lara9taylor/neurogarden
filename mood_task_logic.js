// data/moodTaskLogic.js

// Each mood maps to a bank of fresh, non-repeating microtask suggestions

const moodTaskSuggestions = {
  frustrated: [
    "Delete one file or tab that’s bothering you.",
    "Change your background or theme color.",
    "Scribble a rant in your private journal for 60 seconds.",
    "Rearrange two icons to feel some control again.",
    "Take three deep breaths and name what’s annoying.",
    "Switch your device language or voice for fun."
  ],
  overwhelmed: [
    "Close one tab. Just one.",
    "Label one thing — folder, note, or thought.",
    "Text a friend 'wish me luck today 🙃'.",
    "Make a 3-item 'bare minimum' list.",
    "Turn off one notification.",
    "Pick a 5-minute timer task — and stop after 5."
  ],
  calm: [
    "Water a plant, real or digital.",
    "Tidy up one tiny area in your space.",
    "Choose a lo-fi playlist and hit play.",
    "Sort one folder. That’s it.",
    "Stretch your arms over your head. Hold 5 seconds.",
    "Check in with your future self: 'What would she thank me for?'"
  ],
  inspired: [
    "Voice-record one new idea — no pressure to organize.",
    "Sketch what’s in your brain right now. No one sees it but you.",
    "Write a title for the project in your head.",
    "Research the weirdest part of your idea for 3 minutes.",
    "Make a mood board or visual list.",
    "Send a 'this made me think of you' link to a friend."
  ],
  down: [
    "Re-read a compliment or kind message you saved.",
    "Watch 60 seconds of something silly on purpose.",
    "Write a note to your past self: 'We made it through that.'",
    "Make a feel-good playlist or queue up one song.",
    "List three things you’re proud of — no qualifiers.",
    "Wrap yourself in a blanket and call it a cape."
  ]
};

export default moodTaskSuggestions;
