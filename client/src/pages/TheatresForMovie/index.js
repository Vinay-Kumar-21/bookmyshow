import React,{useEffect,useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetAllTheatresByMovie } from "../../apicalls/theatres";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { HideLoading,ShowLoading } from "../../redux/loaderSlice";
import moment from "moment";
//import {GetMovieById} from "../../apicalls/movies";


function TheatresForMovie(){
    const params=useParams();
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const queryDate=new URLSearchParams(window.location.search).get("date");
    const [theatres,setTheatres]=useState([]);
    const [movie,setMovie]=useState({});

    const getData=async()=>{
        try{
            dispatch(ShowLoading());
            // const response=await GetMovieById(params.id);
            // if(response.success){
            //     setMovie(response.data);
            // }else{
            //     message.error("Movie Not Found");
            //     navigate("/");
            // }
            dispatch(HideLoading());

        }catch(error){
            dispatch(HideLoading());
            message.error("Movie Not Found");
            navigate("/");
        }
    }

    const getTheatres=async()=>{
        try{
            dispatch(ShowLoading());
            
        }catch(err){
            message.error(err.message);
        }
    }
    
    useEffect(()=>{
        console.log({queryDate,params})
    },[]);
    
    return <div>Theatres for a movie</div>;
}

export default TheatresForMovie;