import Home from './home/Home';
import DadJoke from './lesssons/dadjoke/App';
import Greating from './lesssons/greeting/Greeting';
import { CardProducts } from './lesssons/state-reduer/ButtonReducer';

function Application() {
  return (
    <Home>
      <Greating name="Mahdi SOULTANA" />
      <CardProducts />
      <DadJoke />
    </Home>
  );
}

export default Application;
