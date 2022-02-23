const Tarea = require('./Tarea');

class Tareas{

    _listado = {};

    get listadoArr() {

        const listado = [];

        Object.keys(this._listado).forEach( key => {            
            listado.push( this._listado[key] );
        });

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea( id = '' ){ 
        if ( this._listado[id] ){
            delete this._listado[id];
        }
    }

    cargarTareasFromArray( tareas = [] ) {

        tareas.forEach( tarea => {

            this._listado[tarea.id] = tarea;

        })
        
    }

    crearTarea (desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {

        let lista = '';    
                        //EL FOREACH TRAE EL INDICE
        this.listadoArr.forEach( (tarea, i) => {            
            
            const id = `${ i + 1 }`.green;

            const { desc, completadoEn } = tarea;
            
            const Estado = (completadoEn) ? 'COMPLETADO'.green : 'PENDIENTE'.red

            lista += `${ id }. ${ desc } | ${ Estado }\n`
            
        });
       
        return lista;
    }

    listarPendientesCompletadas ( completadas = true ){
        
        let lista = '';    
        //EL FOREACH TRAE EL INDICE, i
        this.listadoArr.forEach( (tarea, i) => {            

            let id = '';            

            let Estado = '';

            let { desc, completadoEn } = tarea;

            if( completadas ){
                if ( completadoEn ){
                    
                    id = `${ i + 1 }`.green;
                    Estado = 'COMPLETADO'.green;  
                    lista += `${ id }. ${ desc } | ${ Estado } | Fecha: ${ completadoEn } \n`          
                }
            }
            else{
                if ( !completadoEn ){
                    id = `${ i + 1 }`.green;
                    Estado ='PENDIENTE'.red;   
                    lista += `${ id }. ${ desc } | ${ Estado } | Fecha: ${ completadoEn }  \n`        
                    
                } 
            }
           
        });
        return lista;
    }

    toggleCompletadas( ids = [] ){
        ids.forEach( id => {
            const tarea = this._listado[id];

            if ( !tarea.completadoEn ){
                tarea.completadoEn = new Date().toISOString();
            } 
        })

        this.listadoArr.forEach( tarea => {
 
            if ( !ids.includes( tarea.id )){
                this._listado[tarea.id];
                tarea.completadoEn = null;
                /*  
                ES LO MISMO
                this._listado[tarea.id].tarea.completadoEn = null;                             
                */
            }

        })
    }


}

module.exports = Tareas;