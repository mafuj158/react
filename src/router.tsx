import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from './layouts/root-layout';
import { DashboardPage } from './pages/dashboard/dashboard-page';
import { CurriculumPage } from './pages/curriculum/curriculum-page';
import { LessonPage } from './pages/lessons/lesson-page';
import { InterviewDashboardPage } from './pages/interview/interview-dashboard-page';
import { InterviewQuestionsPage } from './pages/interview/interview-questions-page';
import { CodingChallengesPage } from './pages/interview/coding-challenges-page';
import { MockInterviewPage } from './pages/interview/mock-interview-page';
import { ProgressPage } from './pages/progress/progress-page';
import { BookmarksPage } from './pages/bookmarks/bookmarks-page';
import { NotesPage } from './pages/notes/notes-page';
import { SearchPage } from './pages/search/search-page';
import { SettingsPage } from './pages/settings/settings-page';
import { NotFoundPage } from './pages/errors/not-found-page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'curriculum',
        element: <CurriculumPage />,
      },
      {
        path: 'learn/:moduleSlug/:lessonSlug',
        element: <LessonPage />,
      },
      {
        path: 'interview',
        element: <InterviewDashboardPage />,
      },
      {
        path: 'interview/javascript',
        element: <InterviewQuestionsPage category="javascript" />,
      },
      {
        path: 'interview/react',
        element: <InterviewQuestionsPage category="react" />,
      },
      {
        path: 'interview/nextjs',
        element: <InterviewQuestionsPage category="nextjs" />,
      },
      {
        path: 'interview/typescript',
        element: <InterviewQuestionsPage category="typescript" />,
      },
      {
        path: 'interview/frontend',
        element: <InterviewQuestionsPage category="frontend" />,
      },
      {
        path: 'interview/coding',
        element: <CodingChallengesPage />,
      },
      {
        path: 'interview/mock',
        element: <MockInterviewPage />,
      },
      {
        path: 'progress',
        element: <ProgressPage />,
      },
      {
        path: 'bookmarks',
        element: <BookmarksPage />,
      },
      {
        path: 'notes',
        element: <NotesPage />,
      },
      {
        path: 'search',
        element: <SearchPage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default router;
