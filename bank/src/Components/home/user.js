import React from 'react';
import OneUser from "./bankUser";
import axios from "axios";

const User = () => {
    const [bankers, setBankers] = React.useState([])
    const [input, setInput] = React.useState('');
    const [err, setErr] = React.useState("");
    const [chosenUser, setChosenUser] = React.useState('')
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

    const Selection = (e) => {
        setInput(e.target.value)
    }

    const getUserBySelect = () => {
        setErr('')
        setChosenUser('')
        if (input !== 'Pick A User') {
            if (input.includes('/')) {
        setErr('')
                const pass = input.slice(0, input.match('/').index)
                let found = bankers.find(b => b.PassportId === pass)
                if (found) {
                    setChosenUser(found)
                }

            } else {
                setChosenUser('')
                setErr('Pick A User')
            }
        }
    }
    return (
        <div>
            <select onChange={Selection}>
                <option>Pick A User</option>
                {bankers.map(b => {
                    return <option key={b.id}>{b.PassportId}/{b.FirstName + " " + b.LastName}</option>
                })}
            </select>
            <input type={"button"} value={'Check'} onClick={getUserBySelect}/>
            {err === '' ?
                chosenUser !== '' ?
                    <OneUser key={chosenUser.id} id={chosenUser.PassportId}
                             name={chosenUser.FirstName + " " + chosenUser.LastName} country={chosenUser.Country}
                             email={chosenUser.Email} cash={chosenUser.Cash} credit={chosenUser.Credit}/>
                    : ""
                :
                <div style={{color:'blue',fontSize:'20px'}}>{err}</div>}
        </div>
    )
}
export default User