const i18nRegister = {
    
        en: {
            title: 'Register',
            name: 'Name',
            surname: 'Surname',
            email: 'E-mail',
            password: 'Password'
        },
        es: {
            title: 'Registro',
            name: 'Nombre',
            surname: 'Apellido',
            email: 'E-milio',
            password: 'Contraseña'
        },
        ca: {
            title: 'Registre',
            name: 'Nom',
            surname: 'Cognom',
            email: 'E-mil·li',
            password: 'Contrasenya'
        },
        ga: {
            title: 'Rexistro',
            name: 'Nome',
            surname: 'Apelido',
            email: 'E-miliño',
            password: 'Contrasinal'
        }
    }


function Register(props) {
    const { lang } = props

    const literals = i18nRegister[lang]

    function handleSubmit(e) {
        e.preventDefault()

        const name = e.target.name.value
        const surname = e.target.surname.value
        const username = e.target.username.value
        const password = e.target.password.value

        props.onRegister(name, surname, username, password)
    }

    return <>
        <h2>{literals.title}</h2>
        <form onSubmit={handleSubmit}>
            <li>
                <input type="text" name="name" placeholder={literals.name} />
            </li>
            <li>
                <input type="text" name="surname" placeholder={literals.surname} />
            </li>
            <li>
                <input type="text" name="username" placeholder={literals.username} />
            </li>
            <li>
                <input type="password" name="password" placeholder={literals.password} />
            </li>
            <button>{literals.title}</button>
            <span>{props.error}</span>
        </form>
    </>
}
