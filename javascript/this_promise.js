"use strict";
const pattern = /(?<=Type\s)(\w+)/gi;


//Using this in storing object variables
//Notice: element is not part of the initialization
function SomeObject(name, item_type, quantity){
    this.name = name;
    this.item_type = item_type;
    this.quantity = quantity;
    
    this.print_name = function(){
        console.log(this.name);
    }
    
    this.change_color = function(color){
        this.element.style.backgroundColor = color;
    }
}

function createDiv(id){
    var div = document.createElement("div");
    div.id = id;
    return div;
}

//This as a the parameters passed relative to createChildDiv
function createChildDiv(parentID){

    var div = document.createElement("div");
    if ('className' in this){
        div.className = this.childClass;
    }
    if ('childText' in this){
        div.appendChild(document.createTextNode(this.childText));
    }
    document.getElementById(parentID).appendChild(div);
    return div;
}

function get_types(arr){
    var types = {};
    for (var i=0; i<arr.length; i++){
        var typ = arr[i].item_type.match(pattern);
        types[typ] = 0;
    }
    return types;
}

function sum_by_type(types, arr){    
    for (var i=0; i<arr.length; i++){
        var typ = arr[i].item_type.match(pattern);
        types[typ] += arr[i].quantity;
    }
    return types;
}

function failureCallback(){
    console.log('It was a big failure');
}

function sum_total(dict){
    var sum = 0;
    for (var key in dict){
        sum += dict[key];
    }
    return sum;
}

var div = createDiv('JSitems');
this.document.body.appendChild(div);//this referring to the window

var a1 = new SomeObject('Item A1', 'Type A', 20);
var a2 = new SomeObject('Item A2', 'Type A', 30);
var b1 = new SomeObject('Item B1', 'Type B', 25);
var objects = [a1, a2, b1];


for (var i = 0; i<objects.length; i++){
    var obj = objects[i];
    var props = {'childClass':obj.name,'childText':obj.name};
    obj.element =  createChildDiv.call(props, 'JSitems');
}

objects.map(function(x){
    if (x.item_type.match(pattern)=='A'){ 
        x.change_color('blue');
    }else{
        x.change_color('red');
    }
});


//adding values with a set of promises
var res = Promise.resolve(get_types(objects))
.then(types => sum_by_type(types, objects))
.then(dict => sum_total(dict))
.then(sum => console.log(sum))
.catch(failureCallback);
console.log(res);
