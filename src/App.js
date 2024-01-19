import './App.css';
import MovieDetail from './components/MovieDetail/MovieDetail';
import Home from './pages/Home/Home';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import React from "react"; 
import {BrowserRouter,Routes,Route} from "react-router-dom"; 
import TicketPlan from './pages/TicketPlan/TicketPlan';
import SeatSelection from './pages/SeatSelection/SeatSelection';

function App() {
  return (
    <div className="App">
       <> 
      <BrowserRouter> 
      <Routes> 
        <Route exact path="/" element={<Home/>}/> 
        <Route exact path="/signup" element={<SignUp/>}/> 
        <Route exact path="/signin" element={<SignIn/>}/> 
        <Route exact path="/moviedetail" element={<MovieDetail/>}/> 
        <Route exact path="/ticketplan" element={<TicketPlan/>}/> 
        <Route exact path="/seatselection" element={<SeatSelection/>}/> 
      </Routes> 
      </BrowserRouter> 
      </>   
      
    </div>
  );
}

export default App;
