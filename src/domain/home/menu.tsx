import { useState, useEffect } from 'react';

export function Menu() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <header className="bg-white dark:bg-gray-800 text-gray-800 w-full dark:text-gray-100 h-20 flex items-center px-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center gap-4 h-full">
          <img
            src={
              'https://images.ctfassets.net/754lisswuj3q/1A6cMInS2mBWi5IMerlNoF/2b786c8543edf5369634f72f7bf0f3ad/dv01_fitch_logo_white.svg'
            }
            alt="logo"
            className="h-10 w-10"
          />
          <h1 className="text-xl font-bold">Loan Analysis</h1>
        </div>
      </div>
    </header>
  );
}
