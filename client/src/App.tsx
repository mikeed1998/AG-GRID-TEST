import { ApiStatus } from './components/ApiStatus';
import { DataDisplay } from './components/DataDisplay';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>React + Fastify Connection</h1>
      <div style={{ marginBottom: '40px' }}>
        <ApiStatus />
      </div>
      <div>
        <DataDisplay />
      </div>
    </div>
  );
}

export default App;