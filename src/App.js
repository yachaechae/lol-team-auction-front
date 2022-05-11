import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './screens/Home';
import CreateAuction from './screens/CreateAuction';
import JoinAuction from './screens/JoinAuction';
import RegisterAuction from './screens/RegisterAuction';

function App() {
    return (
        <BrowserRouter>
			<Routes>
				<Route path="/" element={<Home/>} />
				<Route path="/create-auction" element={<CreateAuction/>} />
				<Route path="/join-auction" element={<JoinAuction/>} />
				<Route path="/register-auction" element={<RegisterAuction/>} />
			</Routes>
        </BrowserRouter>
    );
}

export default App;
