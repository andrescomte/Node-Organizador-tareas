require('colors');
console.clear();

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const {inquirerMenu, pausa,leerInput, ListadoTareasBorrar,confirmar,mostrarListadoChecklist} = require('./helpers/inquirer');
const Tarea = require('./helpers/models/tarea');
const Tareas = require('./helpers/models/tareas');
const main = async() =>{
    
    console.log('HolaMundo');
    let opt ='';
    const tareas = new Tareas();

    const tareasDB = leerDB();
    if(tareasDB){
        tareas.cargarTareasFromArray(tareasDB);
        // Establecer las tareas
        //TODO CargarTareas

    }
    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                //crear opcion
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea(desc);
                break;
            
            case '2':
                //console.log(tareas.listadoArr);
                tareas.listadoCompleto();

                break;
            
            case '3':
                tareas.listarPendientesCompletadas();
                break;

            case '4':
                tareas.listarPendientesCompletadas(false);
                break;
            case '5': //completado pendiente
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                console.log(ids);
                break;

            case '6': // borrar
                const id = await ListadoTareasBorrar(tareas.listadoArr);
                if (id !=='0'){
                    const ok = await confirmar('¿Estas seguro?');
                    if(ok){
                        tareas.borrarTarea(id);
                        console.log('Tarea Borrada');
                    }

                }
            break;
        }
        guardarDB(tareas.listadoArr);
        console.log('\n')
        await pausa();
    } while (opt !=='0');

    //pausa();

} 

main();