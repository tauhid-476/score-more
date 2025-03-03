"use client"
import { useState, useEffect } from "react";
import { ModeToggle } from "@/components/ui/mode-toggle"
import Link from 'next/link'

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? "glass-effect py-3 shadow-lg"
                    : "bg-transparent py-5"
                }`}
        >
            <div className="container-custom flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                        SCORE MORE
                    </span>
                </Link>

                <div className="flex items-center gap-8">
                    <div className="hidden md:flex items-center gap-6">
                        <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors link-underline">
                            Features
                        </Link>
                        <Link href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors link-underline">
                            How It Works
                        </Link>
                        <Link href="#about" className="text-sm font-medium hover:text-primary transition-colors link-underline">
                            About
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <ModeToggle />
                    </div>
                </div>
            </div>
        </nav>
    );
}