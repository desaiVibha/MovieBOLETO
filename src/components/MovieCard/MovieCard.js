import Star from "../Star/Star"
import MovieDetail from "../MovieDetail/MovieDetail"
import { useNavigate } from 'react-router-dom'
import './MovieCard.css'

function MovieCard({para,info }){
    const navigate = useNavigate()
    console.log(info);
    let token = localStorage.getItem('access');
    function takeToDetailApi(m_id){        
        //const params = useParams()
        fetch('http://127.0.0.1:8000/movie/movieDetails/'+m_id, {
            method: "GET",
            headers: { 'Authorization': 'Bearer ' + token }
        })
            .then((res) => res.json())
            .then((parsedRes) => {
                //console.log(parsedRes)
                if(info){
                parsedRes['username']=info.name}
                else{
                    parsedRes['username']=null
                }
                console.log(parsedRes)
                if (parsedRes){
                    navigate('/moviedetail', {state:parsedRes})
                }
                
            })    
    }
    return(
        <div>
            <div className="card">
                <img className="img-equal" height={250} width={400} src={para.image} class="card-img-top" alt="flower-image" onClick={()=>takeToDetailApi(para.movie_id)}></img>
                <div className="card-body">
                    <h5 className="card-title">{para.name}</h5>
                    <Star rat={para.rating}/>
                </div>
                {para.theatre_name?<div><h6>{para.theatre_name}</h6></div>:<div></div>}
            </div>
        </div>
    )
}
export default MovieCard