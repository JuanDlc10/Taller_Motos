import { tallerApi } from "@/api/tallerApi";
import { AppDispatch, RootState } from "@/store/store";
import { GetStaticPaths, GetStaticProps } from "next";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { startObtenerServicioPorMoto } from "@/store/slices/servicio/thunks";
import Link from "next/link";
import { startEliminarMoto } from "@/store/slices/moto/thunks";

interface Props {
  moto: any;
}

export default function Moto({ moto }: Props) {
  const { moto: datos } = moto;
  const dispatch: AppDispatch = useDispatch();
  const { servicios } = useSelector((state: RootState) => state.servicio);

  useEffect(() => {
    dispatch(startObtenerServicioPorMoto(datos._id));
  }, []);

  const handleEliminarDatos = (id: any) => {
    dispatch(startEliminarMoto(datos._id));
  };
  return (
    <div className="container flex flex-col mx-auto items-center justify-center my-20 text-center font-bold">
      <div className="mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow text-center w-full max-w-4xl">
        <h3 className="text-lg font-bold text-orange-700 mb-4">Moto</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 text-left">
          <div>
            <label className="block text-sm font-medium text-orange-800 mb-1">Marca</label>
            <input
              className="border border-gray-300 rounded px-3 py-2 w-full text-sm"
              type="text"
              value={datos.marca}
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-orange-800 mb-1">Modelo</label>
            <input
              className="border border-gray-300 rounded px-3 py-2 w-full text-sm"
              type="text"
              value={datos.modelo}
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-orange-800 mb-1">Cilindrada</label>
            <input
              className="border border-gray-300 rounded px-3 py-2 w-full text-sm"
              type="text"
              value={datos.cilindrada}
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-orange-800 mb-1">Placa</label>
            <input
              className="border border-gray-300 rounded px-3 py-2 w-full text-sm"
              type="text"
              value={datos.placa}
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-orange-800 mb-1">Color</label>
            <input
              className="border border-gray-300 rounded px-3 py-2 w-full text-sm"
              type="text"
              value={datos.color}
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-orange-800 mb-1">Tipo</label>
            <input
              className="border border-gray-300 rounded px-3 py-2 w-full text-sm"
              type="text"
              value={datos.tipo}
              readOnly
            />
          </div>
        </div>

        <div className="overflow-x-auto bg-white rounded-lg shadow mt-6">
          <table className="w-full text-sm">
            <thead className="bg-orange-50 text-orange-800">
              <tr>
                <th className="px-4 py-2">Ver</th>
                <th className="px-4 py-2">Servicio</th>
                <th className="px-4 py-2">Kilometraje</th>
                <th className="px-4 py-2">Observaciones</th>
              </tr>
            </thead>
            <tbody>
              {servicios.map((servicio) => (
                <tr key={servicio._id} className="border-b hover:bg-orange-50">
                  <td className="px-4 py-2">
                    <Link href={`/servicios/${servicio._id}`}>
                      <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-xs">
                        Ver
                      </button>
                    </Link>
                  </td>
                  <td className="px-4 py-2">{servicio.concepto}</td>
                  <td className="px-4 py-2">{servicio.kilometraje}</td>
                  <td className="px-4 py-2">{servicio.observaciones}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6">
          <button
            onClick={() => handleEliminarDatos(datos._id)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm"
          >
            Eliminar Datos
          </button>
        </div>
      </div>
    </div>
  );

}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await tallerApi.get("/motos");

  return {
    paths: response.data.motos.map((id: any) => ({
      params: { id: id._id },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };
  const moto = await tallerApi.get(`motos/${id}`);

  const { data } = moto;

  return {
    props: {
      moto: data,
    },
  };
};
