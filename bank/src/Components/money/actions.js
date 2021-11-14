import React from 'react';
import axios from 'axios';
import Depositing from "./Depositing";
import UpdatingCredit from "./UpdatingCredit";
import Transforming from "./Transferring";
import Withdraw from "./Withdraw";

const CashActions = () => {

    const actions = ['Depositing', 'Update Credit', 'Withdraw Money', 'Transforming']
    const [chosenAct, setChosenAct] = React.useState('')

    const changeHandler = (e) => {
        setChosenAct(e.target.value)
    }

    return (
        <div>
            <select onChange={changeHandler}>
                <option>Pick An Action</option>
                {actions.map((a, index) => {
                    return <option key={index}>{a}</option>
                })
                }
            </select>
            {
                chosenAct === 'Depositing' ? <Depositing/> :
                chosenAct === 'Update Credit' ? <UpdatingCredit/> :
                chosenAct === 'Withdraw Money' ? <Withdraw/> :
                chosenAct === 'Transforming' ? <Transforming/> : ""

            }
        </div>
    )
}
export default CashActions