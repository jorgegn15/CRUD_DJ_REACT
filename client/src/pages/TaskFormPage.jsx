import { useForm } from "react-hook-form";
import { createTask, deleteTask, updateTask, getTask } from "../api/TaskList.api";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export function TaskFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();
  const navigate = useNavigate()
  const params = useParams()

  const onSubmit = handleSubmit(async (data) => {
    if(params.id){
      await updateTask(params.id, data)
    }else{
      const res = await createTask(data);
    }
    navigate('/tasks');
  });

  const data = useEffect(()=>{
    async function loadTasks() {
      if(params.id){
        const {data} = await getTask(params.id)
        setValue('title', data.title)
        setValue('description', data.description)
      }
    }
    loadTasks();
  },[])

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Titulo:"
          {...register("title", { required: true })}
        />
        {errors.title && <span>Titulo requerido</span>}
        <textarea
          type="text"
          placeholder="Descripcion:"
          {...register("description")}
        />
        {errors.description && <span>Descripcion requerida</span>}
        {params.id ? (<button>Actualizar Tarea</button>):(<button>Guardar Tarea</button>)}
      </form>
      {params.id && <button onClick={async ()=>{
        const accepted = window.confirm("¿Desdeas eliminar la tarea?")
        if (accepted){
          await deleteTask(params.id)
          navigate('/tasks')
        }
      }}>Borrar Tarea</button>}
    </div>
  );
}
