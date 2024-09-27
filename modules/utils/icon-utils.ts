import dynamic from 'next/dynamic';
import { createElement } from 'react';

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

const LaptopCode = dynamic(() => import('@/shared/components/icons/laptop-code'));
const FreeCodeCamp = dynamic(() => import('@/shared/components/icons/freecodecamp'));
const Github = dynamic(() => import('@/shared/components/icons/github'));
const Linkedin = dynamic(() => import('@/shared/components/icons/linkedin'));
const Telegram = dynamic(() => import('@/shared/components/icons/telegram'));

export function get(name: string) {
  const icon = (
    {
      laptopcode: LaptopCode,
      freecodecamp: FreeCodeCamp,
      github: Github,
      linkedin: Linkedin,
      telegram: Telegram,
    } as Record<string, IconType>
  )[name.toLowerCase()];

  return createElement(icon ?? 'svg');
}
