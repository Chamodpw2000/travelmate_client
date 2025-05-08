import React from 'react'
import kandy from "../../assets/kandy.jpeg"
import { Button } from 'react-bootstrap'


const SearchResult = () => {
  return (
    <div>

<div className="my-3 mx-3 px-2 py-3 rounded-pill mx-auto" style={{width:"50%", border: '2px solid #000', cursor: 'pointer' }} onClick={{}}>
    <div className="d-flex">
        <div style={{ width: "30%" }} className="mx-3 my-auto">
            <img src={kandy} alt="city" className="rounded-pill" style={{ width: '100%', height: "100px" }} />
        </div>

        <div>
            <div>
                <h3>Kandy</h3>
            </div>

            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium debitis perspiciatis ex iste aperiam eligendi vero ipsum autem recusandae dignissimos.</p>
        </div>
    </div>
</div>


    </div>



  )
}

export default SearchResult