# Todo

加载中：现在所有页面的加载状态都只是一行“Loading...”文字。更好的做法是用和最终布局一样形状的骨架屏，页面不会跳动。
操作成功：保存车辆、添加记录之后没有任何提示，用户不确定是否保存成功。通常用一个右下角的 toast 提示。
危险操作确认：删除车辆、删除记录都是点一下就直接删掉。现在删车还会级联删除所有保养记录，更需要一个确认弹窗。
错误和 404 页面：项目里还没有 not-found.tsx 和 error.tsx，访问不存在的车会显示 Next.js 的默认页面，和整体风格不统一。
导航栏的移动端适配

Skeleton Sonner Alert Dialog Alert Dropdown Menu Separator Select Textarea
