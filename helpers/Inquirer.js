const inquirer = require('inquirer');
require('colors');



const inquirerMenu = async() =>{

    const Preguntas = [
        {
            type: 'list',
            name: 'opcion',
            message: 'Que desea hacer ?',
            choices: [
            {
                value: '1',
                name: `${ '1.'.green } Crear Tarea`
            },
            {
                value: '2',
                name: `${ '2.'.green } Listar Tareas`
            },
            {
                value: '3',
                name: `${ '3.'.green } Listar Tareas Completadas`
            },
            {
                value: '4',
                name: `${ '4.'.green } Listar Tareas Pendientes`
            },
            {
                value: '5',
                name: `${ '5.'.green } Completar Tarea(s)`
            },
            {
                value: '6',
                name: `${ '6.'.green } Borrar Tareas`
            },
            {
                value: '0',
                name: `${ '0.'.green } Salir`
            }
        
            ]
        }
    ]; 
    
    console.clear();
    console.log("=====================================".green);
    console.log("------- Seleccione una opcion -------".red);    
    console.log("=====================================".green);

    const { opcion }  = await inquirer.prompt(Preguntas)
    return opcion;
}

const Pausa = async() =>{

    const PreguntaPausa = [
        {
            type: 'input',
            name: 'pausa',
            message: `\n\nPrecione ${ 'ENTER'.blue } para continuar`,
        }
    ]
    await inquirer.prompt(PreguntaPausa)
}

const leerInput = async( mensaje) =>{
    const Pregunta = [
        {
            type: 'input',
            name: 'desc',
            message: mensaje,
            validate (value){
                if (value.length === 0 ) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(Pregunta);
    return desc;
}

const listadoTareasBorrar = async ( tareas = [] ) => {

    const choices = tareas.map( (tarea, i) => {

        const idx = `${ (i + 1 + '.')}`.green;

        return{
            value: tarea.id,
            name: `${ idx } ${ tarea.desc }`
        }
    });

    //AGREGAR UN NUEVO OBJETO AL FINAL
    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    })

    const preguntas =[
        {
        type: 'list',
        name: 'id',
        message: 'Borrar',
        choices
    }]

    const id  = await inquirer.prompt(preguntas);

    return id;
}

const mostrarListadoCheckList = async ( tareas = [] ) => {

    const choices = tareas.map( (tarea, i) => {

        const idx = `${ (i + 1 + '.')}`.green;

        return{
            value: tarea.id,
            name: `${ idx } ${ tarea.desc }`,
            checked: ( tarea.completadoEn ) ? true : false 
        }
    });

    const pregunta =[
        {
        type: 'checkbox',
        name: 'ids',
        message: 'Selecciones',
        choices
    }]

    const id  = await inquirer.prompt(pregunta);

    return id;
}

const confirmar = async(mensaje) => {

    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            message: mensaje
        }
    ]


    const { ok }  = await inquirer.prompt(pregunta);
    return ok;
}

module.exports = {
    inquirerMenu,
    Pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList
};
