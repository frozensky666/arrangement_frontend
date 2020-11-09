//是否是手机端
export const _isMobile = () => {
    return navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
};

//根据字符串生成随机颜色
const MyHash = (str) => {
    let hash = 1315423911;
    for(let i=0;i<str.length;i++) {
        hash ^= ((hash << 5) + str.charCodeAt(i)+(hash >> 2));
    }
    return (hash & 0x7FFFFFFF);
};

const colors = [
    "hsl(17,98%,74%)",
    "hsl(192,92%,55%)",
    "hsl(40,79%,59%)",
    "hsl(164,74%,61%)",
    "hsl(109,11%,80%)",
    "hsl(16,93%,64%)",
    "hsl(205,97%,54%)",
    "hsl(51,81%,85%)",
    "hsl(167,36%,51%)",
    "hsl(208,23%,22%)",
    "hsl(331,52%,45%)",
    "hsl(240,44%,41%)",
    "hsl(0,97%,71%)",
    "hsl(167,68%,76%)",
    "hsl(284,60%,77%)",
    "hsl(323,53%,27%)",
    "hsl(223,60%,23%)",
    "hsl(341,96%,62%)",
    "hsl(67,36%,63%)",
    "hsl(275,28%,48%)"
];

export const generateRandomColor = (str) => {
    return colors[MyHash(str)%20];
};

//将颜色变淡 (传入hsl格式的颜色
export const colorFaded = (hslColor) => {
    return `${hslColor.split(",")[0]},15%,92%`;
};

export const toLocalDate = (d) => {
   return  new Date( new Date(d).getTime()+ 8 * 3600 * 1000).toISOString()
        .split("T")[0];
};

