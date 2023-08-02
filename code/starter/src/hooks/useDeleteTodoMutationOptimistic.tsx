import todosApi from '../api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TodoListModel } from '../api/models'

export const useDeleteTodoMutationOptimistic = () => {
  const queryCient = useQueryClient()
  return useMutation({
    mutationFn: todosApi.delete,
    onMutate: async (id) => {
      await queryCient.cancelQueries({ queryKey: ['todos'] })

      const previousTodos = queryCient.getQueryData<TodoListModel>(['todos'])

      if (previousTodos) {
        const newTodos: TodoListModel = previousTodos.filter(
          (item) => item.id !== id
        )

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
