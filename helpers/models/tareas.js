const Tarea = require('./tarea')
class Tareas{
    _listado = {};
    get listadoArr(){
        const listado = [];
        Object.keys(this._listado).forEach(key =>{ // con este deserializamos el objeto por su clave, 
            const tarea = this._listado[key];
            listado.push(tarea)
            
        })

        return listado;
    }
    constructor(){
        this._listado= {};
    }

    borrarTarea = (id = '') =>{

        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    crearTarea(desc=''){

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto =() =>{
        console.log();
        this.listadoArr.forEach((tarea,i)=>{
            const idx = `${i+1}`.green;
            const {desc,completadoEn} = tarea;
            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red

            console.log(`${idx + '.'.green} ${desc} :: ${estado}`);

        });
    }

    listarPendientesCompletadas = (completadas = true) =>{

        console.log();
        let contador =0;
        this.listadoArr.forEach((tarea,i)=>{


            const idx = `${i+1}`.green;
            const {desc,completadoEn} = tarea;
            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red
            
            if(completadas){
                if(completadoEn){
                    contador+=1;
                    console.log(`${(contador + '.').green} ${desc} :: ${completadoEn.green}`)
                }
            }else {
                if(!completadoEn){
                    contador+=1;
                    console.log(`${(contador + '.').green} ${desc} :: ${estado}`)

                }
            }
            
        });
    }

    ListarTareasPendientes = ()=>{
        console.log();
        this.listadoArr.forEach((tarea,i) =>{
            if(!tarea.completadoEn){
                const idx = `${i+1}`.green;
                const {desc,completadoEn} = tarea;
                const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red
                console.log(`${idx} ${desc} :: ${estado}`);
            }
        });
    }

    cargarTareasFromArray(tareas = []){

        tareas.forEach(tarea =>{
            this._listado[tarea.id] = tarea;
        })

        //this._listado[tarea.id] = tarea;
    }

    toggleCompletadas(ids = []){

        ids.forEach(id =>{

            const tarea = this._listado[id];
            if (!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString()
            }
        });

        this.listadoArr.forEach(tarea =>{
            if(!ids.includes(tarea.id)){ // (! si no existe) el include es para saber si existe el id de la tarea dentro del arreglo ids
                this._listado[tarea.id].completadoEn = null;
            }
        })

    }

}
module.exports = Tareas