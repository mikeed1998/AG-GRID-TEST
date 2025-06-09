import { useCallback, useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { fetchGridData } from '../api/api';
import { GridData } from '../api/api';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);

// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';
import './DataGrid2.css'

export const DataGrid2 = () => {
  const [rowData, setRowData] = useState<GridData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [columnDefs] = useState<any>([
    { 
      field: 'id', 
      headerName: 'ID', 
      width: 80,
      headerClass: 'simple-header',
      cellClass: 'simple-cell',
      suppressSizeToFit: true
    },
    { 
      field: 'name', 
      headerName: 'Nombre',
      flex: 1,
      minWidth: 150,
      cellClass: 'simple-cell',
      headerClass: 'simple-header'
    },
    { 
      field: 'value', 
      headerName: 'Valor', 
      width: 120,
      valueFormatter: params => `$${params.value.toFixed(2)}`,
      cellClass: ['simple-cell', 'numeric-cell'],
      headerClass: 'simple-header',
      suppressSizeToFit: true
    },
    { 
      field: 'category', 
      headerName: 'Categoría',
      flex: 1,
      minWidth: 150,
      cellClass: 'simple-cell',
      headerClass: 'simple-header'
    },
    { 
      field: 'timestamp', 
      headerName: 'Fecha', 
      width: 150,
      valueFormatter: params => new Date(params.value).toLocaleDateString(),
      cellClass: 'simple-cell',
      headerClass: 'simple-header',
      suppressSizeToFit: true
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
      className="ag-theme-custom"
      style={{
        width: '100%',
        height: '100vh',
        padding: '16px',
        boxSizing: 'border-box'
      }}
    >
      <div style={{ width: '100%', height: '100%' }}>
        <AgGridReact<GridData>
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
          domLayout='autoHeight'
          defaultColDef={{
            sortable: true,
            resizable: true,
            suppressSizeToFit: false
          }}
          rowSelection='multiple'
          headerHeight={40}
          rowHeight={40}
          suppressCellFocus={true}
          suppressRowClickSelection={true}
          onRowClicked={(event) => console.log('Fila clickeada:', event.data)}
          getRowStyle={() => ({ borderBottom: '1px solid #e2e8f0' })}
          onGridReady={(params) => params.api.sizeColumnsToFit()}
        />
      </div>
    </div>
  );
};