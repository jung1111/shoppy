import Footer from '../component/Footer.jsx';
import Header from '../component/Header.jsx';
import '../css/style.css';
import { Outlet } from 'react-router-dom';


export default function Root({cartCount, addCartCount}) {
  return (
    <div>
      <Header cartCount={cartCount}/>
      <Outlet addCartCount={addCartCount}/>
      <Footer/>      
    </div>
  );
}


