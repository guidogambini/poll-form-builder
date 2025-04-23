export type Answer = {
    text: string
    votes: number
  }
  
  export type Poll = {
    id: string
    question: string
    answers: Answer[]
  }
  
  export type QuestionType = 'short' | 'long' | 'number' | 'radio'
  
  export type Question = {
    id: string
    text: string
    type: QuestionType
    options?: string[] // Solo para tipo 'radio'
  }
  
  export type Form = {
    id: string
    title: string
    questions: Question[]
    responses: Record<string, string | number>[] // array de respuestas de usuarios
  }
  