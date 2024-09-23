import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext';
import imagebg from '../assets/imagebg.png';

function RegisterPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signup, isAuthenticated, errors: registerErrors, setErrors } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/fixedCosts')
        };
    }), [isAuthenticated];

    const onSubmit = handleSubmit(async (values) => {
        signup(values);
    });

    return (
        <div className='flex font-mono h-[calc(115vh-100px)] items-center justify-center bg-cover bg-center' style={{ backgroundImage: `url(${imagebg})` }}>
            <div className='bg-green-400 font-mono max-w-md w-full p-10 rounded-md mt-30 shadow-[5px_5px_0px_0px_#218f38]'>
                {
                    registerErrors.map((error, index) => (
                        <div className='bg-red-500 p-2 text-white text-center my-2' key={ index }>
                            { error }
                        </div>
                    ))
                }
                <h1 className='text-xl text-green-800 font-bold my-2'>Crear cuenta</h1>

                <form onSubmit={ onSubmit }>
                    <input type='text' { ...register('username', { required: true }) } 
                        className='w-full bg-[#b3fcc1] text-green-800 px-4 py-2 rounded-md my-2'
                        placeholder='username'
                    />
                    {
                        errors.username && (<p className='text-red-500'>Usuario requerido</p>)
                    }
                    <input type='email' { ...register('email', { required: true } ) } 
                        className='w-full bg-[#b3fcc1] text-green-800 px-4 py-2 rounded-md my-2'
                        placeholder='email'
                    />
                    {
                        errors.email && (<p className='text-red-500'>Email requerido</p>)
                    }
                    <input type='password' { ...register('password', { required: true }) } 
                        className='w-full bg-[#b3fcc1] text-green-800 px-4 py-2 rounded-md my-2'
                        placeholder='password'
                    />
                    {
                        errors.password && (<p className='text-red-500'>Contraseña requerida</p>)
                    }

                    <button className='bg-green-500 text-white px-4 py-2 rounded-md my-2'>Crear cuenta</button>
                </form>

                <p className='flex text-white gap-x-2 justify-between'>
                    ¿Ya tienes una cuenta?
                    <Link to='/login' onClick={ () => setErrors([]) } className='text-green-800'>
                        Inicia sesión
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default RegisterPage;
