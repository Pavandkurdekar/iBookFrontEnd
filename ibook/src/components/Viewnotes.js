import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import Uploadnotes from "./Uploadnotes";
import Alert from "./Alert";

export default function Viewnotes(props) {


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth" // This makes the scroll smooth and animated
    });
  };
  
 
  const uname = props.name;
  const ref = useRef();
  const refClose = useRef();
  const [selectedId, setselectedId] = useState(null);
  const [allnotes, setAllnotes] = useState([]);
  const [note, setNote] = useState({
    title: "",
    description: "",
  });

  const { title, description } = note;

  const onInputchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const SubmitnewNote = async (e, noteId) => {
    e.preventDefault();

    try {
      const editednotes = await axios.put(
        `http://localhost:8080/editnotes/${noteId}`,
        note
      );

      // Close the modal by simulating a click on the close button
      if (refClose.current) {
        refClose.current.click();
      }

      // After editing, fetch all notes again
      const alleditednotes = await axios.get(
        `http://localhost:8080/getnotes/${uname}`
      );
      console.log(editednotes);
      console.log(alleditednotes);
      props.showAlert("Note Got Edited", "success");
      scrollToTop();

      // Update the allnotes state with the new data
      setAllnotes(alleditednotes.data);
    } catch (error) {
      console.log(error);
    }
  };

  //Function to delete a note .Runs when user clicks on delete icon present on note
  const deletenote = async (id) => {
    console.log("Deleting note with id ", id);
    try {
      await axios.delete(`http://localhost:8080/delete/${id}`);
    } catch (error) {
      console.log(error);
    }

    try {
      const notesafterdeleting = await axios.get(
        `http://localhost:8080/getnotes/${uname}`
      );
      const notes = notesafterdeleting.data;
      setAllnotes(notes);
      props.showAlert("Note Got Deleted", "success");
      scrollToTop();
    } catch (error) {
      console.log(error);
    }
  };

  const editnote = (noteId) => {
    setselectedId(noteId);

    // Open the modal by simulating a click on the open button
    if (ref.current) {
      ref.current.click();
    }

    console.log("Editing noteid=", noteId);
  };

  const submit = async (e) => {
    if (e) {
      e.preventDefault();
    }

    try {
      const result = await axios.get(`http://localhost:8080/getnotes/${uname}`);
      const allnotesData = result.data;
      console.log(allnotesData);

      if (allnotesData === "") {
        props.showAlert("Wrong Password or User Name!!", "warning");
      } else {
        setAllnotes(allnotesData);
      }
    } catch (error) {
      console.log(error);
    }
  };
// This function used to fetch all the notes once again when user creates new note so that new note immediately renders on ui
  const uploadNewnotetoUi = async (e) => {
    if (e) {
      e.preventDefault();
    }

    try {
      const uploadednote = await axios.get(
        `http://localhost:8080/getallnotes/${uname}`
      );
      const uinote = uploadednote.data;
      console.log(uinote);
      setAllnotes(uinote);
    } catch (error) {
      console.log(error);
    }
  };

  // Added useEffect to fetch notes initially when the component mounts
  useEffect(() => {
    submit();
  }, []);

  return (
    <>
      <div>
        <Alert alert={alert} />
        <Uploadnotes
          mode={props.mode}
          name={uname}
          showAlert={props.showAlert}
          uploadNewnotetoUi={uploadNewnotetoUi}
        />

        <h1
          className="mb-2"
          style={{
            marginRight: "1111px",
            color: props.mode === "light" ? "black" : "#9f9898",
          }}
        >
          Your Notes:-
        </h1>

        <div className="row">
          {allnotes.map((note) => (
            <div className="col-md-4" key={note.id}>
              <div
                className="card mb-5 mt-3 mx-auto"
                style={{
                  width: "18rem",
                  backgroundColor: props.mode === "light" ? "gray" : "#161414",
                  color: props.mode === "light" ? "black" : "gray",
                  border: props.mode === "light" ? "white" : "gray",
                }}
              >
                <div className="card-header">
                  <b>{note.title}</b>
                </div>
                <div className="card-body">
                  <p className="card-text">{note.description}</p>
                </div>
                <div className="card-footer text-body-secondary">
                  <p
                    style={{
                      color: props.mode === "light" ? "black" : "gray",
                      marginLeft: "0px",
                    }}
                  >
                    {note.date}
                  </p>
                  <i
                    className="fa-regular fa-pen-to-square"
                    style={{
                      marginRight: "19px",
                      marginLeft: "204px",
                      color: props.mode === "light" ? "black" : "gray",
                    }}
                    onClick={() => editnote(note.id)}
                  ></i>
                  <i
                    className="fa-regular fa-trash-can"
                    style={{ color: props.mode === "light" ? "black" : "gray" }}
                    onClick={() => deletenote(note.id)}
                  ></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Button to open the modal ,this button is hidden via css so that i can open the modal when i click on edit icon present on notes  */}
      <button
        ref={ref}
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        id="modalbuton"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      {/* Modal to edit the note*/}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div
            className="modal-content"
            style={{
              backgroundColor: props.mode === "light" ? "#a19c9c" : "#0e0d0d",
            }}
          >
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form
                className="container my-3"
                style={{ width: "60%" }}
                onSubmit={(e) => SubmitnewNote(e, selectedId)}
              >
                <div className="container">
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                      style={{
                        color: props.mode === "light" ? "black" : "gray",
                      }}
                    >
                      <b>Title</b>
                    </label>
                    <input
                      type="text"
                      style={{
                        backgroundColor:
                          props.mode === "light" ? "gray" : "#161414",
                        color: props.mode === "light" ? "black" : "gray",
                        border: props.mode === "light" ? "white" : "gray",
                      }}
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
                      className="form-label"
                      style={{
                        color: props.mode === "light" ? "black" : "gray",
                      }}
                    >
                      <b>Description</b>
                    </label>
                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      style={{
                        backgroundColor:
                          props.mode === "light" ? "gray" : "#161414",
                        color: props.mode === "light" ? "black" : "gray",
                        border: props.mode === "light" ? "white" : "gray",
                      }}
                      required
                      minLength={5}
                      value={description}
                      name="description"
                      onChange={(e) => onInputchange(e)}
                      placeholder="Description"
                      rows="3"
                    ></textarea>
                  </div>
                </div>
                <div
                  className="modal-footer"
                  style={{ border: props.mode === "light" ? "white" : "gray" }}
                >
                  <button
                    ref={refClose}
                    type="button"
                    className="btn btn-outline-danger"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-outline-primary"
                    style={{ marginLeft: "50px" ,color: props.mode==='light'?'black':'gray'}}
                  >
                    Edit Note
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
