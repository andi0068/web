import * as Auth from '@/components/auth';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Auth.Root>
      <Auth.Main>
        <Auth.Container>{children}</Auth.Container>
      </Auth.Main>
    </Auth.Root>
  );
}
