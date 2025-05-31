import React from 'react'
import { Link } from 'react-router-dom'
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
function Footer() {
    return (
        <div className='bg-purple-800 py-10'>
            <div className='container mx-auto flex justify-between'>
                <span className='text-white text-3xl font-semibold tracking-tight'><Link className="">Hotelo.com</Link></span>
                <span className='text-white text-2xl flex gap-4'>
                    <a href="https://www.linkedin.com/in/kunal-kumar-1a4054295" target="_blank"
    rel="noopener noreferrer"><FaLinkedin /></a>
                    <a href="https://github.com/Kunalyash-dot/hotel-booking-app.git" target="_blank"><FaGithub /></a>
                    <Link to="/"><FaFacebook /></Link>
                </span>
            </div>

        </div>
    )
}

export default Footer
