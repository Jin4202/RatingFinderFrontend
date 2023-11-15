import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Star from "./components/Product/Star";
import Home from "./pages/Home";
import ProductCatalog from "./pages/ProductCatalog";
import NotFoundPage from "./pages/NotFoundPage";
import ProductPage from "./pages/ProductPage";
import SignUp from "./pages/SignUp";
import UserProfile from "./pages/UserProfile";
import SearchResults from "./pages/SearchResults";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product">
          <Route index element={<ProductCatalog />} />
          <Route path=":id" element={<ProductPage />} />
        </Route>

        <Route path="/user">
          <Route path=":id" element={<UserProfile />} />
        </Route>

        <Route path="/search/keyword" element={<SearchResults />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
