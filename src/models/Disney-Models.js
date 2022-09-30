import {DataTypes} from "sequelize";
import {sequelize} from '../../dbconfig.js';

const peliculasmodel = sequelize.define('peliculas',{
     "titulo": {type: DataTypes.STRING},
    "fecha_creacion": {type: DataTypes.DATE},
    "calificacion": {type: DataTypes.INTEGER},
    "idgenero": {type: DataTypes.INTEGER},
    "imagen":{type: DataTypes.STRING}
},{
    timestamps:false
})

const personajesmodel = sequelize.define('personajes',{
    "nombre": {type: DataTypes.STRING},
    "imagen": {type: DataTypes.STRING},
    "edad": {type: DataTypes.INTEGER},
    "peso": {type: DataTypes.INTEGER},
    "historia": {type: DataTypes.STRING}
},{
    timestamps:false
})

const peliculaspersonajesmodel = sequelize.define('peliculas_personajes',{
    "id_pelicula": {type: DataTypes.INTEGER},
    "id_personaje": {type: DataTypes.INTEGER},
},{
    timestamps:false
});

const loginmodel = sequelize.define('usuarios',{
    "nombre": {type: DataTypes.STRING},
    "apellido": {type: DataTypes.STRING},
    "mail":  {type: DataTypes.STRING},
    "password":  {type: DataTypes.STRING}
},{
    timestamps:false
});

//RELACIONES
peliculasmodel.hasMany(peliculaspersonajesmodel,{
    foreignKey: 'id_pelicula',
    sourceKey: 'id'
});

peliculaspersonajesmodel.belongsTo(peliculasmodel,{
    foreignKey: 'id_pelicula',
    targetId: 'id'
});

export {peliculasmodel,personajesmodel,loginmodel};

