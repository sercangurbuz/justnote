import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import React from 'react';

interface LoginLogoutButtonProps {}

function LoginLogoutButton(props: LoginLogoutButtonProps) {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (!user)
    return (
      <Link href="/api/auth/login">
        <a>Login</a>
      </Link>
    );
  return (
    <div>
      Hello {user.name},{' '}
      <Link href="/api/auth/logout">
        <a>Logout</a>
      </Link>
    </div>
  );
}

export default LoginLogoutButton;
