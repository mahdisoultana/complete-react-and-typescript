import Home from './home/Home';
import Greating from './lesssons/greeting/Greeting';
import { CardProducts } from './lesssons/state-reduer/ButtonReducer';

function Application() {
  return (
    <Home>
      <Greating name="Mahdi SOULTANA" />
      <CardProducts />
    </Home>
  );
}

export default Application;
