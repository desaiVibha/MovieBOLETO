import { useLocation, useNavigate } from 'react-router-dom'
import './TicketPlan.css'
import { useEffect, useState } from 'react';
function TicketPlan() {
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state;
    const [values, setValues] = useState([]);
    const [getmovieid, setGetMovieid] = useState([]);
    let token=localStorage.getItem('access');
    useEffect(() => {
        fetch('http://127.0.0.1:8000/movie/getTheatres/' + data.movie_id,{
            method: "GET",
            headers: { 'Authorization': 'Bearer ' + token}

        })
        .then((res) => res.json())
        .then((parsedRes) => {
            console.log(parsedRes.theatres);
            setValues(() => parsedRes.theatres);
            setGetMovieid(() => parsedRes);
        })
    }, [])
    function getAllDetailsToSeatSelection(datas) {
        console.log(datas);
        let timing;
        values.map((value)=>{
            if (value.theatre_name===datas.target.textContent){
                timing=value.timing

            }
        })
        let datasend = [datas.target.textContent, data.movie_id, data.username,timing];
        navigate('/seatselection', { state: datasend });
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
            {values &&
                <div className='total-format'>
                    <h3 className='ticket-plan-text'>Ticket Plan</h3>
                    <table className='table-format'>
                        <tr className='column-format'>
                            <th>Theatres</th>
                            <th>Timings</th>
                        </tr>
                        {values.map((val, key) => {
                            return (
                                <tr key={key} className='data-format'>
                                    <td onClick={(e) => getAllDetailsToSeatSelection(e)}>{val.theatre_name}</td>
                                    <td>{val.timing}</td>
                                </tr>
                            )
                        })}
                    </table>
                    <div>
                        <button className="btn btn-outline-primary my-2 my-sm-0 stylingbackBtn" onClick={() => navigate(-1)}><b>Back</b></button>
                    </div>
                </div>
            }
        </div>
    )
}
export default TicketPlan