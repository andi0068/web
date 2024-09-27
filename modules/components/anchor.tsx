import * as icons from '@/modules/utils/icon-utils';
import Button from '@/shared/components/ui/button';
import Icon from '@/shared/components/ui/icon';
import ArrowRight from '@/shared/components/icons/arrow-right';
import type { BaseProps } from '@/shared/types';

interface AnchorProps extends BaseProps {
  href: string;
  icon: string;
}

export function Root({ children, href, icon }: AnchorProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center h-[4.125rem] outline-none border border-transparent rounded-2xl bg-background-secondary transition-all hover:border-separator focus:border-current focus-visible:ring focus-visible:ring-blue-500"
    >
      <Icon
        element={icons.get(icon)}
        className="mx-[1.125rem] text-2xl text-foreground-secondary"
      />
      <div className="grow flex items-center justify-between mr-3">
        <div className="flex flex-col text-sm space-y-1">{children}</div>
        <Button
          as="span"
          className="px-2.5 pr-0.5 h-7 text-sm rounded-full text-foreground-secondary group-hover:bg-background-tertiary"
        >
          <span className="opacity-0 group-hover:opacity-100">Open</span>
          <Icon element={<ArrowRight />} className="text-xl text-foreground-tertiary" />
        </Button>
      </div>
    </a>
  );
}

export function Title({ children }: BaseProps) {
  return <h3 className="font-medium">{children}</h3>;
}

export function Description({ children }: BaseProps) {
  return <p className="text-foreground-secondary">{children}</p>;
}
