import {TasksStateType} from "../App";
import {v1} from "uuid";


export const tasksReducer=(stateTasks:TasksStateType,action:TsarType):TasksStateType=>{
    switch (action.type) {
        case "ADD-TASK":{
            // let task = {id: v1(), title: title, isDone: false};
            // //достанем нужный массив по todolistId:
            // let todolistTasks = tasks[todolistId];
            // // перезапишем в этом объекте массив для нужного тудулиста копией, добавив в начало новую таску:
            // tasks[todolistId] = [task, ...todolistTasks];
            // // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
            // setTasks({...tasks});
            let task = {id: v1(), title: action.payload.title, isDone: false};
            let todolistTasks = stateTasks[action.payload.todolistId]
            stateTasks[action.payload.todolistId] = [task, ...todolistTasks]
            return {...stateTasks}
        }
        case "REMOVE-TASK":{
            // //достанем нужный массив по todolistId:
            // let todolistTasks = tasks[todolistId];
            // // перезапишем в этом объекте массив для нужного тудулиста отфилтрованным массивом:
            // tasks[todolistId] = todolistTasks.filter(t => t.id !== id);
            // // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
            // setTasks({...tasks});
            let todolistTasks = stateTasks[action.payload.todolistId]
            stateTasks[action.payload.todolistId] = todolistTasks.filter(t => t.id !== action.payload.id);
return {...stateTasks}
        }
        case "REMOVE-TODOLISTS":{
            // // засунем в стейт список тудулистов, id которых не равны тому, который нужно выкинуть
            // setTodolists(todolists.filter(tl => tl.id !== id));
            // // удалим таски для этого тудулиста из второго стейта, где мы храним отдельно таски
            // delete tasks[id]; // удаляем св-во из объекта... значением которого являлся массив тасок
            // // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
            // setTasks({...tasks});
            delete stateTasks[action.payload.id]
            return {...stateTasks}
        }
        case "ADD-TODOLIST":{

            return {...stateTasks,[action.payload.newTodolistId]:[]}
        }
        case "CHANGE-STATUS":{
            let todolistTasks = stateTasks[action.payload.todolistId]
            let task= todolistTasks.find(t=>t.id===action.payload.id)

            if (task){
                task.isDone=action.payload.isDone

            }

            return {...stateTasks}
        }
        case "CHANGE-TASK-TITLE":{
            let todolistTasks = stateTasks[action.payload.todolistId]
            // let task = todolistTasks.find(t => t.id ===action.payload.id)
            // if (task){
            //     task.title=action.payload.newTitle
            // }
            todolistTasks.map(el=>el.id===action.payload.id?el.title=action.payload.newTitle:el)
            return {...stateTasks}
        }
        default:
            return stateTasks
    }
}


type TsarType=AddTaskACType|RemoveTaskACType|RemoveTaskTodolistACType|AddTodolistACType|ChangeStatusACType|changeTaskTitleAC
type AddTaskACType=ReturnType<typeof addTaskAC>
export const addTaskAC =(title: string, todolistId: string)=>{
 return{
     type:'ADD-TASK',
     payload:{title,todolistId}
 }as const
}
type RemoveTaskACType=ReturnType<typeof removeTaskAC>
export const removeTaskAC=(id: string, todolistId: string)=>{
    return{
        type:'REMOVE-TASK',
        payload:{id,todolistId}
    }as const
}
type RemoveTaskTodolistACType=ReturnType<typeof removeTaskTodolistAC>
export const removeTaskTodolistAC=(id:string)=>{
    return{
        type:'REMOVE-TODOLISTS',
        payload:{id}
    }as const
}

type AddTodolistACType=ReturnType<typeof addTodolistsAC>
export const addTodolistsAC=(newTodolistId:string)=>{
    return{
        type:'ADD-TODOLIST',
        payload:{newTodolistId}
    }as const
}
type ChangeStatusACType=ReturnType<typeof changeStatusAC>
export const changeStatusAC=(id: string, isDone: boolean, todolistId: string)=>{
    return{
        type:'CHANGE-STATUS',
        payload:{id,isDone,todolistId}
    }as const
}
type changeTaskTitleAC=ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC=(id: string, newTitle: string, todolistId: string)=>{
    return{
        type:'CHANGE-TASK-TITLE',
        payload:{id,newTitle,todolistId}
    }as const
}