import React from 'react';
import './index.sass'
import logic from '../../logic';

function Register({ onRegister, error }) {

     function handleSubmit(e) {

        e.preventDefault()

        const {
            name: { value: name },
            email: { value: email },
            password: { value: password },

        } = e.target
         onRegister(name, email, password)
    }

    return (
        
            <form onSubmit={handleSubmit}>
                <div className='field'>
                    <label className='label'>Name</label>
                    <div className='control'>
                        <input className='input' name='name' type='text' placeholder='Name' />
                    </div>
                </div>
                <div className="field">
                    <div className="control has-icons-left has-icons-right">
                        <input className="input" name='email' type="email" placeholder="Email" />
                        <span className="icon is-small is-left">
                            <i className="fas fa-envelope"></i>
                        </span>
                        <span className="icon is-small is-right">
                            <i className="fas fa-check"></i>
                        </span>
                    </div>
                </div>
                <div className="field">
                    <div className="control has-icons-left">
                        <input className="input" name='password' type="password" placeholder="Password" />
                        <span className="icon is-small is-left">
                            <i className="fas fa-lock"></i>
                        </span>
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <button className="button is-success">
                            Register
                        </button>
                    </div>
                </div>
                <p>{error}</p>
            </form>
    )
}        
        
export default Register