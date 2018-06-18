function submitForm(id){
    var f = document.getElementById(id);
    f.submit();
    f.reset();
    return false;
}