import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo1 from '../assets/logo1.png';

const navigationLinks = [
    
    { id: '1', title: 'Nosotros', link: '/#Nosotros', section: '#Nosotros', },
    { id: '2', title: 'Únete', link: '/#Unete', section: '#Unete', },
    { id: '3', title: 'Equipo', link: '/#Equipo', section: '#Equipo', },
];

const authenticatedLinks = [
    { id: '5', title: 'Gastos fijos', link: '/fixedCosts', },
    { id: '6', title: 'Rango de importancia', link: '/rangeCosts', },
    { id: '7', title: 'Gráficas', link: '/graphs', },
    { id: '8', title: 'Chatbot', link: '/chatbot', },
  ];

function NavBar() {
    const { isAuthenticated, logout, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className='z-50 fixed w-full bg-[#b3fcc1] flex justify-between items-center py-6 px-6 rounded-md'>
            <Link to='/' className='text-white'>
                <img src={ logo1 }
                    alt='Logo'
                    width={ 180 }
                    height={ 180 }
                />
            </Link>

            <div>
            <ul>
                {
                    isAuthenticated ?
                    <>
                    {
                        authenticatedLinks.map((authLink, index) => {
                            return(
                            <a href={ authLink.link } key={ index } className={ `items-center font-mono mx-9 text-green-700 ${location.pathname === authLink.link ? 'underline font-bold' : ''}` }>{authLink.title}</a>
                            );
                        })
                    }    
                    </>
                    :
                    <>
                        {
                            navigationLinks.map((navLink, index) => {
                                return(
                                    <a href={ navLink.link } onClick={ () => { navigate(navLink.link) } } key={ index } className='items-center font-mono mx-9 text-green-700'>{navLink.title}</a>
                                );
                            })
                        }
                    </>
                }
            </ul>      

            </div>
            <ul className='flex gap-x-7 items-center'>
            {
                isAuthenticated ?
                <>
                    <li>
                        <button onClick={ () => logout() } className='font-mono bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded-sm shadow-[5px_5px_0px_0px_#800000]'>Logout</button>
                    </li>
                </>
                :
                <>
                    <li>
                        <Link to='/login' className='font-mono bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-sm shadow-[5px_5px_0px_0px_#218f38]'>Iniciar Sesión</Link>
                    </li>
                    <li>
                        <Link to='/register' className='font-mono bg-green-500 text-white hover:bg-green-600 px-2 py-1 rounded-sm shadow-[5px_5px_0px_0px_#218f38]'>Crear Cuenta</Link>
                    </li>
                 </>
            }
            </ul>
        </div>
    )
}

export default NavBar;
