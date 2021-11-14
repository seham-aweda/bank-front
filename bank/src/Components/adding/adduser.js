import React from 'react'
import axios from 'axios'

const Adding=()=>{
    const [newUser,setNewUser]=React.useState({
        firstName:'', lastName:'', country:'', email:'', passportId:''
    })
    const [err,setErr]=React.useState('')
    const ChangeHandler=(e)=>{
        setNewUser({...newUser,[e.target.name]:e.target.value})
    }

    const ClickHandler=()=>{
        setErr('')
        console.log(newUser)
        axios.post('http://127.0.0.1:5000/',newUser).then(res=> {
            console.log('res', res)
            if (res.status !== 202) {
                setErr(res.data+'❌')
            }else{
                setErr('New BankUser Has Been Added ✅')
            }
        }).catch(err=>console.log('err',err))
        setNewUser({
            firstName:'', lastName:'', country:'', email:'', passportId:''
        })

    }
    return(
        <div>
            FirstName: <input type={'text'} value={newUser.firstName} name={'firstName'} onChange={ChangeHandler}/><br/>
            LastName: <input type={'text'} value={newUser.lastName} name={'lastName'} onChange={ChangeHandler}/><br/>
            PassportId: <input type={'text'} value={newUser.passportId} name={'passportId'} onChange={ChangeHandler}/><br/>
            Country: <input type={'text'} value={newUser.country} name={'country'} onChange={ChangeHandler}/><br/>
            Email: <input type={'text'} value={newUser.email} name={'email'} onChange={ChangeHandler}/><br/>
            <input type={'button'} value={'Add'} onClick={ClickHandler}/>
            <br/>
            <p style={{color:'blue',fontSize:'20px'}}>{err}</p>
        </div>
    )
}
export default Adding