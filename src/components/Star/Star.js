import './Star.css';
import {FaStar,FaStarHalfAlt} from "react-icons/fa";
import {AiOutlineStar} from "react-icons/ai";
const Star=({rat})=>{
    const ratingStar=Array.from({length:5},(elem,index)=>{
        let number=index+0.5;
        return( 
        <span key={index}>
        {
            rat>=index+1?(
                <FaStar/>
            ):rat>=number?(
                <FaStarHalfAlt/>
            ):(
                <AiOutlineStar/>
            )
        }
        </span>
    );
    });
    return(
        <div className='ratingdiv'>
            <div className='ratingstar'>
            {ratingStar}
            </div>
            <span>&nbsp;&nbsp;&nbsp;{rat}</span>
        </div>
    )
}
export default Star;