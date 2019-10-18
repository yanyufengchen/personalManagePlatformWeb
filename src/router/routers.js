import Main from '@/components/main'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '',
    name: 'doc',
    meta: {
      title: '文档',
      href: 'https://lison16.github.io/iview-admin-doc/#/',
      icon: 'ios-book'
    }
  },
  {
    path: '/message',
    name: 'message',
    component: Main,
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    children: [
      {
        path: 'message_page',
        name: 'message_page',
        meta: {
          icon: 'md-notifications',
          title: '消息中心'
        },
        component: () => import('@/view/single-page/message/index.vue')
      }
    ]
  },
  {
    path: '/components',
    name: 'components',
    meta: {
      icon: 'logo-buffer',
      title: '组件'
    },
    component: Main,
    children: [
      {
        path: 'cropper_page',
        name: 'cropper_page',
        meta: {
          icon: 'md-crop',
          title: '图片裁剪'
        },
        component: () => import('@/view/components/cropper/cropper.vue')
      },
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  },
  {
    path: '/manage',
    name: 'message_manage',
    meta: {
      icon: 'ios-man',
      title: '信息管理'
    },
    component: Main,
    children: [
      {
        path: '/message',
        name: 'person_message',
        meta: {
          icon: 'md-funnel',
          title: '个人信息管理'
        },
        component: () => import('@/view/manage/personMessage.vue')
      },
      {
        path: '/person2',
        name: 'person_message2',
        meta: {
          icon: 'md-funnel',
          title: '个人信息'
        },
        component: () => import('@/view/manage/personMessage.vue')
      },
    ]
  },
  {
    path: '/bak',
    name: 'bak',
    meta: {
      icon: 'md-menu',
      title: '数据备份'
    },
    component: Main,
    children: [
      {
        path: '/database',
        name: 'database_bak',
        meta: {
          icon: 'ios-copy-outline',
          title: '数据库备份'
        },
        component: () => import('@/view/bak/database.vue')
      },
      {
        path: '/add',
        name: 'add_database',
        meta: {
          hideInMenu: true,
          icon: 'md-add',
          title: '添加数据库备份'
        },
        component: () => import('@/view/bak/component/addDataBak.vue')
      },
      {
        path: '/file',
        name: 'file_bak',
        meta: {
          icon: 'md-folder',
          title: '文件备份'
        },
        component: () => import('@/view/bak/filebak.vue')
      },
    ]
  },
  {
    path: '/item',
    name: 'item',
    meta: {
      icon: 'ios-book-outline',
      title: '备份录'
    },
    component: Main,
    children: [
      {
        path: '/note',
        name: 'note',
        meta: {
          icon: 'ios-create-outline',
          title: '便签'
        },
        component: () => import('@/view/item/note.vue')
      },
      {
        path: '/bill',
        name: 'bill',
        meta: {
          icon: 'ios-open-outline',
          title: '个人账单'
        },
        component: () => import('@/view/item/personalBill.vue')
      },
    ]
  }
]
