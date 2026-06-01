import { Alert } from '@/components/ui/alert/Alert';
import type { Metadata } from 'next';
import Link from 'next/link';

interface PageProps {
  searchParams: Promise<{ error: string }>;
}

const ActualComp = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <div className="flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error de login</h1>
        <Alert variant="destructive" className="text-gray-700 mb-6">
          {errorMessage}
        </Alert>
        <Link
          href="/auth/login"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Retorna al Login
        </Link>
      </div>
    </div>
  );
};

export const metadata: Metadata = {
  title: 'Authentication Error'
};

export default async function AuthErrorPage({ searchParams }: PageProps) {
  const searchParamsAwaited = await searchParams;
  // ... rest of the component remains the same
  const error = Array.isArray(searchParamsAwaited.error)
    ? searchParamsAwaited.error[0]
    : searchParamsAwaited.error;

  const errorMessages = {
    MissingToken: 'Token de login no trobat',
    InvalidToken: 'Token de login invàlid',
    AuthFailed: 'Autenticació fallida',
    default: 'Error desconegut'
  };

  const errorMessage = error
    ? (errorMessages[error as keyof typeof errorMessages] ??
      errorMessages.default)
    : errorMessages.default;

  return <ActualComp errorMessage={errorMessage} />;
}
