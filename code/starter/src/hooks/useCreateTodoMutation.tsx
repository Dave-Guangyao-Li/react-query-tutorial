import todosApi from '../api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateTodoMutation = () => {
  const queryCient = useQueryClient()
  return useMutation({
    mutationFn: todosApi.create,
    onSuccess: () => {
      return queryCient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}
