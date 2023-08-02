import todosApi from '../api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TodoListModel } from '../api/models'

export const useUpdateTodoMutationOptimistic = () => {
  const queryCient = useQueryClient()
  return useMutation({
    mutationFn: todosApi.update,
    onMutate: async (updatedTodo) => {
      await queryCient.cancelQueries({ queryKey: ['todos'] })

      const previousTodos = queryCient.getQueryData<TodoListModel>(['todos'])

      if (previousTodos) {
        const newTodos: TodoListModel = previousTodos.map((item) => {
          if (item.id === updatedTodo.id) {
            return updatedTodo
          } else {
            return item
          }
        })

        queryCient.setQueryData<TodoListModel>(['todos'], newTodos)
      }

      return { previousTodos }
    },
    onError: (err, variavles, context) => {
      if (context?.previousTodos) {
        queryCient.setQueryData<TodoListModel>(['todos'], context.previousTodos)
      }
    },

    onSettled: () => {
      queryCient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}
