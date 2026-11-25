// Module and Lesson types
export interface Module {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  lessons: LessonMeta[];
  order: number;
}

export interface LessonMeta {
  id: string;
  title: string;
  slug: string;
  moduleId: string;
  moduleSlug: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  prerequisites: string[];
  objectives: string[];
  order: number;
}

export interface LessonContent {
  id: string;
  meta: LessonMeta;
  overview: string;
  explanation: string;
  whyItExists: string;
  howItWorks: string;
  codeExamples: CodeExample[];
  realWorldUseCases: string[];
  commonMistakes: CommonMistake[];
  bestPractices: string[];
  performanceNotes: string[];
  interviewQuestions: InterviewQuestion[];
  exercises: Exercise[];
  quizQuestions: QuizQuestion[];
}

export interface CodeExample {
  id: string;
  title: string;
  description: string;
  code: string;
  language: string;
  level: 'basic' | 'intermediate' | 'advanced';
  explanation: string;
}

export interface CommonMistake {
  title: string;
  description: string;
  wrongCode?: string;
  correctCode?: string;
  explanation: string;
}

export interface InterviewQuestion {
  id: string;
  question: string;
  difficulty: 'beginner' | 'basic' | 'intermediate' | 'advanced';
  answer: string;
  codeExample?: string;
  followUpQuestions?: string[];
  commonWrongAnswers?: string[];
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'basic' | 'intermediate' | 'advanced';
  hints: string[];
  expectedOutput?: string;
  starterCode?: string;
  solution?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'output-prediction' | 'code-based';
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
}

export interface UserProgress {
  completedLessons: string[];
  bookmarks: string[];
  notes: Record<string, string>;
  quizResults: Record<string, QuizResult>;
  interviewSessions: InterviewSession[];
  codingChallengeProgress: Record<string, ChallengeProgress>;
  theme: 'dark' | 'light';
  lastVisited: string[];
  streak: number;
  lastStreakDate: string;
}

export interface QuizResult {
  lessonId: string;
  score: number;
  total: number;
  answers: Record<string, string | number>;
  completedAt: string;
}

export interface InterviewSession {
  id: string;
  category: string;
  mode: 'practice' | 'exam' | 'mock';
  questionsAttempted: string[];
  correctAnswers: string[];
  score: number;
  duration: number;
  completedAt: string;
}

export interface ChallengeProgress {
  challengeId: string;
  status: 'not-started' | 'in-progress' | 'completed';
  solution?: string;
  completedAt?: string;
}

export interface InterviewQuestionItem {
  id: string;
  question: string;
  category: 'javascript' | 'react' | 'nextjs' | 'typescript' | 'frontend';
  difficulty: 'basic' | 'intermediate' | 'advanced';
  answer: string;
  explanation: string;
  codeExample?: string;
  commonWrongAnswers?: string[];
  followUpQuestions?: string[];
  tags: string[];
}

export interface CodingChallenge {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: 'javascript' | 'react' | 'advanced';
  difficulty: 'easy' | 'medium' | 'hard';
  requirements: string[];
  hints: string[];
  starterCode: string;
  solution: string;
  explanation: string;
  timeComplexity?: string;
  spaceComplexity?: string;
  tags: string[];
}

export interface NavItem {
  label: string;
  path: string;
  icon?: string;
  children?: NavItem[];
}
