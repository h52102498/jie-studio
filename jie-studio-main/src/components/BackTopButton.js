import React from "react";
import { useState,useEffect } from "react";

function BackTopButton(){
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
          if (window.scrollY > 10) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        };
    
        window.addEventListener('scroll', toggleVisibility);
    
        return () => window.removeEventListener('scroll', toggleVisibility);
      }, []);

    const scrollUp=()=>{
        window.scrollTo({
            top:0,
            behavior:"smooth"
        })
    }
    
    return(<>
        {isVisible && (
            <button
              aria-label='Back to top'
              className='btn btn-dark btn-lg back-top-button d-flex justify-content-center'
              onClick={scrollUp}
            >
              <i className='bi bi-arrow-up text-white'></i>
            </button>
          )}
          </>
    )
}

export default BackTopButton;