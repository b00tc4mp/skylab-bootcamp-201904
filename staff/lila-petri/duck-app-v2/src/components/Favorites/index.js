import React from 'react'
import literals from './literals'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'

function Favorites({lang, favs, onReturn, onFav}) {
    const { favorites, comeback, results } = literals[lang]
    if (favs.length){
    return <div className="home">
        <h2>{favorites}</h2>
        <button onClick={onReturn}>{comeback}</button>

    <ul>
        {
            favs.map(({ id, title, imageUrl: image, price }) =>{
                const isFav = favs.some(fav => fav.id === id)

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
        return <div className="home">
        <h2>{favorites}</h2>
        <button onClick={onReturn}>{comeback}</button>

        <p>{results}</p>
        </div>
    }
}

export default Favorites