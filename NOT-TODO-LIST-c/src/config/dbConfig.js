import { mongoose } from "mongoose";
import 'dotenv/config'


  export const connectionMongoose = ()=>{

mongoose.connect( process.env.MONGO_URI).then(()=>console.log('Connected to DB')).catch((error)=>console.log('something went wrong'))
        
   
  } 