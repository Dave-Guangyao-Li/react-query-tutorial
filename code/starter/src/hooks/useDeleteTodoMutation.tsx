import todosApi from '../api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteTodoMutation = () => {
  const queryCient = useQueryClient()
  return useMutation({
    mutationFn: todosApi.delete,
    onSuccess: () => {
      return queryCient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}
