import React, { useContext, useEffect, useRef, useState } from 'react'
import TaskContext from './Context/TaskContext';
import TaskItems from './TaskItems';
import AddTasks from './AddTasks';
import { useNavigate } from 'react-router-dom';

const Tasks = (props) => {
   const context = useContext(TaskContext);
   let navigate = useNavigate();
    const { tasks, getTasks, editTask } = context;
    useEffect(() => {
        if(localStorage.getItem('token')){
            getTasks()
        }
        else{
            navigate('/login')
        }
        
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refClose = useRef(null)
    const [task, setTask] = useState({id: "", etitle: "", edescription: "", etag: "", estatus: ""})

    const updateTask = (currentTask) => {
        ref.current.click();
        setTask({id: currentTask._id, etitle: currentTask.title, edescription: currentTask.description, etag:currentTask.tag, estatus:currentTask.status })
        
    }
    

    const handleClick = (e)=>{ 
        editTask(task.id, task.etitle, task.edescription, task.etag, task.estatus)
        refClose.current.click();
        props.showAlert("Updated successfully","success");
    }

    const onChange = (e)=>{
        setTask({...task, [e.target.name]: e.target.value})
    }

    return (
        <>
            <AddTasks   />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit task</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={task.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={task.edescription} onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={task.etag} onChange={onChange} />
                                </div>
 
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={task.etitle.length<5 || task.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update task</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h2>You task</h2>
                <div className="container mx-2"> 
                {tasks.length===0 && 'No task to display'}
                </div>
                {tasks.map((task) => {
                    return <TaskItems key={task._id} updateTask={updateTask} showAlert={props.showAlert}   task={task} />
                })}
            </div>
        </>
    )
}

export default Tasks;