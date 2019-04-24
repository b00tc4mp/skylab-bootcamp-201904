const i18nSearch = {
    en: {
        title: 'Search Ducks',
        button_search: 'search'
    },
    es: {
        title: 'Buscar patos',
        button_search: 'buscar'
    },
    ca: {
        title: 'Cercar ànecs',
        button_search: 'cercar'
    },
    ga: {
        title: 'Buscar patos con acento gallego',
        button_search: 'buscar'
    }
}

function SearchDucks(props){
    const {lang} = props;
    const literals = i18nSearch[props]

    function handleSearchDucks(e){
        e.preventDefault()
        const {title, button_search} = e.target.searchDucks
    }

    return <>
    <h3>{title}</h3>
    <form onSubmit={handleSearchDucks}>
        <input type="text" name="searchDucks" placeholder="{button_search}"/>
    </form>
    </>
}