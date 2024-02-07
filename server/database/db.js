import mongoose from 'mongoose';

const Connection = async(username, password)=>{
    const URL = `mongodb+srv://${username}:${password}@anup.rforof9.mongodb.net/`
   try{
    await mongoose.connect(URL, {useNewUrlParser:true})
    console.log('database connected')
   }catch (error){
    console.log('error in connection', error)
   }
}

export default Connection;