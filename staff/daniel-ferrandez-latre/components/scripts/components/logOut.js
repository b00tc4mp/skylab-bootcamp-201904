    
'use scrict'

function LogOut(container, onLogout){
    Component.call(this, container);
    this.onLogOut = onLogout;
}

LogOut.prototype = Object.create(Component.prototype);
LogOut.prototype.constructor = LogOut;

Object.defineProperty(LogOut.prototype, 'onLogOut', {
    set: function(callback){
        this.container.addEventListener('click', function (event) {
            event.preventDefault();
            callback();
        });
    }
});