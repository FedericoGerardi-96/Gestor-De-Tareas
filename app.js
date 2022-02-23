const { guardarDB, 
        leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, 
        Pausa, 
        leerInput,
        listadoTareasBorrar,
        confirmar,
        mostrarListadoCheckList } = require('./helpers/Inquirer');

const Tareas = require('./models/tareas');

console.clear();


const Main = async() => {

    let opt = '';

    const tareas = new Tareas();

    const tareasDB = leerDB();

    if ( tareasDB ){
        //Establecer las tareas
        tareas.cargarTareasFromArray(tareasDB);
    }

    do{

       opt = await inquirerMenu();
       
       let Completada = true;

       switch (opt) {
           case '1':
                const desc = await leerInput('Descripcion:');
                tareas.crearTarea( desc );
               //Crear Tarea               
               break;
            case '2':
                console.log(tareas.listadoCompleto());
                //Listar Tarea
                break;      
            case '3':
                Completada = true;
                console.log(tareas.listarPendientesCompletadas(Completada));
                //Listar Tarea filtrando completadas de no completadas
                 break;  
            case '4':
                Completada = false;
                console.log(tareas.listarPendientesCompletadas(Completada));
                //Listar Tarea filtrando completadas de no completadas
                break;
            case '5':
                const { ids } = await mostrarListadoCheckList( tareas.listadoArr );
                tareas.toggleCompletadas(ids);
                //Listar Tarea para completarlass
                break;
                
            case '6':
                const { id } = await listadoTareasBorrar( tareas.listadoArr );

                if ( id === '0') break;

                const confirmacion = await confirmar('Estas seguro ?');
                if ( confirmacion ){
                    tareas.borrarTarea( id );
                    console.log( 'Tarea Borrada Correctamente...')
                }

                //Borrar una tarea
                break;
       }

       guardarDB( tareas.listadoArr );
         
       await Pausa();
       if (opt === "0") break;

    }while(opt !== '0');

}

Main();
