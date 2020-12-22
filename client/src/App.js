//import logo from './logo.svg';
import PrimarySearchAppBar from './components/NavigationBar';
import BasicTable from './components/datagrid/CategoryCount';
import HeaderCard from './components/HeaderCard';
import AutoGrid from './components/FlexibleGrid';
import './App.css';

function App() {
  return (
    <div className="App">
      <PrimarySearchAppBar></PrimarySearchAppBar>
      <HeaderCard></HeaderCard>
      <AutoGrid></AutoGrid>
      <BasicTable></BasicTable>
    </div>
  );
}

export default App;
