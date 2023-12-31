import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Layout from "./pages/Layout";
import CreatePost from "./pages/CreatePost"
import PostPage from "./pages/PostPage"

function App() {
  return (
    <div className="App">
      <main>
        <BrowserRouter>
          <Routes>

            <Route path="/" element = {<Layout />}>

              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/create" element={<CreatePost />} />
              <Route path="/post/:id" element={<PostPage />} />

            </Route>

          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
