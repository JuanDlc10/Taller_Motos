import { startEliminarClienteCompleto, startObtenerClientes } from "@/store/slices/cliente/thunks";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
export default function page() {
  const dispatch: AppDispatch = useDispatch();
  const { clientes } = useSelector((state: RootState) => state.cliente);

  useEffect(() => {
    dispatch(startObtenerClientes());
  }, []);

  return (
    <div className="p-4">
      <div className="container mx-auto">
        <h1 className="text-xl font-bold text-orange-700 mb-4 text-center">
          Clientes
        </h1>

        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full text-sm">
            <thead className="bg-orange-50 text-orange-800">
              <tr>
                <th className="px-4 py-2">Ver</th>
                <th className="px-4 py-2">Nombres</th>
                <th className="px-4 py-2">Apellidos</th>
                <th className="px-4 py-2">Teléfono</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Dirección</th>
                <th className="px-4 py-2">WhatsApp</th>
                <th className="px-4 py-2">Actualizar</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <tr key={cliente._id} className="border-b hover:bg-orange-50">
                  <td className="px-4 py-2">
                    <Link href={`./clientes/${cliente._id}`}>
                      <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-xs">
                        Ver
                      </button>
                    </Link>
                  </td>
                  <td className="px-4 py-2">{cliente.nombres}</td>
                  <td className="px-4 py-2">{cliente.apellidos}</td>
                  <td className="px-4 py-2">{cliente.telefono}</td>
                  <td className="px-4 py-2">{cliente.email}</td>
                  <td className="px-4 py-2 max-w-xs truncate">{cliente.direccion}</td>
                  <td className="px-4 py-2">{cliente.whatsapp}</td>
                  <td className="px-4 py-2">
                    <Link href={`./clientes/actualizar/${cliente._id}`}>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs">
                        Editar
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

