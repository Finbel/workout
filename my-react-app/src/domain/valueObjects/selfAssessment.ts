import { SelfAssessedForm, SelfAssessedDifficulty } from '../constants'

export type SelfAssessment = {
  form: SelfAssessedForm
  difficulty: SelfAssessedDifficulty
  excentric: boolean
}
