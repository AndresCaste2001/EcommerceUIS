import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/Contact.css";

const Contact = () => {
  useEffect(() => {
    // Inicializar el mapa
    const map = L.map("mapid").setView([7.1394, -73.1198], 15);
    L.tileLayer(
      'https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=hdyOw6t2CIyFAGNjM4qM',
      {
        maxZoom: 18,
        attribution:
          'Zay Template | Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
      }
    ).addTo(map);

    L.marker([7.1394, -73.1198])
      .addTo(map)
      .bindPopup("<b>UIS</b> eCommerce<br/>Location.")
      .openPopup();

    map.scrollWheelZoom.disable();
    map.touchZoom.disable();

    return () => map.remove();
  }, []);

  return (
    <div className="contact-page">
      {/* Sección de título */}
      <div className="contact-header">
        <div className="contact-title text-center">
          <h1>  CONTACTA CON NOSOTROS</h1>
          <p>
            Comunícate con nosotros para resolver cualquier duda 
            sobre nuestros productos, envíos o métodos de pago.
          </p>
        </div>
      </div>

      {/* Mapa */}
      <div id="mapid" className="contact-map"></div>

      {/* Formulario */}
      <div className="contact-form container py-3">
        <div className="row py-5">
          <form className="col-md-9 m-auto" method="post" role="form">
            <div className="row">
              <div className="form-group col-md-6 mb-3">
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  id="name"
                  name="name"
                  placeholder="Nombre"
                />
              </div>
              <div className="form-group col-md-6 mb-3">
                <label htmlFor="email">Correo Electrónico</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  id="email"
                  name="email"
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="subject">Asunto</label>
              <input
                type="text"
                className="form-control mt-1"
                id="subject"
                name="subject"
                placeholder="Asunto"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message">Mensaje</label>
              <textarea
                className="form-control mt-1"
                id="message"
                name="message"
                placeholder="Mensaje"
                rows="8"
              ></textarea>
            </div>
            <div className="row">
              <div className="col text-end mt-2">
                <button type="submit" className="btn btn-success btn-lg px-3">
                  Enviar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
