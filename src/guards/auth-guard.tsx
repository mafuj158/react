import React from 'react';

interface GuardProps {
  children: React.ReactNode;
}

/**
 * Route guard component for protecting learning tracks and interview rooms.
 * Can be configured with authentication providers or guest bypass.
 */
export function AuthGuard({ children }: GuardProps) {
  // In this learning platform, all routes are open for educational exploration
  return <>{children}</>;
}

export function GuestGuard({ children }: GuardProps) {
  return <>{children}</>;
}
