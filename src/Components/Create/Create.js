import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext, firebaseContext } from '../../store/firebaseContext';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [product,setProduct] = useState('');
  const [category,setCategory] = useState('');
  const [price,setPrice] = useState('');
  const [image,setImage] = useState('');

  const {firebase} = useContext(firebaseContext)
  const {user} = useContext(AuthContext)

  const navigate = useNavigate()

  const date = new Date()

  const handleSubmit = () =>{

    if (!product || !category || !price || !image) {
      alert('Please fill in all the required fields.');
      return;
    }
    // Generate a unique name for the image file
    const imageName = `${Date.now()}_${image.name}`;
    firebase.storage().ref(`/image/${imageName}`).put(image).then(({ref})=>{
      ref.getDownloadURL().then((url)=>{
        console.log(url);
        firebase.firestore().collection('products').add({
          product,  
          category,
          price,
          url,
          userId :user.uid,
          createdAt :date.toDateString()
        })
        navigate('/')
      })
    })
  }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
            <label htmlFor="fname">Product :</label>
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={product}
              onChange={(e)=>{
                setProduct(e.target.value)
              }}
              required
            />
            <br />
            <label htmlFor="fname">Category :</label>
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={category}
              onChange={(e)=>{
                setCategory(e.target.value)
              }}
              required
            />
            <br />
            <label htmlFor="fname">Price :</label>
            <br />
            <input 
            className="input" 
            type="number" id="fname" 
            name="Price"
            value={price}
            onChange={(e)=>{
              setPrice(e.target.value)
            }} 
            required
            />
            <br />
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>
            <br />
            <input 
            type="file" 
            onChange={(e)=>{
              setImage(e.target.files[0])
            }}
            required
            />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
