import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import Contact from './pages/Contact';
import Faq from './pages/Faq';
import Support from './pages/Support';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ProductDetails from './pages/ProductDetails';
import Profile from './pages/Profile';
import PublicRoute from "./routes/PublicRoute";
import AdminLayout from "./layouts/AdminLayout";
import PublicLayout from "./layouts/PublicLayout";
import AdminRoute from "./routes/AdminRoute";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/users/Index";
import UsersForm from "./pages/admin/users/Form";
import Categories from "./pages/admin/categories/Index";
import CategoriesForm from "./pages/admin/categories/Form";
import Inquiries from "./pages/admin/Inquiries";
import AdminProfile from "./pages/admin/Profile";
import Calculator from "./pages/admin/Calculator";
import Games from "./pages/admin/games/Index";
import SnakeGame from "./pages/admin/games/SnakeGame";
import TikTakToe from "./pages/admin/games/TikTakToe";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/support" element={<Support />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Route>

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="users/form" element={<UsersForm />} />
          <Route path="users/edit/:id" element={<UsersForm />} />
          <Route path="categories" element={<Categories />} />
          <Route path="categories/form" element={<CategoriesForm />} />
          <Route path="categories/edit/:id" element={<CategoriesForm />} />
          <Route path="inquiries" element={<Inquiries />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="calculator" element={<Calculator />} />
          <Route path="games" element={<Games />} />
          <Route path="games/snake-game" element={<SnakeGame />} />
          <Route path="games/tik-tak-toe" element={<TikTakToe />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
