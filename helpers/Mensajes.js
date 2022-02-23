require('colors');

const Menu = () =>{

    return new Promise((resolve, reject) => {
        console.clear();
        console.log("=====================================".green);
        console.log("------- Seleccione una opcion -------".red);    
        console.log("=====================================".green);
        console.log(`${ '1'.green }. Crear Tarea `);
        console.log(`${ '2'.green }. Listar Tareas `);
        console.log(`${ '3'.green }. Listar Tareas Completadas`);
        console.log(`${ '4'.green }. Listar Tareas Pendientes`);
        console.log(`${ '5'.green }. Completar Tarea(s) `);
        console.log(`${ '6'.green }. Borrar Tareas `);
        console.log(`${ '0'.green }. Salir \n`);

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        
        readline.question(`Seleccione una opcion: `, (opt) => {    
            readline.close();
            resolve(opt);
        });

    })
}

const Pausa = () =>{

    return new Promise((resolve, reject) => {

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        
        readline.question(`\nPrecione ${ 'ENTER'.blue } para continuar: \n`, (opt) => {    
            readline.close();
            resolve();
        });
    });
}

module.exports = {
    Menu,
    Pausa
};