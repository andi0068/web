'use client';
import { useCallback } from 'react';

import * as Form from '@/lib/components/form';
import Input from '@/lib/components/input';
import Button from '@/lib/components/button';
import useAsyncHandler from '@/lib/hooks/use-async-handler';
import * as Card from '@/components/auth/card';
import * as Auth from '@/services/auth';
import { env } from '@/utils/generic-utils';

type Fields = {
  password: string;
};

const { AUTHOR_EMAIL } = env();

export default function Login() {
  const [loading, onSubmit] = useAsyncHandler(useHandler());
  return (
    <Card.Root>
      <Card.Header className="sr-only">
        <Card.Heading>Author Login</Card.Heading>
      </Card.Header>
      <Form.Root onSubmit={onSubmit}>
        <Form.Field name="password">
          <Form.Label>Password</Form.Label>
          <Form.Control asChild>
            <Input
              type="password"
              placeholder="Password"
              required
              autoFocus
              className="border-separator"
            />
          </Form.Control>
          <Form.Message match="valueMissing">Password can&apos;t be blank</Form.Message>
        </Form.Field>
        <Form.Footer direction="column" space="y">
          <Button type="submit" disabled={loading}>
            Log In
          </Button>
        </Form.Footer>
      </Form.Root>
    </Card.Root>
  );
}

function useHandler() {
  return useCallback(
    async (fields: Fields) => Auth.signIn({ email: AUTHOR_EMAIL!, password: fields.password }),
    [],
  );
}
