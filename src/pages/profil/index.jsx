import React, { useState, useEffect } from "react";
//import { useAtom } from "jotai";
//import { jwtAtom } from "atoms/atoms";
import { useSelector } from "react-redux";
//import Cookies from "js-cookie";



const MyProfile =() => {


    const jwt = useSelector((state) => state.token);
 
    useEffect(
    () => 
        {   
            fetch('http://localhost:1337/users/me', {
              method: 'get',
              headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json'
              }
            })
            .then((res) => {return res.json()})
            .then((res) => {
              setEmail(res.email);
              setUsername(res.username);
              setDescription(res.description);
              console.log(res)
            })
          }, []   
    )


    //const [JWT, setJWT] = useAtom(jwtAtom);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");

    function newInfo(e){

    setUsername(document.getElementById("username").value);
    setEmail(document.getElementById("email").value);
    setDescription(document.getElementById("description").value);
    
    const data = {
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        description: document.getElementById("description").value
    }

    const options = {
        method: 'put',
        headers: { 
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    e.preventDefault(data)
   fetch('http://localhost:1337/users/me', options)
      .then(function(res) {
          if (res.ok) {
              console.log(res)
              return res.json();
          }
      })
      .then(function(value) {
          console.log(value)
      
     
      })}
    
    


    return (
        <>
        <div className="information">
        <h2>Mon profil</h2>
        <h4>username:{username} </h4>
        <h4>email:{email} </h4> 
        <h4>description: {description}</h4>
        </div>
        <br/>
        <h3>Modifiez vos informations</h3>
        <form>
            <input id="username" type="text" placeholder="john doe" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input id="email" type="text" placeholder="johndoe@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input id="description" type="area" placeholder="Votre présentation" value={description} onChange={(e) => setDescription(e.target.value)} />
            <input type="submit" onClick={newInfo} />
        </form>
        </>
    )
}

export default MyProfile;