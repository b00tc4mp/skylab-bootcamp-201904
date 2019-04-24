const { Component, /* Fragment */ } = React

class App extends Component {
    state = { lang: i18n.language , visible: logic.isUserLoggedIn ? 'home' : 'landing', error: null, name: null, response: null }

    handleLanguageChange = lang => this.setState({ lang: i18n.language = lang })

    handleRegisterNavigation = () => this.setState({ visible: 'register' })

    handleLoginNavigation = () => this.setState({ visible: 'login' })

    handleRegister = (name, surname, email, password) =>
    logic.registerUser(name, surname, email, password, error => {
        if (error) return this.setState({ error: error.message })

            this.setState({ visible: 'registerOk'})

    })

    handleLogin = (username, password) =>
        logic.loginUser(username, password, error => {
            if (error) return this.setState({ error: error.message })

            logic.retrieveUser((error, user) => {
                if (error) return this.setState({ error: error.message })

                this.setState({ visible: 'home', name: user.name })
            })
        })

    handleSearchDucks = (query) =>
    logic.searchDucks(query, function(response){
            if(error) return this.setState({error: error.message})
            this.setState({responseDucks: response})
            console.log(responseDucks)
        })
  

    componentDidMount() {
        logic.isUserLoggedIn && logic.retrieveUser((error, user) => {
            if (error) return this.setState({ error: error.message })

            this.setState({ name: user.name })
        })
    }

    render() {
        const {
            state: { lang, visible, error, name },
            handleLanguageChange,
            handleRegisterNavigation,
            handleLoginNavigation,
            handleRegister,
            handleLogin
        } = this

        // return <Fragment>
        return <>
            <LanguageSelector onLanguageChange={handleLanguageChange} />

            {visible === 'landing' && <Landing lang={lang} onRegister={handleRegisterNavigation} onLogin={handleLoginNavigation} />}

            {visible === 'register' && <Register lang={lang} onRegister={handleRegister} error={error} />}
            
            {visible === 'registerOk' && <RegisterOk lang={lang} onRegisterOk = {handleLoginNavigation} />}

            {visible === 'login' && <Login lang={lang} onLogin={handleLogin} error={error} />}

            {visible === 'home' && <Home lang={lang} name={name} />}

            {visible === 'searchDucks' && <SearchDucks lang={lang} on />}
        </>
        // </Fragment>
    }
}