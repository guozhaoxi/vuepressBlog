# 适配器模式

### 封装一个基于fetch的HTTP请求库  
```js
export default class HttpUtils {
  static get(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
                .then(result => result.json())
              .then(result => {
                resolve(result)
              })
              .catch(error => {
                reject(error)
              })
        })
  }

  static post(url,data) {
    return new Promise((resolve, reject) => {
          fetch(url, {
              method: 'POST',
                headers: {
                  Accept: 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: this.changeData(data)
            })
            .then(result => result.json())
            .then(result => {
              resolve(result)
            })
            .catch(error => {
              reject(error)
            })
        })
  }
    
    static changeData(obj) {
      var prop, str = '';
        var i = 0;
        for (prop in obj) {
          if (!prop) {
              return
            }
            if (i == 0) {
              str += prop + '=' + obj[prop]
            } else {
              str += '&' + prop + '=' + obj[prop]
            }
            i++
        }
        return str
    }
}
``` 

使用上面封装好的工具库
```js
const url = 'xxx';
const params = {
	//具体参数
}
// post请求
const postResult = await HttpUtils.post(url, params) || {}
// get请求
const getResult = await HttpUtils.get(url);
```

但还是有很多项目是使用xhr封装的ajax方法，那么我们如何来使用适配器模式来改造一下呢，改造目的是让基于xhr的ajax变为基于fetch的HttpUtils？  
 
 ### 封装一个基于xhr对象的ajax方法
```js
function ajax(type, url, data, success, failed) {
	var xhr = null;
  if (wiindow.XMLHttpRequest) {
  	xhr = new XMLHttpRequest();
  } else {
  	xhr = new ActiveXObject('Microsoft.XMLHTTP')
  }
  
  var type = type.toUpperCase();
  
  if (type == 'GET') {
    if (data) {
    	xhr.open('GET', url, true)
    } else {
    	xhr.open('GET', url, true)
    }
  	xhr.send()
  } else if (type == 'POST') {
  	xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Tyoe', 'application/x-www-form-urlencoded');
    xhr.send(data);
  }
  
  // 处理返回数据
  xhr.onreadystatechange = function() {
  	if (xhr.readyState === 4) {
    	if (xhr.status === 200) {
      	success(xhr.responseText)
      } else {
      	if (failed) {
        	failed(xhr.status)
        }
      }
    }
  }
}
```

来看一下封装好的Ajax方法是如何调用的
```js
Ajax(get, url, data, function(){
  	//成功的回调
	}, function() {
  // 失败的回调
})
``` 

这下可就慌了阿，两种方法的接口名不一样，关键是入参方式也不一样，这个时候咋办呢？一个一个去改？闹着玩呢？这个时候就该适配器模式上场表现了！通过适配器去承接旧接口的参数，抹平差异，实现新旧接口的无缝衔接。 
 
 ```js
function AjaxAdapter(type, url, data, success, failed) {
	const type = type.toUpperCase();
  let result;
  try {
  	if (type == 'GET') {
    	result = await HttpUtils.get(url) || {}
    } else if (type == 'POST') {
    	result = await HttpUtils.post(url,data) || {}
    }
    result.statusCode === 1 && success ? success(result) : failed(result.statusCode)
  }catch(error){
  	if (failed) {
    	failed(error.statusCode)
    }
  }
}
```

使用适配器来调用旧的Ajax方法 
 
```js
Ajax(type, url, data, success, failed) {
	AjaxAdapter(type, url, data, success, failed)
}
``` 

本文完