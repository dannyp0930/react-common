import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import Home from '@/pages/home';
import Article from '@/pages/article';
import ArticleDetail from '@/pages/article/detail';
import NotFound from '@/pages/404';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'article',
        children: [
          {
            index: true,
            element: <Article />,
          },
          {
            path: ':articleId',
            element: <ArticleDetail />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
