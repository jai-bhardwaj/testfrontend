import React from 'react';
import useLocalStorage from 'use-local-storage'
import { IoMdMoon } from "react-icons/io";
import { FaSun } from "react-icons/fa";
import axios from 'axios';

const Navbar = () => {
    const [theme, setTheme] = useLocalStorage('theme' ? 'dark' : 'light')

    const switchTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme)
    }
    const LogoutData = () => {
        axios.get('http://localhost:7777/logout')
            .then((res) => {
                console.log(res.data)
            })
            .catch((error) => {
                console.log('fetching error', Error)
            })
    }
    return (
        <div className='p-3 flex items-center justify-around h-16 bg-black'>
            
            <button onClick={LogoutData}>logut</button> 

        </div>
    );
}

export default Navbar;
