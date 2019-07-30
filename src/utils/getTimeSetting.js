export default function getTimeSetting(value){
    if(value === 30) return '30秒';
    else if(value === 60) return '1分钟';
    else if(value === 90) return '1分30秒';
    else if(value === 120) return '2分钟';
    else if(value === 150) return '2分30秒';
    else if(value === 180) return '3分钟'
}