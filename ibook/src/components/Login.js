import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Viewnotes from './Viewnotes';
//import Uploadnotes from './Uploadnotes';

export default function Login(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({
    name: '',
    password: '',
  });
  const { name, password } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post("http://localhost:8080/login", user);
      console.log(result.data);
      
      if(result.data==="Wrong Password or User Name"){
        setLoggedIn(false);
       props.showAlert("Wrong Password or Email","warning");
      
      }
      else{
        setLoggedIn(true);
        props.showAlert("Logged in Successfully!","success");
      }
     
    }
    
    
    catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!loggedIn ? (
        <div>
         
          <h1 className='container' style={{color: props.mode==='light'?'black':'gray',marginTop:"85px",marginBottom:"=61px"}}>Login</h1>
          <form className='container' style={{"width":"45%","marginTop":"91px"}} onSubmit={(e) => submit(e)}>
         
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" style={{color: props.mode==='light'?'black':'gray'}} className="form-label">
                User Name
              </label>
              <input
                type="text" required style={{backgroundColor: props.mode==='light'?'gray':'#161414',color: props.mode==='light'?'black':'gray',border: props.mode==='light'?'white':'gray'}}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
              />
              
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1"  style={{color: props.mode==='light'?'black':'gray'}} className="form-label">
                Password
              </label>
              <input
                type="password" required style={{backgroundColor: props.mode==='light'?'gray':'#161414',color: props.mode==='light'?'black':'gray',border: props.mode==='light'?'white':'gray'}}
                className="form-control"
                id="exampleInputPassword1"
                name="password"
                value={password}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <button type="submit" className={`btn btn-${props.mode==='light'?'dark':'light'}`} style={{"marginTop":"15px"}} >
              Submit
            </button>
          </form>
        </div>
      ) : (
        <>
          <div>
        
          </div>
          <div>
            {/*If login is successfull in the same login component viewnote component will render */}
            <Viewnotes showAlert={props.showAlert} mode={props.mode} name={name} />
          </div>
        </>
      )}
    </>
  );
}
