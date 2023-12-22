import { PaperClipIcon } from '@heroicons/react/20/solid'

export default function PaymentAndCharges() {
  return (
    <div className='personal-container'>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900 ">Datos personales</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500"> <a href="/account-settings">Cuenta</a> {'>'} Pagos y cobros </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900 cuadrado">Tus pagos</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"><button>Administrá los pagos</button></dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Formas de pago</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"><button>Agregá una forma de pago</button></dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Cómo vas a recibir tu dinero</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"><button>Configurá los cobros</button></dd>
          </div>
    
      
        </dl>
      </div>
    </div>
  )
}
