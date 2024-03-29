import { IoIosSpeedometer } from 'react-icons/io'
import { FaUser, FaHospitalUser, FaUsers, FaClipboard, FaPollH, FaBell, FaFlask, FaBeer, FaTags, FaShoppingCart, FaMoneyBill } from 'react-icons/fa'
import { HiHome, HiAcademicCap, HiUserGroup, HiOfficeBuilding, 
    HiBookOpen, HiMenu } from 'react-icons/hi'
import { ImOffice } from 'react-icons/im'
import { AiOutlineLineChart } from 'react-icons/ai'
import { MdOutlineScore } from 'react-icons/md'
import { RiSettings4Line } from 'react-icons/ri'
import { Facebook, Twitter, Instagram, BarChart2, TrendingUp } from 'react-feather'

export const PORT = 5000
export const URL = `http://localhost:${PORT}`
export const URL_AUTH = `http://localhost:${PORT}/auth`

export const images = {
    logo: require('../images/logo.png'),
    heineken: require('../images/heineken.jpeg'),
    pepsi: require('../images/pepsi.jpg'),
    coke: require('../images/coke.jpg'),
    fanta: require('../images/fanta.jpg'),
    image1: require('../images/image1.jpg'),
    image2: require('../images/image2.jpg'),
    image3: require('../images/image3.jpg'),
}

export const icons = {
  linechart: AiOutlineLineChart,
  outlinescore: MdOutlineScore,
  barchart2: BarChart2,
  trendingup: TrendingUp,
  speedometer: IoIosSpeedometer,
  home: HiHome,
  menus: HiMenu,
  academic: HiAcademicCap,
  userGroup: HiUserGroup,
  officeBuilding: HiOfficeBuilding,
  offiiceBuildings: ImOffice,
  openBook: HiBookOpen,
  settings: RiSettings4Line,
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  user: FaUser,
  users: FaUsers,
  categories: FaTags,
  medicalStaff: FaHospitalUser,
  medicalReport: FaClipboard,
  reports: FaPollH,
  product: FaBeer,
  notification: FaBell,
  order: FaShoppingCart,
  sales: FaMoneyBill,
  customers: FaUsers,
  lab: FaFlask,
}

export const styles = {
    btnToggler: `
      inline-flex items-center justify-center p-2 rounded-md text-gray-400 
      hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white
    `,
    btnNav: `
        text-indigo-100 font-bold px-4 py-2 rounded-full text-xs uppercase
    `,
    input: `
        bg-slate-100 border border-gray-200 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
        focus:border-primary-600 ark:text-gray-900 
        dark:focus:ring-blue-500 dark:focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 mb-2
    `,
    inputLight: `
        border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
        focus:border-primary-600 block 
        w-full p-2.5 dark:bg-white dark:border-gray-400 dark:placeholder-gray-400 dark:text-gray-900 
        dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2
    `,
    btnPrimary: `
        w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:border 
        focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 
        dark:hover:bg-primary-700 
        dark:focus:ring-primary-800 hover:border my-2
    `,
    btnSecondary: `
        w-full text-white bg-primary-600 hover:bg-primary-200 focus:ring-4 focus:outline-none focus:border 
        focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 
        dark:hover:bg-primary-700 disabled:bg-gray-100
        dark:focus:ring-primary-800 :hover:border my-2
    `,
    navLink: `
        flex items-center p-2 text-base font-normal text-gray-900 
        rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700
    `,
    navDropdown: `
        flex items-center justify-between p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white
        w-full text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700
    `,
    navLinkItem: `
        text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium
    `,
    indicator: `
        text-lg border-2 border-dotted border-pink-100 p-1 rounded-full h-10 w-10 mx-auto
        font-bold text-center text-red-500
    `,
    button: `
        w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none 
        focus:border focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
        dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:border 
        disabled:bg-gray-800
    `,
    label: `
        block mb-2 text-md font-medium text-gray-900 dark:text-white
    `,
}

export const urls = {
    root: '/',
    signin: 'login',
    signup: 'signup',
    signout: 'signout',
    calendar: 'calendars',
    campuses: 'campuses',
    enterprises: 'enterprises',
    sitemap: 'sitemap',
    globalLocation: 'global-location',
    contact: 'contact-us',
    about: 'about-us',
    mission: 'our-mission',
    vision: 'our-vision',
    settings: 'users',
    departments: 'departments',
    units: 'units',
    offices: 'offices',
    council: 'council',
    courses: 'courses',
    staffs: 'staffs',
    register: 'register',
    create: 'create',
    view: 'view',
    update: 'update',
    delete: 'delete',
    landing: 'landing',
    dashboard: 'dashboard',
    user: 'user',
    admin: 'admin',
    student: 'students',
    overview: 'overview',
    notification: 'notification',
    profile: 'profile',
    categories: 'categories',
    products: 'products',
    orders: 'orders',
    lab: 'lab-results',
    customers: 'customers',
    sales: 'sales',
    prescriptions: 'prescriptions'
}

export const menus = {
    admin: [
      {name: 'Dashboard', link: ``, icon: IoIosSpeedometer },
      {name: 'Staff', link: `${urls.staffs}`, icon: icons.medicalStaff },
      {name: 'Customers', link: `${urls.customers}`, icon: icons.customers},
      {name: 'Categories', link: `${urls.categories}`, icon: icons.categories},
      {name: 'Products', link: `${urls.products}`, icon: icons.product},
      {name: 'Orders', link: `${urls.orders}`, icon: icons.order},
      {name: 'Sales', link: `${urls.sales}`, icon: icons.sales},
      {name: 'Settings', link: `${urls.settings}`, icon: icons.settings },
    ],
    staff: [
        {name: 'Dashboard', link: ``, icon: IoIosSpeedometer },
        {name: 'Staff', link: `${urls.staffs}`, icon: icons.medicalStaff },
        {name: 'Customers', link: `${urls.customers}`, icon: icons.customers},
        {name: 'Categories', link: `${urls.categories}`, icon: icons.categories},
        {name: 'Products', link: `${urls.products}`, icon: icons.product},
        {name: 'Orders', link: `${urls.orders}`, icon: icons.order},
        {name: 'Sales', link: `${urls.sales}`, icon: icons.sales},
    ],
    customer: [
        {name: 'Dashboard', link: ``, icon: IoIosSpeedometer },
        {name: 'Staff', link: `${urls.staffs}`, icon: icons.medicalStaff },
        {name: 'Categories', link: `${urls.categories}`, icon: icons.categories},
        {name: 'Products', link: `products/customer`, icon: icons.product},
        {name: 'Orders', link: `${urls.orders}`, icon: icons.order},
    ],
}

export const links = [
    { name: 'Home', link: '/' },
    {
      name: 'Brewery Tours',
      submenu: true,
      sublinks: [
        {
          Head: 'Brewery Tours',
          sublink: [
            { name: 'Classic Brewery Tour', link: '/classic-brewery-tour' },
            { name: 'Specialty Brews Tour', link: '/specialty-brews-tour' },
            { name: 'Craft Beer Tasting', link: '/craft-beer-tasting' },
          ]
        }
      ]
    },
    {
      name: 'Products',
      submenu: true,
      sublinks: [
        {
          Head: 'Products',
          sublink: [
            { name: 'Beer Selection', link: '/beer-selection' },
            { name: 'Cider Collection', link: '/cider-collection' },
            { name: 'Non-Alcoholic Beverages', link: '/non-alcoholic-beverages' },
          ]
        }
      ]
    },
    {
      name: 'Events & Promotions',
      submenu: true,
      sublinks: [
        {
          Head: 'Events & Promotions',
          sublink: [
            { name: 'Beer Festivals', link: '/beer-festivals' },
            { name: 'Happy Hour Specials', link: '/happy-hour-specials' },
            { name: 'Live Music Nights', link: '/live-music-nights' },
          ]
        }
      ]
    },
    {
      name: 'Brewery Blog',
      link: '/brewery-blog'
    },
    {
      name: 'About Us',
      submenu: true,
      sublinks: [
        {
          Head: 'About the Brewery',
          sublink: [
            { name: 'Our Story', link: '/our-story' },
            { name: 'Brewing Process', link: '/brewing-process' },
            { name: 'Quality Standards', link: '/quality-standards' },
          ]
        },
        {
          Head: 'Management Team',
          sublink: [
            { name: 'CEO', link: '/ceo' },
            { name: 'Brewmaster', link: '/brewmaster' },
            { name: 'Marketing Team', link: '/marketing-team' },
          ]
        },
        {
          Head: 'Brewery Locations',
          sublink: [
            { name: 'Main Brewery', link: '/main-brewery' },
            { name: 'Local Brewpubs', link: '/local-brewpubs' },
          ]
        },
      ]
    },
    { name: 'Contact Us', link: '/contact-us' }
]  
