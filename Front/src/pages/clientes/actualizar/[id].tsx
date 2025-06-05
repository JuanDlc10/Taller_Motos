import { tallerApi } from "@/api/tallerApi";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { GetStaticPaths, GetStaticProps } from "next";
import { useEffect } from "react";
import Link from "next/link";
import { useForm } from "@/hooks/useForm";
import { startActualizarCliente } from "@/store/slices/cliente/thunks";

interface Props {
  cliente: any;
}

export default function Cliente({ cliente }: Props) {
  const { cliente: datos } = cliente;
  const dispatch: AppDispatch = useDispatch();

  const [datosCliente, handleInputChangeCliente] = useForm({
    nombres: datos.nombres,
    apellidos: datos.apellidos,
    direccion: datos.direccion,
    email: datos.email,
    whatsapp: datos.whatsapp,
    telefono: datos.telefono,
  });

  const handleActualizarUsuario = () => {
    dispatch(startActualizarCliente(datos._id, datosCliente));
  }
  return (
    <div className="container flex flex-col mx-auto items-center justify-center my-20 text-center font-bold">
      <div className="w-full max-w-4xl mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow">
        <form>
          <h3 className="text-lg font-bold text-orange-700 mb-4">Actualizar Cliente</h3>

          <div className="grid sm:grid-cols-2 gap-4 mb-4 text-left">
            <div>
              <label className="block text-sm font-medium text-orange-800 mb-1">Nombres</label>
              <input
                className="border border-gray-300 rounded px-3 py-2 w-full text-sm"
                id="nombres"
                type="text"
                onChange={handleInputChangeCliente}
                value={datosCliente.nombres}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-orange-800 mb-1">Apellidos</label>
              <input
                className="border border-gray-300 rounded px-3 py-2 w-full text-sm"
                id="apellidos"
                type="text"
                onChange={handleInputChangeCliente}
                value={datosCliente.apellidos}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-orange-800 mb-1">Teléfono</label>
              <input
                className="border border-gray-300 rounded px-3 py-2 w-full text-sm"
                id="telefono"
                type="text"
                onChange={handleInputChangeCliente}
                value={datosCliente.telefono}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-orange-800 mb-1">Email</label>
              <input
                className="border border-gray-300 rounded px-3 py-2 w-full text-sm"
                id="email"
                type="email"
                onChange={handleInputChangeCliente}
                value={datosCliente.email}
              />
            </div>
          </div>

          <div className="mb-4 text-left">
            <label className="block text-sm font-medium text-orange-800 mb-1">Dirección</label>
            <input
              className="border border-gray-300 rounded px-3 py-2 w-full text-sm"
              id="direccion"
              type="text"
              onChange={handleInputChangeCliente}
              value={datosCliente.direccion}
            />
          </div>

          <div className="mb-4 text-left">
            <label className="block text-sm font-medium text-orange-800 mb-1">WhatsApp</label>
            <input
              className="border border-gray-300 rounded px-3 py-2 w-full text-sm"
              id="whatsapp"
              type="text"
              onChange={handleInputChangeCliente}
              value={datosCliente.whatsapp}
            />
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <button
              type="button"
              onClick={handleActualizarUsuario}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm"
            >
              Actualizar Contacto
            </button>

            <Link href="/clientes">
              <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm" type="button">
                Regresar
              </button>
            </Link>
          </div>
        </form>
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
