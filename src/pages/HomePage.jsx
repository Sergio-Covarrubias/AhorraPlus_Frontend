import Nosotros from './HomePages/Nosotros'; 
import Unete from './HomePages/Unete'; 
import Hero from './HomePages/Hero';
import Team from './HomePages/Team';

function HomePage() {
    return (
        <div> 
           <section>
            <Hero/>
           </section>

            <section id='Nosotros'>
            <Nosotros/>
            </section>

            <section id='Unete'>
            <Unete/>
            </section>
        
            <section id='Equipo'>
            <Team/>
            </section>
        </div>
    );
}

export default HomePage;
