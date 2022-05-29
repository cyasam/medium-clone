import { Component, ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '../assets/img/logo.svg';
import { Router, withRouter } from 'next/router';

type State = {
  hasError: boolean;
};

type Props = {
  router: Router;
  children: ReactNode;
};

class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-screen h-screen flex justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <a className="block mb-3">
              <Image src={Logo} width="162" height="25" alt="Medium Clone" />
            </a>
            <p className="my-6 text-2xl">Something went wrong.</p>

            <button
              onClick={async () => {
                await this.props.router.push('/');
                window.location.reload();
              }}
              className="inline-flex mt-3 px-4 py-2 rounded-full bg-black text-white"
            >
              Go to Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default withRouter(ErrorBoundary);
