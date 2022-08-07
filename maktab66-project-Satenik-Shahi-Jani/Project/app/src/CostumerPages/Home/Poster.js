import React from "react";
import "./poster.css";
import { Link } from "react-router-dom";

export default function Poster(props) {

  const createColorBackGroundClass=(num)=>{
return "class-"+num%5
  }
  return (
    <>
      <div className={`poster-gradient ${createColorBackGroundClass(props.index)}`} dir="rtl">
        <div className="poster-container">
          <div className="poster part-two">
            <div
              className={`poster part-two-absolute ${
                props.isActive ? "slider" : ""
              }`}
            >
              <div className="poster-description  ">
                  <h2 className="poster-title">
                <Link to={`/products/${props.post.id}`}>
                    {/* Title */}
                    {props.post.name}
                </Link>
                  </h2>

                <div className="poster-text">
                  {/* This is some text to describe how greate isthis product is... */}
                  {props.post.poster.length > 110
                    ? props.post.poster.slice(0, 109) + "..."
                    : props.post.poster}
                  {/* <div dangerouslySetInnerHTML={{ __html: props.post.description }} /> */}
                </div>
              </div>
              {/* <button className="poster-button">Read more...</button> */}
              <button className="poster-button">
                <Link to={`/products/${props.post.id}`}>بیشتر بخوانید...</Link>
              </button>
            </div>
          </div>
          <div className="poster part-one">
            <div className="poster-image">
              {/* <img src="https://swiperjs.com/demos/images/nature-1.jpg"  alt="img"/> */}
              <img
                src={`http://localhost:3002/files/${props.post?.images[0]}`}
                alt="img"
              />
            </div>
            <div className="poster-image">
              {/* <img src="https://swiperjs.com/demos/images/nature-2.jpg" alt="img" /> */}
              {props.post?.images[1] ? (
                <img
                  src={`http://localhost:3002/files/${props.post?.images[1]}`}
                  alt="img"
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
