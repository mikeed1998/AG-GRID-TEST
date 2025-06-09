import { useCallback, useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { fetchGridData } from '../api/api';
import { GridData } from '../api/api';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './DataGrid3.css';

export const DataGrid3 = () => {
  const [rowData, setRowData] = useState<any[]>([]);
  const [columnDefs, setColumnDefs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Función para transformar los datos a formato horizontal
  const transformData = (data: GridData[]) => {
    const currentDate = new Date().toLocaleDateString();
    
    return [
      {
        field: 'FECHA',
        ...Object.fromEntries(data.map((_, index) => [`col${index}`, currentDate]))
      },
      {
        field: 'ID',
        ...Object.fromEntries(data.map((item, index) => [`col${index}`, item.id || index + 1]))
      },
      {
        field: 'NOMBRE',
        ...Object.fromEntries(data.map((item, index) => [`col${index}`, item.name]))
      },
      {
        field: 'VALOR',
        ...Object.fromEntries(data.map((item, index) => [`col${index}`, `$${item.value.toFixed(2)}`]))
      },
      {
        field: 'CATEGORIA',
        ...Object.fromEntries(data.map((item, index) => [`col${index}`, item.category]))
      },
    ];
  };

  const loadData = useCallback(async () => {
    try {
      const data = await fetchGridData();
      const transformedData = transformData(data);
      setRowData(transformedData);
      
      // Generar definiciones de columnas basadas en los datos recibidos
      const newColumnDefs = [
        { 
          field: 'field', 
          headerName: '',
          pinned: 'left',
          width: 200,
          cellClass: 'header-cell',
          suppressMovable: true,
          lockPosition: true
        },
        ...data.map((_, index) => ({
          field: `col${index}`,
          width: 180,
          cellClass: 'data-cell',
          suppressMovable: true
        }))
      ];
      
      setColumnDefs(newColumnDefs);
    } catch (err) {
      setError('Error al cargar los datos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (loading) return <div className="p-4">Cargando datos...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

 return (
    <div className="ag-theme-custom h-full p-4">
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        domLayout="autoHeight"
        headerHeight={0}
        suppressCellFocus={true}
        defaultColDef={{
          resizable: true,
          sortable: false,
          filter: false,
          suppressMenu: true
        }}
        getRowHeight={() => 60}
      />
    </div>
  );
};