import React from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { navItems } from '@/constants';
import Link from 'next/link';

const Header = () => {
  return (
    <header className='fixed flex justify-center items-center w-full h-[60px] mt-4 px-5 z-50'>
        <div className='flex justify-between items-center border border-text-primary/30 w-full max-w-[1200px] h-full rounded-md backdrop-blur-md bg-background/50 px-4 md:px-8'>
            <div className='flex-shrink-0'>
                <Image src="/icons/logo.svg" alt="Learner Logo" width={109} height={28} />
            </div>
            
            <nav className='hidden lg:flex flex-1 max-w-[500px] mx-4'>
                <ul className='flex justify-between items-center w-full gap-2 md:gap-4'>
                    {navItems.map((item) => (
                        <li key={item.id}>
                            <Link href={item.url} className='text-text-secondary text-[14px] hover:text-text-primary transition-colors duration-200 whitespace-nowrap'>{item.title}</Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className='flex justify-end gap-2 flex-shrink-0'>
                <Button variant="noOutline" className="hidden sm:inline-flex">
                    <Link href="/auth/login">Log in</Link>
                </Button>
                <Button variant="outline">
                    <Link href="/auth/signup">Sign up</Link>
                    
                </Button>
            </div>
        </div>
    </header>
  )
}

export default Header