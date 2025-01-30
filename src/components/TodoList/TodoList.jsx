import React, { useEffect, useState } from 'react';
import AddTodo from '../AddTodo/AddTodo';
import Todo from '../Todo/Todo';
import styles from './TodoList.module.css'

export default function TodoList({filter}) {
  //useState는 내부에 저장된 데이터가 있으면 리렌더링 시 초기값 말고 그값으로 들고옴
  //그러나 업데이트가 안된다고 해서 불필요하게 초기값을 읽음. 안보일뿐.
  //그래서 아래 주석처럼 사용하면 불필요하게 계속 리렌더링
  //const [todos, setTodos] = useState(readTodosFromLocalStorage()); 
  //아래처럼 콜백함수로 전달하면 초기값이 필요할 때만 함수를 호출함!!
  //그래서 이런 경우 useState에 값이 아닌, 함수를 전달하는 것!
  const [todos, setTodos] = useState(()=>readTodosFromLocalStorage());
  const handleAdd = (todo)=>
    setTodos([...todos, todo]);
  const handleUpdate = (updated)=>
    setTodos(todos.map(t=>t.id===updated.id ? updated : t));
  const handleDelete = (deleted)=>
    setTodos(todos.filter(t=>t.id !== deleted.id));
  
  useEffect(()=>{
    localStorage.setItem('todos', JSON.stringify(todos));
  },[todos]);
  
  const filtered = getFilteredItems(todos, filter);
  return (
    <section className={styles.container}>
      <ul className={styles.list}>
        {filtered.map((item) => (
          <Todo key={item.id} todo={item} onUpdate={handleUpdate} onDelete={handleDelete}/>
        ))}
      </ul>
      <AddTodo onAdd={handleAdd}/>
    </section>
  );
}

function readTodosFromLocalStorage(){
  console.log('hi');
  
  const todos = localStorage.getItem('todos');
  return todos ? JSON.parse(todos) : [];
}

function getFilteredItems(todos, filter){
  if(filter==='all'){
    return todos;
  }
  return todos.filter(todo=>todo.status === filter)
}