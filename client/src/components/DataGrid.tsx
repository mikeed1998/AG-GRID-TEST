import { useCallback, useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { fetchGridData } from '../api/api';
import { GridData } from '../api/api';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export const DataGrid = () => {
  const [rowData, setRowData] = useState<GridData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [columnDefs] = useState<any>([
    { 
      field: 'id', 
      headerName: 'ID', 
      minWidth: 80,
      // suppressSizeToFit: true 
    },
    { 
      field: 'name', 
      headerName: 'Nombre', 
      filter: true,
      minWidth: 150, 
      flex: 1 
    },
    { 
      field: 'value', 
      headerName: 'Valor', 
      type: 'numericColumn',
      minWidth: 120,
      valueFormatter: params => `$${params.value.toFixed(2)}` 
    },
    { 
      field: 'category', 
      headerName: 'Categoría', 
      filter: true,
      minWidth: 150,
      flex: 1
    },
    { 
      field: 'timestamp', 
      headerName: 'Fecha', 
      filter: 'agDateColumnFilter',
      minWidth: 180,
      valueFormatter: params => new Date(params.value).toLocaleDateString() 
    }
  ]);

  const loadData = useCallback(async () => {
    try {
      const data = await fetchGridData();
      setRowData(data);
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
    <div 
      className="ag-theme-alpine" 
      style={{
        width: '95vw',
        height: '100vh'
      }}
    >
      <AgGridReact<GridData>
        rowData={rowData}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10}
        domLayout='normal'
        defaultColDef={{
          sortable: true,
          resizable: true,
          filter: true,
          suppressSizeToFit: false 
        }}
        // suppressScrollOnNewData={true}
        rowSelection='multiple'
        onRowClicked={(event) => console.log('Fila clickeada:', event.data)}
      
        getRowStyle={(params) => ({
          background: params.node.rowIndex % 2 === 0 ? '#f8fafc' : 'white'
        })}
      />
    </div>
  );
};