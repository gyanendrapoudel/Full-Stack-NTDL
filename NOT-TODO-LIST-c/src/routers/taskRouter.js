import express from 'express'
import mongoose from 'mongoose'
const router = express.Router()
import {
  deleteTask,
  getTasks,
  insertTask,
  updateTask,
} from '../models/TaskModel/TaskSchema.js'

let fakeDb = [
  { id: 1, task: 'washing', hr: 8, type: 'entry' },
  { id: 2, task: 'gaming', hr: 10, type: 'entry' },
  { id: 3, task: 'swimming', hr: 5, type: 'entry' },
  { id: 4, task: 'reading', hr: 15, type: 'entry' },
]

router.get('/', async (req, res) => {
  const tasks = await getTasks()
  res.json({
    status: 'success',
    msg: 'response from get',
    tasks,
  })
})

router.post('/', async (req, res) => {
  try {
      const { task, hr } = req.body
      console.log(req.body)
      const result = await insertTask({task,hr})
      console.log(result)

      res.send({
        status: 'success',
        msg: 'new task has been added',
        result,
      })
  } catch (error) {
    console.log(error.message)
    res.send({msg:error.message})
  }

})

router.patch("/", async (req,res)=>{
    try {
      const {_id, ...rest} = req.body
      const result = await updateTask(_id, rest)
      result?._id
        ? res.json({
            status: 'success',
            msg: 'task has been updated',
            result,
          })
        : res.json({
            status: 'error',
            msg: 'Unable to update task ',
          })

    } catch (error) {
        res.json({
          status: 'error',
          msg: error.message,
        })
    }

})

// router.delete('/:id', async (req,res)=>{
//   const {id} = req.params
  
//   const result = await deleteTask(id)
//   console.log(result)
//   res.json({
//     status:"success",
//     msg:"Task has been deleted",
//     result
//   })
// })

// Delete many tasks
router.delete('/', async (req,res)=>{
  
  const ids = req.body
  const result = await deleteTask(ids)
  result?.deletedCount
    ? res.json({
        status: 'success',
        msg: 'Task has been deleted',
        
      })
    : res.json({
        status: 'error',
        msg: 'Unable to delete task',
        
      })
  
})
export default router