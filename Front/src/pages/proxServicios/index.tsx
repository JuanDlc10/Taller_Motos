import { AppDispatch, RootState } from "@/store/store";
import { startProximoServicio } from "@/store/slices/servicio/thunks";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function page() {

  const dispatch: AppDispatch = useDispatch();

  const { servicios } = useSelector((state: RootState) => state.servicio);

  useEffect(() => {

    dispatch(startProximoServicio());
  }, []);
  return (
    <div className="p-4">
      <div className="container mx-auto">
        <h1 className="text-xl font-bold text-orange-700 mb-4 text-center">
          Proximos Servicios
        </h1>
      
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full text-sm">
            <thead className="bg-orange-50 text-orange-800">
              <tr>
                <th className="px-4 py-2">Ver</th>
                <th className="px-4 py-2">Proximo Servicio</th>
                <th className="px-4 py-2">Moto</th>
                <th className="px-4 py-2">Cliente</th>
              </tr>
            </thead>
            <tbody>
              {servicios.map((service) => (
                <tr key={service._id} className="border-b hover:bg-orange-50">
                  <td className="px-4 py-2">
                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-xs" disabled>
                      proximamente
                    </button>
                  </td>
                  <td className="px-4 py-2">{service.proximo}</td>
                  <td className="px-4 py-2">{service.moto.modelo}</td>
                  <td className="px-4 py-2">{service.moto.cliente.nombres} {service.moto.cliente.apellidos}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
);
}
