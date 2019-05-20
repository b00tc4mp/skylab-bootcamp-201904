import React, { Component } from 'react'
import logic from '../logic'
import i18n from '../common/i18n'
import LanguageSelector from './LanguageSelector'
import Landing from './Landing'
import Favorites from './Favorites'
import Checkout from './Checkout'
import Orders from './Orders'
import Cart from './Cart'
import Register from './Register'
import RegisterOk from './RegisterOk'
import Login from './Login'
import Home from './Home'
import { Route, withRouter, Redirect, Switch } from 'react-router-dom'

class App extends Component {
    state = { lang: i18n.language, visible: null, error: null, name: null ,favs: [], cart: [], orders: []}

    handleLanguageChange = lang => this.setState({ lang: i18n.language = lang })

    handleRegisterNavigation = () => this.props.history.push('/register')

    handleLoginNavigation = () => this.props.history.push('/login')

    handleLogin = (username, password) => {
        try {
            logic.loginUser(username, password)
                .then(() =>
                    logic.retrieveUser()
                )
                .then(({ name }) => {
                    this.setState({ name, error: null }, () => this.props.history.push('/home'))
                })
                .catch(error =>
                    this.setState({ error: error.message })
                )
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }

    componentDidMount() {
        logic.isUserLoggedIn &&
            logic.retrieveUser()
                .then(user =>
                    this.setState({ name: user.name })
                )
                .catch(error =>
                    this.setState({ error: error.message })
                )

        switch(this.props.location.pathname) {
            case '/orders':
                    this.handleOrders()
            break;
        }
    }

    handleRegister = (name, surname, username, password) => {
        try {
            logic.registerUser(name, surname, username, password)
                .then(() =>
                    this.setState({ visible: 'register-ok', error: null })
                )
                .catch(error =>
                    this.setState({ error: error.message })
                )
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }
    handleFavorites = () => {
        try{
            logic.retrieveFavDucks()
                .then((favs) =>
                    this.setState({ favs: favs.map(({ id, title, imageUrl: image, price }) => ({ id, title, image, price })), favs }, () => this.props.history.push('/favorites'))
                )
                .catch(error =>
                    this.setState({ error: error.message })
                )

        }catch({message}){
            this.setState({error: message})

        }
    }
    handleCart = () => {
        try{
            logic.retrieveCartDucks()
                .then((cart) =>
                    this.setState({ cart: cart.map(({ id, title, imageUrl: image, price }) => ({ id, title, image, price })), cart }, () => this.props.history.push('/cart'))
                )
                .catch(error =>
                    this.setState({ error: error.message })
                )

        }catch({message}){
            this.setState({error: message})

        }
    }
    handleFav = (id) =>{
        logic.toggleFavDuck(id)
            .then(() => logic.retrieveFavDucks())
            .then(favs => this.setState({ favs }))
    }

    handleDeleteCart = (id) => {
        logic.deleteCartDuck(id)
            .then(() => logic.retrieveCartDucks())
            .then(cart => this.setState({ cart }))

    }
            
    handleComeBack = () => {
        logic.retrieveUser()
            .then(({name}) => {
                this.setState({ name, error: null }, () => this.props.history.push('/home'))
            })
            .catch(error =>
                this.setState({ error: error.message })
            )
        }
    handleCheckout= () => this.props.history.push('/checkout')
    handlePayment = () => {
        logic.payment()
            .then(()=>this.props.history.push('/home'))
            .catch(error =>
                this.setState({ error: error.message })
            )
    }
    handleOrders = () => {
        debugger
        try{
            logic.retrieveOrders()
                .then((orders) =>{
                
                    this.setState({ orders }, () => this.props.history.push('/orders'))
                })
                .catch(error =>
                    this.setState({ error: error.message })
                )

        }catch({message}){
            this.setState({error: message})

        }
    }
    
    handleLogout = () => {
        logic.logoutUser()

        this.props.history.push('/')
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) this.setState({ visible: null })
    }

    render() {
        const {
            state: { lang, visible, error, name, favs, cart, orders},
            handleLanguageChange,
            handleRegisterNavigation,
            handleLoginNavigation,
            handleLogin,
            handleRegister,
            handleFavorites,
            handleComeBack,
            handleFav,
            handleCart,
            handleDeleteCart,
            handleCheckout,
            handlePayment,
            handleOrders,
            handleLogout
        } = this

        return <>
            <LanguageSelector lang={lang} onLanguageChange={handleLanguageChange} />

            <Switch>
                <Route exact path="/" render={() => logic.isUserLoggedIn ? <Redirect to="/home" /> : <Landing lang={lang} onRegister={handleRegisterNavigation} onLogin={handleLoginNavigation} />} />

                <Route path="/register" render={() => logic.isUserLoggedIn ? <Redirect to="/home" /> :
                    visible !== 'register-ok' ?
                        <Register lang={lang} onRegister={handleRegister} error={error} /> :
                        <RegisterOk lang={lang} onLogin={handleLoginNavigation} />
                } />

                <Route path="/login" render={() => logic.isUserLoggedIn ? <Redirect to="/home" /> : <Login lang={lang} onLogin={handleLogin} error={error} />} />

                <Route path="/home" render={() => logic.isUserLoggedIn ? <Home lang={lang} name={name} onLogout={handleLogout} onFavorites={handleFavorites} goCart={handleCart} onOrders={handleOrders}/> : <Redirect to="/" />} />
            
                <Route path="/favorites" render={() => <Favorites lang={lang} favs={favs} error={error} onReturn={handleComeBack} onFav={handleFav}/>} />

                <Route path="/cart" render={() => <Cart lang={lang} error={error} onReturn={handleComeBack} cart={cart} onDelete={handleDeleteCart} onCheckout={handleCheckout}/>} />

                <Route path="/checkout" render={() => <Checkout lang={lang} error={error} name={name} cart={cart} onPayment={handlePayment}/>} />
                
                <Route path="/orders" render={() => <Orders lang={lang} error={error}  orders={orders} onReturn={handleComeBack}/>} />
            
                <Redirect to="/" />
            </Switch>
        </>
    }
}

export default withRouter(App)