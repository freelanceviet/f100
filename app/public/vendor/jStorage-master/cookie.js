function setCookie(key,val){
	$.jStorage.set(key, val);
}
//
function getCookie(name){
	var value = $.jStorage.get(name);
	return value;
}
// 
function flush_values(){
	$.jStorage.flush();
}
