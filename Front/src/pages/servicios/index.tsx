import {
  startEliminarServicio,
  startObtenerServicio,
} from "@/store/slices/servicio/thunks";
import { AppDispatch, RootState } from "@/store/store";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function page() {
  const dispatch: AppDispatch = useDispatch();
  const { servicios } = useSelector((state: RootState) => state.servicio);

  useEffect(() => {
    dispatch(startObtenerServicio());
  }, []);

  const handleEliminarDatos = (id: any) => {
    dispatch(startEliminarServicio(id));
  };

  return (
    <div className="p-4">
      <div className="container mx-auto">
        <h1 className="text-xl font-bold text-orange-700 mb-4 text-center">
          Servicios
        </h1>
      
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full text-sm">
            <thead className="bg-orange-50 text-orange-800">
              <tr>
                <th className="px-4 py-2">Ver</th>
                <th className="px-4 py-2">Fecha</th>
                <th className="px-4 py-2">Anticipo</th>
                <th className="px-4 py-2">Kilometraje</th>
                <th className="px-4 py-2">Combustible</th>
                <th className="px-4 py-2">Concepto</th>
                <th className="px-4 py-2">Presupuesto</th>
                <th className="px-4 py-2">Observaciones</th>
                <th className="px-4 py-2">Prox. Servicio</th>
                <th className="px-4 py-2">Actualizar</th>
                <th className="px-4 py-2">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {servicios.map((service) => (
                <tr key={service._id} className="border-b hover:bg-orange-50">
                  <td className="px-4 py-2">
                    <Link href={`./servicios/${service._id}`}>
                      <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-xs">
                        Ver
                      </button>
                    </Link>
                  </td>
                  <td className="px-4 py-2">{service.fecha}</td>
                  <td className="px-4 py-2">{service.anticipo}</td>
                  <td className="px-4 py-2">{service.kilometraje}</td>
                  <td className="px-4 py-2">{service.combustible}</td>
                  <td className="px-4 py-2 max-w-xs truncate">{service.concepto}</td>
                  <td className="px-4 py-2">{service.presupuesto}</td>
                  <td className="px-4 py-2 max-w-xs truncate">{service.observaciones}</td>
                  <td className="px-4 py-2">{service.proximo}</td>
                  <td className="px-4 py-2">
                    <Link href={`./servicios/actualizar/${service._id}`}>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs">
                        Editar
                      </button>
                    </Link>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleEliminarDatos(service._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Eliminar
                    </button>
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
