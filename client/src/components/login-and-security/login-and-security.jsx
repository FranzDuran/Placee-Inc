import { PaperClipIcon } from '@heroicons/react/20/solid';
import './LoginAndSecurity.scss';

export default function PersonalInfo() {
  return (
    <div className='personal-container'>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Inicio de sesión y seguridad</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500"> <a href="/account-settings" className='count-security'>Cuenta</a> {'>'} Inicio de sesión y seguridad </p>
      </div>
      <div className="mt-6 border-t border-gray-100">

        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Contraseña</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">******</dd>
          </div>
      <h3 className="text-base font-semibold leading-7 text-gray-900">Cuentas en redes sociales</h3>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Facebook</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">conectar</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Google</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Conectar</dd>
          </div>
       
        </dl>
      </div>
    </div>
  )
}
