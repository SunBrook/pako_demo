//压缩
function zip(str) {
    var binaryString = pako.gzip(str, {to: 'string'});
    //base64转字符串
    return btoa(binaryString);
}

//解压
function unzip(base64Data) {
    //字符串解码为base-64
    var strData = atob(base64Data);
    //将二进制字符串转换为数字字符数组
    var charData = strData.split('').map(function (x) {
        return x.charCodeAt(0);
    });
    //将数字数组转换为字节数组
    var binData = new Uint8Array(charData);
    //解压
    var data = pako.inflate(binData);
    //将字符数组转换回字符串
    return _utf8ArrayToStr(data);
}

//Uint8Array 转 中文乱码问题
function _utf8ArrayToStr(array){
    var out, i, len, c;
    var char2, char3;

    out = "";
    len = array.length;
    i = 0;
    while(i < len) {
        c = array[i++];
        switch(c >> 4)
        {
            case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
            // 0xxxxxxx
            out += String.fromCharCode(c);
            break;
            case 12: case 13:
            // 110x xxxx   10xx xxxx
            char2 = array[i++];
            out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
            break;
            case 14:
                // 1110 xxxx  10xx xxxx  10xx xxxx
                char2 = array[i++];
                char3 = array[i++];
                out += String.fromCharCode(((c & 0x0F) << 12) |
                    ((char2 & 0x3F) << 6) |
                    ((char3 & 0x3F) << 0));
                break;
        }
    }
    return out;
}