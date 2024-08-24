import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
    },
    hr: {
      type: Number,
      required: true,
      min: 1,
      max: [100, 'max hour per task is 100'],
    },
    type: {
      type:String,
      enum: ['entry', 'bad'],
      default:"entry"
    },
  },
  { timestamps: true }
)
const TaskCollection = mongoose.model('Task', taskSchema)

export const insertTask = (taskObj)=>{
  return TaskCollection(taskObj).save();
}
export const getTasks = ()=>{
  return TaskCollection.find({})
}

export const updateTask = (_id,rest)=>{
  
return TaskCollection.findOneAndUpdate({_id},rest,{new:true})
}

export const deleteTask = (ids)=>{
  return TaskCollection.deleteMany({_id:{$in:ids}})
}