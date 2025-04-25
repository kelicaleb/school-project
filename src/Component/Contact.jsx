import React from 'react'
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";




function Contact(){


    return(
        <>
        <div className=" absolute  top-[63rem] h-[30rem] w-screen bg-slate-800  place-items-start left-0 right-0 bg-cover inset-0 bg-no-repeat">
            <div className="grid grid-cols-3">
                <div>
                    <h1 className="font-serif font-semibold text-white pt-4 underline">About Bloo </h1>
                    <ul className="font-serif text-white pt-2">
                    <li className="pt-2 hover:text-cyan-500 hover:underline">About us</li>
                    <li className="pt-2 hover:text-cyan-500 hover:underline">Returns and Refunds Policy</li>
                    <li className="pt-2 hover:text-cyan-500 hover:underline">Jumia Careers</li>
                    <li className="pt-2 hover:text-cyan-500 hover:underline">Jumia Express</li>
                    <li className="pt-2 hover:text-cyan-500 hover:underline">Terms and Conditions</li>
                    <li className="pt-2 hover:text-cyan-500 hover:underline">Store Credit Terms and Condition</li>
                    <li className="pt-2 hover:text-cyan-500 hover:underline">Privacy Notice</li>
                    <li className="pt-2 hover:text-cyan-500 hover:underline">Cookies Notice</li>
                    <li className="pt-2 hover:text-cyan-500 hover:underline">Flash Sales</li>
                    <li className="pt-2 hover:text-cyan-500 hover:underline">Jumia Global</li>
                    </ul>
                </div>
                <div>
                    <h1 className="text-white font-serif pt-4 font-semibold underline">Bloo payment method</h1>
                    <ul className="text-white font-serif">
                        <li className="pt-2 hover:text-cyan-500 hover:underline">Mpesa</li>
                        <li className="pt-2 hover:text-cyan-500 hover:underline">Paypal</li>
                        <li className="pt-2 hover:text-cyan-500 hover:underline">Cash on delivery</li>
                        <li className="pt-2 hover:text-cyan-500 hover:underline">Bloo Points</li>
                    </ul>
                </div>
                <div>
                    <h1 className="font-serif pt-4 underline text-white font-semibold">Need Help?</h1>
                    <ul className="font serif text-white pt-2"> 
                        <li className="pt-2 hover:text-cyan-500 hover:underline" >Invest With us</li>
                        <li className="pt-2 hover:text-cyan-500 hover:underline">Account</li>
                        <li className="pt-2 hover:text-cyan-500 hover:underline">Help Center</li>
                    </ul>
                    <h1 className="text-white underline pt-2">Devs Team</h1>
                    <ul className="font-serif text-white">
                        <li className="hover:text-cyan-500"> <a href="https://kelicaleb.github.io/portfolio/">CalebKeli</a></li>
                        <li className="hover:text-cyan-500"> Derrick</li>
                        <li className="hover:text-cyan-500">Asava</li>
                        <li className="hover:text-cyan-500">Brandon</li>
                        <li className="hover:text-cyan-500"><a href="https://fireship.io/">Denis Nkarachia</a></li>
                        <li className="hover:text-cyan-500"><a href="https://fireship.io/">Dave</a></li>

                    </ul>
                </div>
            </div>
            <div className="relative flex items-center justify-center pl-12 pt-8 space-x-11 ">
                <FaInstagram className="h-[2rem] w-[4rem] text-pink-500" />
                <FaXTwitter className=" h-[2rem] w-[4rem] text-white" />
                <FaFacebookF  className=" h-[2em] w-[4rem] text-blue-500"/>
            </div>
        </div>
        </>
    )
}



export default Contact 