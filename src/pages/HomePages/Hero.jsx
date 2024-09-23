import image1 from '../../assets/image1.png';
import logo1r from '../../assets/logo1r.png';
import bgim from '../../assets/bgim3.jpg';

const Hero = () => {
  return (
    <div className='flex h-[calc(115vh-100px)] items-center justify-center bg-cover bg-center' style={{ backgroundImage: `url(${bgim})` }}>
        <div className='bg-white w-auto h-auto rounded-lg shadow-md'>
            <div className='text-center text-green-900'>
                <h1 className='flex items-center justify-center text-2xl font-mono mt-6 mb-11 mr-6 ml-6'>
                    Saca el máximo provecho de
                    <img
                        src={logo1r}
                        alt="Logo"
                        width={150}
                        height={150}
                        className='flex-shrink-0'
                    />
                </h1>
                <img
                    src={image1}
                    alt="main"
                    width={300}
                    height={300}
                    className='mx-auto mt-7 mb-11'
                />
                <p className='text-3xl font-bold mr-6 ml-6 mb-8'>
                    Ahorrar nunca había sido tan fácil
                </p>
            </div>
        </div>
    </div>
    )
}

export default Hero
