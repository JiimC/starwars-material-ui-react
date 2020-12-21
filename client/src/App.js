//import logo from './logo.svg';
import PrimarySearchAppBar from './components/NavigationBar';
//import Card from './components/Card';
import HeaderCard from './components/HeaderCard';
import AutoGrid from './components/FlexibleGrid';
import './App.css';

function App() {
  return (
    <div className="App">
      <PrimarySearchAppBar></PrimarySearchAppBar>
      <HeaderCard></HeaderCard>
      <AutoGrid></AutoGrid>
    </div>
  );
}

export default App;
