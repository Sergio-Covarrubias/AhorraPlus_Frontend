import React from 'react';
import im1 from '../../assets/parrot.png';
import im2 from '../../assets/bear.png';
import im3 from '../../assets/cat.png';
import im4 from '../../assets/butterfly.png';

const Team = () => {
  return (
    <section id="Equipo" className="py-8 bg-[#d3fcdb]">
      <div >
        <h2 className="flex justify-around text-2xl font-bold text-green-600 text-center mb-6">Equipo</h2>
        <div className="flex justify-around gap-8">
          <div className="flex flex-col items-center">
            <img src={im1} className="w-24 h-24 mb-2 rounded-full object-cover" />
            <span className="text-lg font-mono">Azael Segura</span>
          </div>
          <div className="flex flex-col items-center">
            <img src={im2} className="w-24 h-24 mb-2 rounded-full object-cover" />
            <span className="text-lg font-mono">Fernando Ramos </span>
          </div>
          <div className="flex flex-col items-center">
            <img src={im3} className="w-24 h-24 mb-2 rounded-full object-cover" />
            <span className="text-lg font-mono">Sergio A. Covarrubias</span>
          </div>
          <div className="flex flex-col items-center">
            <img src={im4} className="w-24 h-24 mb-2 rounded-full object-cover" />
            <span className="text-lg font-mono">María Gpe. Soto</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;