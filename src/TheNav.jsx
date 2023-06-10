import {HomeIcon, SearchIcon, ViewBoardsIcon, PlusIcon, HeartIcon} from '@heroicons/react/outline'
import { NavItem } from './NavItem'

const navItems = [
  {
    label: 'Home',
    className: 'flex items-center text-white bg-[#282828] mx-2 px-4 py-2 rounded',
    icon: <HomeIcon className='w-6 h-6'/>
  },
    {
    label: 'Search',
    className: 'flex items-center hover:text-white mx-2 px-4 py-2 rounded duration-300',
    icon: <SearchIcon className='w-6 h-6'/>
  },
  {
    label: 'Your Library',
    className: 'flex items-center hover:text-white mx-2 px-4 py-2 rounded duration-300 mb-6',
    icon: <ViewBoardsIcon className='w-6 h-6'/>
  },
  {
    label: 'Create Playlist',
    className: 'flex items-center hover:text-white mx-2 px-4 py-2 rounded duration-300',
    icon: <PlusIcon className='w-6 h-6'/>
  },
    {
    label: 'Liked Songs',
    className: 'flex items-center hover:text-white mx-2 px-4 py-2 rounded duration-300',
    icon: <HeartIcon className='w-6 h-6'/>
  },
]

export const TheNav = () => {
  return (
          <nav>
            {
              navItems.map(({label, icon, className}) => 
              <NavItem key={label} className={className} icon={icon}>{label}</NavItem>)
            }
          </nav>
  )
}
