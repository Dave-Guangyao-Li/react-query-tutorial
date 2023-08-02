import todosApi from '../api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateTodoMutation = () => {
  const queryCient = useQueryClient()
  return useMutation({
    mutationFn: todosApi.update,
    onSuccess: () => {
      return queryCient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}
