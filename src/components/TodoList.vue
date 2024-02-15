<script setup>
import { useTodoStore } from '@/stores/todo';
import { storeToRefs } from 'pinia';

const store = useTodoStore();
const { todos, input_category, input_content } = storeToRefs(store);
const { addTodo, removeTodo, updateLocaleStorage } = store;

</script>

<template>
<main class="main">
<section class="create-todo">
  <h3>CREER UNE TACHE</h3>

  <form @submit.prevent="addTodo">
    <h4>Ajouter une tache</h4>
    <input 
    type="text" 
    placeholder="ex: Faire les courses"
    v-model="input_content"/>
    
    <h4>Choississez une catégorie</h4>
    
    <div class="options">

      <label>
        <input 
          type="radio"
          name="category"
          value="business"
          v-model="input_category"/>
        <span class="bubble business"></span>
        <div>Travail</div>
      </label>

      <label>
        <input 
          type="radio"
          name="category"
          value="personal"
          v-model="input_category"/>
        <span class="bubble personal"></span>
        <div>Personnel</div>
      </label>
    </div>

  <input type="submit" value="AJOUTER"/>
  </form>
</section>

<section class="todo-list">
<h3>LISTE DE TACHES</h3>
<div class="list">

  <div v-for="todo in todos" :class="`todo-item ${todo.done && 'done'}`">
    
    <label>
      <input type="checkbox" v-model="todo.done" @click="updateLocaleStorage"/>
      <span :class="`bubble ${todo.category}`"></span>
    </label>

    <div class="todo-content">
      <input type="text" v-model="todo.content" @keypress.enter="updateLocaleStorage"/> 
    </div>

    <div class="actions">
      <button class="delete" @click="removeTodo(todo)">Supprimer</button>
    </div>

  </div>

</div>

</section>

</main>

</template>

<style scoped>

* {
	--primary: #ffa801;
	--business: #0fbcf9;
	--personal: var(--primary);
	--light: #EEE;
	--grey: #888;
	--dark: #313154;
	--dang: #ff5b57;

	--shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

	--business-glow: 0px 0px 4px rgba(rgba(15, 188, 249,0.75));
	--personal-glow: 0px 0px 4px rgba(rgba(255, 168, 1,0.75));
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'montserrat', sans-serif;
}
template {
	display: flex;
}

input:not([type="radio"]):not([type="checkbox"]), button {
	appearance: none;
	border: none;
	outline: none;
	background: none;
	cursor: initial;
}

body {
	background: #EEE;
	color: #313154;
}

section {
	margin-top: 2rem;
	margin-bottom: 2rem;
	padding-left: 1.5rem;
	padding-right: 1.5em;
}

h3 {
	color: #313154;
	font-size: 1.5rem;
	font-weight: 400;
	margin-bottom: 0.5rem;
}

h4 {
	color: #888;
	font-size: 0.875rem;
	font-weight: 700;
	margin-bottom: 0.5rem;
}


.create-todo input[type="text"] {
	display: block;
	width: 100%;
	font-size: 1.125rem;
	padding: 1rem 1.5rem;
	color: #313154;
	background-color: #FFF;
	border-radius: 0.5rem;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	margin-bottom: 1.5rem;
}
.create-todo .options {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-gap: 1rem;
	margin-bottom: 1.5rem;
}

.create-todo .options label {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 1.5rem;
	background-color: #FFF;
	border-radius: 0.5rem;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	cursor: pointer;
}


.create-todo .options label div {
	color: #313154;
	font-size: 1.125rem;
	margin-top: 1rem;
}

.create-todo input[type="submit"] {
	display: block;
	width: 100%;
	font-size: 1.125rem;
	padding: 0.75rem 1.25rem;
	color: #FFF;
	background-color: #0fbcf9;
	border-radius: 0.5rem;
	box-shadow: 0px 0px 4px rgba(rgba(255, 168, 1,0.75));
	cursor: pointer;
	transition: 0.2s ease-in-out;
}

.create-todo input[type="submit"]:hover {
	opacity: 0.75;
}


input[type="radio"],
input[type="checkbox"] {
	display: none;
}

.bubble {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 20px;
	height: 20px;
	border-radius: 50%;
	border: 2px solid var(--business);
	box-shadow: var(--business-glow);
}

.bubble.personal {
	border-color: var(--personal);
	box-shadow: var(--personal-glow);
}

.bubble::after {
	content: "";
	display: block;
	opacity: 0;
	width: 0px;
	height: 0px;
	background-color: var(--business);
	box-shadow: var(--business-glow);
	border-radius: 50%;
	transition: 0.2s ease-in-out;
}

.bubble.personal::after {
	background-color: var(--personal);
	box-shadow: var(--personal-glow);
}

input:checked ~ .bubble::after {
	width: 10px;
	height: 10px;
	opacity: 1;
}
.todo-list .list {
	margin: 1rem 0;
} 

.todo-list .todo-item {
	display: flex;
	align-items: center;
	background-color: #FFF;
	padding: 1rem;
	border-radius: 0.5rem;
	box-shadow: var(--shadow);
	margin-bottom: 1rem;
}

.todo-item label {
	display: block;
	margin-right: 1rem;
	cursor: pointer;
}

.todo-item .todo-content {
	flex: 1 1 0%;
}

.todo-item .todo-content input {
	color: var(--dark);
	font-size: 1.125rem;
}

.todo-item .actions {
	display: flex;
	align-items: center;
}

.todo-item .actions button {
	display: block;
	padding: 0.5rem;
	border-radius: 0.25rem;
	color: #FFF;
	cursor: pointer;
	transition: 0.2s ease-in-out;
}

.todo-item .actions button:hover {
	opacity: 0.75;
}

.todo-item .actions .delete {
	background-color: #ff5b57;
}

.todo-item.done .todo-content input {
	text-decoration: line-through;
	color: var(--grey);
}

</style>