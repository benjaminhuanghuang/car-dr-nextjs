# UX

## SubmitButton

## 删除操作加上 Alert Dialog 确认弹窗

## 用 Sonner 显示保存成功的提示

Add  action-form.tsx, 因为 toast() 只能在浏览器里调用，而这几个页面都是服务端组件，server action 又运行在服务器上。两边都调不了，所以需要在中间加一层客户端代码。

```tsx
<form action={updateCarWithId}>   // 提交后在服务器上执行 updateCar
```

想在“保存成功”后弹出提示，就要满足两个条件：

知道操作完成了。 只有调用 action 的那一方，在 await 它之后才知道。
在浏览器里执行 toast.success()。 Sonner 是浏览器端的库，它往页面里插入 DOM。

但现在, server action 跑在服务器上，不能调用 toast()。服务器上没有页面，它也碰不到浏览器。
页面组件是服务端组件，不能写事件处理逻辑，也不能使用 hook。
原生 `<form action={serverAction}>` 是 React 直接把表单交给 server action 执行，中间没有地方插入“完成后做点什么”的代码。
所以必须有一个客户端组件，把调用变成：

```ts
await action(formData);   // 1. 调用 server action，等它完成
toast.success("...");     // 2. 在浏览器里弹提示
router.push("/cars");     // 3. 需要的话再跳转
```
