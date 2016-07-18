window.onload = function(){
	var $numberValue = document.getElementById("number-value");
	var $p = $numberValue.getElementsByTagName("p");
	var $arrow = $p[1].getElementsByTagName("span");

	var addFnHanlder = function(e){
		$p[0].innerHTML = parseInt($p[0].innerHTML) + 1;
	}
	var deleteFnHanlder = function(e){
		$p[0].innerHTML = parseInt($p[0].innerHTML) - 1;
	}

	$arrow[0].addEventListener("click",addFnHanlder,false);
	$arrow[1].addEventListener("click",deleteFnHanlder,false)
}