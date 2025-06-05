import Link from "next/link";

export default function Home() {
  return (
  <div className="flex flex-col items-center justify-start min-h-fit px-4 py-2 bg-gray-50">
    <div className="flex flex-col items-center justify-center space-y-4 w-full max-w-md">
      <Link href="/nuevo" className="w-full">
        <button className="group relative w-full flex justify-center overflow-hidden rounded border-4 border-double border-orange-500 px-4 py-3 font-medium text-orange-600">
          <span className="absolute left-0 top-0 mb-0 flex h-full w-0 translate-x-0 transform bg-orange-600 opacity-90 transition-all duration-300 ease-out group-hover:w-full"></span>
          <span className="relative group-hover:text-white">Nuevo Servicio</span>
        </button>
      </Link>

      <Link href="/clientes" className="w-full">
        <button className="group relative w-full flex justify-center overflow-hidden rounded border-4 border-double border-orange-500 px-4 py-3 font-medium text-orange-600">
          <span className="absolute left-0 top-0 mb-0 flex h-full w-0 translate-x-0 transform bg-orange-600 opacity-90 transition-all duration-300 ease-out group-hover:w-full"></span>
          <span className="relative group-hover:text-white">Clientes</span>
        </button>
      </Link>

      <Link href="/motos" className="w-full">
        <button className="group relative w-full flex justify-center overflow-hidden rounded border-4 border-double border-orange-500 px-4 py-3 font-medium text-orange-600">
          <span className="absolute left-0 top-0 mb-0 flex h-full w-0 translate-x-0 transform bg-orange-600 opacity-90 transition-all duration-300 ease-out group-hover:w-full"></span>
          <span className="relative group-hover:text-white">Motos</span>
        </button>
      </Link>

      <Link href="/servicios" className="w-full">
        <button className="group relative w-full flex justify-center overflow-hidden rounded border-4 border-double border-orange-500 px-4 py-3 font-medium text-orange-600">
          <span className="absolute left-0 top-0 mb-0 flex h-full w-0 translate-x-0 transform bg-orange-600 opacity-90 transition-all duration-300 ease-out group-hover:w-full"></span>
          <span className="relative group-hover:text-white">Servicios</span>
        </button>
      </Link>

      <Link href="/proxServicios" className="w-full">
        <button className="group relative w-full flex justify-center overflow-hidden rounded border-4 border-double border-orange-500 px-4 py-3 font-medium text-orange-600">
          <span className="absolute left-0 top-0 mb-0 flex h-full w-0 translate-x-0 transform bg-orange-600 opacity-90 transition-all duration-300 ease-out group-hover:w-full"></span>
          <span className="relative group-hover:text-white">Próximos Servicios</span>
        </button>
      </Link>
    </div>
  </div>
);
}
