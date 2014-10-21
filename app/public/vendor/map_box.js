// JavaScript Document


// phuong trinh tiem nghiem bac hai
function phuongtrinhbachai(A,B,C)
{
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
	if(k2==0)
	{
		Cx  = k/(2*k1);
		A_phay = 1;
		B_phay = (-2)*Ay;
		C_phay = Math.pow(Ax,2)+Math.pow(Ay,2)+Math.pow(Cx,2)-(Ax*k/k1)-AC2;
		var flag = phuongtrinhbachai(A_phay,B_phay,C_phay);	
	}
	else
	{
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
		
		if(status==0)
		{
			my_position[0] = arr_result_X[0];
			my_position[1] = arr_result_Y[0];
		}
		else
		{
			my_position[0] = arr_result_X[1];
			my_position[1] = arr_result_Y[1];
		}
		return my_position;
	}
}

function xxx()
{
	alert("nguyen huu hai");
}

