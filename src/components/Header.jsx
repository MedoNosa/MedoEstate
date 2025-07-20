'use client';
import { SignedIn, SignedOut, SignIn, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaSearch, FaBars ,FaTimes  } from 'react-icons/fa';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header className='bg-slate-300 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        {/* Logo */}
        <Link href='/'>
          <h1 className='text-xl font-bold'>
            <span className='text-slate-500'>Medo</span>
            <span className='text-slate-700'>Estate</span>
          </h1>
        </Link>

        {/* Search */}
        <form className='bg-slate-100 p-2 rounded-lg flex items-center'>
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-24 sm:w-64'
          />
          <button type='submit'>
            <FaSearch className='text-slate-600' />
          </button>
        </form>

        {/* Desktop Menu */}
        <ul className='hidden sm:flex gap-4'>
          <Link href='/'>
            <li className='text-slate-700 hover:underline'>Home</li>
          </Link>
          <Link href='/about'>
            <li className='text-slate-700 hover:underline'>About</li>
          </Link>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Link href='/sign-up'>
              <li className='text-slate-700 hover:underline'>Sign Up</li>
            </Link>
          </SignedOut>
        </ul>

        {/* Mobile Menu Icon */}
        {!menuOpen ?<div className='sm:hidden'>
          <FaBars
            className='text-xl text-slate-700 cursor-pointer'
            onClick={toggleMenu}
          />
        </div>: <div className='sm:hidden'>
          <FaTimes 
            className='text-xl text-slate-700 cursor-pointer'
            onClick={toggleMenu}
          />
        </div>}
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className='sm:hidden  flex flex-col items-center'>
            <ul className='sm:hidden flex flex-col gap-2 p-4 '>
          <Link href='/'>
            <li className='text-slate-700 hover:underline'>Home</li>
          </Link>
          <Link href='/about'>
            <li className='text-slate-700 hover:underline'>About</li>
          </Link>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Link href='/sign-up'>
              <li className='text-slate-700 hover:underline'>Sign Up</li>
            </Link>
          </SignedOut>
        </ul>
        </div>
        
      )}
    </header>
  );
}
