'use strict'

class Home extends Component {
    constructor(container, onSearch, onDetail,logout,literals) {
        super(container)
      
        this.__literals__ = literals;
        const link = this.container.children[1]

        const form = this.container.children[2]
        new Search(form, onSearch)

        const ul = this.container.children[3]
        const results = new Results(ul, onDetail)
        this.__results__ = results
        this.__results__.visible = false

        const section = this.container.children[4]
        const detail = new Detail(section)
        this.__detail__ = detail
        this.__detail__.visible = false
        this.__namecontainer__


        link.addEventListener('click',function(event){
            event.preventDefault();
            logout()
        })
    }

    set results(results) {
        this.__detail__.visible = false
        this.__results__.items = results
        this.__results__.visible = true
    }

    set detail(detail) {
        this.__results__.visible = false
        this.__detail__.item = detail
        this.__detail__.visible = true
    }

    set name(name) {    
        const h1 = this.container.children[0]

        h1.innerText = 'Hello, ' + name + '!'
        this.__namecontainer__ = name;

    }
    set language(language) {
       
        const literals = this.__literals__[language]
        const children = this.container.children
        const button  = this.container.children[2]
        children[1].innerText = literals.logout
        button[1].innerText = literals.search
        children[0].innerText = literals.hello + ','+' '+this.__namecontainer__ +' !'
    } 
}