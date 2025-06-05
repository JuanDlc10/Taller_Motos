import { tallerApi } from "@/api/tallerApi";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { GetStaticPaths, GetStaticProps } from "next";
import { useEffect } from "react";
import { startObtenerMotosPorCliente } from "@/store/slices/moto/thunks";
import Link from "next/link";
import { startEliminarClienteCompleto } from "@/store/slices/cliente/thunks";

interface Props {
  cliente: any;
}

export default function Cliente({ cliente }: Props) {
  const { cliente: datos } = cliente;
  const dispatch: AppDispatch = useDispatch();
  const { motoCliente } = useSelector((state: RootState) => state.moto);

  useEffect(() => {
    dispatch(startObtenerMotosPorCliente(datos._id));
  }, []);
  const handleEliminarDatos = (id: any) => {
    dispatch(startEliminarClienteCompleto(datos._id));
  };
  return (
  <div className="container mx-auto px-4 py-10">
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl mx-auto">
      <h1 className="text-xl font-bold text-orange-700 mb-6 text-center">Detalles del Cliente</h1>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombres</label>
          <input
            type="text"
            value={datos.nombres}
            readOnly
            className="w-full px-4 py-2 border rounded-lg shadow-sm text-sm text-gray-700 bg-gray-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Apellidos</label>
          <input
            type="text"
            value={datos.apellidos}
            readOnly
            className="w-full px-4 py-2 border rounded-lg shadow-sm text-sm text-gray-700 bg-gray-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
          <input
            type="text"
            value={datos.telefono}
            readOnly
            className="w-full px-4 py-2 border rounded-lg shadow-sm text-sm text-gray-700 bg-gray-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={datos.email}
            readOnly
            className="w-full px-4 py-2 border rounded-lg shadow-sm text-sm text-gray-700 bg-gray-50"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
        <input
          type="text"
          value={datos.direccion}
          readOnly
          className="w-full px-4 py-2 border rounded-lg shadow-sm text-sm text-gray-700 bg-gray-50"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
        <input
          type="text"
          value={datos.whatsapp}
          readOnly
          className="w-full px-4 py-2 border rounded-lg shadow-sm text-sm text-gray-700 bg-gray-50"
        />
      </div>

      <div className="mb-6">
        <h2 className="text-md font-semibold text-orange-600 mb-2">Motos del Cliente</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {motoCliente.map((moto) => (
            <div
              key={moto._id}
              className="bg-orange-100 p-4 rounded-lg border border-orange-300 shadow-sm flex flex-col justify-between"
            >
              <p className="text-gray-800 font-medium">{moto.marca}</p>
              <Link href={`/motos/${moto._id}`}>
                <button className="mt-2 bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-sm">
                  Ver
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <button
          type="button"
          onClick={() => handleEliminarDatos(datos._id)}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg text-sm"
        >
          Eliminar Cliente
        </button>
      </div>
    </div>
  </div>
);

}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await tallerApi.get("/clientes");

  return {
    paths: response.data.clientes.map((id: any) => ({
      params: { id: id._id },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };
  const cliente = await tallerApi.get(`/clientes/busqueda/id/${id}`);

  const { data } = cliente;

  return {
    props: {
      cliente: data,
    },
  };
};
