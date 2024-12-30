import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AppLayout from './layouts/app-layout';
import LandingPage from './pages/landing';
import Onboarding from './pages/onboarding';
import Bloglisting from './pages/blog-listing';
import BlogPage from './pages/blog';
import PostBlog from './pages/post-blog';
import SavedBlogs from './pages/saved-blogs';
import MyBlogs from './pages/my-blogs';
import { ThemeProvider } from './components/theme-provider';
import ProtectedRoute from './components/protected-route';
import AboutMe from './pages/about-me';
import SubscribeBlogs from './pages/subscribe-blog';



const router = createBrowserRouter([
  {
    element: <AppLayout/>,
    children: [
      {
        path:'/',
        element:<LandingPage/>,
      },
      {
        path:'/onboarding',
        element:
        <ProtectedRoute>
        <Onboarding/>
        </ProtectedRoute>,
      },
      {
        path:'/blogs',
        element:
        <Bloglisting/>

      },
      {
        path:'/blog/:id',
        element:<ProtectedRoute>
        <BlogPage/>
        </ProtectedRoute>,
      },
      {
        path:'/post-blog',
        element:<ProtectedRoute>
        <PostBlog/>
        </ProtectedRoute>,
      },
      {
        path:'/saved-blogs',
        element:<ProtectedRoute>
        <SavedBlogs/>
        </ProtectedRoute>,
      },
      {
        path:'/my-blogs',
        element:<ProtectedRoute>
        <MyBlogs/>
        </ProtectedRoute>,
      },
      {
        path:'/about-me',
        element:
        <AboutMe/>
      },
      {
        path:'/subscribe-blogs',
        element:<ProtectedRoute>
        <SubscribeBlogs/>
        </ProtectedRoute>,
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router}/>
    </ThemeProvider>
  );
}

export default App
