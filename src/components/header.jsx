// import React, { useState, useEffect } from 'react';
// import { Link, useSearchParams } from 'react-router-dom';
// import { Button } from './ui/button';
// import { SignedIn, SignedOut, useUser, SignIn } from '@clerk/clerk-react';
// import { PenBox, NotebookPen, Save } from 'lucide-react';
// import { UserButton } from '@clerk/clerk-react'

// const ADMIN_EMAILS = ["atharva@gmail.com", "yadnesh@gmail.com", "yadnesh2105@gmail.com"]; // List of admin emails

// const Header = () => {
//   const [search, setSearch] = useSearchParams();
//   const [showSignIn, setShowSignIn] = useState(false);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const { user } = useUser(); // Get user data from Clerk

//   useEffect(() => {
//     if (user && user.primaryEmailAddress?.emailAddress) {
//       const email = user.primaryEmailAddress.emailAddress.toLowerCase();
//       const domain = email.split('@')[1];
//       setIsAdmin(
//         ADMIN_EMAILS.map(e => e.toLowerCase()).includes(email) ||
//         domain === "example.com"
//       );
//     } else {
//       console.warn("User emailAddress is not valid:", user?.primaryEmailAddress);
//       setIsAdmin(false);
//     }
//   }, [user]);

//   useEffect(() => {
//     if (search.get('sign-in')) {
//       setShowSignIn(true);
//     }
//   }, [search]);

//   const handleOverlayClick = (e) => {
//     if (e.target === e.currentTarget) {
//       setShowSignIn(false);
//       setSearch({});
//     }
//   };

//   return (
//     <>
//       <nav className="p-4 flex justify-between items-center">
//         <Link to="/">
//           <img src="/logo.png" className="h-20" alt="Logo" />
//         </Link>
//         <div className="flex gap-8">
//           {/* When the user is signed out */}
//           <SignedOut>
//             <Link to="/about-me">
//               <Button variant="destructive">About Me</Button>
//             </Link>
//             <Button variant="outline" onClick={() => setShowSignIn(true)}>
//               Login
//             </Button>
//           </SignedOut>

//           {/* When the user is signed in */}
//           <SignedIn>
//             {/* Show Post a Blog button only for admins */}
//             {isAdmin && (
//               <Link to="/post-blog">
//                 <Button variant="destructive" className="rounded-full">
//                   <PenBox size={20} className="mr-2" />
//                   Post a Blog
//                 </Button>
//               </Link>
//             )}
//             <UserButton
//               appearance={{
//                 elements: {
//                   avatarBox: 'w-10 h-10',
//                 },
//               }}
//             >
//               <UserButton.MenuItems>
//                 <UserButton.Link
//                   label="My Blogs"
//                   labelIcon={<NotebookPen size={15} />}
//                   href="/my-blogs"
//                 />
//                 <UserButton.Link
//                   label="Saved Blogs"
//                   labelIcon={<Save size={15} />}
//                   href="/saved-blogs"
//                 />
//               </UserButton.MenuItems>
//             </UserButton>
//           </SignedIn>
//         </div>
//       </nav>

//       {/* Sign-in modal */}
//       {showSignIn && (
//         <div
//           className="fixed flex inset-0 items-center bg-black bg-opacity-50 justify-center z-50"
//           onClick={handleOverlayClick}
//         >
//           <SignIn
//             signUpForceRedirectUrl="/"
//             fallbackRedirectUrl="/"
//           />
//         </div>
//       )}
//     </>
//   );
// };

// export default Header;


import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Button } from './ui/button';
import { SignedIn, SignedOut, useUser, SignIn, UserButton } from '@clerk/clerk-react';
import { PenBox, NotebookPen, Save } from 'lucide-react';
import PostBlog from '../pages/post-blog'; // Import the PostBlog component

const ADMIN_EMAILS = ["yadnesh2105@gmail.com", "atharvashelke2303@gmail.com"]; // List of admin emails

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/sign-in" replace />; // Redirect to login if not authenticated
  }

  const email = user.primaryEmailAddress?.emailAddress.toLowerCase();
  const isAdmin = ADMIN_EMAILS.map((e) => e.toLowerCase()).includes(email);

  if (!isAdmin) {
    return <Navigate to="/access-denied" replace />; // Redirect to Access Denied
  }

  return children; // Render the protected component
};

const Header = () => {
  const [search, setSearch] = useSearchParams();
  const [showSignIn, setShowSignIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { user } = useUser(); // Get user data from Clerk

  useEffect(() => {
    if (user && user.primaryEmailAddress?.emailAddress) {
      const email = user.primaryEmailAddress.emailAddress.toLowerCase();
      setIsAdmin(ADMIN_EMAILS.map((e) => e.toLowerCase()).includes(email));
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  useEffect(() => {
    if (search.get('sign-in')) {
      setShowSignIn(true);
    }
  }, [search]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setSearch({});
    }
  };

  return (
    <>
      <nav className="p-4 flex justify-between items-center">
        <Link to="/">
          <img src="/logo.png" className="h-20" alt="Logo" />
        </Link>
        <div className="flex gap-8">
          {/* When the user is signed out */}
          <SignedOut>
            <Link to="/about-me">
              <Button variant="destructive">About Me</Button>
            </Link>
            <Button variant="outline" onClick={() => setShowSignIn(true)}>
              Login
            </Button>
          </SignedOut>

          {/* When the user is signed in */}
          <SignedIn>
            {/* Show Post a Blog button only for admins */}
            {isAdmin && (
              
              <Link to="/post-blog">
                <Button variant="destructive" className="rounded-full">
                  <PenBox size={20} className="mr-2" />
                  Post a Blog
                </Button>
              </Link>
              
            )}
            <UserButton
              appearance={{
                elements: {
                  avatarBox: 'w-10 h-10',
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Blogs"
                  labelIcon={<NotebookPen size={15} />}
                  href="/my-blogs"
                />
                <UserButton.Link
                  label="Saved Blogs"
                  labelIcon={<Save size={15} />}
                  href="/saved-blogs"
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>

      {/* Sign-in modal */}
      {showSignIn && (
        <div
          className="fixed flex inset-0 items-center bg-black bg-opacity-50 justify-center z-50"
          onClick={handleOverlayClick}
        >
          <SignIn
            signUpForceRedirectUrl="/"
            fallbackRedirectUrl="/"
          />
        </div>
      )}
    </>
  );
};

export default Header;
