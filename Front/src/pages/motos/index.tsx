import { startObtenerMotos } from "@/store/slices/moto/thunks";
import { AppDispatch, RootState } from "@/store/store";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function page() {
  const dispatch: AppDispatch = useDispatch();

  const { motos } = useSelector((state: RootState) => state.moto);

  useEffect(() => {
    dispatch(startObtenerMotos());
  }, []);

  return (
  <div className="p-4">
    <div className="container mx-auto">
      <h1 className="text-xl font-bold text-orange-700 mb-4 text-center">
        Motos
      </h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-sm">
          <thead className="bg-orange-50 text-orange-800">
            <tr>
              <th className="px-4 py-2">Ver</th>
              <th className="px-4 py-2">Marca</th>
              <th className="px-4 py-2">Modelo</th>
              <th className="px-4 py-2">Cilindrada</th>
              <th className="px-4 py-2">Placa</th>
              <th className="px-4 py-2">Color</th>
              <th className="px-4 py-2">Tipo</th>
              <th className="px-4 py-2">Actualizar</th>
            </tr>
          </thead>
          <tbody>
            {motos.map((moto) => (
              <tr key={moto._id} className="border-b hover:bg-orange-50">
                <td className="px-4 py-2">
                  <Link href={`./motos/${moto._id}`}>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-xs">
                      Ver
                    </button>
                  </Link>
                </td>
                <td className="px-4 py-2">{moto.marca}</td>
                <td className="px-4 py-2">{moto.modelo}</td>
                <td className="px-4 py-2">{moto.cilindrada}</td>
                <td className="px-4 py-2">{moto.placa}</td>
                <td className="px-4 py-2">{moto.color}</td>
                <td className="px-4 py-2">{moto.tipo}</td>
                <td className="px-4 py-2">
                  <Link href={`./motos/actualizar/${moto._id}`}>
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
