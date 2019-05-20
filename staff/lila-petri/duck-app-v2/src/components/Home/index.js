import React, { Component } from 'react'
import literals from './literals'
import logic from '../../logic'
import Search from '../Search'
import Results from '../Results'
import Detail from '../Detail'
import './index.sass'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'

class Home extends Component {
    state = { query: null, error: null, ducks: null, duck: null, favs: null , cart: null}

    componentWillReceiveProps(props) {
        if (props.location.search) {
            const { query } = queryString.parse(props.location.search)

            query && this.search(query)
        } else {
            const [, , id] = props.location.pathname.split('/')

            id && this.retrieve(id)
        }
    }

    search = query =>
        Promise.all([logic.searchDucks(query), logic.retrieveFavDucks()])
            .then(([ducks, favs]) =>
                this.setState({ query, duck: null, ducks: ducks.map(({ id, title, imageUrl: image, price }) => ({ id, title, image, price })), favs })
            )
            .catch(error =>
                this.setState({ error: error.message })
            )

    handleSearch = query => this.props.history.push(`/home?query=${query}`)

    retrieve = id =>
        logic.retrieveDuck(id)
            .then(({ title, imageUrl: image, description, price }) =>
                this.setState({ duck: { title, image, description, price } })
            )
            .catch(error =>
                this.setState({ error: error.message })
            )

    handleRetrieve = id => this.props.history.push(`/home/${id}`)

    handleFav = id =>
        logic.toggleFavDuck(id)
            .then(() => logic.retrieveFavDucks())
            .then(favs => this.setState({ favs }))
    
    handelCart = (id) => {
        logic.addCartDuck(id)
            .then(() => logic.retrieveCartDucks())
            .then(cart => this.setState({ cart }))

    }

    render() {
        const {
            handleSearch,
            handleRetrieve,
            handleFav,
            handelCart,
            state: { query, ducks, duck, favs, cart},
            props: { lang, name, onLogout, onFavorites, goCart, onOrders}
        } = this

        const { hello, logout, favorites, mycart, myorders } = literals[lang]

        return <main className="home">
            <h1>{hello}, {name}!</h1>
            <button onClick={onLogout}>{logout}</button>
            <button onClick={onFavorites}>{favorites}</button>
            <button onClick={goCart}>{mycart}</button>
            <button onClick={onOrders}>{myorders}</button>
            <Search lang={lang} query={query} onSearch={handleSearch} />
            {!duck && ducks && (ducks.length && <Results items={ducks} onItem={handleRetrieve} onFav={handleFav} favs={favs} onCart={handelCart} lang={lang} /> || <p>No results.</p>)}
            {duck && <Detail item={duck} />}
        </main>
    }
}

export default withRouter(Home)