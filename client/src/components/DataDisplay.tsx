import { DataGrid } from './DataGrid';
import { DataGrid2 } from './DataGrid2';
import { DataGrid3 } from './DataGrid3';

export const DataDisplay = () => {
    return (
        <>
            <div className="p-4 max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Visualización de Datos</h2>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <DataGrid />
                </div>
            </div>
             <div className="p-4 max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Visualización de Datos</h2>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <DataGrid2 />
                </div>
            </div>
            <div className="p-4 max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Visualización de Datos</h2>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <DataGrid3 />
                </div>
            </div>
            <br /><br /><br />
        </>
    );
};