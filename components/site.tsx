'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const links = [['Home','/'],['About','/about'],['Missions','/projects'],['Open Source','/open-source'],['Skills','/skills'],['Leaderboard','/leaderboard'],['Contact','/contact']];
const levels: Record<string,string> = {'/':'00','/about':'01','/projects':'02','/open-source':'03','/skills':'04','/leaderboard':'05','/contact':'06'};
const order = ['/','/about','/projects','/open-source','/skills','/leaderboard','/contact'];
type SoundKind = 'toggle' | 'click' | 'level';
export function Shell({children}:{children:React.ReactNode}) {
 const path=usePathname(); const [menu,setMenu]=useState(false); const [sound,setSound]=useState(false); const audioRef=useRef<AudioContext|null>(null); const firstPath=useRef(true); const level=levels[path] ?? (path.startsWith('/projects/')?'02':'99');
 function playFx(kind:SoundKind,force=false){if(!sound&&!force)return;try{const ctx=audioRef.current??new AudioContext();audioRef.current=ctx;if(ctx.state==='suspended')void ctx.resume();const tunes:Record<SoundKind,number[]>={toggle:[523,784,1047],click:[880],level:[659,784,988]};tunes[kind].forEach((hz,i)=>{const start=ctx.currentTime+i*.075;const osc=ctx.createOscillator();const gain=ctx.createGain();osc.type='square';osc.frequency.setValueAtTime(hz,start);gain.gain.setValueAtTime(.0001,start);gain.gain.exponentialRampToValueAtTime(.045,start+.008);gain.gain.exponentialRampToValueAtTime(.0001,start+.075);osc.connect(gain);gain.connect(ctx.destination);osc.start(start);osc.stop(start+.08)})}catch{}}
 function toggleSound(){const enabled=!sound;setSound(enabled);if(enabled)playFx('toggle',true)}
 function onClickCapture(event:React.MouseEvent<HTMLElement>){if(!sound)return;const target=event.target as HTMLElement;if(target.closest('a,button'))playFx('click')}
 useEffect(()=>{if(firstPath.current){firstPath.current=false;return}playFx('level')},[path]);
 return <div className="site-shell" onClickCapture={onClickCapture}><header className="hud"><span>XP: CS LEVEL {level}</span><span className="hearts" aria-label="Health: three hearts">♥ ♥ ♥ <i className="health"><b/></i></span><span>PLAYER 01</span></header>
 <nav className="taskbar" aria-label="Main navigation"><Link href="/" className="start">✦ START</Link><button className="hamburger" onClick={()=>setMenu(!menu)} aria-expanded={menu} aria-label="Toggle navigation">☰</button><div className={`navlinks ${menu?'open':''}`}>{links.map(([name,href])=><Link key={href} href={href} onClick={()=>setMenu(false)} className={path===href?'active':''}>{name}</Link>)}</div><button className="sound" onClick={toggleSound} aria-pressed={sound} aria-label={sound?'Turn sound off':'Turn sound on'}>{sound?'♫ ON':'♫ OFF'}</button></nav>
 <AnimatePresence mode="wait"><motion.main key={path} initial={useReducedMotion()?false:{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:.2}}>{children}</motion.main></AnimatePresence>
 <div className="next-wrap"><Link className="next-button" href={order[(order.indexOf(path)+1+order.length)%order.length]||'/'}>NEXT LEVEL &gt;</Link></div>
 <footer><div className="marquee">✦ ✧ ✦ PLAYER ONE, READY? ✦ ✧ ✦ YOU’RE ON A QUEST ✦ ✧ ✦</div><div className="footerline"><span>© 2026 Parul Agrawal</span><span className="social-note">Social links coming soon</span></div></footer></div>
}
export function Window({title,children,className=''}:{title:string;children:React.ReactNode;className?:string}) { return <section className={`window ${className}`}><div className="windowbar"><span>{title}</span><span className="winbuttons" aria-hidden="true">_ □ ×</span></div><div className="windowbody">{children}</div></section> }
export function Heading({kicker,title,desc}:{kicker:string;title:string;desc?:string}) { return <div className="page-heading"><p className="kicker">{kicker}</p><h1>{title}</h1>{desc&&<p className="lead">{desc}</p>}</div> }
export function PixelAvatar(){return <div className="avatar" aria-label="Pixel art avatar of Parul" role="img"><i/><b/><em/><span/></div>}
export function Chips({items}:{items:string[]}) {return <div className="chips">{items.map(x=><span key={x}>{x}</span>)}</div>}
