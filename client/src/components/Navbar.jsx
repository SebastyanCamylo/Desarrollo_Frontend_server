import "../assets/css/navbarFooter.css";

import { NavLink} from "react-router-dom";
import { useContext } from "react";

import { useOperationsContext } from "../context/OperationsContext";
import Context from "../context/Context";


export default function Navbar() {

    const {FormatCoin, total} = useOperationsContext ()
    const { usuario} = useContext(Context);
    



    return (
        <nav>
        <div className="d-flex ">
            <div className="  navHom">
            <NavLink className={({ isActive }) => (isActive ? 'active' : undefined)} end to="/" > 👀 Anime Shop </NavLink>
            </div>
       

            <div className="d-flex">
                <div className=" navHom car">
                <NavLink className={({ isActive }) => (isActive ? 'active' : undefined)} end to="/menu" > Productos</NavLink>
                
                </div>

                {!usuario && (
                <div className="  navHom car">
                    <NavLink className={({ isActive }) => (isActive ? 'active' : undefined)} end to="/registro" >Registrar</NavLink>
                    <NavLink className={({ isActive }) => (isActive ? 'active' : undefined)} end to="/login" >Iniciar Sesión</NavLink>
                    
                </div>
                )}

                {/* rutas protegidas */}
                {usuario ? (
                <div className="d-flex ">
                    <div className="navHom car">
                    <NavLink className={({ isActive }) => (isActive ? 'active' : undefined)} end to="/perfil" >Perfil</NavLink>
                    </div>
                    <div className="navHom car">
                    <NavLink className={({ isActive }) => (isActive ? 'active' : undefined)} end to="/vender" >Publica tu producto</NavLink>
                    </div>
                    <div className="navHom car">
                    <NavLink className={({ isActive }) => (isActive ? 'active' : undefined)} end to="/mispedidos" >Mis Pedidos</NavLink>
                    </div>
                    <div className="navHom car">
                    <NavLink className={({ isActive }) => (isActive ? 'active' : undefined)} end to="/favoritos" > Favoritos</NavLink>
                    </div>
                    <div className="navHom car">
                    <NavLink className={({ isActive }) => (isActive ? 'active' : undefined)} end to="/car" >🛒{FormatCoin(total)}</NavLink>
                    </div>
                    <div className="navHom car">
                    <NavLink className={({ isActive }) => (isActive ? 'active' : undefined)} end to="/logout" > Logout</NavLink>
                    </div>
                </div>
                ) : null}
            </div>
            </div>
        </nav>
    );
}