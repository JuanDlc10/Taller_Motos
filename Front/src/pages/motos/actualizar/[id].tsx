import { tallerApi } from "@/api/tallerApi";
import { AppDispatch, RootState } from "@/store/store";
import { GetStaticPaths, GetStaticProps } from "next";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useForm } from "@/hooks/useForm";
import { startActualizarMoto } from "@/store/slices/moto/thunks";

interface Props {
  moto: any;
}

export default function Moto({ moto }: Props) {
  const { moto: datos } = moto;
  const dispatch: AppDispatch = useDispatch();

  const [datosMoto, handleInputChangeMoto] = useForm({
    marca: datos.marca,
    modelo: datos.modelo,
    cilindrada: datos.cilindrada,
    placa: datos.placa,
    color: datos.color,
    tipo: datos.tipo,
  });
  const handleActualizarMoto = () => {
    dispatch(startActualizarMoto(datos._id, datosMoto));
  };
  return (
  <div className="container flex flex-col mx-auto items-center justify-center my-20 text-center font-bold">
    <div className="w-full max-w-4xl mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow">
      <form>
        <h3 className="text-lg font-bold text-orange-700 mb-4">Actualizar Moto</h3>

      <div className="grid sm:grid-cols-2 gap-4 mb-4 text-left">
        <div>
          <label className="block text-sm font-medium text-orange-800 mb-1">Marca</label>
          <input
            className="border border-gray-300 rounded px-3 py-2 w-full text-sm"
            id="marca"
            type="text"
            onChange={handleInputChangeMoto}
            value={datosMoto.marca}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-orange-800 mb-1">Modelo</label>
          <input
            className="border border-gray-300 rounded px-3 py-2 w-full text-sm"
            id="modelo"
            type="text"
            onChange={handleInputChangeMoto}
            value={datosMoto.modelo}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-orange-800 mb-1">Cilindrada</label>
          <input
            className="border border-gray-300 rounded px-3 py-2 w-full text-sm"
            id="cilindrada"
            type="text"
            value={datosMoto.cilindrada}
            onChange={handleInputChangeMoto}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-orange-800 mb-1">Placa</label>
          <input
            className="border border-gray-300 rounded px-3 py-2 w-full text-sm"
            id="placa"
            type="text"
            value={datosMoto.placa}
            onChange={handleInputChangeMoto}
          />
        </div>
      </div>

      <div className="mb-4 text-left">
        <label className="block text-sm font-medium text-orange-800 mb-1">Color</label>
        <input
          className="border border-gray-300 rounded px-3 py-2 w-full text-sm"
          id="color"
          type="text"
          value={datosMoto.color}
          onChange={handleInputChangeMoto}
        />
      </div>

      <div className="mb-4 text-left">
        <label className="block text-sm font-medium text-orange-800 mb-1">Tipo</label>
        <input
          className="border border-gray-300 rounded px-3 py-2 w-full text-sm"
          id="tipo"
          type="text"
          value={datosMoto.tipo}
          onChange={handleInputChangeMoto}
        />
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button
          type="button"
          onClick={handleActualizarMoto}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm"
        >
          Actualizar Moto
        </button>

        <Link href="/motos">
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
