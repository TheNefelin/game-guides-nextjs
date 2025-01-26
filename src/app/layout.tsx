import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import BtnUp from "@/components/BtnUp";
import BtnPokemon from "@/components/BtnPokemon";
import React from "react";
import Singleton from "@/services/singleton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Guias de Juegos",
  description: "Un sitio en construccion de guias para juegos de PS",
};

export default async function RootLayout({ children }: {children: React.ReactNode;}) {
  const apiResult = await Singleton.getApiResultAsync()

  return (
    <html lang="es">
      <body id="id_body" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <BtnPokemon/>
        <NavBar/>

        <section className="flex gap-2 mt-4">
          {apiResult.isSucces ? 
          <>
            <SideBar games={apiResult.data}/>
            {children}
          </>
          : 
          <div role="alert" className="alert alert-error m-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Error! { apiResult.statusCode } : { apiResult.message }</span>
          </div>}
        </section>

        <BtnUp/>
      </body>
    </html>
  );
}
