"use client";

import { useForm } from "@/hooks/useForm";
import { startObtenerClientes } from "@/store/slices/cliente/thunks";
import { startObtenerMotos } from "@/store/slices/moto/thunks";
import { startCrearServicio, startCrearServicioCliente, startCrearServicioClienteMoto } from "@/store/slices/servicio/thunks";
import { AppDispatch, RootState } from "@/store/store";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function page() {
  const [fromState, setFormState] = useState(true);
  const [fromState2, setFormState2] = useState(true);
  const [activeForm, setActiveForm] = useState<number | null>(null);
  const [motoId, setMotoId] = useState("");
  const [clienteId, setClienteId] = useState("");

  const handleFormState = () => setFormState(!fromState);
  const handleFormState2 = () => setFormState2(!fromState2);

  const handleFormToggle = (formNumber: number) => {
    setActiveForm(activeForm === formNumber ? null : formNumber);
  };

  const [formCliente, handleInputChangeCliente] = useForm({
    nombres: "",
    apellidos: "",
    direccion: "",
    email: "",
    whatsapp: "",
    telefono: "",
  });

  const [formMoto, handleInputChangeMoto] = useForm({
    marca: "",
    modelo: "",
    cilindrada: "",
    placa: "",
    color: "",
    tipo: "",
  });

  const router = useRouter();
  const [formServicio, handleInputChangeServicio] = useForm({
    fecha: "",
    concepto: "",
    presupuesto: "",
    anticipo: "",
    kilometraje: "",
    combustible: "",
    observaciones: "",
    proximo: "",
  });

  const dispatch: AppDispatch = useDispatch();

  const handleCrearServicio = () => {
    if (fromState && fromState2) {
      dispatch(startCrearServicioClienteMoto({ ...formServicio, moto: motoId }));
    } else if (fromState) {
      dispatch(startCrearServicioCliente({ ...formMoto, ...formServicio, cliente: clienteId }));
    } else {
      dispatch(startCrearServicio({ ...formCliente, ...formMoto, ...formServicio }));
    }
  };

  const { clientes } = useSelector((state: RootState) => state.cliente);
  const { motos } = useSelector((state: RootState) => state.moto);
  const { servicioId } = useSelector((state: RootState) => state.servicio);

  useEffect(() => {
    dispatch(startObtenerClientes());
    dispatch(startObtenerMotos());
  }, []);

  useEffect(() => {
    if (servicioId) {
      router.push(`servicios/${servicioId}`);
    }
  }, [servicioId]);

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold text-orange-600 text-center mb-6">Agregar Servicio</h1>

      {/* Sección de botones principales */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg font-medium ${activeForm === 1 ? 'bg-orange-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          onClick={() => handleFormToggle(1)}
        >
          {activeForm === 1 ? 'Ocultar Cliente' : 'Agregar Cliente'}
        </button>

        <button
          className={`px-4 py-2 rounded-lg font-medium ${activeForm === 2 ? 'bg-orange-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          onClick={() => handleFormToggle(2)}
        >
          {activeForm === 2 ? 'Ocultar Moto' : 'Agregar Moto'}
        </button>

        <button
          className={`px-4 py-2 rounded-lg font-medium ${activeForm === 3 ? 'bg-orange-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          onClick={() => handleFormToggle(3)}
        >
          {activeForm === 3 ? 'Ocultar Servicio' : 'Agregar Servicio'}
        </button>
      </div>

      {/* Formulario de Cliente */}
      {activeForm === 1 && (
        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-orange-700">Formulario de Cliente</h2>
            <button
              onClick={handleFormState}
              className="bg-cyan-500 hover:bg-cyan-600 text-white py-1 px-3 rounded text-sm"
            >
              {fromState ? 'Crear Nuevo' : 'Buscar Existente'}
            </button>
          </div>

          {fromState ? (
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Buscar por ID</label>
                  <input
                    value={clienteId}
                    onChange={(e) => setClienteId(e.target.value)}
                    list="list-cliente"
                    className="w-full p-2 border rounded"
                  />
                  <datalist id="list-cliente">
                    {clientes.map(cliente => (
                      <option key={cliente._id} value={cliente._id}>
                        {cliente.nombres} {cliente.apellidos}
                      </option>
                    ))}
                  </datalist>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombres</label>
                  <input
                    className="w-full p-2 border rounded"
                    id="nombres"
                    type="text"
                    onChange={handleInputChangeCliente}
                    value={formCliente.nombres}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Apellidos</label>
                  <input
                    className="w-full p-2 border rounded"
                    id="apellidos"
                    type="text"
                    onChange={handleInputChangeCliente}
                    value={formCliente.apellidos}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                  <input
                    className="w-full p-2 border rounded"
                    id="telefono"
                    type="text"
                    onChange={handleInputChangeCliente}
                    value={formCliente.telefono}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    className="w-full p-2 border rounded"
                    id="email"
                    type="email"
                    onChange={handleInputChangeCliente}
                    value={formCliente.email}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                <input
                  className="w-full p-2 border rounded"
                  id="direccion"
                  type="text"
                  onChange={handleInputChangeCliente}
                  value={formCliente.direccion}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
                <input
                  className="w-full p-2 border rounded"
                  id="whatsapp"
                  type="text"
                  onChange={handleInputChangeCliente}
                  value={formCliente.whatsapp}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Formulario de Moto */}
      {activeForm === 2 && (
        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-orange-700">Formulario de Moto</h2>
            <button
              onClick={handleFormState2}
              className="bg-cyan-500 hover:bg-cyan-600 text-white py-1 px-3 rounded text-sm"
            >
              {fromState2 ? 'Crear Nuevo' : 'Buscar Existente'}
            </button>
          </div>

          {fromState2 && fromState ? (
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Buscar Moto</label>
                  <input
                    value={motoId}
                    onChange={(e) => setMotoId(e.target.value)}
                    list="list-moto"
                    className="w-full p-2 border rounded"
                  />
                  <datalist id="list-moto">
                    {motos.map(moto => (
                      <option key={moto._id} value={moto._id}>
                        {moto.marca} {moto.modelo} {moto.color}
                      </option>
                    ))}
                  </datalist>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Marca</label>
                  <input
                    className="w-full p-2 border rounded"
                    id="marca"
                    type="text"
                    onChange={handleInputChangeMoto}
                    value={formMoto.marca}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Modelo</label>
                  <input
                    className="w-full p-2 border rounded"
                    id="modelo"
                    type="text"
                    onChange={handleInputChangeMoto}
                    value={formMoto.modelo}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cilindrada</label>
                  <input
                    className="w-full p-2 border rounded"
                    id="cilindrada"
                    type="text"
                    onChange={handleInputChangeMoto}
                    value={formMoto.cilindrada}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Placa</label>
                  <input
                    className="w-full p-2 border rounded"
                    id="placa"
                    type="text"
                    onChange={handleInputChangeMoto}
                    value={formMoto.placa}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                <input
                  className="w-full p-2 border rounded"
                  id="color"
                  type="text"
                  onChange={handleInputChangeMoto}
                  value={formMoto.color}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                <input
                  className="w-full p-2 border rounded"
                  id="tipo"
                  type="text"
                  onChange={handleInputChangeMoto}
                  value={formMoto.tipo}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Formulario de Servicio */}
      {activeForm === 3 && (
        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
          <h2 className="text-lg font-semibold text-orange-700 mb-4">Formulario de Servicio</h2>

          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                <input
                  className="w-full p-2 border rounded"
                  id="fecha"
                  type="date"
                  onChange={handleInputChangeServicio}
                  value={formServicio.fecha}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Anticipo</label>
                <input
                  className="w-full p-2 border rounded"
                  id="anticipo"
                  type="text"
                  onChange={handleInputChangeServicio}
                  value={formServicio.anticipo}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kilometraje</label>
                <input
                  className="w-full p-2 border rounded"
                  id="kilometraje"
                  type="text"
                  onChange={handleInputChangeServicio}
                  value={formServicio.kilometraje}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Combustible</label>
                <input
                  className="w-full p-2 border rounded"
                  id="combustible"
                  type="text"
                  onChange={handleInputChangeServicio}
                  value={formServicio.combustible}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Concepto</label>
              <input
                className="w-full p-2 border rounded"
                id="concepto"
                type="text"
                onChange={handleInputChangeServicio}
                value={formServicio.concepto}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Presupuesto</label>
              <input
                className="w-full p-2 border rounded"
                id="presupuesto"
                type="text"
                onChange={handleInputChangeServicio}
                value={formServicio.presupuesto}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Observaciones</label>
              <input
                className="w-full p-2 border rounded"
                type="text"
                id="observaciones"
                onChange={handleInputChangeServicio}
                value={formServicio.observaciones}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Próximo Servicio</label>
              <input
                type="date"
                className="w-full p-2 border rounded"
                id="proximo"
                onChange={handleInputChangeServicio}
                value={formServicio.proximo}
              />
            </div>
          </div>
        </div>
      )}

      {/* Botón de Guardar (solo visible cuando hay un formulario activo) */}
      {activeForm === 3 && (
        <div className="text-center mt-4">
          <button
            className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-6 rounded-lg font-medium"
            onClick={handleCrearServicio}
          >
            Guardar Datos
          </button>
        </div>
      )}

    </div>
  );
}
