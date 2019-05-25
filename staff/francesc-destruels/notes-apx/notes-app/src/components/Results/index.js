import React from 'react'

function Results({ items }) {
    return <ul>
        {
            items.map(({ text, author, date, authorId}) =>{

                return <li key={Math.random()*100} name={authorId}>
                    <h2>{author}</h2>
                    <p>{text}</p>
                    <p>{date}</p>
                </li>
            })
        }
    </ul>
}

export default Results