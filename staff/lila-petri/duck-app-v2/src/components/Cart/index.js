import React from 'react'
import literals from './literals'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'

function Cart({lang, onReturn, cart, onFav}) {
    const { mycart, comeback, results } = literals[lang]
    if (cart.length){
    return <div>
        <h2>{mycart}</h2>
        <button onClick={onReturn}>{comeback}</button>

    <ul>
        {
            cart.map(({ id, title, image, price }) =>{
                const isFav = cart.some(item => item.id === id)

                return <li key={id}>
                    <h2>{title}</h2>
                    <FontAwesomeIcon icon={isFav ? faHeartSolid : faHeartRegular} onClick={e => {
                        e.stopPropagation()
                        onFav(id)
                    }} />
                    <img src={image} />
                    <span>{price}</span>
                </li>
            })
        }
    </ul> 
    </div>
    }else {
        return <div>
        <h2>{mycart}</h2>
        <button onClick={onReturn}>{comeback}</button>

        <p>{results}</p>
        </div>
    }
}

export default Cart