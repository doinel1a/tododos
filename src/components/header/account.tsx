import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { signIn, signOut, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

export default function Account() {
  const { data, status } = useSession();

  const [isMenuVisible, setIsMenuVisibile] = useState(false);

  useEffect(() => {
    if (isMenuVisible) {
      document.body.addEventListener('click', handleOutsideClicks);
    } else {
      document.body.removeEventListener('click', handleOutsideClicks);
    }

    return () => {
      document.body.removeEventListener('click', handleOutsideClicks);
    };
  }, [isMenuVisible]);

  function handleOutsideClicks(event: MouseEvent) {
    const clickTarget = event.target as Element;

    if (clickTarget.id !== 'account-button') {
      setIsMenuVisibile(false);
    }
  }

  return (
    <>
      <button
        id='account-button'
        className='z-[1] m-4 h-10 w-10 rounded-full bg-primary'
        onClick={() =>
          setIsMenuVisibile((previousState: boolean) => !previousState)
        }
      >
        <FontAwesomeIcon icon={faUser} className='h-4 w-4' />
      </button>

      {isMenuVisible ? (
        <div
          id='account-menu'
          className='absolute right-0 top-16 z-[1] flex w-40 flex-col items-center justify-center rounded-lg bg-accent-primary-state p-4'
        >
          {status === 'unauthenticated' ? (
            <button
              className='rounded-lg border px-2'
              onClick={() => signIn('google')}
            >
              Login
            </button>
          ) : (
            <>
              <Image
                src={data?.user?.image ?? ''}
                alt={`${data?.user?.name}'s profile image`}
                width={75}
                height={75}
                className='rounded-full'
              />
              <p className='mb-4 mt-2 text-center'>{data?.user?.name}</p>
              <button
                className='rounded-lg border px-2'
                onClick={() => signOut()}
              >
                Logout
              </button>
            </>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
