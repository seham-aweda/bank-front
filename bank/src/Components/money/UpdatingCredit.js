import React from 'react'
import axios from 'axios'

const UpdatingCredit=()=>{
    const [bankers, setBankers] = React.useState([])
    const [input, setInput] = React.useState('');
    const [des, setDes] = React.useState({
        Credit:''
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
                if(/^\d+$/.test(des.Credit)&&des.Credit>=0) {
                    axios.put('http://127.0.0.1:5000/updating/'+pass,des).then(res=>{
                        console.log(res)
                    })
                    let found = bankers.find(b => b.PassportId === pass)
                    setErr(`Now ${found.FirstName + " " + found.LastName} Have ${parseInt(des.Credit)} As A Credit Limit`)

                }else{
                    setErr('Enter A Positive Number')
                }
            }
            else {
                setErr('Pick A User')
            }
        }
        setTruthy(true)
        setDes({Credit:''})
    }

    const inputHandler=(e)=>{
        setDes({...des, [e.target.name]: e.target.value})

    }
    const Another=()=>{
        setTruthy(false)
        setErr('')
        setDes({Credit:''})
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
                    Credit : <input type={"text"} value={des.Credit} name={'Credit'} onChange={inputHandler}/> <br/>
                    <input type={"button"} value={'Done'} onClick={getUserBySelect}/><br/>
                </div>}
        </div>
    )
}
export default UpdatingCredit
