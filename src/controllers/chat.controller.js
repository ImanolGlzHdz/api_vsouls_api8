const { pool } = require("../db.js");

const postEnviarMensaje = async (req, res) => {
    try {
        const { mensaje, pregunta } = req.body;
        console.log('Mensaje del usuario recibido:', mensaje);

        if (pregunta) {
            // Buscar respuestas específicas para preguntas conocidas en la base de datos
            const [result] = await pool.query('CALL ENVIAR_MENSAJE_CHATBOT(?)', [mensaje]);

            if (result.length > 0) {
                // Si se encuentra una respuesta en la base de datos, enviarla al frontend
                console.log(result);
                res.status(200).json({ mensaje: result[0][0].respuesta });
            } else {
                // Si no hay respuesta en la base de datos, responder con un mensaje predeterminado
                const respuestaDB = 'Lo siento, no tengo una respuesta para esa pregunta.';
                res.status(200).json({ mensaje: respuestaDB });
            }
        } else {
            res.status(400).json({ error: 'La pregunta no fue proporcionada en el cuerpo de la solicitud.' });
        }
    } catch (error) {
        console.error('Error al buscar respuesta en la base de datos:', error);
        res.status(500).json({ error: 'Error al buscar respuesta en la base de datos' });
    }
}


const getChat = async (req, res) => {
    
   try {
       const [rows] = await pool.query("CALL MOSTRAR_CHATBOT()");
       res.json(rows);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}


const getChatId = async (req, res) => {
    const {id} =req.params
    try {
        const [rows] = await pool.query("CALL MOSTRAR_CHATBOT_ID(?)", [id]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const postChat = async (req, res) => {
    const {pregunta, respuesta} =req.body
   try {
       const [rows] = await pool.query("CALL INSERTAR_CHATBOT(?, ?)",[pregunta, respuesta]);
       res.send('Registro Insertado');
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}


const ActualizarChat = async (req, res) => {
    const {id, pregunta, respuesta} =req.body
   try {
       const [rows] = await pool.query("CALL ACTUALIZAR_CHATBOT_ID(?, ?, ?)",[id, pregunta, respuesta]);
        res.send('Registro Actualizado');
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}



const deleteChat = async (req, res) => {
    const {id } =req.body
   try {
       const [rows] = await pool.query("CALL ELIMINAR_CHATBOT(?)",[id]);
        res.send('Registro Eliminado');
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}


module.exports = {
    postEnviarMensaje,
    getChat,
    getChatId,
    postChat,
    ActualizarChat,
    deleteChat
};