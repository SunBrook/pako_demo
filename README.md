# pako_demo
pako 压缩案例



> Pako github：https://github.com/nodeca/pako
>
> Pako API: http://nodeca.github.io/pako/



## 调用方法

```javascript
<script src="js/pako.js"></script>
<!--自定义常用方法-->
<script src="js/pako.init.js"></script>

<script type="text/javascript">
    //正常文本
    var normal_text = "pako 是一款对内容压缩与解压的js，思想是zlib。";
	//压缩
	var zip_text = zip(normal_text);
	//解压
	var unzip_text = unzip(zip_text);
</script>
```

