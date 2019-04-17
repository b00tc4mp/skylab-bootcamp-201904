'use strict';

function CardDuck (parent, duck, onSelect) {
  this.__parent__ = parent
  this.__duck__ = duck;
  var container =  document.createElement('li');
  container.setAttribute("data-id", this.__duck__.id);
  container.style.width ="25%";
  container.style.height = "300px"
  Component.call(this, container);
  this.__parent__.insertAdjacentElement('beforeend', this.container);
  this.refresh();
  this.onSelect = onSelect;
}

CardDuck.prototype = Object.create(Component.prototype);
CardDuck.prototype.constructor = CardDuck;

CardDuck.prototype.refresh = function () {
  if (!this.__duck__) {
    this.container.innerHTML = "<p>No duck</p>";
    return ;  
  }

  var h3 = document.createElement('h3');
  h3.innerText = this.__duck__.title;
  this.container.appendChild(h3);

  var img = document.createElement('img');
  img.style.width = "100px";
  img.style.height = "100px";
  img.src = this.__duck__.imageUrl;

  var priceTag = document.createElement('span');
  priceTag.innerText = this.__duck__.price;
  this.container.appendChild(priceTag);

  this.container.appendChild(img);  
}

Object.defineProperty(CardDuck.prototype, "duck", {
  set: function(duck) {
    this.__duck__ = duck;
  }
});


Object.defineProperty(CardDuck.prototype, "onSelect", {
  set: function(callback) {
    var self = this;
    this.container.addEventListener("click", function(event) {
      event.preventDefault();
      callback(self.__duck__);
    });
  }
});
