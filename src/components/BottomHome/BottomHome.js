import './BottomHome.css';
import MovieCard from '../MovieCard/MovieCard';
import { useEffect, useState } from 'react';
function BottomHome({val,filtermovielist}) {
    const [movie, setMovie] = useState([])
    const [page,setpage]=useState(1)
    useEffect(() => {
        fetch('http://127.0.0.1:8000/movie/movielist/?page='+page)
            .then((res) => res.json())
            .then((movie) => {
                //console.log(parsedRes)
                setMovie(movie)
                console.log(movie)
            })
    }, [page])
    return (
        <div>
            { filtermovielist?
            <div>
                <div class="grid-container">                   
                { filtermovielist && 
                    filtermovielist.map((i)=>(
                        <MovieCard para={i} info={val}/>

                    ))
                }                 

                </div>          
            </div> :
            <div>
                <div class="grid-container">
                { movie && 
                    movie.map((i)=>(
                        <MovieCard para={i} info={val}/>

                    ))
                }
                </div>
                <button onClick={()=>{setpage(1)}}>1</button>
                <button onClick={()=>{setpage(page+1)}}>2</button> 
            </div>
            }          
        </div>
    )
}
export default BottomHome