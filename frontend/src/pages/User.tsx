import { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";



export function User() {
    
    const params = useParams()
    const id = params.id
    const [data, setData] = useState()

    useEffect(() => {
       
        
        async function getData() {
            const data = await fetch(`/${id}`).then(res => res.json())
            setData(data)
        }
        getData()
    }, [])

    return(
        <div>
            qweq
        </div>
    )
}