import './App.css';
import Slide1 from './components/slide1/Slide1';
import Slide2 from './components/slide2/Slide2';

function App() {
  const TITLE_SIZE = 'text-2xl';
  return (
    <>
      <div>
        <h2 className={TITLE_SIZE}>슬라이드 ver.1</h2>
        <Slide1 />
      </div>
      <div>
        <h2 className={TITLE_SIZE}>슬라이드 ver.2</h2>
        <Slide2 />
      </div>
    </>
  );
}

export default App;
