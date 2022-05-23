import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './screens/Home';
import CreateAuction from './screens/CreateAuction';
import JoinAuction from './screens/JoinAuction';
import RegisterAuction from './screens/RegisterAuction';
import Login from './screens/Login';
import { RecoilRoot } from 'recoil';

function App() {
    return (
		<RecoilRoot>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home/>} />
					<Route path="/login" element={<Login/>} />
					<Route path="/create-auction" element={<CreateAuction/>} />
					<Route path="/join-auction" element={<JoinAuction/>} />
					<Route path="/register-auction" element={<RegisterAuction/>} />
				</Routes>
			</BrowserRouter>
		</RecoilRoot>
    );
}

export default App;
