import React from 'react'
import literals from './literals'
import {ToastsContainer, ToastsStore} from 'react-toasts'

function Checkout({lang, name, onPayment}) {
    const {checkout, topay, cardholder, confirm, number}=literals[lang]
    return <div className="home">
        <h2>{checkout}</h2>
        <label>{name}<p>{topay}</p></label>
        <h2>visa</h2>
            <form>
                <input type="text" name="firstname" placeholder={number}></input> <br></br>
                <input type="text" name="firstname" placeholder={cardholder}></input> <br></br>
            </form>
            <button onClick={onPayment}>{confirm}</button>
            <ToastsContainer store={ToastsStore}/>
    </div>
}

export default Checkout