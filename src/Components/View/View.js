import React, { useContext, useEffect, useState } from 'react';
import {firebaseContext} from '../../store/firebaseContext';
import {postContext} from '../../store/postContext';
import './View.css';


function View() {

  const [userDetails,setUserDetails] = useState();

  const {firebase} = useContext(firebaseContext)
  const {postDetails} = useContext(postContext)

  useEffect(() => {
    const {userId} = postDetails
    firebase.firestore().collection('users').where('id','==',userId).get().then((res)=>{
      res.forEach(doc => {
        setUserDetails(doc.data())
      });
    })
  },[]);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.product}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
       {userDetails &&  
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.userName}</p>
          <p>{userDetails.phone}</p>
        </div>
        }
      </div>
    </div>
  );
}
export default View;
