import React, {useState, useEffect} from 'react'
import { toast } from 'sonner'
import axios from 'axios'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CollectionForm from '../../components/forms/CollectionForm';

const ManageCollection = () => {
    const [collection, setCollection] = useState([])

    const getCollection = async() =>{
        try{
            const {data} = await axios.get("/api/v1/collection/get-all-collection")
            if(data?.success){
                setCollection(data.collection)
            }


        }catch(error){
            console.log(error)
            toast.error("Something went wrong in getting collection")   
        }
    }

    useEffect(() =>{
        getCollection()
    }, [])

  return (
    <div>
        <h1 className='text-5xl text-cyan-300 font-bold pb-10'>Manage Collection </h1>
        <h1 className='pb-6'>Create New Collection</h1>
        <CollectionForm/>
        
         <table className="w-full border border-gray-700 text-left">
        <thead className="bg-gray-800 text-gray-300">
          <tr className='border bg-gray-800 '>
            <th className="p-3"></th>
            <th className="p-3 ">Collection Name</th>
            <th className="p-3 ">Actions</th>
          </tr>
        </thead>

        <tbody>
          {collection.map((item, index) => (
            <tr key={item._id} className="text-gray-400 hover:text-gray-100 border">
              <td className="p-3 cursor-pointer">{index + 1}</td>
              <td className="p-3 cursor-pointer ">{item.name}</td>
              <td className="p-3 cursor-pointer text-red-500 hover:text-red-400"><DeleteIcon/>
              <span className='text-yellow-500 hover:text-yellow-400 ml-6'><EditIcon/></span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ManageCollection