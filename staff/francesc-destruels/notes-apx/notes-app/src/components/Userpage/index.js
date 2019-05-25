import React from 'react'

function Userpage({ items, userData, onPost, onBack }) {

    const { name, surname, email } = userData

    return <div>
        <h3>{name}</h3>
        <h4>{surname}</h4>
        <h5>{email}</h5>

        <h3>My Private Notes</h3>
        <ul>
            {
                items.map(({ text, date }) => {
                    return <li>
                        <p>{date}</p>
                        <p>{text}</p>
                    </li>
                })
            }
        </ul>

        <form onSubmit={e => {
            e.preventDefault()

            const radios = document.getElementsByName("note")
            const texto =  document.getElementById("notess").value

            let value

            for (var i = 0, length = radios.length; i < length; i++) {
                if (radios[i].checked) {
                    if (i === 0) value = true
                    else value = false
                    break;
                }
            }
            return onPost(texto, value)
        }}>

            <input type="radio" name="note" value="private" checked />Private
            <input type="radio" name="note" value="public" />Public
            <textarea id="notess" name="comments" >
                Hey... say something!
            </textarea> <br />
            <input type="submit" />
        </form>
        <button onClick={onBack}>Go back</button>
    </div>
}

export default Userpage