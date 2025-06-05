import { tallerApi } from "@/api/tallerApi";
import { useForm } from "@/hooks/useForm";
import { startActualizarServicio } from "@/store/slices/servicio/thunks";
import { AppDispatch } from "@/store/store";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router"; // Importación necesaria

interface Props {
  servicio: any;
}

export default function Servicio({ servicio }: Props) {
  const { servicio: datos } = servicio;
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const [datosServicio, handleInputChangeServicio] = useForm({
    fecha: datos.fecha,
    concepto: datos.concepto,
    presupuesto: datos.presupuesto,
    anticipo: datos.anticipo,
    kilometraje: datos.kilometraje,
    combustible: datos.combustible,
    observaciones: datos.observaciones,
    proximo: datos.proximo,
  });

  const handleActualizarServicio = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(startActualizarServicio(datos._id, datosServicio));
      router.push("/servicios");
    } catch (error) {
      console.error("Error al actualizar el servicio:", error);
    }
  };

  return (
    <div className="container flex flex-col mx-auto items-center justify-center my-20 text-center font-bold">
      <div className="w-full max-w-4xl mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow">
        <form onSubmit={handleActualizarServicio}>
          <h3 className="text-lg font-bold text-orange-700 mb-4">Servicio</h3>

          <div className="grid sm:grid-cols-2 gap-4 mb-4 text-left">
            <div>
              <label className="block text-sm font-medium text-orange-800 mb-1">Fecha</label>
              <input
                className="border border-gray-300 rounded px-3 py-2 w-full text-sm"
                id="fecha"
                type="date"
                onChange={handleInputChangeServicio}
                value={datosServicio.fecha}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-orange-800 mb-1">Anticipo</label>
              <input
                className="border border-gray-300 rounded px-3 py-2 w-full text-sm"
                id="anticipo"
                type="text"
                onChange={handleInputChangeServicio}
                value={datosServicio.anticipo}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-orange-800 mb-1">Kilometraje</label>
              <input
                className="border border-gray-300 rounded px-3 py-2 w-full text-sm"
                id="kilometraje"
                type="text"
                onChange={handleInputChangeServicio}
                value={datosServicio.kilometraje}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-orange-800 mb-1">Combustible</label>
              <input
                className="border border-gray-300 rounded px-3 py-2 w-full text-sm"
                id="combustible"
                type="text"
                value={datosServicio.combustible}
                onChange={handleInputChangeServicio}
              />
            </div>
          </div>

          <div className="mb-4 text-left">
            <label className="block text-sm font-medium text-orange-800 mb-1">Concepto</label>
            <input
              className="border border-gray-300 rounded px-3 py-2 w-full text-sm"
              id="concepto"
              type="text"
              value={datosServicio.concepto}
              onChange={handleInputChangeServicio}
            />
          </div>

          <div className="mb-4 text-left">
            <label className="block text-sm font-medium text-orange-800 mb-1">Presupuesto</label>
            <input
              className="border border-gray-300 rounded px-3 py-2 w-full text-sm"
              id="presupuesto"
              type="text"
              value={datosServicio.presupuesto}
              onChange={handleInputChangeServicio}
            />
          </div>

          <div className="mb-4 text-left">
            <label className="block text-sm font-medium text-orange-800 mb-1">Observaciones</label>
            <input
              className="border border-gray-300 rounded px-3 py-2 w-full text-sm"
              type="text"
              id="observaciones"
              value={datosServicio.observaciones}
              onChange={handleInputChangeServicio}
            />
          </div>

          <div className="mb-4 text-left">
            <label className="block text-sm font-medium text-orange-800 mb-1">Próximo Servicio</label>
            <input
              type="date"
              className="border border-gray-300 rounded px-3 py-2 w-full text-sm"
              id="proximo"
              value={datosServicio.proximo}
              onChange={handleInputChangeServicio}
            />
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm"
            >
              Actualizar Servicio
            </button>

            <Link href="/servicios">
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
  const response = await tallerApi.get("/servicios");

  return {
    paths: response.data.servicios.map((id: any) => ({
      params: { id: id._id },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };
  const servicio = await tallerApi.get(`servicios/${id}`);
  const { data } = servicio;

  return {
    props: {
      servicio: data,
    },
  };
};
