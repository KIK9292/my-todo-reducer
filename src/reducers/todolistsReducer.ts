import {FilterValuesType, TodolistType} from "../App";

export const todolistsReducer=(stateTodolists:TodolistType[],action:TsarType):TodolistType[]=>{
    switch (action.type){
        case "REMOVE-TODOLIST":{
            // // засунем в стейт список тудулистов, id которых не равны тому, который нужно выкинуть
            // setTodolists(todolists.filter(tl => tl.id !== id));
            // // удалим таски для этого тудулиста из второго стейта, где мы храним отдельно таски
            // delete tasks[id]; // удаляем св-во из объекта... значением которого являлся массив тасок
            // // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
            // setTasks({...tasks});

            return stateTodolists.filter(el=>el.id !== action.payload.id)


        }
        case 'ADD-TODOLIST':{
            let newTodolist:TodolistType={id: action.payload.newTodolistId, title: action.payload.title, filter: 'all'}
            return [newTodolist, ...stateTodolists]
        }
        case "CHANGE-FILTER":{
            stateTodolists.map(el=>el.id===action.payload.todolistId?el.filter=action.payload.value:el)
            return [...stateTodolists]
        }
        case "CHANGE-TODOLIST":{
            stateTodolists.map(el=>el.id===action.payload.id?el.title=action.payload.title:el)
            return [...stateTodolists]
        }
        default: return stateTodolists
    }

}



type TsarType=RemoveTodolistACType|AddTodolistACType|ChangeFilterACType|ChangeTodolistTitleACType
type RemoveTodolistACType=ReturnType<typeof removeTodolistAC>
export const removeTodolistAC=(id: string)=>{
    return{
        type:'REMOVE-TODOLIST',
        payload:{id}
    }as const
}
type AddTodolistACType=ReturnType<typeof addTodolistAC>
export const addTodolistAC=(newTodolistId:string,title: string)=>{
    return{
        type:'ADD-TODOLIST',
        payload:{newTodolistId,title}
    }as const
}
type ChangeFilterACType=ReturnType<typeof changeFilterAC>
export const changeFilterAC=(value: FilterValuesType, todolistId: string)=>{
    return{
        type:'CHANGE-FILTER',
        payload:{value,todolistId}
    }as const
}
type ChangeTodolistTitleACType=ReturnType<typeof ChangeTodolistTitleAC>
export const ChangeTodolistTitleAC=(id: string, title: string)=>{
    return{
        type:'CHANGE-TODOLIST',
        payload:{id, title}
    }as const
}