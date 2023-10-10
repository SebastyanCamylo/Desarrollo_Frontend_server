import "../assets/css/perfil.css";
import { useContext, useState, useEffect } from "react";
import Context from "../context/Context";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

export default function Perfil() {
  const { setUsuario: setUsuarioGlobal, usuario } = useContext(Context);

  const [usuarioLocal, setUsuarioLocal] = useState({});
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  const [nuevosDatos, setNuevosDatos] = useState(usuarioLocal);


  const handleChange = (event) => {
    const { name, value } = event.target;
    setNuevosDatos((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
   

  const getUsuarioData = async () => {
    // const urlServer = "https://proyect-backend.onrender.com/api/v1/user";
    // const endpoint = "/perfil";

    const urlServer = "http://localhost:3000";
    const endpoint = "/usuarios";


    const token = localStorage.getItem("token");
    console.log("Token:", token)

    try {
      console.log("Realizando petición a:", urlServer + endpoint);
      const { data } = await axios.get(urlServer + endpoint, {
        headers: { Authorization: "Bearer " + token },
      });


      console.log("Datos del usuario:", data);
      console.log("Id del usuario: ",data.usuario_id);
      setUsuarioGlobal(data);
      setUsuarioLocal(data);
      setNuevosDatos(data);

    } catch (error) {
      console.log("Error al realizar la petición:", error);
      if (error.response && error.response.status === 404) {
        toast.error("No se encontró el perfil del usuario.");
      } else {
        toast.error("Hubo un error al obtener los datos del usuario 🙁");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsuarioData();
  }, []);

  const handleUpdateProfile = async () => {

    try {
      // const urlServer = "https://proyect-backend.onrender.com/api/v1/user";
      // const endpoint = `/update/${usuario.id_usuario}`;

      const urlServer = "http://localhost:3000";
      const endpoint = `/update/${usuario.usuario_id}`;

      const token = localStorage.getItem("token");


      console.log("Realizando petición a:", urlServer + endpoint);

      const { usuario_id, ...restoDatos } = nuevosDatos;

      const { data } = await axios.put(
        urlServer + endpoint,
        restoDatos,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      console.log("Datos actualizados:", data);
      toast.success("Perfil actualizado correctamente");
      setUsuarioGlobal(data.result)
      setEditMode(false);
    } catch (error) {
      if (error.response) {
        console.log("Error en la respuesta del servidor:", error.response.data);
        toast.error("Hubo un error al actualizar el perfil: " + error.response.data.error);
      } else if (error.request) {
        console.log("Error de conexión o de red:", error.request);
        toast.error("Hubo un error de conexión o de red al actualizar el perfil");
      } else {
        console.log("Error en la lógica de la solicitud:", error.message);
        toast.error("Hubo un error en la lógica de la solicitud al actualizar el perfil");
      }
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <div className="container">

        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="col-8">
                <span className="fs-4">Hola: </span>
                <h1 className="fs-4">{usuarioLocal.nombre} {usuarioLocal.apellido}</h1>

                {/* <img src="https://www.falabella.com/a/fa/myaccount/static/images/defaultProfilePicture-rebranded.svg" className="imgTitulo rounded-start" alt="..." /> */}
              </div>
              <div className="">


              </div>

            </div>
          </div>


          <div className="col-6">
            <div className="card h-100">
              <div class="list-group">

                <button type="button" className="list-group-item list-group-item-action">Datos Personales</button>
                <button type="button" className="list-group-item list-group-item-action">Seguridad Cuenta</button>
                <button type="button" className="list-group-item list-group-item-action">Mis Direcciones</button>
                <button type="button" className="list-group-item list-group-item-action" >A disabled button item</button>
              </div>

            </div>
          </div>
          <div className="col-6">
            <div className="card h-100">
              <div className=" text-center">
                <div className="row">
                  <div className="perfil">
                    <div className="row-cols-1 row-cols-md-1 ">
                      <div className="card h-100">
                        <div className="card-body">
                          <h2>Datos Personales</h2>
                          {editMode ? (
                            <>
                              <form>
                                <div className="mb-1">
                                  <label
                                    htmlFor="nombre"
                                    className="form-label text-muted m-1">Nombre:</label>
                                  <input
                                    type="text"
                                    className="form-control text-center"
                                    id="nombre"
                                    name="nombre"
                                    value={nuevosDatos.nombre}
                                    onChange={handleChange}
                                    placeholder="Nuevo nombre"
                                    maxLength="50"
                                  />

                                </div>
                                <div className="mb-1">
                                  <label
                                    htmlFor="apellido"
                                    className="form-label text-muted m-1">Apellido:</label>
                                  <input
                                    type="text"
                                    className="form-control text-center"
                                    id="apellido"
                                    name="apellido"
                                    value={nuevosDatos.apellido}
                                    onChange={handleChange}
                                    placeholder="Nuevo apellido"
                                    maxLength="50"
                                  />
                                </div>
                                
                                <div className="mb-3">
                                  <label htmlFor="correoEditado" className="form-label text-muted m-1">Correo</label>
                                  <input
                                    type="email"
                                    id="correoEditado"
                                    className="form-control text-center"
                                    name="correo"
                                    value={nuevosDatos.correo}
                                    onChange={handleChange}
                                    placeholder="Nuevo correo"
                                    aria-describedby="emailHelp"
                                    maxLength="50"
                                  />
                                  <div id="emailHelp" className="form-text">Nunca compartiremos su correo electrónico con nadie más.</div>
                                </div>
                                <div className="mb-3">
                                  <label htmlFor="correoEditado" className="form-label text-muted m-1">Contraseña:</label>
                                  <input
                                    type="password"
                                    id="passwordEditado"
                                    className="form-control text-center"
                                    name="password"
                                    value={nuevosDatos.password}
                                    onChange={handleChange}
                                    placeholder="Nueva contraseña"
                                    aria-describedby="passwordlHelp"
                                    maxLength="50"
                                  />
                                  <div id="passworMessenger" className="form-text ">(Deben ser más de 6 digitos)</div>
                                </div>




                                




                                <hr />
                                <div className="mb-1 card-footer-perfil">
                                  <h2>Dirección de entrega</h2>
                                  <label htmlFor="telefonoEditado" className="form-label text-muted m-1">Direccion:</label>
                                  <input
                                    type="text"
                                    id="DireccionEditado"
                                    className="form-control text-center"
                                    name="direccion"
                                    //value={nuevosDatos.direccion}
                                    onChange={handleChange}
                                    placeholder="Nueva direccion"
                                    maxLength="100"
                                  />
                                  
                                </div>
                              </form>
                            </>
                          ) : (
                            <>
                              <h4 className="text-muted">Nombre: <span><h5>{usuarioLocal.nombre}</h5></span> </h4>

                              <h4 className="text-muted">Apellido: <span><h5>{usuarioLocal.apellido}</h5></span> </h4>

                              <h4 className="text-muted">Correo: <span><h6>{usuarioLocal.email}</h6></span> </h4>

                              <hr />
                              <div className="card-footer">
                                <h2>Dirección de entrega</h2>
                                <h5 className="text-muted">Dirección: {usuarioLocal.direccion}</h5>
                              </div>
                            </>
                          )}
                        </div>
                        <div className="d-flex justify-content-center gap-3 card-footer">
                          {editMode ? (
                            <>
                              <button className="btn btn-success boton-perfil" onClick={handleUpdateProfile}>
                                Guardar
                              </button>
                              <Link to="/menu" className="btn btn-warning boton-perfil">Volver</Link>
                            </>
                          ) : (
                            <button
                              className="btn btn-info" boton-perfil
                              onClick={() => setEditMode(true)}
                            >
                              Editar Usuario
                            </button>

                          )}
                          <button
                            className="btn btn-danger boton-perfil"
                            onClick={() => {
                              // Agrega la lógica para la acción de "Eliminar usuario"
                              console.log("Eliminar usuario");
                            }}
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>





        {/* <div className="card m-0 p-2 row " >
          <div className=" g-1 align-items-center">
            <div className=" col-sm-2 col-md-2 col-2  m-0 p-0">
              <img src="https://www.falabella.com/a/fa/myaccount/static/images/defaultProfilePicture-rebranded.svg" className="imgTitulo rounded-start" alt="..." />
            </div>
            <div className="col-sm-8 col-8">
              <div className="card-body">
                <span>
                  <span className="fs-4">HOLA </span>
                </span>
                <h1 className="fs-4">{usuarioLocal.nombre} {usuarioLocal.apellido}</h1>
              </div>
            </div>
          </div>
        </div> */}


      </div>
    </>
  );
}
