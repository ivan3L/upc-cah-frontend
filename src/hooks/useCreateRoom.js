//implementar
//example:

// import {useState, useEffect} from 'react'
// import { getGif } from '../helpers/getGifs';


// export const useFetchGifs = (category,apiKey) => {
//   const [images, setimages] = useState([]);
//   const [loading, isloading] = useState(true)
//   console.log(loading)

//   const getImages = async () => {
//     const newImages = await getGif(category, apiKey);
//     setimages(newImages);
//     isloading(false)
//   };
//   useEffect(() => {
//     getImages();
//   }, []);

//   return {
//     images: images,
//     isLoading: loading
//   }
// }
