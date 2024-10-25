'use client'

import { useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, fetchTodos, removeTodo, toggleTodo, editTodo } from './redux/todoReducer'

export default function Component() {
  const tasks = useSelector(state => state.todos.todos)
  const [newTask, setNewTask] = useState('')
  const status = useSelector(state => state.todos.status)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])

  const addTask = (e) => {
    e.preventDefault()
    dispatch(addTodo({ id: Date.now(), title: newTask, completed: false }))
    setNewTask('')
  }

  const toggleTask = (id) => {
    dispatch(toggleTodo(id))
  }

  const removeTask = (id) => {
    dispatch(removeTodo(id))
  }

  const [editingTaskId, setEditingTaskId] = useState(null)
  const [editingTaskTitle, setEditingTaskTitle] = useState('')

  const startEditing = (task) => {
    setEditingTaskId(task.id)
    setEditingTaskTitle(task.title)
  }

  const cancelEditing = () => {
    setEditingTaskId(null)
    setEditingTaskTitle('')
  }

  const saveTask = (id) => {
    dispatch(editTodo({
      id,
      title: editingTaskTitle
    }))
    setEditingTaskId(null)
    setEditingTaskTitle('')
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Todo App</h1>
      <form onSubmit={addTask} className="flex mb-4">
        <Input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className="flex-grow mr-2"
          aria-label="New task input"
        />
        <Button type="submit">Add</Button>
      </form>
      <ul className="space-y-2">
        {tasks.map(task => (
          <li key={task.id} className="flex items-center bg-gray-100 p-2 rounded">
            {editingTaskId === task.id ? (
              <>
                <Input
                  type="text"
                  value={editingTaskTitle}
                  onChange={(e) => setEditingTaskTitle(e.target.value)}
                  className="flex-grow mr-2"
                />
                <Button onClick={() => saveTask(task.id)}>Save</Button>
                <Button onClick={cancelEditing} variant="ghost">Cancel</Button>
              </>
            ) : (
              <>
                <Checkbox
                  id={`task-${task.id}`}
                  checked={task.completed}
                  onClick={() => toggleTask(task.id)}
                  className="mr-2"
                />
                <label
                  htmlFor={`task-${task.id}`}
                  className={`flex-grow ${task.completed ? 'line-through text-gray-500' : ''}`}
                >
                  {task.title}
                </label>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeTask(task.id)}
                  aria-label={`Remove task: ${task.title}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button onClick={() => startEditing(task)} variant="ghost">Edit</Button>
              </>
            )}
          </li>
        ))}
      </ul>
      {status === 'loading' && (
        <p className="text-center text-gray-500 mt-4">No tasks yet. Add one above!</p>
      )}
    </div>
  )
}