import Loader from 'react-loader-spinner';

const WaitUser = () => (
    <>
    <h2 className="container_account_title">Configuracion</h2>
    <div className="container_account_form">
    <h3>Espere Porfavor</h3>
        <form className="container_account_form_data">
            <p className="text-center">Esperando Servidor</p>
            <Loader type="BallTriangle" color="#00BFFF" height={30} width={30} className="mb-1" />
        </form>
    </div>
    </>
    )


export default WaitUser
