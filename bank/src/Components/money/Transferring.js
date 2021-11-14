import React from 'react'
import axios from 'axios'

const Transforming=()=>{
    const [bankers, setBankers] = React.useState([])
    const [first,setFirst]=React.useState('')
    const [second,setSecond]=React.useState('')
     React.useEffect(() => {
        GetData()
    },[])

    const GetData = () => {
        axios.get('http://127.0.0.1:5000/').then(res => {
            setBankers(res.data)
        }).catch(err => {
            console.log(err)
        })
    }
    const PickFirst=(e)=>{
        setFirst(e.target.value)
    }
    const PickSecond=(e)=>{
        setSecond(e.target.value)
    }
    return(
        <div>
            From : <select onChange={PickFirst}>
            <option>Pick Any</option>
            {
                bankers.map((n,index)=>{
                    if(second!==""){
                        const pass = second.slice(0, second.match('/').index)
                       let found= bankers.find(y=>y.PassportId!==pass)
                    }

                   return <option key={index}>{n.PassportId}/{n.FirstName + " " + n.LastName}</option>
                })
            }
        </select>
            <br/>
            To : <select onChange={PickSecond}>
            <option>Pick Any</option>
            {
                bankers.map((n,index)=>{
                    return <option key={index}>{n.PassportId}/{n.FirstName + " " + n.LastName}</option>
                })
            }
        </select>
        </div>
    )
}
export default Transforming