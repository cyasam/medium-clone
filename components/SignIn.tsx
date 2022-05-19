import { getProviders, signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';

type Provider = {
  id: string;
  name: string;
};

type Props = {
  className?: string;
  providerId?: string;
};

const Icons: React.FC<Props> = ({ providerId, ...pageProps }) => {
  if (providerId === 'google') return <FcGoogle {...pageProps} />;

  return null;
};

function SignIn() {
  const [providers, setProviders] = useState<Provider[] | null>(null);

  useEffect(() => {
    const fetchProvider = async () => {
      const providers = await getProviders();
      const allProviders =
        providers &&
        Object.values(providers).map((provider) => {
          return {
            id: provider.id,
            name: provider.name,
          };
        });

      setProviders(allProviders);
    };

    fetchProvider();
  }, []);

  return (
    <>
      {providers &&
        providers.map((provider) => (
          <div
            key={provider.name}
            className="flex flex-col justify-center items-center min-h-[300px]"
          >
            <h2 className="mb-10 text-2xl">Welcome back.</h2>
            <button
              type="button"
              className="flex items-center px-4 py-2 border border-gray-300 rounded-full"
              onClick={() => signIn(provider.id)}
            >
              <Icons providerId={provider.id} className="mr-3 text-xl" />
              Sign in with {provider.name}
            </button>
          </div>
        ))}
    </>
  );
}

export default SignIn;
