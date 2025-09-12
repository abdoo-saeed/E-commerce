"use client"

import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
export default function Footer() {
   

    return (

        <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">My Brand</h2>
          <p className="text-sm">
            Your one-stop shop for the best gaming , electronics & fashion
            Quality products, trusted by gamers.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href={"/"} className="hover:text-white text-white">Shop</a></li>
            <li><a href={"/categories"} className="hover:text-white">Categories</a></li>
            <li><a href={"/wishList"} className="hover:text-white">Wishlist</a></li>
            <li><a href={"/brnds"} className="hover:text-white">Brands</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Customer Service</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">FAQ</a></li>
            <li><a href="#" className="hover:text-white">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">Contact Us</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white"><Facebook /></a>
            <a href="#" className="hover:text-white"><Twitter /></a>
            <a href="#" className="hover:text-white"><Instagram /></a>
            <a href="#" className="hover:text-white"><Youtube /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-6">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between text-sm text-gray-400">
          <p>© {new Date().getFullYear()} My Brand. All rights reserved.</p>
          <p>Made with ❤️ by Abdo</p>
        </div>
      </div>
    </footer>

        
    )
}

