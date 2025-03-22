import data from './data/images.json';
import {useState} from "react";
import img from "./assets/question.svg";

export default function Container(){
    const [images, setImages] = useState([...data,...data]);
    const [selectedImage, setSelectedImage] = useState([]);
    const [results, setResults] = useState([]);
    const [count, setCount] = useState(0);
    const [winner, setWinner] = useState(false);

    function handleImageChange(index){
        if(selectedImage.length > 1){
            handleSelectedImage(selectedImage[0],selectedImage[1]);
            setSelectedImage([]);
        } else{
            if(!results.includes(index)){
                setSelectedImage([...selectedImage, index]);
            }
        }
        setCount(count+1);
    }
    function handleSelectedImage(a,b){
        if(images[a]==images[b]){
            setResults([...results,images[a],images[b]]);
        }
        if(results.length>images.length-1){
            setWinner(true);
        }
    }

    return <>
        {images.map(((item,index) => (<img src={selectedImage.includes(index) || results.includes(item)? item.url : img} alt={item.name} key={index}
                                  onClick={() => handleImageChange(index)}
        style={{
            border: results.includes(item)?"2px solid green":"none",
        }}
        />)))}
        <h1>{winner?"Ai castigat, ai facut "+count+"incercari":""}</h1>
    </>;
}