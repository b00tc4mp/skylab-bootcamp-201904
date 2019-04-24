const i18nRegisterOk = {
    
    en: {
        title: 'Register OK, you can logging now',
        link: 'go to login'

    },
    es: {
        title: 'Registro OK, puedes logearte ahora',
        link: 'ir a login'
    },
    ca: {
        title: 'Registre OK, post logejarte ara',
        link: 'anar a login'
        
    },
    ga: {
        title: 'Registro OK, podes logearte ahora',
        link: 'ir al login'
    }
}

function handleLink(event){
    event.preventDefault()
    props.onRegisterOk()
}

function RegisterOk(props){
    const { lang } = props

    const literals = i18nRegisterOk[lang]

    return<>
    <section onClick = {(e)=> e.preventDefault() }>

    <h2> {literals.title} </h2> <a href="" onClick={()=> props.onRegisterOk()}>{literals.link}</a> 
    </section>
    </>
}