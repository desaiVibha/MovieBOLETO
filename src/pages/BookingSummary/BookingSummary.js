import { useLocation,useNavigate} from 'react-router-dom';
import './BookingSummary.css';
function BookingSummary(){
    const location = useLocation();
    const data = location.state;
    let navigate = useNavigate();
    return(
        <div className='format-summary'>
            <div className="card-style">
                <div className="card mb-3">
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={data[1]} className="img-fluid rounded-start"></img>
                        </div>
                        <div className="col-md-2 write-up">
                            <div className="card-body">
                                <h5 className="card-text welcome">Congratulations! Enjoy the movie "{data[0]}"</h5>
                                <div ><p className="card-text tnme">Theatre Name:{data[2]}</p></div>
                                <div ><p className="card-text timing">Timing:{data[3]}</p></div>
                                <div ><p className="card-text seats">Selected Seats:{data[4]}</p></div>
                            </div>
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
export default BookingSummary