'use strict';

/**
 * 
 * @param {HTMLElement} select 
 * @param {Function} callback 
 */
function LanguageSelector(select, callback) {
    CompositionEvent.call(this, select);

    this.onChange = callback;
}

LanguageSelector.prototype = Object.create(Component.prototype);
LanguageSelector.prototype.constructor = LanguageSelectorr;

Object.defineProperty(LanguageSelector.prototype, "onChange", {
    set: function (callback) {
        this.__select__.addEventListener('change', function (event) {
            callback(event.target.value);
        });
    }
});