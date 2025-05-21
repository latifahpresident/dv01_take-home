export function Menu() {
  // this is a simple component to display the menu
  // The Ui looked quite plain so wanted to make it more visually appealing
  return (
    <header className="bg-gray-800 w-full text-gray-100 h-16 flex items-center px-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center gap-4 h-full">
          <img
            src={
              'https://images.ctfassets.net/754lisswuj3q/1A6cMInS2mBWi5IMerlNoF/2b786c8543edf5369634f72f7bf0f3ad/dv01_fitch_logo_white.svg'
            }
            alt="logo"
            className="h-14 w-14"
          />
          <h1 className="text-xl font-bold">Loan Analysis</h1>
        </div>
      </div>
    </header>
  );
}
