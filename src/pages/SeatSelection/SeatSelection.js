import './SeatSelection.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { State } from 'state-pool';

function SeatSelection() {
    let token = localStorage.getItem('access');
    const location = useLocation();
    const data = location.state;
    console.log(data);
    let navigate = useNavigate();
    const [seats, setSeats] = useState([]);
    const [seatsindatabase, setSeatsindatabase] = useState([]);
    let price = 200;
    useEffect(() => {
        fetch('http://127.0.0.1:8000/movie/getbookedseats/' + data[0] + '/' + data[1])
            .then((res) => res.json())
            .then((parsedRes) => {
                console.log(parsedRes);
                setSeatsindatabase(() => parsedRes);
            })

    }, [])
    seatsindatabase.map((si) => {
        const element = document.getElementById(si);
        element.classList.add("occupied");

    })
    /*    function sendSeatInfo(val){
           console.log(val);
           if(seats.length!=0){
           seats.map((item)=>{
               if (item==val.target.innerText){
                   seats.pop(item)
               }
               else{
                   setSeats(()=>[...seats,val.target.innerText])
               }
           }) }
           else{
               setSeats(()=>[...seats,val.target.innerText])
           }       
           console.log(seats)
       } */
    const sendSeatInfo = (val) => {
        console.log(val);
        let flag = false;
        seats.map((s, i) => {
            if (s === val.target.innerText) {
                val.target.classList.remove("selected")
                flag = true;
            }
        })
        if (flag === false) {
            setSeats(() => [...seats, val.target.innerText]);
            val.target.classList.add("selected")
        }
        if (flag === true) {
            setSeats(seats.filter((item) =>
                item !== val.target.innerText))
        }

    }
    //console.log(seats);


    const proceedToPay = () => {
        console.log(seats);
        let finalUpdatedSeats=[];
        seats.map((each) => {
            const element = document.getElementById(each);
            element.classList.add("occupied");
            finalUpdatedSeats.push(each);
        })
        seatsindatabase.map((s)=>{
            finalUpdatedSeats.push(s);

        })
        console.log(finalUpdatedSeats);

        fetch('http://127.0.0.1:8000/movie/addbookedseats/', {
            method: 'POST',
            body: JSON.stringify({
                "seat_no": finalUpdatedSeats,
                "theatre_name": data[0],
                "movie_id": data[1]
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + token
            }

        })
            .then((res) => res.json())
            .then((parsedRes) => {
                console.log(parsedRes.theatres);
                fetch('http://127.0.0.1:8000/movie/movieDetails/' + data[1], {
                    method: "GET",
                    headers: { 'Authorization': 'Bearer ' + token }
                })
                    .then((res) => res.json())
                    .then((dta) => {
                        let movieDetails = [dta.name, dta.image, data[0], data[3], seats,data[2]];
                        navigate('/bookingsummary', { state: movieDetails });

                    })
            })

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
                    <div>
                        <button className="btn btn-outline-primary my-2 my-sm-0 stylingbackBtn" onClick={() => navigate(-1)}><b>Back</b></button>
                    </div>
                </nav>
                <div>
                    {data[2] && <form className="form-inline my-2 my-lg-0">
                        <div class="dropdown">
                            <button><b>Welcome {data[2]}!</b></button>
                            <div class="dropdown-options">
                                <a href="/" >Log Out</a>
                            </div>
                        </div>
                    </form>}
                    {/* <button className="btn btn-outline-success my-2 my-sm-0" onClick={() => navigate("/signup")}><b>Join Us</b></button> */}
                </div>
            </nav>
            <div className='seatselectionpage'>
                <ul className="showcase">
                    <li>
                        <div className='seat'></div>
                        <small>N/S</small>
                    </li>
                    <li>
                        <div className='seat selected'></div>
                        <small>Selected</small>
                    </li>
                    <li>
                        <div className='seat occupied'></div>
                        <small>Occupied</small>
                    </li>
                </ul>
                <div className='container'>
                    <div className="screen"></div>
                    <div className='row'>
                        <div className='seat' onClick={(e) => sendSeatInfo(e)} id='A1'>A1</div>
                        <div className='seat' onClick={(e) => sendSeatInfo(e)} id='A2'>A2</div>
                        <div className='seat' onClick={(e) => sendSeatInfo(e)} id='A3'>A3</div>
                        <div className='seat' onClick={(e) => sendSeatInfo(e)} id='A4'>A4</div>
                        <div className='seat' onClick={(e) => sendSeatInfo(e)} id='A5'>A5</div>
                        <div className='seat' onClick={(e) => sendSeatInfo(e)} id='A6'>A6</div>
                        <div className='seat' onClick={(e) => sendSeatInfo(e)} id='A7'>A7</div>
                        <div className='seat' onClick={(e) => sendSeatInfo(e)} id='A8'>A8</div>
                    </div>

                    <div className='row'>
                        <div className='seat' onClick={(e) => sendSeatInfo(e)} id='B1'>B1</div>
                        <div className='seat' onClick={(e) => sendSeatInfo(e)} id='B2'>B2</div>
                        <div className='seat' onClick={(e) => sendSeatInfo(e)} id='B3'>B3</div>
                        <div className='seat' onClick={(e) => sendSeatInfo(e)} id='B4'>B4</div>
                        <div className='seat' onClick={(e) => sendSeatInfo(e)} id='B5'>B5</div>
                        <div className='seat' onClick={(e) => sendSeatInfo(e)} id='B6'>B6</div>
                        <div className='seat' onClick={(e) => sendSeatInfo(e)} id='B7'>B7</div>
                        <div className='seat' onClick={(e) => sendSeatInfo(e)} id='B8'>B8</div>
                    </div>

                    <div className='row'>
                        <div className='seat' onClick={(e) => sendSeatInfo(e)} id='C1'>C1</div>
                        <div className='seat' onClick={(e) => sendSeatInfo(e)} id='C2'>C2</div>
                        <div className='seat' onClick={(e) => sendSeatInfo(e)} id='C3'>C3</div>
                        <div className='seat' onClick={(e) => sendSeatInfo(e)} id='C4'>C4</div>
                        <div className='seat occupied' onClick={(e) => sendSeatInfo(e)} id='C5'>C5</div>
                        <div className='seat occupied' onClick={(e) => sendSeatInfo(e)} id='C6'>C6</div>
                        <div className='seat' onClick={(e) => sendSeatInfo(e)} id='C7'>C7</div>
                        <div className='seat' onClick={(e) => sendSeatInfo(e)} id='C8'>C8</div>
                    </div>

                    <div className='row'>
                        <div className='seat' onClick={(e) => sendSeatInfo(e)} id='D1'>D1</div>
                        <div className='seat' onClick={(e) => sendSeatInfo(e)} id='D2'>D2</div>
                        <div className='seat' onClick={(e) => sendSeatInfo(e)} id='D3'>D3</div>
                        <div className='seat' onClick={(e) => sendSeatInfo(e)} id='D4'>D4</div>
                        <div className='seat' onClick={(e) => sendSeatInfo(e)} id='D5'>D5</div>
                        <div className='seat' onClick={(e) => sendSeatInfo(e)} id='D6'>D6</div>
                        <div className='seat' onClick={(e) => sendSeatInfo(e)} id='D7'>D7</div>
                        <div className='seat' onClick={(e) => sendSeatInfo(e)} id='D8'>D8</div>
                    </div>

                    <div className='row'>
                        <div className='seat' onClick={(e) => sendSeatInfo(e)} id='E1'>E1</div>
                        <div className='seat' onClick={(e) => sendSeatInfo(e)} id='E2'>E2</div>
                        <div className='seat' onClick={(e) => sendSeatInfo(e)} id='E3'>E3</div>
                        <div className='seat' onClick={(e) => sendSeatInfo(e)} id='E4'>E4</div>
                        <div className='seat' onClick={(e) => sendSeatInfo(e)} id='E5'>E5</div>
                        <div className='seat' onClick={(e) => sendSeatInfo(e)} id='E6'>E6</div>
                        <div className='seat' onClick={(e) => sendSeatInfo(e)} id='E7'>E7</div>
                        <div className='seat' onClick={(e) => sendSeatInfo(e)} id='E8'>E8</div>
                    </div>

                    <div className='row'>
                        <div className='seat' onClick={(e) => sendSeatInfo(e)} id='F1'>F1</div>
                        <div className='seat' onClick={(e) => sendSeatInfo(e)} id='F2'>F2</div>
                        <div className='seat occupied' onClick={(e) => sendSeatInfo(e)} id='F3'>F3</div>
                        <div className='seat' onClick={(e) => sendSeatInfo(e)} id='F4'>F4</div>
                        <div className='seat' onClick={(e) => sendSeatInfo(e)} id='F5'>F5</div>
                        <div className='seat' onClick={(e) => sendSeatInfo(e)} id='F6'>F6</div>
                        <div className='seat' onClick={(e) => sendSeatInfo(e)} id='F7'>F7</div>
                        <div className='seat' onClick={(e) => sendSeatInfo(e)} id='F8'>F8</div>
                    </div>
                </div>
                <p class="text">
                    You have selected <span id="count">{seats.length}</span> seats for a price of Rs. <span id="total">{seats.length * price}</span>
                </p>
                <button onClick={() => proceedToPay()}>Confirm Seats</button>
            </div>
        </div>
    )
}
export default SeatSelection