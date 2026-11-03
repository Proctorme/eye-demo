export interface QuizQuestionData {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export const QUIZ_LENGTH = 10;

export const QUESTION_BANK: QuizQuestionData[] = [
  { id: 1, question: "What is the capital of France?", options: ["London", "Berlin", "Paris", "Madrid"], correctAnswer: 2 },
  { id: 2, question: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], correctAnswer: 1 },
  { id: 3, question: "What is the largest ocean on Earth?", options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"], correctAnswer: 3 },
  { id: 4, question: 'Who wrote "Romeo and Juliet"?', options: ["Jane Austen", "William Shakespeare", "Mark Twain", "Charles Dickens"], correctAnswer: 1 },
  { id: 5, question: "What is the chemical symbol for gold?", options: ["Go", "Gd", "Au", "Ag"], correctAnswer: 2 },
  { id: 6, question: "What is 15 × 4?", options: ["45", "50", "60", "65"], correctAnswer: 2 },
  { id: 7, question: "Which language is used to style web pages?", options: ["HTML", "Python", "SQL", "CSS"], correctAnswer: 3 },
  { id: 8, question: "Which gas do plants absorb from the atmosphere during photosynthesis?", options: ["Oxygen", "Carbon dioxide", "Helium", "Hydrogen"], correctAnswer: 1 },
  { id: 9, question: "How many sides does a hexagon have?", options: ["Six", "Five", "Seven", "Eight"], correctAnswer: 0 },
  { id: 10, question: "Which organ pumps blood around the human body?", options: ["Lungs", "Liver", "Heart", "Kidneys"], correctAnswer: 2 },
  { id: 11, question: "What is the square root of 144?", options: ["10", "11", "14", "12"], correctAnswer: 3 },
  { id: 12, question: "On which continent is Egypt located?", options: ["Europe", "Africa", "South America", "Australia"], correctAnswer: 1 },
  { id: 13, question: "What does CPU stand for?", options: ["Central Processing Unit", "Computer Power Utility", "Central Program Upload", "Control Processing User"], correctAnswer: 0 },
  { id: 14, question: "Which is the largest planet in our solar system?", options: ["Earth", "Neptune", "Jupiter", "Saturn"], correctAnswer: 2 },
  { id: 15, question: "How many minutes are in two hours?", options: ["60", "90", "100", "120"], correctAnswer: 3 },
  { id: 16, question: "Which instrument is used to measure temperature?", options: ["Barometer", "Thermometer", "Compass", "Speedometer"], correctAnswer: 1 },
  { id: 17, question: "Which animal is a mammal?", options: ["Dolphin", "Shark", "Crocodile", "Penguin"], correctAnswer: 0 },
  { id: 18, question: "What is the capital of Japan?", options: ["Seoul", "Beijing", "Tokyo", "Bangkok"], correctAnswer: 2 },
  { id: 19, question: "Which number is prime?", options: ["21", "27", "33", "29"], correctAnswer: 3 },
  { id: 20, question: "What does HTML stand for?", options: ["High Transfer Machine Language", "HyperText Markup Language", "Hyperlink Text Management Logic", "Home Tool Markup Language"], correctAnswer: 1 },
  { id: 21, question: "Which force keeps the planets in orbit around the Sun?", options: ["Gravity", "Friction", "Magnetism", "Buoyancy"], correctAnswer: 0 },
  { id: 22, question: "How many degrees are in a right angle?", options: ["45", "60", "90", "180"], correctAnswer: 2 },
  { id: 23, question: "Which country is home to the Great Barrier Reef?", options: ["Brazil", "India", "South Africa", "Australia"], correctAnswer: 3 },
  { id: 24, question: "Which part of a plant usually absorbs water from the soil?", options: ["Flowers", "Roots", "Leaves", "Fruit"], correctAnswer: 1 },
  { id: 25, question: "What is 25% of 200?", options: ["50", "25", "75", "100"], correctAnswer: 0 },
  { id: 26, question: "Which device is primarily used to enter text into a computer?", options: ["Monitor", "Printer", "Keyboard", "Speaker"], correctAnswer: 2 },
  { id: 27, question: "What is the chemical formula for water?", options: ["CO2", "O2", "NaCl", "H2O"], correctAnswer: 3 },
  { id: 28, question: "Which of these is a renewable energy source?", options: ["Coal", "Solar energy", "Natural gas", "Petroleum"], correctAnswer: 1 },
  { id: 29, question: "Who painted the Mona Lisa?", options: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Claude Monet"], correctAnswer: 0 },
  { id: 30, question: "What is the sum of the interior angles of a triangle?", options: ["90 degrees", "120 degrees", "180 degrees", "360 degrees"], correctAnswer: 2 },
  { id: 31, question: "Which language runs natively in web browsers to add interactivity?", options: ["SQL", "C++", "Ruby", "JavaScript"], correctAnswer: 3 },
  { id: 32, question: "Which is the smallest continent by land area?", options: ["Europe", "Australia", "Antarctica", "South America"], correctAnswer: 1 },
  { id: 33, question: "What is the process of a liquid changing into a gas called?", options: ["Evaporation", "Freezing", "Condensation", "Melting"], correctAnswer: 0 },
  { id: 34, question: "How many bytes are in one kibibyte (KiB)?", options: ["100", "1000", "1024", "2048"], correctAnswer: 2 },
  { id: 35, question: "Which planet is closest to the Sun?", options: ["Earth", "Venus", "Mars", "Mercury"], correctAnswer: 3 },
  { id: 36, question: "What is 9 squared?", options: ["18", "81", "72", "99"], correctAnswer: 1 },
  { id: 37, question: "Which blood cells primarily carry oxygen around the body?", options: ["Red blood cells", "White blood cells", "Platelets", "Nerve cells"], correctAnswer: 0 },
  { id: 38, question: "Which of these is an operating system?", options: ["Google Chrome", "Microsoft Word", "Linux", "HTML"], correctAnswer: 2 },
  { id: 39, question: "Which direction is opposite to northeast?", options: ["Northwest", "Southeast", "East", "Southwest"], correctAnswer: 3 },
  { id: 40, question: "What is the freezing point of pure water at standard atmospheric pressure?", options: ["10°C", "0°C", "32°C", "100°C"], correctAnswer: 1 },
];

export function selectQuizQuestions(): QuizQuestionData[] {
  const shuffled = [...QUESTION_BANK];
  // Fisher–Yates gives every ordering an equal chance without mutating the bank.
  for (let index = shuffled.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }
  return shuffled.slice(0, QUIZ_LENGTH);
}
