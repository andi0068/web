import { Source_Code_Pro } from 'next/font/google';
import Image from 'next/image';

import Container from '@/modules/components/container';
import * as Header from '@/modules/components/header';
import { Main } from '@/modules/components/main';
import * as Section from '@/modules/components/section';
import * as Footer from '@/modules/components/footer';
import Time from '@/modules/components/time';
import * as Anchor from '@/modules/components/anchor';
import * as TimeSvc from '@/modules/services/time';
import * as path from '@/modules/utils/path-utils';
import * as data from '@/data';

import Counter from './counter';

const mono = Source_Code_Pro({
  subsets: ['latin'],
  weight: ['400'],
});

export default async function Home() {
  const { dateTime } = await TimeSvc.get({ timeZone: data.author.time_zone });
  return (
    <>
      <Header.Root>
        <Container>
          <Header.TopContent>
            <Header.Image
              element={<Image priority alt={data.author.name} src={path.image('avatar.png')} />}
            />
            <Header.Location className={mono.className}>
              {data.author.location} — <Time dateTime={dateTime} />
            </Header.Location>
          </Header.TopContent>
          <Header.BottomContent>
            <Header.Title>{data.author.name}.</Header.Title>
            <Header.Description>{data.author.description}.</Header.Description>
          </Header.BottomContent>
        </Container>
      </Header.Root>
      <Main>
        {data.tree.branches.map((branch) => (
          <Section.Root key={branch.name}>
            <Container>
              <Section.Content>
                <Section.Title>{branch.name}</Section.Title>
                {branch.items.map((item, i) => (
                  <Anchor.Root key={i} href={item.href} icon={item.icon}>
                    <Anchor.Title>{item.label}</Anchor.Title>
                    <Anchor.Description>{item.description}</Anchor.Description>
                  </Anchor.Root>
                ))}
              </Section.Content>
            </Container>
          </Section.Root>
        ))}
      </Main>
      <Footer.Root>
        <Container>
          <Footer.Content>
            <Footer.Copyright>{`© 2024 ${data.author.name}`}</Footer.Copyright>
            <Counter className="px-2 h-7 text-sm text-foreground-secondary bg-background-secondary" />
          </Footer.Content>
        </Container>
      </Footer.Root>
    </>
  );
}
