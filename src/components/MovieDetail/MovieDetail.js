import { useLocation, useNavigate } from "react-router-dom"
import './MovieDetail.css'
// import NavBar from "../NavBar/NavBar";
import { useState } from "react";
function MovieDetail() {
    const location = useLocation();
    const data = location.state;
    const navigate = useNavigate()
    console.log(data);
    // const[storeusername,setStoreusername]=useState(null);
    // setStoreusername(data);

    function takeToTicketPlan(mId) {
        if (data.username) {
            let obj = {
                "movie_id": mId,
                "username": data.username,
            }
            navigate('/ticketplan', { state: obj })
        }
        else {
            alert('Please log in first to book tickets');
        }

    }
   
    return (
        <div>
            <nav className="navbar sticky-top navbar-light bg-light navbar-background">
                <nav className="navbar navbar-light bg-light navbar-left">
                    <a className="navbar-brand" href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-film edit-color" viewBox="0 0 16 16">
                            <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z" />
                        </svg>&nbsp;
                        <b>BOLETO</b>
                    </a>
                    <a className="nav-link" onClick={()=>{navigate(-1)}}><b>Home</b></a>
                </nav>

                <div>
                    {data.username && <form className="form-inline my-2 my-lg-0">
                        <div class="dropdown">
                            <button><b>Welcome {data.username}!</b></button>
                            <div class="dropdown-options">
                                <a href="/" >Log Out</a>
                            </div>
                        </div>                        
                        </form>}
                        {/* <button className="btn btn-outline-success my-2 my-sm-0" onClick={() => navigate("/signup")}><b>Join Us</b></button> */}
                </div>
            </nav>
            <div className="card-style">
                <div className="card mb-3">
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={data.image} className="img-fluid rounded-start"></img>
                        </div>
                        <div className="col-md-2 write-up">
                            <div className="card-body">
                                <h5 className="card-title">{data.name}</h5>
                                <div className="lang-format"><p className="card-text">{data.language}</p>&nbsp;<p>Movie</p></div>
                                {(Array.isArray(data.genre)) ?
                                    <div><label className="genre-style">{data.genre[0]}</label>&nbsp;&nbsp;&nbsp;<label className="genre-style">{data.genre[1]}</label></div> : <label className="genre-style">{data.genre}</label>}
                            </div>
                            <button className="btn btn-outline-primary my-2 my-sm-0 ticketbookingBtn" onClick={() => takeToTicketPlan(data.movie_id)}><b>Book Tickets</b></button>
                        </div>                        
                    </div>                    
                </div>
                <div>
                    <button className="btn btn-outline-primary my-2 my-sm-0 stylingbackBtn" onClick={() => navigate(-1)}><b>Back</b></button>
                </div>
            </div>
        </div>
    )
}
export default MovieDetail