var nums = [];

for (var i = 0 ; i<10 ; i++){
    nums.push(i);
}

function sum(total, num){
    return total + num;
}

function test_num(x, m, test){
    return x%m == test;
}

function add_one(x){
    return x + 1;
}

window.onload = function(){
    
    var arr_evens = nums.filter(x=> test_num(x, 2, 0)); //filter
    var arr_evens_plus = arr_evens.map(add_one); //map
    var text_evens = document.createTextNode("filtered to evens: "+arr_evens);
    var text_evens_plus = document.createTextNode("evens plus 1: " + arr_evens_plus);
    var text_evens_sum = document.createTextNode("evens summed: "+arr_evens.reduce(sum));//reduce
    document.getElementById("even").appendChild(text_evens);
    document.getElementById("even").appendChild(document.createElement('br'));
    document.getElementById("even").appendChild(text_evens_plus);
    document.getElementById("even").appendChild(document.createElement('br'));
    document.getElementById("even").appendChild(text_evens_sum);

    
    var arr_odds = nums.filter(x=> test_num(x, 2, 1));//filter
    var arr_odds_plus = arr_odds.map(add_one);//map
    var text_odds = document.createTextNode("filtered to odds: "+arr_odds);
    var text_odds_plus = document.createTextNode("odds plus 1: " + arr_odds_plus);
    var text_odds_sum = document.createTextNode("odds summed: " + arr_odds.reduce(sum));//reduce
    document.getElementById("odd").appendChild(text_odds);
    document.getElementById("odd").appendChild(document.createElement('br'));
    document.getElementById("odd").appendChild(text_odds_plus);    
    document.getElementById("odd").appendChild(document.createElement('br'));
    document.getElementById("odd").appendChild(text_odds_sum);

};




















