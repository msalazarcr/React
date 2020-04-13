import React, { Fragment, useState } from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';

const Form = ({crearCita}) => {

    // Crear State para citas
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });

    // Crear State para errores del form
    const [error, actualizarError] = useState(false);

    // Función que se ejecuta cada vez que el usuario escribe en un input
    const actualizarState = e => {
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        });
    }

    // Extraer los valores
    const { mascota, propietario, fecha, hora, sintomas } = cita;

    const submitCita = e => {
        e.preventDefault();

        // Validar el form
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
            actualizarError(true);
            return;
        }

        // Asignar un ID
        cita.id = shortid.generate();

        // Crear la cita
        crearCita(cita);

        // Reiniciar el form
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''            
        })
    } 

    return ( 
        <Fragment>
            <h2>Crear citas</h2>

            {
                error ? <p className="alerta-error">Todos los campos son obligatorios</p>
                      : null
            }

            <form
                onSubmit={submitCita}
            >
                <label>Nombre mascota</label>
                <input 
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Ingrese el nombre de la mascota"
                    onChange={actualizarState}
                    value={mascota}
                />

                <label>Nombre dueño</label>
                <input 
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Ingrese el nombre del dueño"
                    onChange={actualizarState}
                    value={propietario}
                />

                <label>Fecha</label>
                <input 
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />    

                <label>Hora</label>
                <input 
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />

                <label>Síntomas</label>
                <textarea
                    name="sintomas"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={sintomas}
                >
                </textarea>    

                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar cita</button>                                           
            </form>
        </Fragment>
     );
}

Form.propTypes = {
    crearCita: PropTypes.func.isRequired
}
 
export default Form;