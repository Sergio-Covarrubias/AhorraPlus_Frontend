import image1 from '../../assets/piggy.png';

const Nosotros = () => {
  return (
    <div id="Nosotros" className=" flex flex-col md:flex-row items-center justify-center bg-white font-numberone text-lg mt-10 ml-60 mb-10 mx-6 p-8">
      <div className="md:w-1/2 mb-6 md:mb-0 md:mr-8 text-center md:text-left">
        <h2 className="text-3xl font-semibold mb-4">Nosotros</h2>
        <p className="leading-relaxed text-gray-700">
          En Ahorra+, buscamos facilitar el uso de herramientas que ayuden a las personas a adoptar buenos hábitos financieros. Nuestro objetivo es simplificar la gestión de tus finanzas, brindándote las soluciones necesarias para que puedas ahorrar más, gastar de manera inteligente y alcanzar tus metas económicas con confianza y facilidad.
        </p>
      </div>

      <div className="md:w-1/2 flex justify-center">
        <a href="#">
          <img
            src={image1}
            alt="imagen nosotros"
            width={200}
            height={200}
            className="mr-14 rounded-lg  hover:scale-105 transition-transform duration-300"
          />
        </a>
      </div>
    </div>
  );
};

export default Nosotros;
