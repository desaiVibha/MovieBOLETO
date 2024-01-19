import TopHome from "../../components/TopHome/TopHome"
import BottomHome from "../../components/BottomHome/BottomHome"
import './Home.css'
import { useLocation } from "react-router-dom";
import { useState } from "react";

function Home(){
    const location=useLocation();
    const data=location.state;
    console.log(data);
    let [filtermovielist,setFiltermovielist]=useState(null)
    //console.log(filtermovielist);
    const handleDatafromTophome=(item)=>{
        //console.log(item.moviesearch);
        fetch('http://127.0.0.1:8000/movie/moviefilter/?movie='+item.moviesearch +'&city='+item.city)
            .then((res) => res.json())
            .then((d) => {
                setFiltermovielist(()=>d);
                
            })
        console.log(filtermovielist);
    }
    return(
        <div className="tophomeBack">
            {data? <TopHome val={data} handleDatafromTophome={handleDatafromTophome}/>:<TopHome handleDatafromTophome={handleDatafromTophome}/>}
            {data?<BottomHome val={data} filtermovielist={filtermovielist}/>:<BottomHome filtermovielist={filtermovielist}/> }       
        </div>

    )
}
export default Home