import React from 'react';
import axios from 'axios';
import OneUser from "./bankUser";

const AllUsers=()=>{
    const [bankers,setBankers]=React.useState('')
    React.useEffect(()=>{
        GetData()
    },[])

    const GetData=()=>{
        axios.get('http://127.0.0.1:5000/').then(res=>{
            setBankers(res.data)
        }).catch(err=>{
            console.log(err)
        })
    }
    return(
        <>
        <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',width:"100vw"}}>
            {bankers?
             bankers.map(b=>{
                 return <OneUser key={b.id} id={b.PassportId} name={b.FirstName+" "+b.LastName} country={b.Country} email={b.Email} cash={b.Cash} credit={b.Credit}/>
             }):''
            }
    </div>
        </>
    )
}
export default AllUsers