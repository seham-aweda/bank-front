import React from "react";
import axios from "axios";
const Withdraw=()=>{
const [bankers, setBankers] = React.useState([])
const [input, setInput] = React.useState('');
const [des, setDes] = React.useState({
    withdraw:''
});
const [truthy,setTruthy]=React.useState(false)
const [err, setErr] = React.useState("");
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
    if (input !== 'Pick A User') {
        if (input.includes('/')) {
            setErr('')
            const pass = input.slice(0, input.match('/').index)
            if(/^\d+$/.test(des.withdraw)&&des.withdraw>0) {
                let found = bankers.find(b => b.PassportId === pass)
                if(des.withdraw<=found.Cash+found.Credit) {
                    axios.put('http://127.0.0.1:5000/withdraw/' + pass, des).then(res => {
                        console.log(res)

                    setErr(`Now ${res.data.success.FirstName + " " + res.data.success.LastName} withdraw ${des.withdraw} and Her Account status:
                cash:${res.data.success.Cash}`)})
                }else if(found.Cash+found.Credit===0){
                            setErr(`Your balance: ${found.Cash+found.Credit}, So u cant withdraw money`)
                    }else{
                    setErr(`u can only withdraw at max ${found.Cash+found.Credit}`)
                }
            }else{
                setErr('Enter A Positive Number')
            }
        }
        else {
            setErr('Pick A User')
        }
    }
    setTruthy(true)
    setDes({withdraw:''})
}

const inputHandler=(e)=>{
    setDes({...des, [e.target.name]: e.target.value})

}
const Another=()=>{
    setTruthy(false)
    setErr('')
    setDes({withdraw:''})
    setInput('')
}
return(
    <div style={{marginTop:"150px"}}>
        {truthy ?
            <div style={{color:'blue',fontSize:'20px'}}>{err}<br/>
                <input type={"button"} value={"Do Another"} onClick={Another}/>
            </div>:
            <div>
                PassportId : <select onChange={Selection}>
                <option>Pick A User</option>
                {bankers.map(b => {
                    return <option key={b.id}>{b.PassportId}/{b.FirstName + " " + b.LastName}</option>
                })}
            </select>
                <br/>
                Amount Of Withdraw : <input type={"text"} value={des.withdraw} name={'withdraw'} onChange={inputHandler}/> <br/>
                <input type={"button"} value={'Done'} onClick={getUserBySelect}/><br/>
            </div>}
    </div>
)
}
export default Withdraw