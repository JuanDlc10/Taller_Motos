import { tallerApi } from "@/api/tallerApi";
import { pdfGenerator } from "@/helpers/pdfGenerator";
import { GetStaticPaths, GetStaticProps } from "next";

interface Props{
  servicio: any
}

export default function servicio({servicio}: Props) {
  const {servicio: datos} = servicio
  const {_id:id, fecha,anticipo,kilometraje, combustible, presupuesto, concepto, observaciones, proximo} = datos
  const {nombres, apellidos, email, telefono, whatsapp, direccion} = datos.moto.cliente
  const {marca, modelo, cilindrada, tipo, placa, color} = datos.moto

  return (
  <div className="container flex flex-col mx-auto items-center justify-center my-20 text-center font-bold">
    {/* Cliente */}
    <div className="w-full max-w-4xl mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow">
      <form>
        <h3 className="text-lg font-bold text-orange-700 mb-4">Cliente</h3>
        <div className="grid sm:grid-cols-2 gap-4 mb-4 text-left">
          <div>
            <label className="block text-sm font-medium text-orange-800 mb-1">Nombres</label>
            <input className="border border-gray-300 rounded px-3 py-2 w-full text-sm" id="nombre" type="text" value={nombres} readOnly />
          </div>
          <div>
            <label className="block text-sm font-medium text-orange-800 mb-1">Apellidos</label>
            <input className="border border-gray-300 rounded px-3 py-2 w-full text-sm" id="apellido" type="text" value={apellidos} readOnly />
          </div>
          <div>
            <label className="block text-sm font-medium text-orange-800 mb-1">Teléfono</label>
            <input className="border border-gray-300 rounded px-3 py-2 w-full text-sm" id="telefono" type="text" value={telefono} readOnly />
          </div>
          <div>
            <label className="block text-sm font-medium text-orange-800 mb-1">Email</label>
            <input className="border border-gray-300 rounded px-3 py-2 w-full text-sm" id="email" type="email" value={email} readOnly />
          </div>
        </div>
        <div className="mb-4 text-left">
          <label className="block text-sm font-medium text-orange-800 mb-1">Dirección</label>
          <input className="border border-gray-300 rounded px-3 py-2 w-full text-sm" id="direccion" type="text" value={direccion} readOnly />
        </div>
        <div className="text-left">
          <label className="block text-sm font-medium text-orange-800 mb-1">WhatsApp</label>
          <input className="border border-gray-300 rounded px-3 py-2 w-full text-sm" id="whatsapp" type="text" value={whatsapp} readOnly />
        </div>
      </form>
    </div>

    {/* Moto */}
    <div className="w-full max-w-4xl mx-auto mt-6 p-4 bg-white border border-gray-200 rounded-lg shadow">
      <form>
        <h3 className="text-lg font-bold text-orange-700 mb-4">Moto</h3>
        <div className="grid sm:grid-cols-2 gap-4 mb-4 text-left">
          <div>
            <label className="block text-sm font-medium text-orange-800 mb-1">Marca</label>
            <input className="border border-gray-300 rounded px-3 py-2 w-full text-sm" id="marca" type="text" value={marca} readOnly />
          </div>
          <div>
            <label className="block text-sm font-medium text-orange-800 mb-1">Modelo</label>
            <input className="border border-gray-300 rounded px-3 py-2 w-full text-sm" id="modelo" type="text" value={modelo} readOnly />
          </div>
          <div>
            <label className="block text-sm font-medium text-orange-800 mb-1">Cilindrada</label>
            <input className="border border-gray-300 rounded px-3 py-2 w-full text-sm" id="cilindrada" type="text" value={cilindrada} readOnly />
          </div>
          <div>
            <label className="block text-sm font-medium text-orange-800 mb-1">Placa</label>
            <input className="border border-gray-300 rounded px-3 py-2 w-full text-sm" id="placa" type="text" value={placa} readOnly />
          </div>
          <div>
            <label className="block text-sm font-medium text-orange-800 mb-1">Color</label>
            <input className="border border-gray-300 rounded px-3 py-2 w-full text-sm" id="color" type="text" value={color} readOnly />
          </div>
          <div>
            <label className="block text-sm font-medium text-orange-800 mb-1">Tipo</label>
            <input className="border border-gray-300 rounded px-3 py-2 w-full text-sm" id="tipo" type="text" value={tipo} readOnly />
          </div>
        </div>
      </form>
    </div>

    {/* Servicio */}
    <div className="w-full max-w-4xl mx-auto mt-6 p-4 bg-white border border-gray-200 rounded-lg shadow">
      <form>
        <h3 className="text-lg font-bold text-orange-700 mb-4">Servicio</h3>
        <div className="grid sm:grid-cols-2 gap-4 mb-4 text-left">
          <div>
            <label className="block text-sm font-medium text-orange-800 mb-1">Fecha</label>
            <input className="border border-gray-300 rounded px-3 py-2 w-full text-sm" id="fecha" type="text" value={fecha} readOnly />
          </div>
          <div>
            <label className="block text-sm font-medium text-orange-800 mb-1">Anticipo</label>
            <input className="border border-gray-300 rounded px-3 py-2 w-full text-sm" id="anticipo" type="text" value={anticipo} readOnly />
          </div>
          <div>
            <label className="block text-sm font-medium text-orange-800 mb-1">Kilometraje</label>
            <input className="border border-gray-300 rounded px-3 py-2 w-full text-sm" id="kilometraje" type="text" value={kilometraje} readOnly />
          </div>
          <div>
            <label className="block text-sm font-medium text-orange-800 mb-1">Combustible</label>
            <input className="border border-gray-300 rounded px-3 py-2 w-full text-sm" id="combustible" type="text" value={combustible} readOnly />
          </div>
        </div>
        <div className="mb-4 text-left">
          <label className="block text-sm font-medium text-orange-800 mb-1">Concepto</label>
          <input className="border border-gray-300 rounded px-3 py-2 w-full text-sm" id="concepto" type="text" value={concepto} readOnly />
        </div>
        <div className="mb-4 text-left">
          <label className="block text-sm font-medium text-orange-800 mb-1">Presupuesto</label>
          <input className="border border-gray-300 rounded px-3 py-2 w-full text-sm" id="presupuesto" type="text" value={presupuesto} readOnly />
        </div>
        <div className="mb-4 text-left">
          <label className="block text-sm font-medium text-orange-800 mb-1">Observaciones</label>
          <input className="border border-gray-300 rounded px-3 py-2 w-full text-sm" id="observacion" type="text" value={observaciones} readOnly />
        </div>
        <div className="mb-4 text-left">
          <label className="block text-sm font-medium text-orange-800 mb-1">Próximo Servicio</label>
          <input className="border border-gray-300 rounded px-3 py-2 w-full text-sm" id="proximo" type="text" value={proximo} readOnly />
        </div>
        <div className="text-center">
          <button
            onClick={() =>
              pdfGenerator({
                id,
                nombres,
                apellidos,
                email,
                telefono,
                whatsapp,
                direccion,
                marca,
                modelo,
                cilindrada,
                tipo,
                placa,
                color,
                fecha,
                anticipo,
                kilometraje,
                combustible,
                presupuesto,
                concepto,
                observaciones,
              })
            }
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm"
          >
            Imprimir Comprobante
          </button>
        </div>
      </form>
    </div>
  </div>
);

}

export const getStaticPaths: GetStaticPaths = async() => {
  const response = await tallerApi.get("/servicios")


  return{
    paths: response.data.servicios.map((id: any) =>({
      params : {id: id._id}
    })),
    fallback: "blocking"
  }
}

export const getStaticProps: GetStaticProps = async({params}) =>{
  const {id} = params as {id: string}
  const servicio = await tallerApi.get(`servicios/${id}`); 

  const {data} = servicio;

  return {
    props: {
      servicio: data
    }
  }
}