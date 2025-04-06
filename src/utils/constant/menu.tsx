type NavigationMenu = {
  path: string
  name: string
}

const navbarMenu: NavigationMenu[] = [
  {
    path: '/',
    name: 'Home',
  },
  {
    path: '/event',
    name: 'Event',
  },
  {
    path: '/blog',
    name: 'Blog',
  },
  {
    path: '/about-us',
    name: 'About Us',
  },
]

const sidebarMenu: NavigationMenu[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
  },
  {
    path: '/dashboard/report',
    name: 'Report',
  },
  {
    path: '/dashboard/event',
    name: 'Event',
  },
  {
    path: '/dashboard/blog',
    name: 'Blog',
  },
  {
    path: '/dashboard/user',
    name: 'User',
  },
]

export { navbarMenu, sidebarMenu }
