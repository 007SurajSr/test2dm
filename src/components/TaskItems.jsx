import React, { useContext   } from "react";
import TaskContext from "./Context/TaskContext";

const TaskItems = (props) => {
  const context = useContext(TaskContext);
  const {deleteTask} = context;
  const {task, updateTask  } = props;
   
   
  
  
  return (
    <div className="col-md-4">
      <div className="card my-4">
        <div className="card-body">
          <h4>{task.date}</h4>
          <div className="d-flex align-items-center">
            <h5 className="card-title">{task.title}</h5>
            
            <i className="fa-solid fa-trash mx-2" title="Delete task" onClick={()=>{deleteTask(task._id); 
              props.showAlert("Deleted successfully","success");}}></i>

            <i className="fa-solid fa-pen-to-square mx-2" title="Update task" onClick={()=>{updateTask(task);}}></i>

            <i className= "fa-regular fa-circle-check"  aria-label="Complete todo" title="Complete todo"></i>
          
          </div>
          <p className="card-text"> {task.description}</p>
        </div>
        <h6>{task.status}</h6>
      </div>
    </div>
  );
};

export default TaskItems;
