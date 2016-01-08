/*
 *常用的公共函数以及对象
 */

//扩展日期对象,输出格式化的字符串
Date.prototype.format = function(fmt){  //args:yyyy-mm-dd hh:MM:ss
  var o = {
	"m+" : this.getMonth()+1,                 //月份
	"d+" : this.getDate(),                    //日
	"h+" : this.getHours(),                   //小时
	"M+" : this.getMinutes(),                 //分
	"s+" : this.getSeconds(),                 //秒
	"q+" : Math.floor((this.getMonth()+3)/3), //季度
	"S"  : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt))
	fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)
	if(new RegExp("("+ k +")").test(fmt))
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
  return fmt;
}

//扩展日期对象,时间对象进行加减运算
Date.prototype.add=function(obj){ //args:{"year":1,"day":-1}
	var y=this.getFullYear(),m=this.getMonth()+1,days=this.getDate(),d=0;
	if(typeof obj !='object'){return this;}
	for(var q in obj){
		if(q=='year'){
			y += obj[q];
		}else if(q=='month'){
			m += obj[q];
			if(m>12){
				   y += parseInt(m/12);
				   m=m%12;
			}
			if(m<1){
				   y += parseInt(m/12)-1;
				   m=12+m%12;
			}
		}else if(q=='day'){
			d += obj[q];
		}
	}
	return new Date(new Date(y+"/"+m+"/"+days).getTime()+d*24*60*60*1000);
}

//移除数组里的数据
Array.prototype.remove=function(dx)
{
　　if(isNaN(dx)||dx>this.length){return false;}
　　for(var i=0,n=0;i<this.length;i++)
　　{
　　　　if(this[i]!=this[dx])
　　　　{
　　　　　　this[n++]=this[i]
　　　　}
　　}
　　this.length-=1
}

//判断是否存在相应数据
Array.prototype.indexOf = function(obj)
{             
    for(var i=0; i<this.length; i++)
    {
        if(this[i]==obj)
        {
            return i;
        }
    }
    return -1;
}

//校验纯数字
function isDigit(s) 
{ 
    var patrn=/^[0-9]{1,20}$/; 
    if (!patrn.exec(s)) return false 
    return true; 
}

//根据日期获取时间信息：totalDays  year ageType
function getTimeInfo(dateStart, dateEnd){ //age: BirthDt,DateStart
    dateStart = typeof dateStart == 'string' ? new Date(dateStart.replace(/-/g,'/')) : dateStart;
    dateEnd = typeof dateEnd == 'string' ? new Date(dateEnd.replace(/-/g,'/')) : dateEnd;
    var info = {};
    info.totalDays = (dateEnd.getTime() - dateStart.getTime())/1000/60/60/24+1;
    info.year = dateEnd.getFullYear() - dateStart.getFullYear()-((dateEnd.getMonth() < dateStart.getMonth()|| dateEnd.getMonth() == dateStart.getMonth() && dateEnd.getDate() < dateStart.getDate())?1:0);
    info.ageType = info.year < 18 ? 'child' : 'adult';
    return info;
}

//用于IE8下newDate不可用情况
function changeNewDate(strDate){
	var strSeparator = "-"; //日期分隔符
	var oDate= strDate.split(strSeparator); 
	var strDate = new Date(oDate[0], oDate[1]-1, oDate[2]);
	return strDate; 
}

//解决IE7下indexof不能用的问题
function ie_indexofFn(){
	if(!Array.indexOf)
	{
		Array.prototype.indexOf = function(obj)
		{             
			for(var i=0; i<this.length; i++)
			{
				if(this[i]==obj)
				{
					return i;
				}
			}
			return -1;
		}
	}
}

//解决IE下输入框默认提示显示
function ie_placehodler(id){
    $("#"+id).focus(function(){
        if($(this).val()==$(this).attr("_placeholder")){
            $(this).val("");
            $(this).css({"color":"#000"});
        }else{
            $(this).css({"color":"#000"});
        }
    });
    $("#"+id).focusout(function(){
        if(!$(this).val()){
             $(this).val($("#"+id).attr("_placeholder"));
             $(this).css({"color":"#bbbbbb"});
        }else{
            if($(this).val()==$("#"+id).attr("_placeholder")){
                $(this).css({"color":"#bbbbbb"});
            }else{
                $(this).css({"color":"#000"});
            }
            
        }
    });
     if($("#"+id).val() && $("#"+id).val()!=$("#"+id).attr("_placeholder")){
        $("#"+id).css({"color":"#000"});
    }else{
        $("#"+id).val($("#"+id).attr("_placeholder"));
        $("#"+id).css({"color":"#bbbbbb"});
    }
}

// 判断是否证件号重复
function judgeInsIDNo(IdNo, insData, editIndex){  //IdNo  ,insData:被保险人列表,  editIndex : 编辑的index
      var hasIdNo = false;
      if(insData && insData.length > 0){
         for(var i = 0;i < insData.length; i++){
            if(editIndex !== undefined){
                if(editIndex != i && IdNo == insData[i]['IdNo']){
                    hasIdNo = true;
                    break;
                }
            }else{
                if(IdNo == insData[i]['IdNo']){
                    hasIdNo = true;
                    break;
                }
            }
         }
      }
      return hasIdNo;
}

//检测身份证号码正确性
function checkIdcard(idcard){
	var Errors=["ok","身份证号码位数不对!","身份证号码出生日期超出范围或含有非法字符!","身份证号码校验错误!","身份证地区非法!"];
	var area={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
	var idcard,Y,JYM,S,M,idcard_array = [],retflag=false;
	idcard_array = idcard.split("");
	if(area[parseInt(idcard.substr(0,2))]==null)return Errors[4];
		switch(idcard.length){
			case 15:
				return Errors[2];
				break;
			case 18:
				if(parseInt(idcard.substr(6,4)) % 4 == 0 || (parseInt(idcard.substr(6,4))%100 == 0&&parseInt(idcard.substr(6,4))%4 == 0 )){
					ereg=/^[1-9][0-9]{5}[1|2][0|9][0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;
				}else{
					ereg=/^[1-9][0-9]{5}[1|2][0|9][0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;
				}
				if(ereg.test(idcard)){
					S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9 + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10 + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5 + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8 + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4 + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 + parseInt(idcard_array[7]) * 1  + parseInt(idcard_array[8]) * 6 + parseInt(idcard_array[9]) * 3 ;
					Y = S % 11;
					M = "F";
					JYM = "10X98765432";
					M = JYM.substr(Y,1);
					if(M == idcard_array[17].toUpperCase())
						return Errors[0]; 
					else
						return Errors[3];
				}
				else
					return Errors[2];
				break;
			default:
				return Errors[1];
				break;
	}
}

//校验邮箱
function checkMail(val){
	var flag = /^([a-zA-Z0-9]+[_|\_|\.|\-]+?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.|\-]+?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(val);
	//var flag = /^([a-zA-Z0-9]+[_|\_|\.|\-]+?)*[a-zA-Z0-9]+([a-zA-Z0-9]+[_|\_|\.|\-]+?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(val);
	return flag;
}

//校验手机号码
function checkTel(val){
	var flag = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(val);
	return flag;
}

//证件类型是身份证时，绑定生日和性别的值
function bindIdNoBirthFn(attr,page){
	var $idno = page.find("input[name="+attr[0]+"]");
	var $idtype = page.find("select[name="+attr[1]+"]");
	var $birth = page.find("input[name="+attr[2]+"]");
	var $sex = page.find("select[name="+attr[3]+"]");
	$idno.on("keyup",setVl);
    $idno.on("blur",setVl);
    $idno.on("focus",setVl);
	$idtype.on("change",setVl);
	function setVl(){
		var val=$idno.val(),sex;
		if(val.length>13){
			if($idtype.val()=="IDcard"&&checkIdcard(val)=="ok"){
				$birth.val(val.substr(6,4)+"-"+val.substr(10,2)+"-"+val.substr(12,2));
				sex=parseInt(val.substr(16,1),10)%2==0?"1":"0";
				$sex.val(sex);
			}
		}
	}
}

//转换后台传送的日期
function dateChange(val,flag){
	if(isNaN(val)){return "";}
	if(flag){
		return new Date(val*1000).format("yyyy-mm-dd hh:MM");
	}else{
		return new Date(val*1000).format("yyyy-mm-dd");
	}

}

//获取URL字段方法
function getParam(name){
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
        result = location.search.substring(1).match(reg);
    return result && result[2];
}

// 设置对应区域表单的值
function setAreaParam(area, data, setEmpty){   //setEmpty可选，设置true 把data里面没有但area有的字段置空
      area = $(area);
      var ele = area.find('input,select,textarea');
      ele.each(function(){
          var self = $(this), attr = self.attr('type'),name = self.attr('name');
          if(name){
              if(setEmpty){
                 if(self.is('input') && (attr == 'checkbox' || attr == 'radio')){
                      var value = self.val();
                       if(data[name] === undefined){
                            self.removeAttr("checked");
                       }else{
                            (data[name] == value) && self.attr("checked","checked");
                       }
                  }else{
                     if(data[name] === undefined){
                         self.val('');
                     }else{
                        self.val(data[name]);
                     }
                  }
              }else if(data[name]){
                  if(self.is('input') && (attr == 'checkbox' || attr == 'radio')){
                      var value = self.val();
                       value && value == data[name] && self.attr("checked","checked");
                  }else{
                     self.val(data[name]);
                  }
              }
          }
      });
}
// 获取对应区域表单的值
function getAreaParam(area){
      area = $(area);
      var ele = area.find('input,select,textarea'),
          param = {};
      ele.each(function(){
          var self = $(this), attr = self.attr('type'),name = self.attr('name');
          if(name){
              if(self.is('input') && (attr == 'checkbox' || attr == 'radio')){
                  var value = $('input[name="'+name+'"]:checked').val();
                  param[name] === undefined && value && (param[name] = value);
              }else{
                 if($.trim(self.val()) != ''){
                    param[name] = self.val();
                 }

              }
          }
      });
      return param;
}

function SetCookie(name,value)//两个参数，一个是cookie的名子，一个是值
{
	var Days = 30; //此 cookie 将被保存 30 天
	var exp = new Date(); //new Date("December 31, 9998");
	exp.setTime(exp.getTime() + Days*24*60*60*1000);
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
} 

function getCookie(name){
    var reg = new RegExp("(^|(;\\s))"+name+"=([^;]*)"), val = '';
    var matchCookie = document.cookie.match(reg);
    if(matchCookie && matchCookie.length >= 2){
        val =  matchCookie[3];
    }
    return val;
}

function getClientData(name){
    var val = '';
    if(window.localStorage){
        val = localStorage[name];
    }else{
        var reg = new RegExp("(^|(;\\s))"+name+"=([^;]*)");
        var matchCookie = document.cookie.match(reg);
        if(matchCookie && matchCookie.length >= 2){
           val =  matchCookie[3];
        }
    }
    return val;
}

function setClientData(name, value){
    if(window.localStorage){
        localStorage[name] = value;
    }else{
        var now = new Date();
        now = now.setDate(now.getDate() + 1);
        document.cookie = name + '=' + value + ';expires=' + new Date(now).toGMTString();
    }
}

function delClientData(name){
    if(window.localStorage){
        localStorage.removeItem(name);
    }else{
        var now = new Date();
        now = now.setDate(now.getDate() - 1);
        document.cookie = name + '=' + getClientData(name) + ';expires=' + new Date(now).toGMTString();
    }
}

//验证不通过，错误提示
function showTips(msg,img){
    var wrap=$(".tips");
    wrap.find('p').html(msg);
    wrap.find('.img').html(img);
    wrap[0].timer&&clearTimeout(wrap[0].timer);
    wrap.show();
    wrap[0].timer=setTimeout(function(){
        wrap.animate({"top":"200px"},"normal","",function(){
           wrap.hide();
           wrap.css({"top":"100px"});
        });
        wrap.find('.bg').animate({"opacity":"0"},"normal","",function(){
           wrap.find('.bg').css({"opacity":"0.65"});
        });
    },2000);
}

//验证不通过，错误提示
function showError(msg){
	var wrap=$(".error");
	wrap[0].timer&&clearTimeout(wrap[0].timer);
	wrap.find("span").html(msg);
	wrap.show();
	wrap[0].timer=setTimeout(function(){
		wrap.animate({"opacity":"0"},"normal","",function(){
		   wrap.hide();
		   wrap.css("opacity","1");
		});
	},2000);
}

//返回函数
var timer;
function pageBack(){
	clearTimeout(timer);
	timer=setTimeout(function(){
		history.back();
	},200);    	
}

//页面访问统计入库
function pageLinkStatisticsFn(linkData){
    //统计
    $.ajax({
            type: "POST",
            url: "/api/linkin",
            dataType: "json",
            data: linkData,
            success: function(data) {
        }
    });
}
