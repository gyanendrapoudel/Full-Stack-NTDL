import { useEffect, useRef, useState } from 'react'
import {Table, Form} from './components'
import './App.css'
import { deleteTasks, editTask, getAllTasks, postRequest } from './axios/axios';
const hoursPerWeek = 24*7;
function App() {
  const [taskList, setTaskList]  = useState([])
  const [response, setResponse] = useState({})
  const [itemToDelete, setItemToDelete] = useState([])
  const entryList = taskList.filter((list) => list.type === 'entry')
  const badList = taskList.filter((list) => list.type === 'bad')
 
  const renderOnce = useRef(true)
   
  useEffect(() => {
    //  renderOnce.current && 
    fetchingTasks()
    
    //  renderOnce.current=false

  }, [])
  // delete tasks 
   const handleChange = (e) => {
     const { checked, value } = e.target
     let tempArray = []
     if (value === 'entry') {
       tempArray = entryList
     }
     if (value === 'bad') {
       tempArray = badList
     }
     if (checked) {
       if (value === 'entry' || value === 'bad') {
         const newList = tempArray.filter(
           (list) => !itemToDelete.includes(list._id)
         )
         const newListId = newList.map((list) => list._id)
         return setItemToDelete([...itemToDelete, ...newListId])
       }
       !itemToDelete.includes(value) &&
         setItemToDelete([...itemToDelete, value])
     } else {
       if (value === 'entry' || value === 'bad') {
         const ids = tempArray.map((item) => item._id)
         return setItemToDelete(
           itemToDelete.filter((item) => !ids.includes(item))
         )
       }
       setItemToDelete(itemToDelete.filter((id) => id !== value))
     }
   }
  const handleSwitchTask = async (id, type)=>{
     const resp = await editTask(id, type)
     setResponse(resp)
     resp?.status==="success" && fetchingTasks()
  }

  const handleDelete = async (items)=>{
    const proceed = confirm("Are you sure you want to delete this ")
    if(proceed){
     const resp = await deleteTasks(items)
     setResponse(resp)
     resp?.status === 'success' && fetchingTasks()
      resp?.status === 'success' && setItemToDelete([])
    
  }
  }
  const occupiedHour = taskList.reduce((acc,list)=>acc+parseInt(list.hr),0) 

  const addTaskList = async(objTask)=>{
    if(occupiedHour+parseInt(objTask.hr)>hoursPerWeek){
      return alert("Maximum hours reached")
    }

    const resp = await postRequest(objTask)
    setResponse(resp)
    setTaskList([...taskList, resp.result])
  }

 
  const fetchingTasks = async ()=>{
   
    const result = await getAllTasks()
    result?.status==="success" && setTaskList(result.tasks)
   
  }
  
  const wrapper = 
    { 
      minHeight: "100vh",
      background:"linear-gradient(rgba(208, 109, 208, 0.746),rgba(132, 49, 49, 0.57))",    
    }

  return (
    <div className="pt-5" style={wrapper}>
      <h1 className="text-center mb-5">Not To Do Lists</h1>
      {/* alert msg */}
      {response?.msg && (
        <div
          className={
            response?.status === 'success'
              ? 'alert alert-success w-50 m-auto my-2'
              : 'alert alert-danger w-50 m-auto my-2'
          }
        >
          {response?.msg}
        </div>
      )}
      {/* form */}
      <Form addTaskList={addTaskList} />

      {/* table */}

      <Table
        taskList={taskList}
        handleSwitchTask={handleSwitchTask}
        handleDelete={handleDelete}
        handleChange={handleChange}
        itemToDelete={itemToDelete}
        badList={badList}
        entryList={entryList}
      />
    </div>
  )
}

export default App
