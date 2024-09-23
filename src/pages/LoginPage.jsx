import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import imagebg from '../assets/imagebg.png';

function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signin, errors: signinErrors, isAuthenticated, setErrors } = useAuth();
    const navigate = useNavigate();

    const onSubmit = handleSubmit(data => {
        signin(data);
    });

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/fixedCosts')
        };
    }, [isAuthenticated]);

    return (
        <div className='flex h-[calc(115vh-100px)] items-center justify-center bg-cover bg-center' style={{ backgroundImage: `url(${imagebg})` }}>
            <div className='bg-green-400 font-mono max-w-md w-full p-10 rounded-md mt-30 shadow-[7px_7px_0px_0px_#218f38]'>
                {
                    signinErrors.map((error, i) => (
                        <div className='bg-red-500 p-2 text-white text-center my-2' key={i}>
                            { error }
                        </div>
                    ))
                }
                <h1 className='text-xl text-green-800 font-bold my-2'>Iniciar sesión</h1>

                <form onSubmit={ onSubmit }>
                    <input type='email' { ...register('email', { required: true } ) } 
                        className='w-full bg-[#b3fcc1] text-green-800 px-4 py-2 rounded-md my-2'
                        placeholder='email'
                    />
                    {
                        errors.email && (<p className='text-red-500'>Email requerido</p>)
                    }
                    <input type='password' { ...register('password', { required: true }) } 
                        className='w-full bg-[#b3fcc1] text-green-500 px-4 py-2 rounded-md my-2'
                        placeholder='password'
                    />
                    {
                        errors.password && (<p className='text-red-500'>Contraseña requerida</p>)
                    }
                    <button type='submit' className='bg-green-500 text-white px-4 py-2 rounded-md my-2'>
                        Iniciar sesión
                    </button>
                </form>

                <p className='flex text-white gap-x-2 justify-between'>
                    ¿Aún no tienes tu cuenta? <Link to='/register' onClick={ () => setErrors([]) } className='text-green-800'>Crear cuenta</Link>
                </p>
            </div>
        </div>
    )
}

export default LoginPage;
