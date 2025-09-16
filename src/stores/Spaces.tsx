import {create} from "zustand"
import axios from "axios"

interface Spaces_store{
    name : string
    description: string
    size : number
    capacity : number
    floor : any
    price_per_hour : number
    thumbnail : any
    fetchSpaces : (id: number) => Promise<void>
}

const useSpace = create<Spaces_store>((set) => ({ 
    name : "",
    description: "",
    size : 0,
    capacity : 0,
    floor : null,
    price_per_hour : 0,
    thumbnail : null,

    fetchSpaces: async (id) => {
        try {
            const response = await axios.get(`spaces/${id}`)
            const newResponse = response.data.spaces["space1"]

            set(() => ({
                name: newResponse.name,
                description: newResponse.description,
                size: newResponse.size,
                capacity : newResponse.capacity,
                floor: newResponse.floor,
                price_per_hour: newResponse.price_per_hour,
                thumbnail: newResponse.thumbnail
            }))
        
       } catch(error) {
        set({name : "",description: "",size : 0,capacity : 0,floor : null,price_per_hour : 0,thumbnail : null})
        console.log("error fetching spaces", error)
        }
    }
}))

export default useSpace;

// This is the Spaces store you can get the data from the Spaces tabel from here with all the data needed for your Hooks
