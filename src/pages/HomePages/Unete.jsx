import { Link } from 'react-router-dom';
import logo1r from '../../assets/logo1r.png';

const Unete = () => {
    return (
        <div id="Unete" className='bg-[#d3fcdb] min-h-Avh flex items-center justify-center pt-20'>
            <div className='bg-white w-auto h-auto rounded-lg shadow-md p-10 text-left'>
            <div className="flex flex-col items-center justify-center text-center mb-4">
              <h2 className="text-3xl font-bold font-mono flex items-center justify-center">
                    Conoce todos los beneficios de 
                    <img
                        src={logo1r}
                        alt="Logo"
                        width={150}
                        height={150}
                        className="ml-4 flex-shrink-0"
                    />
                </h2>
            </div>
                
                <h2 className='text-xl font-mono  text-gray-700  text-left mb-4'>
                ◦ Domina el arte de ahorrar de manera sencilla
                </h2>
                <p className='text-xl text-gray-700 font-mono mb-6'>
                ◦ Accede a nuestro bot personal que te ofrece recomendaciones expertas.
                </p>
                <p className='text-xl font-mono text-gray-700 mb-4'>
                ◦ Gestiona tus ingresos de forma eficiente y alcanza tus metas económicas con facilidad.
                </p>
                <div className='flex items-center justify-center'>
                <Link 
                    to='/register' 
                    className='font-mono bg-green-500 hover:bg-green-600 text-white px-2 py-2 rounded-sm shadow-[5px_5px_0px_0px_#218f38] mt-5'>
                    ¡Registrate ahora!
                </Link>
                </div>
                
            </div>
        </div>
    );
};

export default Unete;
