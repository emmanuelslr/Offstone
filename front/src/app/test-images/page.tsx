import Image from 'next/image';

export default function TestImagesPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Test des Images</h1>
      
      <div className="grid grid-cols-2 gap-8">
        {/* Test SVG Logo */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl mb-4">Logo SVG</h2>
          <Image
            src="/logos/offstone-logo-black.svg"
            alt="Logo Black"
            width={220}
            height={35}
          />
        </div>

        {/* Test JPG Image */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl mb-4">Photo Team (JPG)</h2>
          <Image
            src="/images/Team/Team_Photo_Cropped.jpg"
            alt="Team Photo"
            width={300}
            height={200}
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* Test avec img tag normal */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl mb-4">IMG Tag Normal (Team)</h2>
          <img
            src="/images/Team/Team_Photo_Cropped.jpg"
            alt="Team Photo Normal"
            style={{ width: '300px', height: '200px', objectFit: 'cover' }}
          />
        </div>

        {/* Test avec img tag SVG */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl mb-4">IMG Tag SVG</h2>
          <img
            src="/logos/offstone-logo-black.svg"
            alt="Logo Normal"
            style={{ width: '220px', height: '35px' }}
          />
        </div>
      </div>
    </div>
  );
}
