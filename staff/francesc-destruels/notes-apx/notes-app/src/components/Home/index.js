import React, { Component } from 'react'
import literals from './literals'
import logic from '../../logic'
import Results from '../Results'
import Userpage from '../Userpage'
import './index.sass'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'

class Home extends Component {
    state = { query: null, error: null, publicNote: [], privateNote: [], userPage: null, userData: null }

    componentWillReceiveProps(props) {
        if (props.location.search) {
            const { query } = queryString.parse(props.location.search)

            query && this.search(query)
        } else {
            const [, , id] = props.location.pathname.split('/')

            id && this.retrieve(id)
        }
    }

    componentWillMount() {
        logic.retrievePublicNotes()
            .then(notes => this.setState({ publicNote: notes }))
    }

    handlerUser = () => {
        let notes
        logic.retrievePrivateNotes()
            .then(info => {
                notes = info
                return logic.retrieveUser()
            })
            .then(user => this.setState({ privateNote: notes, userPage: true, userData: user }))
    }

    handlePost = (text, boolean) => {
        if (boolean) {
            logic.newPrivateNote(text)
                .then(() => logic.retrievePrivateNotes())
                .then(notes => {
                    this.setState({ privateNote: notes })
                })
        } else {
            logic.newPublicNote(text)
                .then(() => logic.retrievePublicNotes())
                .then(notes => this.setState({ publicNote: notes }))
        }
    }

    handleGoBack = () => {
        this.setState({ userPage: null })
    }

    render() {
        const {
            handlerUser,
            handlePost,
            handleGoBack,
            state: { publicNote, privateNote, userPage, userData },
            props: { lang, name, onLogout }
        } = this

        const { hello, logout, user } = literals[lang]

        return <main className="home">
            <h1>{hello}, {name}!</h1>
            <button onClick={onLogout}>{logout}</button>
            {!userPage && <button onClick={handlerUser}>{user}</button>}
            {!userPage && publicNote && <Results items={publicNote} />}
            {userPage && <Userpage items={privateNote} userData={userData} onPost={handlePost} onBack={handleGoBack} />}
        </main>
    }
}

export default withRouter(Home)