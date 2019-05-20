import React from 'react'
import literals from './literals'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt as faTrashAltSolid } from '@fortawesome/free-solid-svg-icons'

function Cart({lang, onReturn, cart, onDelete, onCheckout}) {
    const { mycart, comeback, results , topay, checkout} = literals[lang]
    let total=0
    if (cart.length){
    return <div className="home">
        <h2>{mycart}</h2>
        <button onClick={onReturn}>{comeback}</button>

    <ul>
        {
            cart.reduce((acc, current) => {
                const x = acc.find(item => item.id === current.id)
                let res=Number(current.price.slice(0, 4))
                total+= res
                total=Math.round(total * 100) / 100
                if (!x) {
                    
                    return acc.concat([current])
                } else {

                    return acc;
                }
            }, []).map(({ id, title, imageUrl: image, price }) =>{
                
                return <li key={id}>
                    <h2>{title}</h2>
                    <img src={image} />
                    <FontAwesomeIcon icon={faTrashAltSolid} onClick={e => {
                        e.stopPropagation()
                        onDelete(id)
                    }} />
                    <span>{price}</span>
                </li>
            })
        }
    </ul> 
    <label>{topay}: </label><span>{total} € </span>
    <button onClick={onCheckout}>{checkout}</button>
    </div>
    }else {
        return <div className="home">
        <h2>{mycart}</h2>
        <button onClick={onReturn}>{comeback}</button>

        <p>{results}</p>
        </div>
    }
}

export default Cart