'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { FaBars, FaCalendar, FaChevronDown, FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import Logo from '../../../public/assets/Logov1.png'
import { usePathname } from 'next/navigation';
import { useAuth } from '../context/authContext';
import { FaPeopleGroup } from 'react-icons/fa6';
import { IoPersonOutline } from 'react-icons/io5';
import { PiListChecksBold } from 'react-icons/pi';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [tittlePage, setTittlePage] = useState('Agendamentos')
  const { authState, logout, userData } = useAuth();
  const { allowedRoutes, error, loading, user } = authState
  
  const subtitleRoles: Record<string, Record<string, string>> = {
    admin: {
      logs: 'Acompanhe todos os logs de clientes',
      clientes: 'Overview de todos os clientes',
      agendamentos: 'Acompanhe todos os agendamentos de clientes de forma simples'
    },
    cliente: {
      agendamentos: 'Acompanhe todos os seus agendamentos de forma simples',
      logs: 'Acompanhe todas as suas Logs',
      ['minha conta']: 'Ajuste informações da sua conta de forma simples'
    }
  }

  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const iconComponents: Record<string, React.ComponentType<{ className?: string }>> = {
    PiListChecksBold,
    FaPeopleGroup,
    IoPersonOutline,
    FaCalendar,
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }
  if (pathname === '/admin/login' || pathname === '/login' || pathname === '/cadastro') {
    return <>{children}</>;
  }

  if(allowedRoutes.length < 1 && !user) {
    userData()
  }

  return (
    <div>
      {/* Mobile sidebar */}
      <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
        <DialogBackdrop className="fixed inset-0 bg-gray-300/80" />
        
        <div className="fixed inset-0 flex">
          <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1">
            <div className="absolute top-0 left-full flex w-16 justify-center pt-5">
              <button 
                type="button" 
                onClick={() => setSidebarOpen(false)} 
                className="-m-2.5 p-2.5"
                aria-label="Fechar menu"
              >
                <FaTimes className="h-6 w-6 text-white" />
              </button>
            </div>
            
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
              <div className="flex h-[100px] shrink-0 items-center border-b border-gray-200 px-4">
                <Image src={Logo} alt='Logo agendamentos'/>
              </div>
              <nav className="flex flex-1 flex-col">
                <ul className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul className="-mx-2 space-y-1">
                      {allowedRoutes.map((route) => {
                        const IconComponent = iconComponents[route.icon];
                        return (
                          <li key={route.href}>
                            <Link
                              href={route.href}
                              className={classNames(
                                pathname === route.href
                                  ? 'bg-black text-white p-3'
                                  : 'text-black-400 hover:bg-gray-900 hover:text-white',
                                'group flex gap-x-3 rounded-md p-3 text-sm font-semibold'
                              )}
                            >
                              {IconComponent && (
                                <IconComponent className="h-6 w-6 shrink-0" aria-hidden="true" />
                              )}
                              {route.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                 
                </ul>
              </nav>
              {user && (
              <Menu as="div" className="relative border-t p-4 border-gray-300">
                <MenuButton className="-m-1.5 flex items-center justify-between p-1.5 w-full">
                  <div className="flex flex-row justify-start flex-wrap">
                    <span className="block text-black font-medium w-full text-left">
                      {user.name.split(' ')[0]}
                    </span>
                    <span className="text-xs font-normal text-gray-900 text-left">
                      {user.role}
                    </span>
                  </div>
                  <span className="lg:flex lg:items-center">
                  <FaChevronDown className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </MenuButton>
                <MenuItems className="absolute right-0 z-10 -mt-20.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                   <MenuItem>
                    <button
                      onClick={() => {
                        const dataLog = {
                          userId: user.id,
                          action: 'Logout',
                          description: 'Minha Conta'
                        }
                        logout(dataLog)
                      }}
                      className="block px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-gray-50 w-full text-left"
                    >
                      Sair
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            )}
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col border-r border-gray-200">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto pb-4">
          <div className="flex h-[100px] shrink-0 items-center border-b border-gray-200 px-4">
            <Image src={Logo} alt='Logo agendamentos'/>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul className="flex flex-1 flex-col gap-y-7 p-4">
              <li>
                <ul className="-mx-2 space-y-1 ">
                  {allowedRoutes.map((route) => {
                    const IconComponent = iconComponents[route.icon];
                    return (
                      <li key={route.href}>
                        <Link
                          href={route.href}
                          className={classNames(
                            pathname === route.href
                              ? 'bg-black text-white p-3'
                              : 'text-black-400 hover:bg-gray-900 hover:text-white',
                            'group flex gap-x-3 rounded-md p-3 text-sm font-semibold'
                          )}
                          onClick={() => {setTittlePage(route.name)} }
                        >
                          {IconComponent && (
                            <IconComponent className="h-6 w-6 shrink-0" aria-hidden="true" />
                          )}
                          {route.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            </ul>
            {user && (
              <Menu as="div" className="relative border-t p-4 border-gray-300">
                <MenuButton className="-m-1.5 flex items-center justify-between p-1.5 w-full">
                  <div className="flex flex-row justify-start flex-wrap">
                    <span className="block text-black font-medium w-full text-left">
                      {user.name.split(' ')[0]}
                    </span>
                    <span className="text-xs font-normal text-gray-900 text-left">
                      {user.role}
                    </span>
                  </div>
                  <span className="lg:flex lg:items-center">
                  <FaChevronDown className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </MenuButton>
                <MenuItems className="absolute right-0 z-10 -mt-20.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                   <MenuItem>
                    <button
                      onClick={() => {
                        const dataLog = {
                          userId: user.id,
                          action: 'Logout',
                          description: 'Minha Conta'
                        }
                        logout(dataLog)
                      }}
                      className="block px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-gray-50 w-full text-left"
                    >
                      Sair
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            )}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-72">
        <div className="sticky top-0 z-40 flex h-[100px] shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            aria-label="Abrir menu"
          >
            <FaBars className="h-6 w-6" aria-hidden="true" />
          </button>

          <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

          <div className="flex flex-1 justify-start gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-col items-start justify-center gap-x-4 lg:gap-x-6">
                <h1 className='font-bold text-4xl'>{tittlePage}</h1>
                
                {
                  user?.role === 'ADMIN' ? (<p>{subtitleRoles.admin[tittlePage.toLowerCase()]}</p>) : (
                    <p>{subtitleRoles.cliente[tittlePage.toLowerCase()]}</p>
                  )
                }
            </div>
          </div>
        </div>

        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            {loading && (
              <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
              </div>
            )}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}