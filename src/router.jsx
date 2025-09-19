import { createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import HomePage from './pages/HomePage.jsx';
import CollectionsPage from './pages/CollectionsPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import CheckoutLayout from './components/CheckoutLayout.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import OrderConfirmationPage from './pages/OrderConfirmationPage.jsx';
import WishlistPage from './pages/WishlistPage.jsx';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      { path: "collections", element: <CollectionsPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "signup", element: <AuthPage /> },
      { path: "login", element: <AuthPage /> },
      { path: "product/:productId", element: <ProductDetailPage /> },
      { path: "wishlist", element: <WishlistPage /> },
    ],
  },
  {
    element: <CheckoutLayout />,
    children: [
      { path: "checkout", element: <CheckoutPage /> },
      { path: "order-confirmation", element: <OrderConfirmationPage /> },
    ]
  }
]);

export default router;