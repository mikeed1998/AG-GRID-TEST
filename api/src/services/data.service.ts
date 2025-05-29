import { DatabaseService } from './database.service';

export class DataService {
  constructor(private databaseService: DatabaseService) {}

  async getData() {
    const items = await this.databaseService.getProducts();
    
    return {
      success: true,
      message: "Datos recuperados exitosamente",
      timestamp: new Date().toISOString(),
      count: items.length,
      items: items.map(item => ({
        ...item,
        timestamp: item.timestamp.toISOString()
      }))
    };
  }
}

// // En tu data.service.ts
// export class DataService {
//   async getData() {
//     const items = [
//       {
//         id: 1,
//         name: "Laptop X1 Carbon",
//         value: 1450.99,
//         category: "Tecnología",
//         timestamp: new Date("2023-05-15").toISOString(),
//         inStock: true,
//         supplier: "TechCorp"
//       },
//       {
//         id: 2,
//         name: "Silla Ergonómica",
//         value: 320.50,
//         category: "Mobiliario",
//         timestamp: new Date("2023-06-20").toISOString(),
//         inStock: false,
//         supplier: "OfficeDesign"
//       },
//       {
//         id: 3,
//         name: "Monitor 27\" 4K",
//         value: 429.99,
//         category: "Tecnología",
//         timestamp: new Date("2023-07-10").toISOString(),
//         inStock: true,
//         supplier: "DisplayTech"
//       },
//       {
//         id: 4,
//         name: "Teclado Mecánico",
//         value: 89.95,
//         category: "Accesorios",
//         timestamp: new Date("2023-08-05").toISOString(),
//         inStock: true,
//         supplier: "KeyMaster"
//       },
//       {
//         id: 5,
//         name: "Mouse Inalámbrico",
//         value: 45.60,
//         category: "Accesorios",
//         timestamp: new Date("2023-09-12").toISOString(),
//         inStock: false,
//         supplier: "TechCorp"
//       },
//       {
//         id: 6,
//         name: "Escritorio Ejecutivo",
//         value: 575.00,
//         category: "Mobiliario",
//         timestamp: new Date("2023-10-18").toISOString(),
//         inStock: true,
//         supplier: "OfficeDesign"
//       },
//       {
//         id: 7,
//         name: "Paquete de Software",
//         value: 1200.00,
//         category: "Software",
//         timestamp: new Date("2023-11-22").toISOString(),
//         inStock: true,
//         supplier: "SoftSolutions"
//       },
//       {
//         id: 8,
//         name: "Impresora Laser",
//         value: 299.99,
//         category: "Tecnología",
//         timestamp: new Date("2023-12-05").toISOString(),
//         inStock: false,
//         supplier: "PrintMaster"
//       },
//       {
//         id: 9,
//         name: "Servidor Empresarial",
//         value: 4500.00,
//         category: "Hardware",
//         timestamp: new Date("2024-01-15").toISOString(),
//         inStock: true,
//         supplier: "TechCorp"
//       },
//       {
//         id: 10,
//         name: "Router WiFi 6",
//         value: 189.95,
//         category: "Redes",
//         timestamp: new Date("2024-02-20").toISOString(),
//         inStock: true,
//         supplier: "NetGear"
//       }
//     ];

//     return {
//       success: true,
//       message: "Datos recuperados exitosamente",
//       timestamp: new Date().toISOString(),
//       count: items.length,
//       items: items
//     };
//   }
// }