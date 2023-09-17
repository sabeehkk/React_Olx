import React, { useState,useEffect, useContext } from 'react';
import Heart from '../../assets/Heart';
import './Post.css';
import { firebaseContext } from '../../store/firebaseContext';
import { postContext } from '../../store/postContext';
import {useNavigate} from 'react-router-dom';

function Posts() {

  const {setPostDetails} = useContext(postContext)
  const {firebase} = useContext(firebaseContext)

  const navigate = useNavigate()

  const [products,setProducts] =  useState([])


  useEffect(() => {
    // Create a function to fetch data and handle errors
    const fetchData = async () => {
      try {
        const snapshot = await firebase.firestore().collection('products').get();
        const allPost = snapshot.docs.map((product) => ({
          ...product.data(),
          id: product.id
        }));
        setProducts(allPost);
      } catch (error) {
        // Handle any errors that occurred during data fetching
        console.error('Error fetching data:', error);
      }
    };
  
    // Call the fetchData function when the component mounts
    fetchData();
  }, []);
  

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading"> 
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">

          {products.map(product=>{
           return  <div className="card" onClick={()=>{
            setPostDetails(product)
            navigate('/view')
           }}>
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                <img src={product.url} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="category">{product.category}</span>
                <p className="name"> {product.product}</p>
              </div>
              <div className="date">
                <span>{product.createAt}</span>
              </div>
            </div>
          })
          }

        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">

          {products.map(product=>{
           return  <div className="card" onClick={()=>{
            setPostDetails(product)
            navigate('/view')
           }}>
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                <img src={product.url} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="category">{product.category}</span>
                <p className="name"> {product.product}</p>
              </div>
              <div className="date">
                <span>{product.createAt}</span>
              </div>
            </div>
          })
          }

        </div>
      </div>
    </div>
  );
}

export default Posts;
