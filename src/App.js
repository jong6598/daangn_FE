import "./App.css";
import { Routes, Route } from "react-router-dom";
import { GlobalStyle } from "./styles/GlobalStyle";

import Intro from "./pages/Intro";
import Home from "./pages/Home";
import Join from "./pages/Join";
import Login from "./pages/Login";
import Mypage from "./pages/Mypage";
import Post from "./pages/Post";
import PostDetail from "./pages/PostDetail";
import MyChatRoom from "./pages/MyChatRoom";
import Chat from "./pages/Chat";

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/join" element={<Join />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/post" element={<Post />} />
        <Route path="/post/:postId" element={<PostDetail />} />
        <Route path="/mychatroom" element={<MyChatRoom />} />
        <Route path="/post/:postId/edit" element={<Post />} />
        <Route path="/chat/:roomId" element={<Chat />} /> 
      </Routes>
    </div>
  );
}

export default App;
