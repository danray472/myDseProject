import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Home from './Pages/Home';
import InRepair from './Pages/InRepair';
import CompletedDevices from './Pages/CompletedDevices';
import ReceivedDevices from './Pages/ReceivedDevices';
import RemovedDevices from './Pages/RemovedDevices';
import AddDevice from './Pages/AddDevice';
import AllDevices from './Pages/AllDevices';
import Signup from './Pages/Signup'; // Import the Signup component
import Login from './Pages/Login'; // Import the Login component
import WelcomePage from './Pages/WelcomePage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/AllDevices" element={<AllDevices />} />
      <Route path="/InRepair" element={<InRepair />} />
      <Route path="/CompletedDevices" element={<CompletedDevices />} />
      <Route path="/ReceivedDevices" element={<ReceivedDevices />} />
      <Route path="/RemovedDevices" element={<RemovedDevices />} />
      <Route path="/AddDevice" element={<AddDevice />} />
      <Route path="/register" element={<Signup />} />
    </Routes>
  );
};

export default App;
