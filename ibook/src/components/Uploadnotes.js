import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Uploadnotes(props) {
  const uname = props.name;
  const [note, setNote] = useState({
    title: '',
    description: '',
    date: '',
  });
  //const [submitted, setSubmitted] = useState(false); // Track form submission

  const clearForm = () => {
    // Reset the note state to clear the form
    setNote({
      title: '',
      description: '',
      date: '',
    });
  };

  const onCancelClick = () => {
    clearForm(); // Clear the form when the "Cancel" button is clicked
  };

  const navigate = useNavigate();
  const { title, description, date } = note;

  const onInputchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const result = await axios.post(
        `http://localhost:8080/uploadnotes/${uname}`,
        note
      );
      console.log(uname);


      if (result.data === "Notes Saved in " + uname + "'s repository") {
        clearForm();
       
        props.uploadNewnotetoUi();
       
        props.showAlert("Notes Saved in " + uname + "'s repository", "success");

       
      } else if (
        result.data ===
        'Unable to Save Notes Due to Wrong Username or User Does not exist'
      ) {
        props.showAlert(
          'Unable to Save Notes Due to Wrong Username or User Does not exist',
          'danger'
        );
      }

      console.log(result.data);
     // setSubmitted(true); // Set submitted state to true after successful submission
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
     <button type="button"  onClick={() => navigate('/')}  style={{"marginRight":"-1405px","marginTop":"-168px"}} className="btn btn-secondary" >
         Logout
        </button>
      
          <h3  style={{"marginTop":"-108px",color: props.mode==='light'?'black':'gray'}}>
           Add a note:
           
          </h3>
          <form
            className="container my-3"
            style={{ width: '60%' }}
            onSubmit={(e) => submit(e)}
          >
            <div className="container">
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label" style={{color: props.mode==='light'?'black':'gray'}}>
                  Title
                </label>
                <input
                  type="text" style={{backgroundColor: props.mode==='light'?'gray':'#161414',color: props.mode==='light'?'black':'gray',border: props.mode==='light'?'white':'gray'}}
                  className="form-control"
                  id="exampleFormControlInput12"
                  required
                  minLength={5}
                  value={title}
                  name="title"
                  onChange={(e) => onInputchange(e)}
                  placeholder="Title"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label" style={{color: props.mode==='light'?'black':'gray'}}
                >
                  Description
                </label>
                <textarea
                  className="form-control" style={{backgroundColor: props.mode==='light'?'gray':'#161414',color: props.mode==='light'?'black':'gray',border: props.mode==='light'?'white':'gray'}}
                  id="exampleFormControlTextarea1"
                  required
                  minLength={5}
                  value={description}
                  name="description"
                  onChange={(e) => onInputchange(e)}
                  placeholder="Description"
                  rows="3"
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="datePicker" style={{color: props.mode==='light'?'black':'gray'}}>
                  Please Enter date in YYYY-MM-DD format:
                </label>
                <input style={{backgroundColor: props.mode==='light'?'gray':'#161414',color: props.mode==='light'?'black':'gray',border: props.mode==='light'?'white':'gray'}}
                  type="text"
                  id="datePicker"
                  name="date"
                  required
                  value={date}
                  onChange={(e) => onInputchange(e)}
                  pattern="\d{4}-\d{2}-\d{2}"
                />
              </div>
              <div>
             
                <button
                  type="submit"
                  className="btn btn-outline-danger"
                  style={{ marginTop: '18px' }} onClick={onCancelClick}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-outline-primary"
                  style={{
                    marginLeft: '343px',
                    marginTop: '18px',
                  }}
                >
                  Upload
                </button>
              </div>
            </div>
          </form>
       </>
    
  );
}
