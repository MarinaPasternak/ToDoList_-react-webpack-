import React, { Component } from 'react';

import TodoList from '../todo-list/todo-list.js';
import Header from '../header/header.js';
import SearchPanel from '../search-panel/search-panel.js';
import ItemStatusFilter from '../item-status-filter/item-status-filter.js';
import ItemAdd from '../add-item/add-item.js'

import './app.css';

export default class App extends Component{

    maxId = 100;

    state={
      todoData: [
        this.createTodoItem('Drink Coffee'),
        this.createTodoItem('Make Awsome Coffee'),
        this.createTodoItem('Buy a cat')
        ], 
        term:'',
        filter: 'all'//active, all, done
    };

    onDelete = (id) => {
        this.setState(({todoData}) => {
            const idx = todoData.findIndex((el)=>el.id == id)
            const before = todoData.slice(0,idx);
            const after = todoData.slice(idx+1);

            const newArray = [...before, ...after]

            return{
                todoData: newArray
            };
        })
    };

    onAdd = (text) => {
        
        const newItem = this.createTodoItem( text );
    
        this.setState(({ todoData }) => {
          const newArr = [
            ...todoData,
            newItem
          ];
    
          return {
            todoData: newArr
          };
        });
    
    };

    toggleProperty(arr, id, propName) { 
        const idx = arr.findIndex((el)=>el.id == id)
        const oldItem = arr[idx]; 
        const newItem = {...oldItem, [propName]: !oldItem[propName]};

        const before = arr.slice(0,idx);
        const after = arr.slice(idx+1);

        const newArray = [...before, newItem, ...after]

        return newArray;
    };

    createTodoItem( label ){
      return {
        label,
        important: false,
        done: false,
        id: this.maxId++
      }
    };

    onToggleImportant = (id) => {
      this.setState(({todoData})=>{
        return{
            todoData: this.toggleProperty(todoData, id, 'important')
        };

    });
    };

    onToggleDone = (id) => {
      this.setState(({todoData})=>{
          return{
              todoData: this.toggleProperty(todoData, id, 'done')
          };

      });
    };

    search(items, term ){
      if(term.length==0){
        return items;
      }

      
      return items.filter((item) => {
        return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
      })
    }

    onSearchChange = (term) =>{
        this.setState({ term });
    };

    onFilterChange = (filter) => {
      this.setState({ filter });
    }

    filter(items, filter){
      switch(filter){
        case 'all':
          return items;
        case 'active':
          return items.filter((item) => !item.done);
        case 'done':
          return items.filter((item) => item.done);
        default:
          return items;
      }

    }

    render(){

       const {todoData, term, filter }=this.state;

       const visibleItems = this.filter(this.search(todoData, term), filter );

       const countDone = todoData.filter((el) => el.done).length;

       const countToDo = todoData.length - countDone;

        return (
        <div className="todo-app">
        <Header toDo={countToDo} done={countDone} />
        <div className="top-panel d-flex">
            <SearchPanel onSearchChange={this.onSearchChange}/>
            <ItemStatusFilter filter={filter} 
            onFilterChange={this.onFilterChange}/>
        </div>

        <TodoList todos={visibleItems} 
        onDelete={this.onDelete} 
        onToggleDone={this.onToggleDone}
        onToggleImportant={this.onToggleImportant}/>
        <ItemAdd onItemAdded={this.onAdd}/>
        </div>

    );}
    
}
