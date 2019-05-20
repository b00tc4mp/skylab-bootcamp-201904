import React from 'react'
import literals from './literals'


function Orders({lang, orders, onReturn}) {
    const { myorders, comeback, ordersmessage } = literals[lang]
    
    if (orders.length){
    return <div className="home">
        <h2>{myorders}</h2>
        <button onClick={onReturn}>{comeback}</button>

    <ul>
        {
            orders.map(({ id, date }) =>{
                return <li key={id}>
                    <span>{id} </span>
                    <span>{date}</span>
                </li>
            })
        }
    </ul> 
    </div>
    }else {
        return <div className="home">
        <h2>{myorders}</h2>
        <button onClick={onReturn}>{comeback}</button>

        <p>{ordersmessage}</p>
        </div>
    }
}

export default Orders