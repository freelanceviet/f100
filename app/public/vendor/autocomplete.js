var _autoComplCounter = 0;
var directionsDisplay;
var ib = new InfoBox();
var ib_= new InfoBox();
var directionsService = new google.maps.DirectionsService();
var map;
var lon = "";
var markerRoadTripper = new Array();
//--------------------------------------
// Autocomplete
//--------------------------------------
function assignAutoCompl(_id){
    document.getElementById(_id).hidden = false;
    var _autocomplete = new google.maps.places.Autocomplete(document.getElementById(_id));
    _autocomplete.setTypes(['geocode']);
    google.maps.event.addListener(_autocomplete, 'place_changed', function()
    {
		var arrPlace = getLatLonPlace(_autocomplete);
		//
		if(_id!="AutoCompleteAddPoint"){
			//-- Draw only marker when only place select --//
			drawOnlyMarker(arrPlace);
			//-- Add data to input cussor --//
			addDataToInputLoca(_id,arrPlace);
			//-- Set cookie for list place --//
			setCookieForPlace();
			//-- Draw way point on map --//
			drawWaypoint();
			drawKmAndDu();
			getListKmRoad();
			sortIconNumPoint();
		}else{
			// add point to list
			addWayPoint(arrPlace);
			//-- Set cookie for list place --//
			setCookieForPlace();
			//-- Draw way point on map --//
			drawWaypoint();
			drawKmAndDu();
			getListKmRoad();
			sortIconNumPoint();
		}
	});
}
//--------------------------------------
// Load default map
//--------------------------------------
function loadMapDefault(){
	var mapOptions = {
        zoom: 14,
        mapTypeControl: false,
        center: new google.maps.LatLng(16.0591346, 108.2094204),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false
    };
    map = new google.maps.Map(document.getElementById('rt-right'), mapOptions);
	directionsDisplay = new google.maps.DirectionsRenderer({
        'map': map,
        'preserveViewport': true,
        'draggable': false
    });
}
//--------------------------------------
// Get lat lon of place
//--------------------------------------
function getLatLonPlace(_autocomplete){
	var arr = new Array();
	var place = _autocomplete.getPlace();
	arr[0] = place.geometry.location.lat();
	arr[1] = place.geometry.location.lng();
	arr[2] = place.formatted_address;
	return arr;
}
//--------------------------------------
// Phương trình tìm nghiệm bậc 2
//--------------------------------------
function phuongtrinhbachai(A,B,C){
	var arr = new Array();
	var delta = Math.pow(B,2)-4*A*C;
	if(delta<0)
	{
		return null;
	}
	else
	{
		var x1 = (-B+Math.sqrt(delta))/(2*A);
		var x2 = (-B-Math.sqrt(delta))/(2*A);
		arr[0] = x1;
		arr[1] = x2;
		return arr;
	}
}
//--------------------------------------
// phuong thuc tra ve 1 diem cua (X,Y) cua mot dinh cua hinh chu nhat
// status dung de phan biet diem dau va diem cuoi: 0 la diem A se lay diem top left, 1 la diem B se lay diem right bottom
// var Ax  =10.792950000000001;
// var Ay  =106.71078000000001;
// kinh do, vi do  B
// var Bx = 10.792580000000001;
// var By = 106.71216000000001;
// de lay duoc diem A ta se truyen: findPos(Ax,Ay,Bx,By,AC2,0);
// de lay duoc diem B ta se truyen: findPos(Bx,By,Ax,Ay,AC2,1);
// AC2: la do dai cua ban kinh. Don vi se la m, 1m = 10 mu -6 km vd: 1m = 0.0000001;
//--------------------------------------
function findPos_HHQ(Ax,Ay,Bx,By,AC2,status){			
	var Cx;
	var Cy;
	//
	var A;
	var B;
	// result
	var arr_result_X = Array();
	var arr_result_Y = Array();
	//
	var A_phay;
	var B_phay;
	var C_phay;

	var AB2 = Math.pow(Ax-Bx,2)+Math.pow(Ay-By,2); 
	var BC2 = AB2+AC2;
	var k = (AC2-BC2) + (Math.pow(Bx,2)+Math.pow(By,2)) - (Math.pow(Ax,2)+Math.pow(Ay,2));
	var k1 = Bx-Ax;
	var k2 = By-Ay;
	if(k2==0){
		Cx  = k/(2*k1);
		A_phay = 1;
		B_phay = (-2)*Ay;
		C_phay = Math.pow(Ax,2)+Math.pow(Ay,2)+Math.pow(Cx,2)-(Ax*k/k1)-AC2;
		var flag = phuongtrinhbachai(A_phay,B_phay,C_phay);	
	}
	else{
		A = (-k1)/k2;
		B = k/(2*k2);
		A_phay = Math.pow(A,2)+1;
		B_phay = 2*A*B - 2*Ax - 2*Ay*A;
		C_phay = Math.pow(Ax,2) + Math.pow(Ay,2) + Math.pow(B,2) - AC2 - 2*Ay*B;
		var flag = phuongtrinhbachai(A_phay,B_phay,C_phay);
		
		arr_result_X[0] = flag[0];
		arr_result_X[1] = flag[1];
		
		arr_result_Y[0] = flag[0]*A+B;
		arr_result_Y[1] = flag[1]*A+B;
		
		var my_position = new Array();
		
		if(status==0){
			my_position[0] = arr_result_X[0];
			my_position[1] = arr_result_Y[0];
		}
		else{
			my_position[0] = arr_result_X[1];
			my_position[1] = arr_result_Y[1];
		}
		return my_position;
	}
}
function setNullMarker(arr){
	for (var k = 0; k < arr.length; k++) {
		arr[k].setMap(null);
	}
}

//--------------------------------------
// decscription:  phuong thuc tra ve mang cac diem phan doan tren mot doan duong tu A den B
// input: toa do diem A va toa do diem B, status : 0 neu diem A va B la ten dia chi. 1 neu A va B la tao do
// output: se la mang cac toa do 
//--------------------------------------
function get_arr_geolocation(A,B,R,category){
	var arrRes = {items:[]};
	var directionsService = new google.maps.DirectionsService();
	var directionsRequest = {
	  origin: A,
	  destination:B,
	  travelMode: google.maps.DirectionsTravelMode.DRIVING,
	  unitSystem: google.maps.UnitSystem.METRIC
	};
	directionsService.route(
		directionsRequest,
		function(response, status){
			if(status == google.maps.DirectionsStatus.OK){
				setNullMarker(markerRoadTripper);
				markerRoadTripper = [];
				var lenghtArr = response.routes[0].overview_path.length;
				var arr_location = response.routes[0].overview_path;
				arr_result = new Array(lenghtArr);
				var getUrl = "/roodtripper_getplacetrip";
				$.get(getUrl, function(place_temp){
					for(var i = 0;i<lenghtArr;i++){
						if(i!=(lenghtArr-1)){
							// toa do diem A (top,left)
							var arr_Geo_A = findPos_HHQ(arr_location[i].lat(),arr_location[i].lng(),arr_location[i+1].lat(),arr_location[i+1].lng(),R,0);
							// toa do diem B (bottom,right)
							var arr_Geo_B = findPos_HHQ(arr_location[i+1].lat(),arr_location[i+1].lng(),arr_location[i].lat(),arr_location[i].lng(),R,1);
							//
							if(arr_Geo_A!=undefined && arr_Geo_B!=undefined){
								$.ajax({
									url: '/roodtripper',
									type: 'POST',
									data:{lat_A:arr_Geo_A[0], lon_A: arr_Geo_A[1], lat_B:arr_Geo_B[0], lon_B:arr_Geo_B[1], category:category},
									beforeSend: function() { 
										
									},
									success: function(data){
										for(var k=0;k<data.length;k++){
											var url = "../images/icon/"+data[k].category+"/"+data[k].categorys+".png";
											var image = "http://res.cloudinary.com/mxhdd/image/upload/c_thumb,h_100,w_330/v"+data[k].image.version+"/"+data[k].image.public_id+"."+data[k].image.format+"";
											var arrGeolocation = new Array();
											arrGeolocation[0] = data[k].coordinate[1];
											arrGeolocation[1] = data[k].coordinate[0]
											var marker = drawMarker(url, arrGeolocation);
											markerRoadTripper.push(marker);
											var temp = 0;
											for(var m=0; m<place_temp.length;m++){
												if(data[k]._id.toString()==place_temp[m]._id.toString()){
													temp = 1;
												}
											}
											// add event for marker
											addListenerForMarker(marker,data[k].name_place,data[k].address,data[k]._id,data[k].place_name_,image,temp);
										}
									},
									error: function(jqXHR){
										console.log(jqXHR.responseText+' :: '+jqXHR.statusText);
									}
								});
							}
						}
					}
				});
			}
			else{
				
			}
		}
	);
}
function addListenerForMarker(marker,name,address,id,alias,image,status){
	// Event mouse over
	google.maps.event.addListener(marker, 'mouseover', function() {
		$('#infobox').find('.venueIndex').html('10');
		$('#infobox').find('.venueName').find('a').html(name);
		$('#infobox').find('.venueAddress').html(address);
		$('#infobox').find('.leai_img').find('img').attr('src',image);
		// Show option add or remove place to trip
		if($('#id_user').val()){
			var url_add = "add_to_plan?_id="+id+"";
			var url_remove = "remove_to_plan?_id="+id+"";
			$('#infobox').find('.event-add-to-trip').attr('ajaxify-redirect',url_add);
			$('#infobox').find('.event-remove-to-trip').attr('ajaxify-redirect',url_remove);
			if(status==1){
				$('#infobox').find('.event-add-to-trip').css('display','none');
				$('#infobox').find('.event-remove-to-trip').css('display','block');
			}else{
				$('#infobox').find('.event-add-to-trip').css('display','block');
				$('#infobox').find('.event-remove-to-trip').css('display','none');
			}
		}
		var html = $('#infobox').html();
		show_info_box(marker,html);
	});
	// Event mouse out
	google.maps.event.addListener(marker, 'mouseout', function() {
		ib.close();
	});
	// Event mouse click
	google.maps.event.addListener(marker, 'click', function() {
		$('#infobox').find('.venueIndex').html('10');
		$('#infobox').find('.venueName').find('a').html(name);
		var alias_ = alias.replace(/ /g,"-");
		$('#infobox').find('.venueName').find('a').attr('href','/placeview?_id='+id+'&value='+alias_+'');
		$('#infobox').find('.venueAddress').html(address);
		// Show option add or remove place to trip
		if($('#id_user').val()){
			var url_add = "add_to_plan?_id="+id+"";
			var url_remove = "remove_to_plan?_id="+id+"";
			$('#infobox').find('.event-add-to-trip').attr('ajaxify-redirect',url_add);
			$('#infobox').find('.event-remove-to-trip').attr('ajaxify-redirect',url_remove);
			if(status==1){
				$('#infobox').find('.event-add-to-trip').css('display','none');
				$('#infobox').find('.event-remove-to-trip').css('display','block');
			}else{
				$('#infobox').find('.event-add-to-trip').css('display','block');
				$('#infobox').find('.event-remove-to-trip').css('display','none');
			}
		}
		var html = $('#infobox').html();
		show_info_box_(marker,html);
	});
}
// ------------------------------------
// show info box cho tat ca cac dia diem tim thay tren map
// input:
// output:
// ------------------------------------
function show_info_box(myMarker,html){
	var boxText = document.createElement("div");
	boxText.style.cssText = "";
	boxText.innerHTML = html;
	var myOptions = {
		content: boxText,
		disableAutoPan: false,
		maxWidth: 0,
		pixelOffset: new google.maps.Size(-207,-230),
		zIndex: null,
		hasCloseButton:true,
		closeBoxURL: "",
		closeBoxMargin: "10px 2px 2px 2px",
		infoBoxClearance: new google.maps.Size(1,1),
		isHidden: false,
		pane: "floatPane",
		enableEventPropagation: true
	};
    ib.setOptions(myOptions);
	ib.open(map,myMarker);
}
// ------------------------------------
// show info box when click on marker
// input:
// output:
// ------------------------------------
function show_info_box_(myMarker,html){
	var boxText = document.createElement("div");
	boxText.style.cssText = "";
	boxText.innerHTML = html;
	var myOptions = {
		content: boxText,
		disableAutoPan: false,
		maxWidth: 0,
		pixelOffset: new google.maps.Size(-207,-230),
		zIndex: null,
		hasCloseButton:true,
		closeBoxURL: "",
		closeBoxMargin: "10px 2px 2px 2px",
		infoBoxClearance: new google.maps.Size(1,1),
		isHidden: false,
		pane: "floatPane",
		enableEventPropagation: true
	};
    ib_.setOptions(myOptions);
	ib_.open(map,myMarker);
}
//--------------------------------------
// Draw marker on screen map
//--------------------------------------
function drawMarker(url, arrGeolocation){
	var geolocation = new google.maps.LatLng(arrGeolocation[0],arrGeolocation[1]);
	var myMarker = new google.maps.Marker({
		map: map, 
		icon:url,
		position: geolocation
	});
	return myMarker;
}
//--------------------------------------
// Draw marker on screen map
//--------------------------------------
function drawWaypoint(){
	if(getCookie('numPlace')>=2){
		var numItem = getCookie('numPlace');
		var waypoints = [];
		var start = new google.maps.LatLng(parseFloat(getCookie('placeItemLat_0')), parseFloat(getCookie('placeItemLon_0')));
		var end = new google.maps.LatLng(parseFloat(getCookie('placeItemLat_'+(numItem-1)+'')), parseFloat(getCookie('placeItemLon_'+(numItem-1)+'')));
		if(getCookie('numPlace')>2){
			for(var i=1; i<numItem-1; i++){
				var center = new google.maps.LatLng(parseFloat(getCookie('placeItemLat_'+i+'')), parseFloat(getCookie('placeItemLon_'+i+'')));
				waypoints.push({
					location: center,
					stopover: true
				});
			}
		}
		var request = {
			origin: start,
			destination: end,
			waypoints: waypoints,
			travelMode: google.maps.DirectionsTravelMode.DRIVING
		};
		directionsService.route(request, function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				directionsDisplay.setMap(map);
				directionsDisplay.setDirections(response);
				
				var bounds = new google.maps.LatLngBounds();
				bounds.extend(start);
				for (i = 0; i < waypoints.length; i++) {
					bounds.extend(waypoints[i].location);
				}
				bounds.extend(end);
				map.fitBounds(bounds);
			}
		});
		// Show add point
		$('#rt-l-addpoint').css('display','inline-block');
	}
}
//--------------------------------------
// Add point to road trip
//--------------------------------------
function addDataToInputLoca(idInput,arrPlace){
	$("#"+idInput+"").attr('flag',1);
	$("#"+idInput+"").attr('data-lat',arrPlace[0]);
	$("#"+idInput+"").attr('data-lon',arrPlace[1]);
	$("#"+idInput+"").attr('data-address',arrPlace[2]);
}
//--------------------------------------
// Set cookie for list item place
//--------------------------------------
function setCookieForPlace(){
	var numI = 0;
	$('#rt-l-content').find('.rtlcul-p-input').each(function(){
		if($(this).attr('flag')==1){
			numI = numI +1;
		}
	});
	if(numI>=2){
		var category = "";
		// step 1: romove cookie
		if (getCookie('numPlace')){
			for(var i=0;i<getCookie('numPlace');i++){
				$.jStorage.deleteKey('placeItemLat_'+i+'');
				$.jStorage.deleteKey('placeItemLon_'+i+'');
				$.jStorage.deleteKey('placeItemAddress_'+i+'');
			}
			$.jStorage.deleteKey('numPlace');
		}
		var numPlace = 0;
		$('#rt-l-content').find('.rtlc-ul-li').each(function(){
			if($(this).find('.rtlcul-p-input').attr('flag')==1){
				setCookie('placeItemLat_'+numPlace+'',$(this).find('.rtlcul-p-input').attr('data-lat'));
				setCookie('placeItemLon_'+numPlace+'',$(this).find('.rtlcul-p-input').attr('data-lon'));
				setCookie('placeItemAddress_'+numPlace+'',$(this).find('.rtlcul-p-input').attr('data-address'));
				numPlace = numPlace + 1;
			}
		});
		setCookie('numPlace',numPlace);
		$('.selected-item-category').each(function(){
			if($(this).attr('data-flag')==1){
				category = category + $(this).attr('data-id')+',';
			}
		});
		drawMarkerForRoad(category);
	}
}
//--------------------------------------
// Set cookie for list item place
//--------------------------------------
function drawMarkerForRoad(category){
	//var R = 0.0000001;
	var R = getCookie('radiusR')/100000000;
	var numPoint = getCookie('numPlace');
	if(numPoint>=2){
		for(var i=0;i<numPoint-1;i++){
			var A = new google.maps.LatLng(getCookie('placeItemLat_'+i+''),getCookie('placeItemLon_'+i+''));
			var B = new google.maps.LatLng(getCookie('placeItemLat_'+(i+1)+''),getCookie('placeItemLon_'+(i+1)+''));
			get_arr_geolocation(A,B,R,category);
		}
	}
}

//--------------------------------------
// Add point to road trip
//--------------------------------------
function addWayPoint(arrPlace){
	var numItem = $('#rt-l-content').find('.rtlc-ul').find('.rtlc-ul-li').length;
	$("#default-item-waypoint").find('.rtlcul-p-input').attr('id','AutoCompl'+numItem+'');
	$("#default-item-waypoint").find('.rtlcul-p-input').attr('flag',1);
	$("#default-item-waypoint").find('.rtlcul-p-input').attr('data-lat',arrPlace[0]);
	$("#default-item-waypoint").find('.rtlcul-p-input').attr('data-lon',arrPlace[1]);
	$("#default-item-waypoint").find('.rtlcul-p-input').attr('data-address',arrPlace[2]);
	$("#default-item-waypoint").find('.rtlcul-p-input').attr('value',arrPlace[2]);
	var html = $("#default-item-waypoint").html();
	var i=1;
	var cussor;
	$('#rt-l-content').find('.rtlc-ul-li').each(function(){
		var num = $('#rt-l-content').find('.rtlc-ul-li').length;
		if(i==num-1){
			cussor = this;
		}
		i = i+1;
	});
	$(html).insertAfter(cussor);
	$('.close').click(function(){
		deletePlace(this);
	});
	assignAutoCompl('AutoCompl'+numItem+'');
	
}

//--------------------------------------
// Event delete item
//--------------------------------------
function deletePlace(se){
	if($('#rt-l-content').find('.rtlc-ul-li').length>2){
		//-- Remove item place --//
		$(se).parents('.rtlc-ul-li').remove();
		drawKmAndDu();
		//-- Set cookie for list place --//
		setCookieForPlace();
		//-- Draw way point on map --//
		drawWaypoint();
		getListKmRoad();
		sortIconNumPoint();
	}else{
		alert(">2 mới được xóa");
	}
}
//--------------------------------------
// Event delete item
//--------------------------------------
function showMarkerCategorySelected(){
	if(getCookie('numPlace')>=2){
		var category = "";
		$('.selected-item-category').each(function(){
			if($(this).attr('data-flag')==1){
				category = category+$(this).attr('data-id')+','
			}
		});
		drawMarkerForRoad(category);
	}else{
		alert("chua duoc ve ne");
	}
}
//--------------------------------------
// Show km for road
//--------------------------------------
function drawKmAndDu(){
	$('#rt-l-content').find('.rtlc-ul-li-limit').remove();
	var numItem = $('#rt-l-content').find('.rtlc-ul-li').length;
	var i=0;
	$('#rt-l-content').find('.rtlc-ul-li').each(function(){
		if(i<(numItem-1)){
			var html = $('#default-item-limit').html();
			$(html).insertAfter(this);
		}
		i = i+1;
	});
}
//--------------------------------------
// Show km for road
//--------------------------------------
function getListKmRoad(){
	if(getCookie('numPlace')>=2){
		var numItem = getCookie('numPlace');
		var waypoints = [];
		var start = new google.maps.LatLng(parseFloat(getCookie('placeItemLat_0')), parseFloat(getCookie('placeItemLon_0')));
		var end = new google.maps.LatLng(parseFloat(getCookie('placeItemLat_'+(numItem-1)+'')), parseFloat(getCookie('placeItemLon_'+(numItem-1)+'')));
		
		if(getCookie('numPlace')>2){
			for(var i=1; i<numItem-1; i++){
				var center = new google.maps.LatLng(parseFloat(getCookie('placeItemLat_'+i+'')), parseFloat(getCookie('placeItemLon_'+i+'')));
				waypoints.push({
					location: center,
					stopover: true
				});
			}
		}
		var request = {
			origin: start,
			destination: end,
			waypoints: waypoints,
			travelMode: google.maps.DirectionsTravelMode.DRIVING
		};
		directionsService.route(request, function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				route = response.routes[0];
                var arrKm = new Array();
				var arrDu = new Array();
				for (var j = 0; j < route.legs.length; j++) {
					arrKm[j] = route.legs[j].distance.text;
					arrDu[j] = route.legs[j].duration.text;
                }
				//draw km on screen
				var k = 0;
				$('#rt-l-content').find('.rtlc-ul-li-limit').each(function(){
					$(this).find('.rtlcull-km').find('span').text(arrKm[k]);
					$(this).find('.rtlcull-power').find('span').text(arrDu[k]);
					k = k+1;
				});
			}
		});
		// Show add point
		$('#rt-l-addpoint').css('display','inline-block');
	}
}

//--------------------------------------
// Phuong thuc sap xep thu tu cua point 
// them moi hoac la sap xep lai
//--------------------------------------
function sortIconNumPoint(){
	var arrAZ = new Array();
	arrAZ[0] = "A";arrAZ[1] = "B";arrAZ[2] = "C";arrAZ[3] = "D";arrAZ[4] = "E";arrAZ[5] = "F";
	arrAZ[6] = "G";arrAZ[7] = "H";arrAZ[8] = "I";arrAZ[9] = "J";arrAZ[10] = "L";arrAZ[11] = "L";
	arrAZ[12] = "M";arrAZ[13] = "N";arrAZ[14] = "O";arrAZ[15] = "P";arrAZ[16] = "Q";arrAZ[17] = "R";
	arrAZ[18] = "S";arrAZ[19] = "T";arrAZ[20] = "U";arrAZ[21] = "V";arrAZ[22] = "W";arrAZ[23] = "X";
	arrAZ[24] = "Y";arrAZ[25] = "Z";
	var i = 0;
	if(getCookie('numPlace')>=2){
		$('#rt-l-content').find('.rtlc-ul-li').each(function(){
			$(this).find('.rtlcul-icon-num').find('span').text(arrAZ[i]);
			i++;
		});
	}
}
//--------------------------------------
// Change place position
//--------------------------------------
function changePositionPlace(){
	$("#sortable").sortable({
		start: function (event, ui) {
			
		},
		change:  function (event, ui) {
			
		},
		update: function(event, ui) {
			//-- Set cookie for list place --//
			setCookieForPlace();
			//-- Draw way point on map --//
			drawWaypoint();
			drawKmAndDu();
			getListKmRoad();
			sortIconNumPoint();
		}
	});
}
//--------------------------------------
// Set cookie for item category
//--------------------------------------
function setCookieForItemCategory(){
	// step 1: romove cookie
	if (getCookie('numCategoryItem')){
		for(var i=0;i<getCookie('numCategoryItem');i++){
			$.jStorage.deleteKey('categoryItem_'+i+'');
		}
		$.jStorage.deleteKey('numCategoryItem');
	}
	// step 2: begin set cookie
	var numCategoryItem = 0;
	$('.selected-item-category').each(function(){
		var flag    = $(this).attr('data-flag');
		var _idItem = $(this).attr('data-id'); 
		if(flag==1){
			setCookie('categoryItem_'+numCategoryItem+'',_idItem);
			numCategoryItem = numCategoryItem + 1;
		}
	});
	setCookie('numCategoryItem',numCategoryItem);
}
//--------------------------------------
// Set cookie for item category
//--------------------------------------
function refeshBrower(){
	// draw item selected on screen
	var numItemCategory = getCookie('numCategoryItem');
	if(numItemCategory){
		for(var i=0;i<numItemCategory;i++){
			var id = getCookie('categoryItem_'+i+'');
			$('#'+id+'').attr('data-flag',1);
			$('#'+id+'').parent().addClass('item-ca-selected');
		}
	}
	// draw list place on screen
	var numPlace = getCookie('numPlace');
	if(numPlace){
		$('#rt-l-content').find('#sortable').empty();
		for(var i=0;i<numPlace;i++){
			$('#default-item-waypoint').find('.rtlcul-p-input').attr('id','AutoCompl'+i+'');
			$('#default-item-waypoint').find('.rtlcul-p-input').attr('flag',1);
			$('#default-item-waypoint').find('.rtlcul-p-input').attr('data-lat',getCookie('placeItemLat_'+i+''));
			$('#default-item-waypoint').find('.rtlcul-p-input').attr('data-lon',getCookie('placeItemLon_'+i+''));
			$('#default-item-waypoint').find('.rtlcul-p-input').attr('data-address',getCookie('placeItemAddress_'+i+''));
			$('#default-item-waypoint').find('.rtlcul-p-input').attr('value',getCookie('placeItemAddress_'+i+''));
			var html = $('#default-item-waypoint').html();
			$('#rt-l-content').find('#sortable').append(html);
			assignAutoCompl("AutoCompl"+i+"");
		}
		//-- Set cookie for list place --//
		setCookieForPlace();
		//-- Draw way point on map --//
		drawWaypoint();
		drawKmAndDu();
		getListKmRoad();
		sortIconNumPoint();
	}
}
//--------------------------------------
// Set cookie for item category
//--------------------------------------
function newRoadtripper(){
	// step 1: romove cookie
	if (getCookie('numPlace')){
		for(var i=0;i<getCookie('numPlace');i++){
			$.jStorage.deleteKey('placeItemLat_'+i+'');
			$.jStorage.deleteKey('placeItemLon_'+i+'');
			$.jStorage.deleteKey('placeItemAddress_'+i+'');
		}
		$.jStorage.deleteKey('numPlace');
	}
	// step 1: romove cookie
	if (getCookie('numCategoryItem')){
		for(var i=0;i<getCookie('numCategoryItem');i++){
			$.jStorage.deleteKey('categoryItem_'+i+'');
		}
		$.jStorage.deleteKey('numCategoryItem');
	}
	window.location.replace("/roadtripper");
}
//--------------------------------------
// Draw only marker
//--------------------------------------
function drawOnlyMarker(arrGeolocation){
	if(!getCookie('numPlace')){
		var geolocation = new google.maps.LatLng(arrGeolocation[0],arrGeolocation[1]);
		var url = "/images/current_point.png";
		var myMarker = new google.maps.Marker({
			map: map, 
			icon:url,
			position: geolocation
		});
		map.setZoom(12);
		map.setCenter(myMarker.getPosition());
		return myMarker;
	}
}
$(document).ready(function(){
	var value_slider_default_R = 0;
	if(getCookie('radiusR')){
		value_slider_default_R = getCookie('radiusR');
	}else{
		value_slider_default_R = 10;
		setCookie('radiusR',10);
	}
	$(function() {
		$( "#slider-radius-roodtripper" ).slider({
			value:value_slider_default_R,
			min: 10,
			range: "min",
			orientation: "horizontal",
			max: 60,
			step: 10,
			change: function( event, ui ) {
				setCookie('radiusR',ui.value);
				showMarkerCategorySelected();
			}
		});
	});
	//
	refeshBrower();
	$(function() {
		$( "#sortable" ).sortable();
		$( "#sortable" ).disableSelection();
	});
	changePositionPlace();
	loadMapDefault();
	assignAutoCompl("AutoCompleteAddPoint");
	assignAutoCompl("AutoCompl0");
    assignAutoCompl("AutoCompl1");
	$('.close').click(function(){
		deletePlace(this);
	});
	$('.selected-item-category').click(function(){
		var fag   = $(this).attr('data-flag');
		if(fag==0){
			$(this).attr('data-flag',1);
			$(this).parent().addClass("item-ca-selected");
			showMarkerCategorySelected();
			setCookieForItemCategory();
		}else{
			$(this).attr('data-flag',0);
			$(this).parent().removeClass("item-ca-selected");
			showMarkerCategorySelected();
			setCookieForItemCategory();
		}
	});
	$('#new-trip').click(function(){
		newRoadtripper();
	});
});