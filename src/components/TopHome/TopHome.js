import NavBar from '../NavBar/NavBar'
import './TopHome.css'
import { useState } from "react"
function TopHome({val,handleDatafromTophome}) {
    const [city,setCity]=useState('Bangalore');
    const [moviesearch,setMoviesearch] = useState('');
    // console.log(city);
    // console.log(moviesearch);
    let obj={};    
    return (
        <div>
            <NavBar item={val}/>
            <div className="headlineTop">
                <h1>Get MOVIE TICKETS</h1>
                <h4>Buy movie tickets in advance,find movie times,watch trailers,</h4>
                <h4>read movie reviwes and much more..!</h4>
                <div className="cardDetail">
                    <h6 className="card-title">WELCOME TO BOLETO</h6>
                    <h5>WHAT ARE YOU LOOKING FOR?</h5>
                    <div className='input-field'>
                        <div>
                            <label className="labelTop">Search for movies here : <input onChange={event=>setMoviesearch(event.target.value)}></input></label>
                        </div>                       
                        <div>
                            <label for="city">Choose a City:</label>
                            <select name="city" id="city" onChange={event=>setCity(event.target.value)} defaultValue={city}>
                                <option value="bangalore">Bangalore</option>
                                <option value="mumbai">Mumbai</option>
                                <option value="delhi">Delhi</option>
                                <option value="chennai">Chennai</option>
                            </select>
                        </div>
                        <div className='date-select'>
                            <button className="btn btn-outline-success my-2 my-sm-0" onClick={()=>{obj['moviesearch']=moviesearch;obj['city']=city;
        handleDatafromTophome(obj)}}>
                            <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg></span>&nbsp;<b>GO!</b>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default TopHome