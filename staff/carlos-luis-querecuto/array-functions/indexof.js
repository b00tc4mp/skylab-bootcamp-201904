/**
 * search for an element and gives you the firt index, if nor -1 will be given
 * 
 * @param {Array} array The array to be searched with element
 * @param {element} element element that will be searched in array
 * @param {index} number (Optional) if you want to start from some specific index
 * 
 * @index {int} index of element if found, otherwise -1 will be given
 */
function indexOf(array,element,number){
    number = number || 0;
    var index=-1
    for (var i = number; i < array.length; i++){
        if(element===array[i]) {
            index=i
            break
        }
    }
    return index;
}