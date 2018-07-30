# 生命周期

* [【译】最新版本*react*组件*生命周期详解*(v16.3.1) - CSDN博客](https://www.baidu.com/link?url=9uiCz-_PFUwo6OozbfAt0w9RBP86dk8aWYw3FJzF2bcL0LHT8CCRDcyYqvSOpVEaI0CF16Kcm8rJo950T4Mohp6ihI6qD8yy4hDjtSixYG7&wd=&eqid=f9b48b9f0000bd67000000045b5f2a85)
* [React生命周期使用详解](https://blog.csdn.net/bangbDIV/article/details/80771213)
先上上一张图再说，哈哈
![lifecycle](https://upload-images.jianshu.io/upload_images/4340772-bfccb50d01e0f44e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##综述
### 1.初始化

在组件初始化阶段会执行 
1. `constructor` 
2. `static getDerivedStateFromProps()` 
3. `componentWillMount()` / `UNSAFE_componentWillMount()` 
4. `render()` 
5. `componentDidMount()`

### 2.更新阶段

`props`或`state`的改变可能会引起组件的更新，组件重新渲染的过程中会调用以下方法： 
1. `componentWillReceiveProps()` / `UNSAFE_componentWillReceiveProps()` 
2. `static getDerivedStateFromProps()` 
3. `shouldComponentUpdate()` 
4. `componentWillUpdate()` / `UNSAFE_componentWillUpdate()` 
5. `render()` 
6. `getSnapshotBeforeUpdate()` 
7. `componentDidUpdate()`

### 3.卸载阶段

1.  `componentWillUnmount()`

### 4.错误处理

1.  `componentDidCatch()`


### 分述之

### 1.constructor
* react组件的构造函数在挂载之前被调用。
* 只要组件存在constructor,就必要**先写super**,否则this指向会错误
先在添加其他内容**前，调用super(props)**，用来**将父组件传来的props绑定到这个类**中，使用this.props将会得到
* constructor中应当做些初始化的动作，如：`初始化state`，将事件处理函数绑定到类实例上，但也`不要使用setState()`。如果没有必要初始化state或绑定方法，则不需要构造constructor，或者把这个组件换成纯函数写法。

### 2. componentWillMount 组件将要挂载
* 1、组件刚经历constructor,初始完数据
2、组件还未进入render，组件还未渲染完成，dom还未渲染
* componentWillMount 一般用的比较少，更多的是用在服务端渲染,componentWillMount()将**在react未来版本中被弃用**
* 为了避免副作用和其他的订阅，官方都建议使用`componentDidMount()`代替。

### 3、componentDidMount 组件渲染完成
* 组件第一次渲染完成，此时dom节点已经生成
* **可以在这里调用ajax请求**，返回数据setState后组件会重新渲染

### (componentWillReceiveProps (nextProps)
componentWillReceiveProps在**接受父组件改变后的props需要重新渲染组件时用到的比较多**
它接受一个参数

1.nextProps
通过对比nextProps和this.props，将nextProps setState为当前组件的state，从而重新渲染组件

###  (shouldComponentUpdate(nextProps,nextState)性能优化会用到
唯一用于控制组件重新渲染的生命周期，由于在react中，setState以后，state发生变化，组件会进入重新渲染的流程，（暂时这么理解，其实setState以后有些情况并不会重新渲染，比如数组引用不变）在这里return false可以阻止组件的更新

因为react父组件的重新渲染会导致其所有子组件的重新渲染，这个时候其实**我们是不需要所有子组件都跟着重新渲染的，因此需要在子组件的该生命周期中做判断**


###4.render()
* **react16中 render函数允许返回一个数组，单个字符串等，不在只限制为一个顶级DOM节点**
`render()`方法是必需的。当他被调用时，他将计算`this.props和this.state`，并返回以下一种类型： 
1. React元素。通过jsx创建，既可以是dom元素，也可以是用户自定义的组件。 
2. 字符串或数字。他们将会以文本节点形式渲染到dom中。 
3. Portals。react 16版本中提出的新的解决方案，可以使组件脱离父组件层级直接挂载在DOM树的任何位置。 
4. null，什么也不渲染 
5. 布尔值。也是什么都不渲染，通常后跟组件进行判断。

当返回`null,false,ReactDOM.findDOMNode(this)`将会返回null，什么都不会渲染。

render()方法必须是一个纯函数，他不应该改变state，也不能直接和浏览器进行交互，**应该将事件放在其他生命周期函数中**
如果shouldComponentUpdate()返回false，`render()`不会被调用。
下面这种可以
```
render () {
  return " "
}
render () {
  return [
                <div></div>
             <div></div>
]}
```

### Fragments

你也可以在render()中使用数组，如：(不要忘记给每个数组元素添加key，防止出现警告)
```
render() {
  return [
    <li key="A">First item</li>,
    <li key="B">Second item</li>,
    <li key="C">Third item</li>,
  ];
}
```
换一种写法，可以不写key（v16++）
```
render() {
  return (
    <React.Fragment>
      <li>First item</li>
      <li>Second item</li>
      <li>Third item</li>
    </React.Fragment>
  );
}
```

### 5. componentDidUpdate(prevProps,prevState)

组件更新完毕后，react只会在第一次初始化成功会进入componentDidmount,之后每次重新渲染后都会进入这个生命周期，这里可以拿到prevProps和prevState，即更新前的props和state。
如果你理解了组件一次重新渲染的过程，那么你应该理解下面5处打印出来的state应该是相同的。（关于setState异步是同步的理解，后面也会整理一篇文章~）

```
componentWillReceiveProps (nextProps,nextState) {
    this.setState({
        fengfeng:nextProps.fengfeng
    },()=>{
        console.log(this.state.fengfeng) //1
    })
    
}
shouldComponentUpdate (nextProps,nextState) {
    console.log(nextState.fengfeng)  //2
}
componentWillUpdate (nextProps,nextState) {
    console.log(nextState.fengfeng)  //3
}
componentDidUpdate (prevProps,prevState) {
    console.log(this.state.fengfeng) //5
}
render () {
    console.log(this.state.fengfeng) //4
    return (
        <div></div>
    )
}

```

### 6. componentWillUnmount ()

componentWillUnmount也是会经常用到的一个生命周期，初学者可能用到的比较少，但是用好这个确实很重要的哦

> 1.clear你在组建中所有的setTimeout,setInterval
> 2.移除所有组建中的监听 removeEventListener
> 3.也许你会经常遇到这个warning:

```
Can only update a mounted or mounting component. This usually means you called setState() on an       
 unmounted component. This is a no-op. Please check the code for the undefined component.
```

是因为你在组建中的ajax请求返回中setState,而你组件销毁的时候，请求还未完成，因此会报warning
解决办法为

```

componentDidMount() {
    this.isMount === true
    axios.post().then((res) => {
     this.isMount && this.setState({   // 增加条件ismount为true时
      aaa:res
    })
})
}
componentWillUnmount() {
    this.isMount === false
}

```
