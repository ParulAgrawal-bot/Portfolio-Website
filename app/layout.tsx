import type { Metadata } from 'next';
import { Press_Start_2P, VT323 } from 'next/font/google';
import './globals.css';
import { Shell } from '@/components/site';
const pixel=Press_Start_2P({subsets:['latin'],weight:'400',variable:'--font-pixel',display:'swap'});
const terminal=VT323({subsets:['latin'],weight:'400',variable:'--font-terminal',display:'swap'});
export const metadata:Metadata={metadataBase:new URL('https://parulagrawal.dev'),title:{default:'Parul Agrawal | Full-Stack Developer & CS Student',template:'%s | Parul Agrawal'},description:'Explore Parul Agrawal’s software projects, skills, open-source work, and journey as a Computer Science student.',openGraph:{title:'Parul Agrawal — Portfolio',description:'A retro pixel-game portfolio for a full-stack developer and CS student.',type:'website'}};
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en" className={`${pixel.variable} ${terminal.variable}`}><body><div className="sky" aria-hidden="true"/><Shell>{children}</Shell></body></html> }
