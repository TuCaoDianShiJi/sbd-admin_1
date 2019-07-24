// 设置cookie
export function setCookie(name, value, days){
    var d = new Date();
    d.setTime(d.getTime()+(days*24*60*60*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = name + "=" + value + "; " + expires + ';path=/';
}

// 获取cookie
export function getCookie(cname){
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) 
    {
        var c = ca[i].trim();
        if (c.indexOf(name)==0) return c.substring(name.length,c.length);
    }
    return "";
}

// // 删除cookie
// export function delCookie(cname){
//     setCookie(cname, ' ', -1);
// }